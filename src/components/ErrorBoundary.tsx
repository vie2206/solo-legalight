import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Download, Send } from 'lucide-react';
import ErrorReportingService from '../services/errorReportingService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  isRecovering: boolean;
  recoveryAttempted: boolean;
  errorReported: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  private errorReportingService: ErrorReportingService;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      isRecovering: false,
      recoveryAttempted: false,
      errorReported: false
    };
    this.errorReportingService = ErrorReportingService.getInstance();
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      isRecovering: false,
      recoveryAttempted: false,
      errorReported: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Report error to service
    this.errorReportingService.reportError(error, {
      type: 'react_component_error',
      component: 'ErrorBoundary'
    }, errorInfo.componentStack);

    this.setState({
      error,
      errorInfo,
      errorReported: true
    });

    // Attempt automatic recovery after a delay
    if (!this.state.recoveryAttempted) {
      this.attemptAutomaticRecovery(error);
    }
  }

  attemptAutomaticRecovery = (error: Error) => {
    this.setState({ isRecovering: true, recoveryAttempted: true });

    setTimeout(() => {
      try {
        // Clear error state and try to recover
        this.setState({
          hasError: false,
          error: undefined,
          errorInfo: undefined,
          isRecovering: false
        });
        
        console.log('Automatic recovery attempted');
      } catch (recoveryError) {
        console.error('Automatic recovery failed:', recoveryError);
        this.setState({ isRecovering: false });
      }
    }, 3000);
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    if (this.state.error) {
      const errorData = this.errorReportingService.exportErrorData();
      const blob = new Blob([errorData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `error-report-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  handleSendToSupport = async () => {
    if (this.state.error) {
      try {
        const response = await fetch('/api/support/error-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: {
              name: this.state.error.name,
              message: this.state.error.message,
              stack: this.state.error.stack
            },
            componentStack: this.state.errorInfo?.componentStack,
            analytics: this.errorReportingService.getAnalytics(),
            timestamp: Date.now()
          })
        });

        if (response.ok) {
          alert('Error report sent successfully. Our team will investigate.');
        } else {
          throw new Error('Failed to send report');
        }
      } catch (error) {
        console.error('Failed to send error report:', error);
        alert('Failed to send report. Please try downloading the report instead.');
      }
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {this.state.isRecovering ? 'Attempting Recovery...' : 'Oops! Something went wrong'}
              </h1>
              
              {this.state.isRecovering ? (
                <div className="mb-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                  <p className="text-blue-600 font-medium">
                    Attempting automatic recovery...
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 mb-6">
                  We're sorry, but something unexpected happened. 
                  {this.state.recoveryAttempted && ' Automatic recovery was attempted.'}
                  {this.state.errorReported && ' The error has been reported automatically.'}
                </p>
              )}
            </div>

            {!this.state.isRecovering && (
              <div className="space-y-3">
                <button
                  onClick={this.handleRefresh}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Page
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Homepage
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={this.handleReportError}
                    className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </button>
                  
                  <button
                    onClick={this.handleSendToSupport}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Support
                  </button>
                </div>

                {this.state.errorReported && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                    ✓ Error automatically reported. Our team has been notified.
                  </div>
                )}
              </div>
            )}

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-32 text-red-600">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
                <div className="mt-2 text-xs text-gray-500">
                  Recovery Attempted: {this.state.recoveryAttempted ? 'Yes' : 'No'}
                  <br />
                  Error Reported: {this.state.errorReported ? 'Yes' : 'No'}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;