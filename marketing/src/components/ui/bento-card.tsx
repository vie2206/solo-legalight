'use client';

import React from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'ai' | 'analytics' | 'glassmorphic' | 'education';
}

export function BentoCard({ children, className = '', variant = 'glassmorphic' }: BentoCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'ai':
        return 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20';
      case 'analytics':
        return 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20';
      case 'education':
        return 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border backdrop-blur-md
      transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl
      ${getVariantStyles()}
      ${className}
    `}>
      {children}
    </div>
  );
}

// AI-Powered Feature Card
export function AIPoweredBentoCard() {
  return (
    <BentoCard variant="ai" className="h-80 p-6">
      <div className="relative h-full">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <svg width="368" height="320" viewBox="0 0 368 320" fill="none">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Floating Circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-64 border border-purple-500/20 rounded-full animate-pulse">
            <div className="w-48 h-48 mt-8 ml-8 border border-purple-500/30 rounded-full">
              <div className="w-32 h-32 mt-8 ml-8 border border-purple-500/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* AI Code Display */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/10">
            <code className="text-xs text-purple-300 font-mono">AI.predict(rank)</code>
          </div>
        </div>

        {/* Central Display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">85%</div>
            <div className="text-sm text-purple-200">Prediction Accuracy</div>
            <div className="w-8 h-1 bg-purple-500 rounded-full mx-auto mt-3"></div>
          </div>
        </div>

        {/* Corner Indicators */}
        <div className="absolute top-4 right-4 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 left-4 w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-1000"></div>
      </div>
    </BentoCard>
  );
}

// Analytics Feature Card
export function AnalyticsBentoCard() {
  return (
    <BentoCard variant="analytics" className="h-80 p-6">
      <div className="relative h-full">
        {/* Chart Background */}
        <div className="absolute inset-0 flex items-end justify-center space-x-2 opacity-30">
          {[40, 65, 80, 55, 90, 75, 85].map((height, index) => (
            <div 
              key={index}
              className="bg-blue-500 rounded-t-sm"
              style={{ 
                width: '12px', 
                height: `${height}%`,
                animationDelay: `${index * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Mock Test Analysis</h3>
            <p className="text-blue-200 text-sm">DECODE-TRACK-REFLECT</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Legal Reasoning</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-700 rounded-full">
                  <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm text-white">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">English</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-700 rounded-full">
                  <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-white">82%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

// Education Feature Card
export function EducationBentoCard() {
  return (
    <BentoCard variant="education" className="h-80 p-6">
      <div className="relative h-full flex flex-col justify-between">
        {/* 3D Education Icon */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-80">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg transform rotate-12">
            <div className="w-full h-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L3 7V17H5V9L12 13L21 8V7L12 2Z" fill="currentColor"/>
                <path d="M5 13.18V17C5 17.5 8.5 20 12 20S19 17.5 19 17V13.18L12 17L5 13.18Z" fill="currentColor" opacity="0.7"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">Study Materials</h3>
          <p className="text-green-200 text-sm">Comprehensive CLAT prep resources</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
            </div>
            <span className="text-sm text-white">Legal Reasoning</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
            </div>
            <span className="text-sm text-white">Current Affairs</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
            </div>
            <span className="text-sm text-white">English Language</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

// Community Feature Card  
export function CommunityBentoCard() {
  return (
    <BentoCard variant="ai" className="h-80 p-6">
      <div className="relative h-full">
        {/* Network Visualization */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="w-full h-full opacity-20" viewBox="0 0 300 300">
            {/* Nodes */}
            <circle cx="150" cy="50" r="4" fill="currentColor" className="animate-pulse"/>
            <circle cx="80" cy="120" r="4" fill="currentColor" className="animate-pulse delay-300"/>
            <circle cx="220" cy="120" r="4" fill="currentColor" className="animate-pulse delay-500"/>
            <circle cx="150" cy="200" r="4" fill="currentColor" className="animate-pulse delay-700"/>
            <circle cx="60" cy="240" r="4" fill="currentColor" className="animate-pulse delay-1000"/>
            <circle cx="240" cy="240" r="4" fill="currentColor" className="animate-pulse delay-1200"/>
            
            {/* Connections */}
            <line x1="150" y1="50" x2="80" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <line x1="150" y1="50" x2="220" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <line x1="80" y1="120" x2="150" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <line x1="220" y1="120" x2="150" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <line x1="150" y1="200" x2="60" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <line x1="150" y1="200" x2="240" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Community Insights</h3>
            <p className="text-purple-200 text-sm">Connect with 10K+ students</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white/20"></div>
                ))}
              </div>
              <span className="text-sm text-white">+2,847 this week</span>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-xs text-gray-300">Your network rank</div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}