import React, { useState, useEffect } from 'react';
import { 
  Database, HardDrive, AlertTriangle, TrendingUp, 
  Server, Cloud, BarChart3, RefreshCw, Zap
} from 'lucide-react';
import { SoloCard } from '../shared/SoloCard';
import { SoloButton } from '../shared/SoloButton';

interface StorageData {
  service: string;
  current: number;
  limit: number;
  unit: string;
  status: 'safe' | 'warning' | 'critical';
  cost: string;
  upgradeUrl?: string;
}

export const StorageMonitor: React.FC = () => {
  const [storageData, setStorageData] = useState<StorageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const mockStorageData: StorageData[] = [
    {
      service: 'Supabase Database',
      current: 75,
      limit: 500,
      unit: 'MB',
      status: 'safe',
      cost: 'FREE → $25/mo for 8GB',
      upgradeUrl: 'https://supabase.com/pricing'
    },
    {
      service: 'Railway Backend',
      current: 45,
      limit: 1000,
      unit: 'MB',
      status: 'safe',
      cost: '$5/mo → $20/mo for 10GB'
    },
    {
      service: 'Vercel Frontend',
      current: 120,
      limit: 1000,
      unit: 'MB',
      status: 'safe',
      cost: 'FREE → $20/mo for 100GB'
    }
  ];

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    setIsLoading(true);
    try {
      // In real implementation, fetch from APIs
      // const supabaseUsage = await getSupabaseStorage();
      // const railwayUsage = await getRailwayStorage();
      // const vercelUsage = await getVercelStorage();
      
      // For demo, use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStorageData(mockStorageData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load storage data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStorageStatus = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 90) return 'critical';
    if (percentage >= 70) return 'warning';
    return 'safe';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      default: return Database;
    }
  };

  const totalUsage = storageData.reduce((acc, item) => acc + item.current, 0);
  const totalLimit = storageData.reduce((acc, item) => acc + item.limit, 0);
  const overallPercentage = (totalUsage / totalLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Storage Monitor</h2>
          <p className="text-solo-gray-600">Track data usage across all services</p>
        </div>
        
        <SoloButton
          onClick={loadStorageData}
          loading={isLoading}
          variant="ghost"
          size="small"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </SoloButton>
      </div>

      {/* Overall Usage Summary */}
      <SoloCard className="chroma-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-solo-primary rounded-2xl flex items-center justify-center">
              <HardDrive className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-solo-dark">{totalUsage.toFixed(0)} MB</div>
            <div className="text-sm text-solo-gray-600">Total Used</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-solo-secondary rounded-2xl flex items-center justify-center">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-solo-dark">{totalLimit.toFixed(0)} MB</div>
            <div className="text-sm text-solo-gray-600">Total Limit</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-solo-success rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-solo-dark">{overallPercentage.toFixed(1)}%</div>
            <div className="text-sm text-solo-gray-600">Usage Rate</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-solo-warning rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-solo-dark">100</div>
            <div className="text-sm text-solo-gray-600">Est. Users</div>
          </div>
        </div>
      </SoloCard>

      {/* Storage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {storageData.map((storage, index) => {
          const percentage = (storage.current / storage.limit) * 100;
          const StatusIcon = getStatusIcon(storage.status);
          
          return (
            <SoloCard key={index} className="relative overflow-hidden">
              {/* Status Indicator */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(storage.status)}`}>
                {storage.status.toUpperCase()}
              </div>
              
              <div className="space-y-4">
                {/* Service Header */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-solo-gray-100 rounded-xl flex items-center justify-center">
                    <StatusIcon className="w-6 h-6 text-solo-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-solo-dark">{storage.service}</h3>
                    <p className="text-sm text-solo-gray-600">{storage.cost}</p>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-solo-gray-600">Usage</span>
                    <span className="font-semibold text-solo-dark">
                      {storage.current} / {storage.limit} {storage.unit}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-solo-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        storage.status === 'critical' ? 'bg-red-500' :
                        storage.status === 'warning' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-solo-gray-500">
                    <span>0 {storage.unit}</span>
                    <span className="font-semibold">{percentage.toFixed(1)}%</span>
                    <span>{storage.limit} {storage.unit}</span>
                  </div>
                </div>

                {/* Action Button */}
                {storage.status === 'warning' || storage.status === 'critical' ? (
                  <SoloButton
                    variant="primary"
                    size="small"
                    className="w-full"
                    onClick={() => storage.upgradeUrl && window.open(storage.upgradeUrl, '_blank')}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </SoloButton>
                ) : (
                  <div className="text-center text-sm text-solo-gray-500">
                    ✅ Healthy Usage
                  </div>
                )}
              </div>
            </SoloCard>
          );
        })}
      </div>

      {/* Scaling Recommendations */}
      <SoloCard title="Scaling Recommendations" className="chroma-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-solo-dark mb-3">Current Capacity (100 Users)</h4>
            <ul className="space-y-2 text-sm text-solo-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Database: 11x headroom available
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Backend: 20x headroom available  
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Frontend: 8x headroom available
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-solo-dark mb-3">Upgrade Triggers</h4>
            <ul className="space-y-2 text-sm text-solo-gray-600">
              <li className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-3" />
                Database: Upgrade at 300+ users
              </li>
              <li className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-3" />
                Backend: Monitor logs growth
              </li>
              <li className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-3" />
                Frontend: Optimize large assets
              </li>
            </ul>
          </div>
        </div>
      </SoloCard>

      {/* Last Updated */}
      <div className="text-center text-sm text-solo-gray-500">
        Last updated: {lastUpdated.toLocaleString()}
      </div>
    </div>
  );
};