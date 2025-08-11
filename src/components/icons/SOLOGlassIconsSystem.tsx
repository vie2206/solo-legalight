import React from 'react';
import { 
  User, 
  Users, 
  BookOpen, 
  BrainCircuit, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle, 
  Star, 
  MessageSquare, 
  Lightbulb, 
  Scale, 
  Gavel, 
  FileText, 
  PieChart, 
  BarChart3, 
  Calendar, 
  Settings, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  Home, 
  Building, 
  Briefcase,
  Globe,
  Shield,
  Lock,
  Key,
  Eye,
  Heart,
  Zap,
  Rocket,
  Diamond,
  Crown,
  Gift,
  Bell,
  Flag,
  Camera,
  Video,
  Music,
  Image as ImageIcon
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';

// Glass Icon Types and Categories
type GlassIconCategory = 
  | 'legal' 
  | 'education' 
  | 'business' 
  | 'communication' 
  | 'analytics' 
  | 'ai-features' 
  | 'user-interface' 
  | 'security' 
  | 'media' 
  | 'achievements';

type GlassIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type GlassIconVariant = 'glass' | 'frosted' | 'crystal' | 'holographic' | 'neon';

interface SOLOGlassIconProps {
  name: string;
  size?: GlassIconSize;
  variant?: GlassIconVariant;
  category?: GlassIconCategory;
  color?: string;
  className?: string;
  animate?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

// Glass Icon Registry - Comprehensive Collection
const glassIconRegistry = {
  // Legal Icons (Professional Legal Context)
  legal: {
    'legal-scale': { icon: Scale, color: '#3B82F6', description: 'Justice & Balance' },
    'legal-gavel': { icon: Gavel, color: '#8B5CF6', description: 'Court & Judgment' },
    'legal-document': { icon: FileText, color: '#10B981', description: 'Legal Documents' },
    'legal-shield': { icon: Shield, color: '#F59E0B', description: 'Legal Protection' },
    'legal-building': { icon: Building, color: '#6366F1', description: 'Court Building' },
    'legal-briefcase': { icon: Briefcase, color: '#EC4899', description: 'Legal Practice' },
    'legal-book': { icon: BookOpen, color: '#14B8A6', description: 'Law Books' },
    'legal-crown': { icon: Crown, color: '#F59E0B', description: 'Constitutional Law' },
  },

  // Education Icons (CLAT & Learning)
  education: {
    'education-brain': { icon: BrainCircuit, color: '#8B5CF6', description: 'Smart Learning' },
    'education-book': { icon: BookOpen, color: '#3B82F6', description: 'Study Materials' },
    'education-target': { icon: Target, color: '#10B981', description: 'Learning Goals' },
    'education-award': { icon: Award, color: '#F59E0B', description: 'Achievements' },
    'education-lightbulb': { icon: Lightbulb, color: '#EF4444', description: 'Ideas & Insights' },
    'education-star': { icon: Star, color: '#F97316', description: 'Excellence' },
    'education-rocket': { icon: Rocket, color: '#6366F1', description: 'Progress Boost' },
    'education-diamond': { icon: Diamond, color: '#EC4899', description: 'Premium Learning' },
  },

  // Business Icons (Professional Context)
  business: {
    'business-trending': { icon: TrendingUp, color: '#10B981', description: 'Growth Analytics' },
    'business-chart': { icon: PieChart, color: '#3B82F6', description: 'Performance Charts' },
    'business-bar-chart': { icon: BarChart3, color: '#8B5CF6', description: 'Data Analysis' },
    'business-users': { icon: Users, color: '#6366F1', description: 'Team Management' },
    'business-clock': { icon: Clock, color: '#F59E0B', description: 'Time Management' },
    'business-briefcase': { icon: Briefcase, color: '#EC4899', description: 'Business Operations' },
    'business-globe': { icon: Globe, color: '#14B8A6', description: 'Global Reach' },
    'business-flag': { icon: Flag, color: '#EF4444', description: 'Business Goals' },
  },

  // Communication Icons
  communication: {
    'comm-message': { icon: MessageSquare, color: '#3B82F6', description: 'Chat & Messaging' },
    'comm-mail': { icon: Mail, color: '#10B981', description: 'Email Communication' },
    'comm-phone': { icon: Phone, color: '#F59E0B', description: 'Voice Communication' },
    'comm-share': { icon: Share2, color: '#8B5CF6', description: 'Content Sharing' },
    'comm-bell': { icon: Bell, color: '#EF4444', description: 'Notifications' },
    'comm-video': { icon: Video, color: '#6366F1', description: 'Video Communication' },
    'comm-camera': { icon: Camera, color: '#EC4899', description: 'Visual Content' },
    'comm-music': { icon: Music, color: '#14B8A6', description: 'Audio Content' },
  },

  // Analytics Icons (Performance & Data)
  analytics: {
    'analytics-chart': { icon: PieChart, color: '#3B82F6', description: 'Data Visualization' },
    'analytics-bar': { icon: BarChart3, color: '#8B5CF6', description: 'Performance Metrics' },
    'analytics-trending': { icon: TrendingUp, color: '#10B981', description: 'Growth Trends' },
    'analytics-target': { icon: Target, color: '#F59E0B', description: 'Goal Tracking' },
    'analytics-eye': { icon: Eye, color: '#6366F1', description: 'Insights View' },
    'analytics-search': { icon: Search, color: '#EC4899', description: 'Data Search' },
    'analytics-filter': { icon: Filter, color: '#14B8A6', description: 'Data Filtering' },
    'analytics-zap': { icon: Zap, color: '#EF4444', description: 'Quick Analytics' },
  },

  // AI Features Icons
  'ai-features': {
    'ai-brain': { icon: BrainCircuit, color: '#8B5CF6', description: 'AI Intelligence' },
    'ai-zap': { icon: Zap, color: '#F59E0B', description: 'AI Processing' },
    'ai-lightbulb': { icon: Lightbulb, color: '#3B82F6', description: 'AI Insights' },
    'ai-rocket': { icon: Rocket, color: '#10B981', description: 'AI Acceleration' },
    'ai-diamond': { icon: Diamond, color: '#EC4899', description: 'Premium AI' },
    'ai-star': { icon: Star, color: '#F97316', description: 'AI Excellence' },
    'ai-crown': { icon: Crown, color: '#6366F1', description: 'Advanced AI' },
    'ai-gift': { icon: Gift, color: '#14B8A6', description: 'AI Benefits' },
  },

  // User Interface Icons
  'user-interface': {
    'ui-user': { icon: User, color: '#3B82F6', description: 'User Profile' },
    'ui-users': { icon: Users, color: '#8B5CF6', description: 'Multiple Users' },
    'ui-settings': { icon: Settings, color: '#6366F1', description: 'Configuration' },
    'ui-home': { icon: Home, color: '#10B981', description: 'Dashboard Home' },
    'ui-calendar': { icon: Calendar, color: '#F59E0B', description: 'Schedule & Events' },
    'ui-download': { icon: Download, color: '#EC4899', description: 'Download Content' },
    'ui-upload': { icon: Upload, color: '#14B8A6', description: 'Upload Content' },
    'ui-image': { icon: ImageIcon, color: '#EF4444', description: 'Image Content' },
  },

  // Security Icons
  security: {
    'security-shield': { icon: Shield, color: '#10B981', description: 'Security Protection' },
    'security-lock': { icon: Lock, color: '#EF4444', description: 'Secure Access' },
    'security-key': { icon: Key, color: '#F59E0B', description: 'Authentication' },
    'security-eye': { icon: Eye, color: '#3B82F6', description: 'Privacy & Monitoring' },
    'security-check': { icon: CheckCircle, color: '#8B5CF6', description: 'Verified Security' },
    'security-crown': { icon: Crown, color: '#6366F1', description: 'Premium Security' },
    'security-diamond': { icon: Diamond, color: '#EC4899', description: 'Ultimate Protection' },
    'security-zap': { icon: Zap, color: '#14B8A6', description: 'Fast Security' },
  },

  // Media Icons
  media: {
    'media-video': { icon: Video, color: '#EF4444', description: 'Video Content' },
    'media-camera': { icon: Camera, color: '#3B82F6', description: 'Photo Capture' },
    'media-music': { icon: Music, color: '#8B5CF6', description: 'Audio Content' },
    'media-image': { icon: ImageIcon, color: '#10B981', description: 'Image Gallery' },
    'media-share': { icon: Share2, color: '#F59E0B', description: 'Media Sharing' },
    'media-download': { icon: Download, color: '#6366F1', description: 'Media Download' },
    'media-upload': { icon: Upload, color: '#EC4899', description: 'Media Upload' },
    'media-star': { icon: Star, color: '#14B8A6', description: 'Featured Media' },
  },

  // Achievement Icons
  achievements: {
    'achieve-award': { icon: Award, color: '#F59E0B', description: 'Achievement Badge' },
    'achieve-star': { icon: Star, color: '#F97316', description: 'Star Achievement' },
    'achieve-crown': { icon: Crown, color: '#8B5CF6', description: 'Crown Achievement' },
    'achieve-diamond': { icon: Diamond, color: '#EC4899', description: 'Diamond Achievement' },
    'achieve-rocket': { icon: Rocket, color: '#10B981', description: 'Progress Achievement' },
    'achieve-target': { icon: Target, color: '#3B82F6', description: 'Goal Achievement' },
    'achieve-trophy': { icon: Award, color: '#6366F1', description: 'Trophy Achievement' },
    'achieve-heart': { icon: Heart, color: '#EF4444', description: 'Appreciation' },
  },
} as const;

// Glass Icon Component
const SOLOGlassIcon: React.FC<SOLOGlassIconProps> = ({
  name,
  size = 'md',
  variant = 'glass',
  category = 'user-interface',
  color,
  className = '',
  animate = false,
  glow = false,
  onClick
}) => {
  // Find the icon in the registry
  const findIcon = () => {
    for (const categoryData of Object.values(glassIconRegistry)) {
      if ((categoryData as any)[name]) {
        return (categoryData as any)[name];
      }
    }
    // Default fallback
    return { icon: User, color: '#3B82F6', description: 'Default Icon' };
  };

  const iconData = findIcon();
  const IconComponent = iconData.icon;
  const iconColor = color || iconData.color;

  // Size mappings
  const sizeMap = {
    'xs': 'w-4 h-4',
    'sm': 'w-5 h-5',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-10 h-10',
    '2xl': 'w-12 h-12'
  };

  const containerSizeMap = {
    'xs': 'w-8 h-8',
    'sm': 'w-10 h-10',
    'md': 'w-12 h-12',
    'lg': 'w-16 h-16',
    'xl': 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  // Glass morphism styles based on variant
  const getGlassStyles = () => {
    const baseGlass = 'backdrop-blur-lg border border-white/20 shadow-xl';
    
    switch (variant) {
      case 'frosted':
        return `${baseGlass} bg-white/10 hover:bg-white/20`;
      case 'crystal':
        return `${baseGlass} bg-white/5 hover:bg-white/15 shadow-2xl`;
      case 'holographic':
        return `${baseGlass} bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-white/20 hover:via-white/10 hover:to-white/5`;
      case 'neon':
        return `${baseGlass} bg-white/5 hover:bg-white/15 ring-1 ring-white/30 hover:ring-white/50`;
      default: // glass
        return `${baseGlass} bg-white/8 hover:bg-white/15`;
    }
  };

  // Animation classes
  const animationClass = animate ? 'transition-all duration-300 hover:scale-110 hover:-translate-y-1' : 'transition-all duration-200';
  
  // Glow effect
  const glowClass = glow ? 'shadow-lg hover:shadow-xl' : '';
  
  // Cursor style
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        ${containerSizeMap[size]}
        ${getGlassStyles()}
        ${animationClass}
        ${glowClass}
        ${cursorClass}
        rounded-2xl flex items-center justify-center
        group relative overflow-hidden
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        filter: glow ? `drop-shadow(0 0 12px ${iconColor}30)` : undefined,
      }}
    >
      {/* Holographic background effect */}
      {variant === 'holographic' && (
        <div 
          className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${iconColor}20, transparent, ${iconColor}10)`
          }}
        />
      )}
      
      {/* Neon glow ring for neon variant */}
      {variant === 'neon' && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 20px ${iconColor}40, 0 0 20px ${iconColor}20`
          }}
        />
      )}
      
      {/* Icon */}
      <IconComponent 
        className={`
          ${sizeMap[size]} 
          transition-all duration-300 
          group-hover:scale-110
          relative z-10
        `}
        style={{ color: iconColor }}
      />
      
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${iconColor}10 50%, transparent 70%)`,
            transform: 'translateX(-100%)',
            animation: onClick ? 'shimmer 2s infinite' : undefined
          }}
        />
      </div>
      
      {/* Ripple effect styles are handled via CSS classes */}
    </div>
  );
};

// Glass Icon Grid Component for showcasing all icons
const SOLOGlassIconGrid: React.FC<{
  category?: GlassIconCategory;
  variant?: GlassIconVariant;
  size?: GlassIconSize;
  onIconClick?: (iconName: string, iconData: any) => void;
  className?: string;
}> = ({
  category,
  variant = 'glass',
  size = 'md',
  onIconClick,
  className = ''
}) => {
  const categoriesToShow = category ? [category] : Object.keys(glassIconRegistry) as GlassIconCategory[];
  
  return (
    <div className={`space-y-8 ${className}`}>
      {categoriesToShow.map((cat) => (
        <div key={cat} className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-gray-900 capitalize">
              {cat.replace('-', ' ')} Icons
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              {Object.keys(glassIconRegistry[cat]).length} icons
            </span>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {Object.entries(glassIconRegistry[cat]).map(([iconName, iconData]) => (
              <div key={iconName} className="flex flex-col items-center space-y-2">
                <SOLOGlassIcon
                  name={iconName}
                  size={size}
                  variant={variant}
                  animate={true}
                  glow={true}
                  onClick={() => onIconClick?.(iconName, iconData)}
                />
                <span className="text-xs text-gray-500 text-center leading-tight">
                  {iconName.split('-')[1] || iconName}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Glass Icon Selector Component
const SOLOGlassIconSelector: React.FC<{
  selectedIcon?: string;
  onSelect: (iconName: string) => void;
  variant?: GlassIconVariant;
  size?: GlassIconSize;
  maxHeight?: string;
}> = ({
  selectedIcon,
  onSelect,
  variant = 'glass',
  size = 'sm',
  maxHeight = '400px'
}) => {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 overflow-y-auto"
      style={{ maxHeight }}
    >
      <SOLOGlassIconGrid
        variant={variant}
        size={size}
        onIconClick={(iconName) => onSelect(iconName)}
        className="space-y-6"
      />
    </div>
  );
};

// Glass Icon Badge Component (for counters, status indicators)
const SOLOGlassIconBadge: React.FC<{
  icon: string;
  count?: number | string;
  variant?: GlassIconVariant;
  size?: GlassIconSize;
  badgeColor?: string;
  className?: string;
}> = ({
  icon,
  count,
  variant = 'glass',
  size = 'md',
  badgeColor = '#EF4444',
  className = ''
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <SOLOGlassIcon 
        name={icon} 
        variant={variant} 
        size={size}
        animate={true}
      />
      {count !== undefined && (
        <div 
          className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs font-bold text-white text-center px-1"
          style={{ backgroundColor: badgeColor }}
        >
          {typeof count === 'number' && count > 99 ? '99+' : count}
        </div>
      )}
    </div>
  );
};

// Export all glass icon names for TypeScript support
export const glassIconNames = Object.values(glassIconRegistry)
  .flatMap(category => Object.keys(category))
  .sort();

export type GlassIconName = typeof glassIconNames[number];

// Export components
export default SOLOGlassIcon;
export { 
  SOLOGlassIconGrid, 
  SOLOGlassIconSelector, 
  SOLOGlassIconBadge,
  glassIconRegistry 
};
export type { 
  SOLOGlassIconProps, 
  GlassIconCategory, 
  GlassIconSize, 
  GlassIconVariant 
};