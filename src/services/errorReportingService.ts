// ADVANCED ERROR REPORTING & RECOVERY SERVICE
// Production-grade error handling with analytics and recovery

interface ErrorReport {
  timestamp: number;
  error: Error;
  componentStack?: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: Record<string, any>;
}

interface ErrorAnalytics {
  errorCount: number;
  errorTypes: Record<string, number>;
  recoverySuccess: number;
  userImpact: 'minimal' | 'moderate' | 'severe' | 'critical';
}

class ErrorReportingService {
  private static instance: ErrorReportingService;
  private sessionId: string;
  private errorQueue: ErrorReport[] = [];
  private analytics: ErrorAnalytics = {
    errorCount: 0,
    errorTypes: {},
    recoverySuccess: 0,
    userImpact: 'minimal'
  };

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandlers();
  }

  static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupGlobalErrorHandlers(): void {
    // Handle uncaught JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error, {
        type: 'javascript_error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(new Error(event.reason), {
        type: 'unhandled_promise_rejection',
        promise: event.promise
      });
    });

    // Handle React DevTools errors
    if (typeof window !== 'undefined' && (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const devtools = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
      const originalOnCommitFiberRoot = devtools.onCommitFiberRoot;
      
      devtools.onCommitFiberRoot = (id: number, root: any, ...args: any[]) => {
        try {
          return originalOnCommitFiberRoot.apply(devtools, [id, root, ...args]);
        } catch (error) {
          this.reportError(error as Error, {
            type: 'react_devtools_error',
            rootId: id
          });
        }
      };
    }
  }

  public reportError(
    error: Error,
    context: Record<string, any> = {},
    componentStack?: string
  ): void {
    const severity = this.calculateSeverity(error, context);
    
    const errorReport: ErrorReport = {
      timestamp: Date.now(),
      error,
      componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getUserId(),
      sessionId: this.sessionId,
      severity,
      context: {
        ...context,
        userActions: this.getRecentUserActions(),
        memoryUsage: this.getMemoryUsage(),
        networkStatus: navigator.onLine,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };

    this.errorQueue.push(errorReport);
    this.updateAnalytics(errorReport);
    
    // Send to backend if critical or queue for batch sending
    if (severity === 'critical') {
      this.sendErrorReport(errorReport);
    } else {
      this.queueForBatchSend(errorReport);
    }

    // Attempt automatic recovery
    this.attemptRecovery(error, context);
  }

  private calculateSeverity(error: Error, context: Record<string, any>): 'low' | 'medium' | 'high' | 'critical' {
    // Critical errors that break core functionality
    if (error.message.includes('ChunkLoadError') || 
        error.message.includes('Loading CSS chunk') ||
        context.type === 'payment_error' ||
        context.type === 'auth_error') {
      return 'critical';
    }

    // High severity for component crashes
    if (error.name === 'TypeError' && context.componentStack) {
      return 'high';
    }

    // Medium for API failures
    if (context.type === 'api_error' || context.type === 'network_error') {
      return 'medium';
    }

    return 'low';
  }

  private getUserId(): string | undefined {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.id;
    } catch {
      return undefined;
    }
  }

  private getRecentUserActions(): string[] {
    try {
      return JSON.parse(sessionStorage.getItem('userActions') || '[]').slice(-10);
    } catch {
      return [];
    }
  }

  private getMemoryUsage(): any {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  private updateAnalytics(errorReport: ErrorReport): void {
    this.analytics.errorCount++;
    this.analytics.errorTypes[errorReport.error.name] = 
      (this.analytics.errorTypes[errorReport.error.name] || 0) + 1;

    // Update user impact assessment
    if (errorReport.severity === 'critical') {
      this.analytics.userImpact = 'critical';
    } else if (errorReport.severity === 'high' && this.analytics.userImpact !== 'critical') {
      this.analytics.userImpact = 'severe';
    }
  }

  private async sendErrorReport(errorReport: ErrorReport): Promise<void> {
    try {
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...errorReport,
          error: {
            name: errorReport.error.name,
            message: errorReport.error.message,
            stack: errorReport.error.stack
          }
        })
      });

      if (response.ok) {
        console.log('Error report sent successfully');
      }
    } catch (sendError) {
      console.error('Failed to send error report:', sendError);
      // Store locally for retry
      this.storeErrorLocally(errorReport);
    }
  }

  private queueForBatchSend(errorReport: ErrorReport): void {
    const queuedErrors = JSON.parse(localStorage.getItem('queuedErrors') || '[]');
    queuedErrors.push(errorReport);
    
    // Keep only last 50 errors to prevent storage bloat
    if (queuedErrors.length > 50) {
      queuedErrors.splice(0, queuedErrors.length - 50);
    }
    
    localStorage.setItem('queuedErrors', JSON.stringify(queuedErrors));
  }

  private storeErrorLocally(errorReport: ErrorReport): void {
    try {
      const storedErrors = JSON.parse(localStorage.getItem('failedErrorReports') || '[]');
      storedErrors.push(errorReport);
      localStorage.setItem('failedErrorReports', JSON.stringify(storedErrors));
    } catch (storageError) {
      console.error('Failed to store error locally:', storageError);
    }
  }

  private attemptRecovery(error: Error, context: Record<string, any>): boolean {
    let recovered = false;

    // Chunk loading error recovery
    if (error.message.includes('ChunkLoadError')) {
      console.log('Attempting chunk reload recovery...');
      setTimeout(() => window.location.reload(), 1000);
      recovered = true;
    }

    // API error recovery with retry
    if (context.type === 'api_error') {
      console.log('Attempting API retry...');
      this.scheduleApiRetry(context);
      recovered = true;
    }

    // Memory cleanup for memory-related errors
    if (error.message.includes('memory') || error.name === 'RangeError') {
      console.log('Attempting memory cleanup...');
      this.performMemoryCleanup();
      recovered = true;
    }

    if (recovered) {
      this.analytics.recoverySuccess++;
    }

    return recovered;
  }

  private scheduleApiRetry(context: Record<string, any>): void {
    if (context.retryCount && context.retryCount >= 3) {
      return; // Max retries reached
    }

    const retryDelay = Math.pow(2, (context.retryCount || 0)) * 1000; // Exponential backoff
    
    setTimeout(() => {
      if (context.retryFunction && typeof context.retryFunction === 'function') {
        context.retryFunction({ ...context, retryCount: (context.retryCount || 0) + 1 });
      }
    }, retryDelay);
  }

  private performMemoryCleanup(): void {
    // Clear caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }

    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }

    // Clear session storage of non-essential items
    const essentialKeys = ['user', 'auth_token', 'session_id'];
    Object.keys(sessionStorage).forEach(key => {
      if (!essentialKeys.includes(key)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  public getAnalytics(): ErrorAnalytics {
    return { ...this.analytics };
  }

  public clearErrorQueue(): void {
    this.errorQueue = [];
    localStorage.removeItem('queuedErrors');
    localStorage.removeItem('failedErrorReports');
  }

  public exportErrorData(): string {
    return JSON.stringify({
      analytics: this.analytics,
      recentErrors: this.errorQueue.slice(-10),
      sessionId: this.sessionId
    }, null, 2);
  }
}

export default ErrorReportingService;