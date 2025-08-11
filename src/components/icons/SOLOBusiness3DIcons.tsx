import React, { useState, useEffect, useRef } from 'react';
import { soloStyles } from '../shared/SOLODesignSystem';

// Business 3D Icon Types
type Business3DIconName = 
  | 'achievement'
  | 'analysis' 
  | 'bag'
  | 'chart'
  | 'clock'
  | 'deal'
  | 'document'
  | 'growth'
  | 'man'
  | 'office'
  | 'plan'
  | 'presentation'
  | 'profit'
  | 'profit-2'
  | 'report'
  | 'spirit'
  | 'target'
  | 'team'
  | 'opportunity'
  | 'rocket';

type Business3DIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type Business3DIconTheme = 'default' | 'light' | 'dark' | 'glass' | 'neon';
type Business3DIconAnimation = 'none' | 'float' | 'bounce' | 'pulse' | 'glow' | 'rotate';

interface SOLOBusiness3DIconProps {
  name: Business3DIconName;
  size?: Business3DIconSize;
  theme?: Business3DIconTheme;
  animation?: Business3DIconAnimation;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  alt?: string;
}

// Business 3D Icon Registry with Legal Context
const business3DIconRegistry: Record<Business3DIconName, {
  fileName: string;
  description: string;
  legalContext: string;
  category: 'achievement' | 'analysis' | 'management' | 'strategy' | 'communication' | 'growth';
  keywords: string[];
}> = {
  'achievement': {
    fileName: 'Business Achievement.png',
    description: 'Trophy and achievement podium representing success milestones',
    legalContext: 'CLAT rankings, law exam success, academic achievements, case victories',
    category: 'achievement',
    keywords: ['trophy', 'success', 'ranking', 'achievement', 'podium', 'victory', 'excellence']
  },
  'analysis': {
    fileName: 'Business Analysis.png',
    description: 'Advanced analytics dashboard with charts and data visualization',
    legalContext: 'Legal case analysis, performance tracking, CLAT score analytics, study progress',
    category: 'analysis',
    keywords: ['analytics', 'charts', 'data', 'analysis', 'insights', 'dashboard', 'metrics']
  },
  'bag': {
    fileName: 'Business Bag.png',
    description: 'Professional briefcase representing business and legal practice',
    legalContext: 'Legal practice, law firm operations, professional services, court appearances',
    category: 'management',
    keywords: ['briefcase', 'professional', 'business', 'legal practice', 'law firm', 'career']
  },
  'chart': {
    fileName: 'Business Chart.png',
    description: 'Growth charts and financial analysis visualization',
    legalContext: 'Performance improvement, study progress tracking, skill development metrics',
    category: 'analysis',
    keywords: ['chart', 'growth', 'progress', 'improvement', 'tracking', 'performance', 'trends']
  },
  'clock': {
    fileName: 'Business Clock.png',
    description: 'Time management and scheduling optimization',
    legalContext: 'Study schedules, exam timing, court deadlines, time management for CLAT',
    category: 'management',
    keywords: ['time', 'schedule', 'deadline', 'management', 'planning', 'efficiency', 'timing']
  },
  'deal': {
    fileName: 'Business Deal.png',
    description: 'Handshake and partnership agreements',
    legalContext: 'Legal negotiations, client agreements, partnerships, contract finalization',
    category: 'communication',
    keywords: ['handshake', 'deal', 'agreement', 'partnership', 'negotiation', 'contract', 'trust']
  },
  'document': {
    fileName: 'Business Document.png',
    description: 'Legal documents, contracts, and official papers',
    legalContext: 'Legal documentation, case files, contracts, study materials, law books',
    category: 'management',
    keywords: ['document', 'contract', 'legal papers', 'files', 'documentation', 'records', 'law']
  },
  'growth': {
    fileName: 'Business Growth.png',
    description: 'Upward growth trajectory and success progression',
    legalContext: 'Academic improvement, career advancement, skill development, CLAT preparation',
    category: 'growth',
    keywords: ['growth', 'progress', 'improvement', 'advancement', 'development', 'success', 'trajectory']
  },
  'man': {
    fileName: 'Business Man.png',
    description: 'Professional business person representing leadership',
    legalContext: 'Legal professionals, lawyers, judges, law students, career aspirations',
    category: 'management',
    keywords: ['professional', 'lawyer', 'leadership', 'career', 'person', 'legal professional', 'expertise']
  },
  'office': {
    fileName: 'Business Office.png',
    description: 'Modern office environment and workspace',
    legalContext: 'Law firms, legal offices, study environments, professional workspaces',
    category: 'management',
    keywords: ['office', 'workspace', 'law firm', 'environment', 'professional space', 'workplace', 'business']
  },
  'plan': {
    fileName: 'Business Plan.png',
    description: 'Strategic planning and roadmap visualization',
    legalContext: 'Study planning, CLAT preparation strategy, career roadmap, legal case strategy',
    category: 'strategy',
    keywords: ['plan', 'strategy', 'roadmap', 'planning', 'preparation', 'blueprint', 'framework']
  },
  'presentation': {
    fileName: 'Business Presentation.png',
    description: 'Professional presentations and knowledge sharing',
    legalContext: 'Legal presentations, court arguments, case presentations, educational content',
    category: 'communication',
    keywords: ['presentation', 'teaching', 'explanation', 'communication', 'knowledge sharing', 'education', 'training']
  },
  'profit': {
    fileName: 'Business Profit.png',
    description: 'Financial success and profit optimization',
    legalContext: 'Return on education investment, career benefits, scholarship opportunities',
    category: 'achievement',
    keywords: ['profit', 'financial success', 'roi', 'benefits', 'investment', 'returns', 'value']
  },
  'profit-2': {
    fileName: 'Business Profit 2.png',
    description: 'Alternative profit visualization and financial metrics',
    legalContext: 'Educational investment returns, career value, scholarship benefits',
    category: 'achievement',
    keywords: ['profit', 'financial metrics', 'value creation', 'investment returns', 'benefits', 'gains']
  },
  'report': {
    fileName: 'Business Report.png',
    description: 'Comprehensive reporting and documentation',
    legalContext: 'Progress reports, performance analysis, case studies, academic reports',
    category: 'analysis',
    keywords: ['report', 'analysis', 'documentation', 'assessment', 'evaluation', 'summary', 'insights']
  },
  'spirit': {
    fileName: 'Business Spirit.png',
    description: 'Team spirit and collaborative excellence',
    legalContext: 'Study groups, legal team collaboration, peer learning, community support',
    category: 'communication',
    keywords: ['spirit', 'collaboration', 'teamwork', 'community', 'support', 'motivation', 'unity']
  },
  'target': {
    fileName: 'Business Target.png',
    description: 'Goal setting and target achievement',
    legalContext: 'CLAT score targets, career goals, academic objectives, performance targets',
    category: 'strategy',
    keywords: ['target', 'goal', 'objective', 'aim', 'achievement', 'focus', 'purpose']
  },
  'team': {
    fileName: 'Business Team.png',
    description: 'Team collaboration and collective success',
    legalContext: 'Study groups, legal teams, collaborative learning, peer support networks',
    category: 'communication',
    keywords: ['team', 'collaboration', 'group', 'collective', 'cooperation', 'unity', 'support']
  },
  'opportunity': {
    fileName: 'Opportunity.png',
    description: 'New opportunities and potential pathways',
    legalContext: 'Career opportunities, educational pathways, scholarship opportunities, legal careers',
    category: 'growth',
    keywords: ['opportunity', 'potential', 'pathway', 'chance', 'possibility', 'future', 'prospects']
  },
  'rocket': {
    fileName: 'Rocket.png',
    description: 'Rapid growth and acceleration to success',
    legalContext: 'Fast-track learning, accelerated preparation, rapid improvement, career launch',
    category: 'growth',
    keywords: ['rocket', 'acceleration', 'fast growth', 'launch', 'boost', 'rapid progress', 'speed']
  }
};

const SOLOBusiness3DIcon: React.FC<SOLOBusiness3DIconProps> = ({
  name,
  size = 'md',
  theme = 'default',
  animation = 'none',
  className = '',
  style,
  onClick,
  alt
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const iconData = business3DIconRegistry[name];
  
  // Size mappings
  const sizeClasses = {
    'xs': 'w-6 h-6',
    'sm': 'w-8 h-8',
    'md': 'w-12 h-12',
    'lg': 'w-16 h-16',
    'xl': 'w-20 h-20',
    '2xl': 'w-24 h-24',
    '3xl': 'w-32 h-32'
  };

  // Animation classes
  const animationClasses = {
    'none': '',
    'float': 'animate-bounce',
    'bounce': 'animate-bounce',
    'pulse': 'animate-pulse',
    'glow': 'drop-shadow-lg',
    'rotate': 'animate-spin'
  };

  // Theme styles
  const themeStyles = {
    'default': {},
    'light': { filter: 'brightness(1.2) saturate(0.8)' },
    'dark': { filter: 'brightness(0.8) contrast(1.1)' },
    'glass': { 
      filter: 'brightness(1.1)', 
      backdropFilter: 'blur(10px)',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '8px'
    },
    'neon': { 
      filter: 'brightness(1.3) saturate(1.4)',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
    }
  };

  // Build image path (using public folder path for Next.js)
  const imagePath = `/images/business-3d-icons/${iconData.fileName}`;

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const combinedStyle = {
    ...themeStyles[theme],
    ...style,
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...(onClick && {
      transform: 'scale(1)',
      ':hover': {
        transform: 'scale(1.05)'
      }
    })
  };

  return (
    <div className={`inline-block ${className}`}>
      <div className={`${sizeClasses[size]} relative group`}>
        {!hasError ? (
          <img
            ref={imgRef}
            src={imagePath}
            alt={alt || iconData.description}
            className={`w-full h-full object-contain ${animationClasses[animation]} ${
              onClick ? 'hover:scale-105 transition-transform duration-200' : ''
            } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={combinedStyle}
            onLoad={handleLoad}
            onError={handleError}
            onClick={onClick}
          />
        ) : (
          // Fallback for missing images
          <div 
            className={`w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold ${
              onClick ? 'hover:scale-105 cursor-pointer' : ''
            }`}
            style={combinedStyle}
            onClick={onClick}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
        )}
      </div>
    </div>
  );
};

// Business 3D Icon Grid Component
const SOLOBusiness3DIconGrid: React.FC<{
  category?: 'achievement' | 'analysis' | 'management' | 'strategy' | 'communication' | 'growth' | 'all';
  size?: Business3DIconSize;
  theme?: Business3DIconTheme;
  animation?: Business3DIconAnimation;
  onIconClick?: (iconName: Business3DIconName, iconData: any) => void;
  className?: string;
}> = ({
  category = 'all',
  size = 'lg',
  theme = 'default',
  animation = 'float',
  onIconClick,
  className = ''
}) => {
  const filteredIcons = Object.entries(business3DIconRegistry).filter(
    ([_, data]) => category === 'all' || data.category === category
  );

  const categoryTitles = {
    'all': 'All Business Icons',
    'achievement': 'Achievement & Success',
    'analysis': 'Analytics & Insights',
    'management': 'Business Management',
    'strategy': 'Strategy & Planning',
    'communication': 'Communication & Collaboration',
    'growth': 'Growth & Development'
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          {categoryTitles[category]}
        </h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          {filteredIcons.length} icons
        </span>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {filteredIcons.map(([iconName, iconData]) => (
          <div key={iconName} className="flex flex-col items-center space-y-3">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105">
              <SOLOBusiness3DIcon
                name={iconName as Business3DIconName}
                size={size}
                theme={theme}
                animation={animation}
                onClick={() => onIconClick?.(iconName as Business3DIconName, iconData)}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {iconName.replace(/-/g, ' ')}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {iconData.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Business 3D Icon Showcase Component for Legal Context
const SOLOBusiness3DShowcase: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<'achievement' | 'analysis' | 'management' | 'strategy' | 'communication' | 'growth'>('achievement');
  const [selectedIcon, setSelectedIcon] = useState<Business3DIconName>('achievement');

  const categories = [
    { key: 'achievement', label: 'Achievement', description: 'Success & Excellence', color: 'bg-yellow-100 text-yellow-700' },
    { key: 'analysis', label: 'Analysis', description: 'Data & Insights', color: 'bg-blue-100 text-blue-700' },
    { key: 'management', label: 'Management', description: 'Business Operations', color: 'bg-green-100 text-green-700' },
    { key: 'strategy', label: 'Strategy', description: 'Planning & Goals', color: 'bg-purple-100 text-purple-700' },
    { key: 'communication', label: 'Communication', description: 'Collaboration & Teamwork', color: 'bg-pink-100 text-pink-700' },
    { key: 'growth', label: 'Growth', description: 'Development & Progress', color: 'bg-indigo-100 text-indigo-700' }
  ] as const;

  const selectedIconData = business3DIconRegistry[selectedIcon];

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Business 3D Icons</h2>
        <p className="text-blue-100">Professional 3D icons for legal education and business context</p>
      </div>

      <div className="flex">
        {/* Category Sidebar */}
        <div className="w-80 bg-gray-50 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  activeCategory === cat.key
                    ? `${cat.color} shadow-md transform scale-105`
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{cat.label}</div>
                <div className={`text-sm ${activeCategory === cat.key ? 'opacity-90' : 'text-gray-500'}`}>
                  {cat.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid */}
        <div className="flex-1 p-6">
          <SOLOBusiness3DIconGrid
            category={activeCategory}
            size="lg"
            theme="default"
            animation="float"
            onIconClick={(iconName, iconData) => {
              setSelectedIcon(iconName);
            }}
          />
        </div>

        {/* Icon Details */}
        <div className="w-80 bg-gray-50 p-6 border-l border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Icon Details</h3>
          
          <div className="bg-white rounded-xl p-4 mb-6">
            <div className="flex justify-center mb-4">
              <SOLOBusiness3DIcon
                name={selectedIcon}
                size="3xl"
                theme="default"
                animation="float"
              />
            </div>
            
            <h4 className="font-bold text-lg text-gray-900 mb-2 capitalize">
              {selectedIcon.replace(/-/g, ' ')}
            </h4>
            
            <p className="text-sm text-gray-600 mb-4">
              {selectedIconData.description}
            </p>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Legal Context</span>
                <p className="text-sm text-gray-700 mt-1">
                  {selectedIconData.legalContext}
                </p>
              </div>
              
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Keywords</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedIconData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</span>
                <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                  {selectedIconData.category}
                </p>
              </div>
            </div>
          </div>
          
          {/* Usage Examples */}
          <div className="bg-white rounded-xl p-4">
            <h5 className="font-semibold text-gray-900 mb-3">Usage Examples</h5>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <SOLOBusiness3DIcon name={selectedIcon} size="sm" theme="default" />
                <span className="text-sm text-gray-700">Default theme</span>
              </div>
              <div className="flex items-center gap-2">
                <SOLOBusiness3DIcon name={selectedIcon} size="sm" theme="glass" />
                <span className="text-sm text-gray-700">Glass theme</span>
              </div>
              <div className="flex items-center gap-2">
                <SOLOBusiness3DIcon name={selectedIcon} size="sm" theme="neon" />
                <span className="text-sm text-gray-700">Neon theme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export types and components
export type { Business3DIconName, Business3DIconSize, Business3DIconTheme, Business3DIconAnimation, SOLOBusiness3DIconProps };
export { business3DIconRegistry };
export default SOLOBusiness3DIcon;
export { SOLOBusiness3DIconGrid, SOLOBusiness3DShowcase };