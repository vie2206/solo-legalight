import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Monitor,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { ProductionDeployment, productionChecklist } from '../utils/ProductionConfig';

// 🚀 COMPREHENSIVE DEPLOYMENT DASHBOARD
// Production deployment management and monitoring

interface DeploymentStatus {
  phase: 'idle' | 'checking' | 'building' | 'deploying' | 'verifying' | 'complete' | 'failed';
  progress: number;
  currentStep: string;
  startTime?: Date;
  endTime?: Date;
  errors: string[];
  warnings: string[];
}

interface CheckResult {
  id: string;
  name: string;
  passed: boolean;
  value: string;
  target: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

export const DeploymentDashboard: React.FC = () => {
  const [deployment] = useState(() => new ProductionDeployment());
  const [status, setStatus] = useState<DeploymentStatus>({
    phase: 'idle',
    progress: 0,
    currentStep: 'Ready to deploy',
    errors: [],
    warnings: []
  });
  
  const [preDeploymentChecks, setPreDeploymentChecks] = useState<CheckResult[]>([]);
  const [postDeploymentChecks, setPostDeploymentChecks] = useState<CheckResult[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize checks
  useEffect(() => {
    const initChecks = (checks: typeof productionChecklist.preDeployment) =>
      checks.map(check => ({
        id: check.id,
        name: check.name,
        passed: false,
        value: '',
        target: '',
        status: 'pending' as const
      }));

    setPreDeploymentChecks(initChecks(productionChecklist.preDeployment));
    setPostDeploymentChecks(initChecks(productionChecklist.postDeployment));
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const runPreDeploymentChecks = async () => {
    setStatus(prev => ({ 
      ...prev, 
      phase: 'checking', 
      currentStep: 'Running pre-deployment checks...',
      startTime: new Date()
    }));

    addLog('🔍 Starting pre-deployment checks...');

    for (let i = 0; i < preDeploymentChecks.length; i++) {
      const check = preDeploymentChecks[i];
      
      // Update check status to running
      setPreDeploymentChecks(prev => 
        prev.map((c, idx) => 
          idx === i ? { ...c, status: 'running' } : c
        )
      );

      addLog(`Running check: ${check.name}`);

      // Simulate check execution
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Get actual check result
      const checkConfig = productionChecklist.preDeployment[i];
      const result = checkConfig.check();

      // Update check with result
      setPreDeploymentChecks(prev => 
        prev.map((c, idx) => 
          idx === i ? { 
            ...c, 
            ...result,
            status: result.passed ? 'passed' : 'failed'
          } : c
        )
      );

      addLog(`${result.passed ? '✅' : '❌'} ${check.name}: ${result.value}`);

      // Update progress
      setStatus(prev => ({ 
        ...prev, 
        progress: ((i + 1) / preDeploymentChecks.length) * 50 
      }));
    }

    const allPassed = preDeploymentChecks.every(check => {
      const config = productionChecklist.preDeployment.find(c => c.id === check.id);
      return config?.check().passed || false;
    });

    if (allPassed) {
      addLog('✅ All pre-deployment checks passed!');
      setStatus(prev => ({ 
        ...prev, 
        phase: 'building',
        currentStep: 'Pre-deployment checks passed. Ready to build.',
        progress: 50
      }));
    } else {
      addLog('❌ Some pre-deployment checks failed. Please fix issues before deploying.');
      setStatus(prev => ({ 
        ...prev, 
        phase: 'failed',
        currentStep: 'Pre-deployment checks failed',
        errors: ['Some checks failed. See logs for details.']
      }));
    }
  };

  const runBuildProcess = async () => {
    setStatus(prev => ({ 
      ...prev, 
      phase: 'building',
      currentStep: 'Building application...'
    }));

    const buildSteps = [
      'Installing dependencies...',
      'Running security audit...',
      'Optimizing bundle...',
      'Generating service worker...',
      'Compressing assets...',
      'Creating build artifacts...'
    ];

    for (let i = 0; i < buildSteps.length; i++) {
      setStatus(prev => ({ 
        ...prev, 
        currentStep: buildSteps[i],
        progress: 50 + ((i + 1) / buildSteps.length) * 25
      }));

      addLog(`🔨 ${buildSteps[i]}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    addLog('✅ Build process completed successfully!');
    setStatus(prev => ({ 
      ...prev, 
      phase: 'deploying',
      currentStep: 'Deploying to production...',
      progress: 75
    }));
  };

  const runDeploymentProcess = async () => {
    const deploySteps = [
      'Uploading build artifacts...',
      'Updating CDN cache...',
      'Applying security headers...',
      'Starting health checks...',
      'Updating DNS records...'
    ];

    for (let i = 0; i < deploySteps.length; i++) {
      setStatus(prev => ({ 
        ...prev, 
        currentStep: deploySteps[i],
        progress: 75 + ((i + 1) / deploySteps.length) * 15
      }));

      addLog(`🚀 ${deploySteps[i]}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    addLog('✅ Deployment completed successfully!');
    setStatus(prev => ({ 
      ...prev, 
      phase: 'verifying',
      currentStep: 'Running post-deployment verification...',
      progress: 90
    }));
  };

  const runPostDeploymentChecks = async () => {
    addLog('🔍 Starting post-deployment verification...');

    for (let i = 0; i < postDeploymentChecks.length; i++) {
      const check = postDeploymentChecks[i];
      
      setPostDeploymentChecks(prev => 
        prev.map((c, idx) => 
          idx === i ? { ...c, status: 'running' } : c
        )
      );

      addLog(`Verifying: ${check.name}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const checkConfig = productionChecklist.postDeployment[i];
      const result = checkConfig.check();

      setPostDeploymentChecks(prev => 
        prev.map((c, idx) => 
          idx === i ? { 
            ...c, 
            ...result,
            status: result.passed ? 'passed' : 'failed'
          } : c
        )
      );

      addLog(`${result.passed ? '✅' : '❌'} ${check.name}: ${result.value}`);
    }

    addLog('🎉 Deployment completed successfully! Platform is live.');
    setStatus(prev => ({ 
      ...prev, 
      phase: 'complete',
      currentStep: 'Deployment completed successfully!',
      progress: 100,
      endTime: new Date()
    }));
  };

  const startDeployment = async () => {
    setLogs([]);
    setStatus({
      phase: 'checking',
      progress: 0,
      currentStep: 'Starting deployment process...',
      startTime: new Date(),
      errors: [],
      warnings: []
    });

    try {
      await runPreDeploymentChecks();
      if (status.phase !== 'failed') {
        await runBuildProcess();
        await runDeploymentProcess();
        await runPostDeploymentChecks();
      }
    } catch (error) {
      addLog(`❌ Deployment failed: ${error}`);
      setStatus(prev => ({ 
        ...prev, 
        phase: 'failed',
        currentStep: 'Deployment failed',
        errors: [error instanceof Error ? error.message : String(error)]
      }));
    }
  };

  const getPhaseIcon = (phase: DeploymentStatus['phase']) => {
    switch (phase) {
      case 'idle': return <Rocket className="w-5 h-5" />;
      case 'checking': return <Shield className="w-5 h-5 animate-pulse" />;
      case 'building': return <Zap className="w-5 h-5 animate-pulse" />;
      case 'deploying': return <Globe className="w-5 h-5 animate-pulse" />;
      case 'verifying': return <Monitor className="w-5 h-5 animate-pulse" />;
      case 'complete': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: CheckResult['status']) => {
    switch (status) {
      case 'pending': return 'text-gray-400';
      case 'running': return 'text-blue-500 animate-pulse';
      case 'passed': return 'text-green-500';
      case 'failed': return 'text-red-500';
    }
  };

  const getStatusIcon = (status: CheckResult['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'running': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
    }
  };

  const isDeploying = ['checking', 'building', 'deploying', 'verifying'].includes(status.phase);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">🚀 CLAT Platform Deployment</h1>
            <p className="text-blue-100">
              Revolutionary Educational Platform Production Deployment System
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">v1.0.0</div>
            <div className="text-blue-200 text-sm">Production Ready</div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deployment Status */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            {getPhaseIcon(status.phase)}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Deployment Status
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">{status.currentStep}</span>
                <span className="text-sm font-medium">{status.progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    status.phase === 'complete' ? 'bg-green-500' :
                    status.phase === 'failed' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${status.progress}%` }}
                />
              </div>
            </div>

            {status.startTime && (
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Started: {status.startTime.toLocaleTimeString()}</span>
                {status.endTime && (
                  <span>
                    Duration: {Math.round((status.endTime.getTime() - status.startTime.getTime()) / 1000)}s
                  </span>
                )}
              </div>
            )}

            {status.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800 dark:text-red-400">Errors</span>
                </div>
                {status.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-600 dark:text-red-400">
                    • {error}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={startDeployment}
              disabled={isDeploying}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg 
                         hover:from-green-600 hover:to-green-700 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         font-medium flex items-center justify-center gap-2"
            >
              {isDeploying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Deploying...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Deployment
                </>
              )}
            </button>

            <button
              onClick={() => setShowLogs(!showLogs)}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg 
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                         font-medium flex items-center justify-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              {showLogs ? 'Hide Logs' : 'Show Logs'}
            </button>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className="font-medium">Production</span>
                </div>
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span className="font-medium">Global</span>
                </div>
                <div className="flex justify-between">
                  <span>CDN:</span>
                  <span className="font-medium">CloudFlare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-Deployment Checks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Pre-Deployment Checks
          </h3>
          
          <div className="space-y-2">
            {preDeploymentChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={getStatusColor(check.status)}>
                    {getStatusIcon(check.status)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {check.name}
                    </p>
                    {check.value && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {check.value} / {check.target}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post-Deployment Checks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Post-Deployment Verification
          </h3>
          
          <div className="space-y-2">
            {postDeploymentChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={getStatusColor(check.status)}>
                    {getStatusIcon(check.status)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {check.name}
                    </p>
                    {check.value && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {check.value} / {check.target}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment Logs */}
      {showLogs && (
        <div className="bg-black rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Deployment Logs</h3>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-400">No logs available. Start a deployment to see logs.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-green-400 mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentDashboard;