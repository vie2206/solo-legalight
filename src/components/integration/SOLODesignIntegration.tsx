import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Layers, 
  Crown, 
  Zap, 
  Star, 
  Diamond,
  Eye,
  Settings,
  Play
} from 'lucide-react';

// Import all SOLO design systems
import { soloStyles } from '../shared/SOLODesignSystem';
import SOLOCompleteAIIcon from '../icons/SOLOCompleteAIIcons';
import SOLOGlassIcon from '../icons/SOLOGlassIconsSystem';
import SOLOBusiness3DIcon from '../icons/SOLOBusiness3DIcons';
import SOLOHolographicGradient, { SOLOVisualEffect, SOLOMarketingHarmony } from '../effects/SOLOVisualEffectsSystem';
import SOLOTaskManager from '../tasks/SOLOAdvancedTaskManager';
import SOLODashboardBuilder from '../dashboard/SOLODashboardBuilder';
import { BentoCard } from '../layout/SOLOBentoSystem';
import SOLOSynapseAIChat from '../ai/SOLOSynapseAIChat';
import SOLO3DQuizSystem from '../quiz/SOLO3DQuizSystem';

interface SOLODesignIntegrationProps {
  className?: string;
}

const SOLODesignIntegration: React.FC<SOLODesignIntegrationProps> = ({
  className = ''
}) => {
  const [activeDemo, setActiveDemo] = useState<'overview' | 'icons' | 'effects' | 'components' | 'ai'>('overview');

  const demoSections = [
    { key: 'overview', label: 'Overview', icon: Eye, description: 'Complete design system overview' },
    { key: 'icons', label: 'Icons', icon: Star, description: 'AI, Glass, and 3D Business icons' },
    { key: 'effects', label: 'Effects', icon: Sparkles, description: 'Holographic gradients and visual effects' },
    { key: 'components', label: 'Components', icon: Layers, description: 'Advanced UI components' },
    { key: 'ai', label: 'AI Features', icon: Zap, description: 'AI-powered interactive elements' }
  ] as const;

  const renderOverviewDemo = () => (
    <div className="space-y-8">
      {/* Hero Section with Marketing Harmony */}
      <SOLOMarketingHarmony section="hero" className="rounded-2xl p-8">
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-6">
            <SOLOCompleteAIIcon name="ai-assistant-advanced" size="large" theme="light" />
            <SOLOGlassIcon name="achieve-crown" size="xl" variant="crystal" />
            <SOLOBusiness3DIcon name="achievement" size="lg" theme="glass" />
          </div>
          <h1 className="text-4xl font-bold mb-4">SOLO Design System</h1>
          <p className="text-xl text-white/90">
            Complete UI8 Premium Asset Integration for Legal Education Excellence
          </p>
        </div>
      </SOLOMarketingHarmony>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BentoCard
          size="medium"
          title="30 AI Icons"
          description="Premium IntelIcons collection"
          value="270+ Total"
          icon={Crown}
          aiIcon="ai-assistant-advanced"
          color="#8B5CF6"
          interactive={true}
        />
        
        <BentoCard
          size="medium"
          title="80+ Glass Icons"
          description="Modern glass-morphism design"
          value="5 Variants"
          icon={Diamond}
          color="#3B82F6"
          interactive={true}
        />
        
        <BentoCard
          size="medium"
          title="20 3D Business"
          description="Professional legal context"
          value="6 Categories"
          icon={Star}
          color="#10B981"
          interactive={true}
        />
        
        <BentoCard
          size="medium"
          title="30 Holographic"
          description="Chroma gradient collection"
          value="4 Intensities"
          icon={Sparkles}
          color="#F59E0B"
          interactive={true}
        />
      </div>

      {/* Typography Showcase */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Griggs-Flare, sans-serif' }}>
          Griggs Typography System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Griggs-Sans, sans-serif' }}>
              Professional Sans
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Griggs-Sans, sans-serif' }}>
              Clean, modern typeface perfect for UI elements, dashboards, and professional interfaces. 
              Optimized for legal education applications.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Griggs-Serif, serif' }}>
              Legal Serif
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Griggs-Serif, serif' }}>
              Traditional serif typeface for legal documents, formal content, and academic materials. 
              Ensures readability and professional appearance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIconsDemo = () => (
    <div className="space-y-8">
      {/* AI Icons Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <SOLOCompleteAIIcon name="ai-assistant-advanced" size="medium" theme="light" />
          AI Icons Collection
        </h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
          {['ai-assistant-advanced', 'ai-tutor-advanced', 'smart-quiz', 'ai-analytics', 'ai-recommendation-advanced', 'legal-ai-advanced'].map((icon) => (
            <div key={icon} className="flex flex-col items-center space-y-2">
              <SOLOCompleteAIIcon name={icon} size="large" theme="light" />
              <span className="text-xs text-gray-600 text-center">{icon.split('-')[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Glass Icons Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <SOLOGlassIcon name="ui-settings" size="lg" variant="crystal" />
          Glass Icons System
        </h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-6">
          {['legal-scale', 'education-brain', 'business-trending', 'comm-message', 'analytics-chart', 'security-shield', 'achieve-award', 'ui-user', 'media-video', 'ai-brain'].map((icon) => (
            <div key={icon} className="flex flex-col items-center space-y-2">
              <SOLOGlassIcon name={icon} size="lg" variant="glass" animate={true} glow={true} />
              <span className="text-xs text-gray-600 text-center">{icon.split('-')[1]}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-5 gap-4">
          <div className="text-center">
            <SOLOGlassIcon name="legal-scale" size="lg" variant="glass" />
            <p className="text-xs text-gray-600 mt-1">Glass</p>
          </div>
          <div className="text-center">
            <SOLOGlassIcon name="legal-scale" size="lg" variant="frosted" />
            <p className="text-xs text-gray-600 mt-1">Frosted</p>
          </div>
          <div className="text-center">
            <SOLOGlassIcon name="legal-scale" size="lg" variant="crystal" />
            <p className="text-xs text-gray-600 mt-1">Crystal</p>
          </div>
          <div className="text-center">
            <SOLOGlassIcon name="legal-scale" size="lg" variant="holographic" />
            <p className="text-xs text-gray-600 mt-1">Holographic</p>
          </div>
          <div className="text-center">
            <SOLOGlassIcon name="legal-scale" size="lg" variant="neon" />
            <p className="text-xs text-gray-600 mt-1">Neon</p>
          </div>
        </div>
      </div>

      {/* 3D Business Icons Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <SOLOBusiness3DIcon name="achievement" size="lg" theme="light" />
          Business 3D Icons
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-10 gap-6">
          {['achievement', 'analysis', 'chart', 'target', 'growth', 'deal', 'presentation', 'team', 'rocket', 'opportunity'].map((icon) => (
            <div key={icon} className="flex flex-col items-center space-y-2">
              <SOLOBusiness3DIcon name={icon as any} size="lg" theme="light" animation="float" />
              <span className="text-xs text-gray-600 text-center capitalize">{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEffectsDemo = () => (
    <div className="space-y-8">
      {/* Holographic Gradients */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Holographic Gradients</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(['gradient-1', 'gradient-3', 'gradient-4', 'gradient-6', 'gradient-12'] as const).map((gradientId) => (
            <div key={gradientId} className="space-y-2">
              <SOLOHolographicGradient
                gradientId={gradientId}
                intensity="moderate"
                animated={true}
                className="w-full h-24 rounded-lg flex items-center justify-center text-white font-semibold"
              >
                {gradientId.split('-')[1]}
              </SOLOHolographicGradient>
              <p className="text-xs text-gray-600 text-center">Gradient {gradientId.split('-')[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Effects */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Visual Effects</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <SOLOVisualEffect effect="glow" intensity="strong" className="w-24 h-24 mx-auto mb-2">
              <div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                Glow
              </div>
            </SOLOVisualEffect>
            <p className="text-sm text-gray-600">Glow Effect</p>
          </div>
          
          <div className="text-center">
            <SOLOVisualEffect effect="shimmer" intensity="moderate" className="w-24 h-24 mx-auto mb-2">
              <div className="w-full h-full bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                Shimmer
              </div>
            </SOLOVisualEffect>
            <p className="text-sm text-gray-600">Shimmer Effect</p>
          </div>
          
          <div className="text-center">
            <SOLOVisualEffect effect="halo" intensity="moderate" className="w-24 h-24 mx-auto mb-2">
              <div className="w-full h-full bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                Halo
              </div>
            </SOLOVisualEffect>
            <p className="text-sm text-gray-600">Halo Effect</p>
          </div>
        </div>
      </div>

      {/* Marketing Harmony Sections */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Marketing Website Harmony</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['hero', 'features', 'pricing', 'cta'] as const).map((section) => (
            <SOLOMarketingHarmony key={section} section={section} className="p-6 rounded-lg">
              <div className="text-center text-white">
                <h4 className="text-xl font-bold mb-2 capitalize">{section} Section</h4>
                <p className="text-white/80">Optimized gradient and effect combination</p>
              </div>
            </SOLOMarketingHarmony>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComponentsDemo = () => (
    <div className="space-y-8">
      {/* Advanced Task Manager Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Task Manager</h3>
        <div className="h-64 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Layers className="w-12 h-12 mx-auto mb-2" />
            <p>Interactive task management with drag-drop functionality</p>
            <p className="text-sm">Legal education context integration</p>
          </div>
        </div>
      </div>

      {/* Bento System Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Bento Card System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoCard
            size="small"
            title="Study Progress"
            value="85%"
            change={{ value: 12, type: 'increase' }}
            color="#10B981"
            interactive={true}
          />
          <BentoCard
            size="small"
            title="AI Recommendations"
            value="24"
            icon={Zap}
            color="#8B5CF6"
            interactive={true}
          />
          <BentoCard
            size="small"
            title="Legal Cases"
            value="156"
            change={{ value: 8, type: 'increase' }}
            color="#3B82F6"
            interactive={true}
          />
        </div>
      </div>

      {/* Dashboard Builder Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Builder</h3>
        <div className="h-48 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Settings className="w-12 h-12 mx-auto mb-2" />
            <p>Customizable dashboard with Core-2 patterns</p>
            <p className="text-sm">Performance metrics and analytics</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIDemo = () => (
    <div className="space-y-8">
      {/* AI Chat System Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Synapse AI Chat System</h3>
        <div className="h-64 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <SOLOCompleteAIIcon name="ai-assistant-advanced" size="large" theme="light" />
            <p className="mt-2">Interactive AI chat with multiple modes</p>
            <p className="text-sm">Legal tutor, case analyzer, research assistant</p>
          </div>
        </div>
      </div>

      {/* 3D Quiz System Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">3D Educational Quiz System</h3>
        <div className="h-64 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <SOLOBusiness3DIcon name="rocket" size="xl" theme="light" animation="bounce" />
            <p className="mt-2">Interactive 3D quiz with legal questions</p>
            <p className="text-sm">Canvas animations, timer, detailed explanations</p>
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Text Explainer', icon: 'ai-assistant-advanced', description: 'AWS-style highlighting system' },
          { title: 'Vocabulary Mastery', icon: 'ai-tutor-advanced', description: 'Vocabulary.com style learning' },
          { title: 'Reading Assessment', icon: 'smart-quiz', description: 'Comprehensive assessment engine' },
          { title: 'Study Planner', icon: 'ai-analytics', description: 'AI-powered scheduling' },
          { title: 'Weekly Insights', icon: 'ai-recommendation-advanced', description: 'Spotify Wrapped style analytics' },
          { title: 'Rank Predictor', icon: 'legal-ai-advanced', description: '3D NLU tower visualization' }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <SOLOCompleteAIIcon name={feature.icon} size="medium" theme="light" />
              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'overview': return renderOverviewDemo();
      case 'icons': return renderIconsDemo();
      case 'effects': return renderEffectsDemo();
      case 'components': return renderComponentsDemo();
      case 'ai': return renderAIDemo();
      default: return renderOverviewDemo();
    }
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <SOLOHolographicGradient
                gradientId="gradient-1"
                intensity="moderate"
                className="w-10 h-10 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-xl">S</span>
              </SOLOHolographicGradient>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SOLO Design Integration</h1>
                <p className="text-sm text-gray-500">Complete UI8 Premium Asset Showcase</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                ✅ Phase 3 Complete
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Demo Sections</h2>
              <div className="space-y-2">
                {demoSections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => setActiveDemo(section.key)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeDemo === section.key
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{section.label}</div>
                        <div className="text-xs opacity-75">{section.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderDemo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOLODesignIntegration;