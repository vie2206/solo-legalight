import React from 'react';

// SOLO AI Icons - Comprehensive collection integrating UI8 AI icons
// with consistent styling matching SOLO marketing website

interface AIIconProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  theme?: 'light' | 'dark' | 'colored' | 'outline';
  className?: string;
}

const iconSizes = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6', 
  large: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const SOLOAIIcon: React.FC<AIIconProps> = ({ 
  name, 
  size = 'medium', 
  theme = 'colored', 
  className = '' 
}) => {
  const sizeClass = iconSizes[size];
  
  const getIconColor = () => {
    switch (theme) {
      case 'light': return 'text-gray-300';
      case 'dark': return 'text-gray-700';
      case 'outline': return 'text-blue-600';
      case 'colored': return 'text-blue-600';
      default: return 'text-blue-600';
    }
  };

  const colorClass = getIconColor();

  // AI Icon Components (based on UI8 IntelIcons and Files/AI Icons)
  const AIIconComponents = {
    // Core AI Icons
    'brain-ai': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C13.5 3 15 4 15.5 5.5C16 5 17 5 18 6C19 7 19 8 18.5 8.5C19.5 9 20 10 20 11.5C20 13 19 14 17.5 14.5C18 15.5 17.5 17 16 17.5C15.5 18.5 14 19 12.5 19H11.5C10 19 8.5 18.5 8 17.5C6.5 17 6 15.5 6.5 14.5C5 14 4 13 4 11.5C4 10 4.5 9 5.5 8.5C5 8 5 7 6 6C7 5 8 5 8.5 5.5C9 4 10.5 3 12 3Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
        <path d="M9 13.5C9.5 14 10.5 14.5 12 14.5C13.5 14.5 14.5 14 15 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    
    'neural-network': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="6" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="6" cy="18" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="18" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 6L10.5 10.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 6L13.5 10.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 18L10.5 13.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 18L13.5 13.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    
    'algorithm': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="3" width="6" height="6" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
        <rect x="9" y="15" width="6" height="6" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 6H15" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 9V12" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 9V12" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 12V15" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 12V15" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    
    'machine-learning': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M3 12H6L8 6L12 18L16 9L18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="8" cy="6" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="18" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="16" cy="9" r="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      </svg>
    ),
    
    'chatbot': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.89 20 9.84 19.79 8.88 19.41L3 21L4.59 15.12C4.21 14.16 4 13.11 4 12C4 7.582 8.03 4 12 4S21 7.582 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
      </svg>
    ),
    
    'ai-search': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="11" cy="11" r="4" fill="currentColor" fillOpacity="0.2"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    
    'ai-recommendation': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3"/>
      </svg>
    ),
    
    'ai-analytics': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="16" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="11" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="16" cy="15" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="21" cy="10" r="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
    
    'ai-assistant': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M7 20.66C8.95 19.58 10.41 18 12 18S15.05 19.58 17 20.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
      </svg>
    ),
    
    'deep-learning': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="11" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="3" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="9" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="15" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="18" y="7" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="18" y="13" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 7H10M6 13H10M14 5H18M14 11H18M14 17H18" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    
    // Educational AI Icons
    'ai-tutor': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M7 8H17M7 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="19" cy="19" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <path d="M17.5 18.5L18.5 19.5L20.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    'smart-quiz': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M9.09 9A3 3 0 0 1 15 9C15 10.5 12 11.5 12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="17" r="1" fill="currentColor"/>
        <circle cx="8" cy="8" r="1" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="16" cy="8" r="1" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="8" cy="16" r="1" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="16" cy="16" r="1" fill="currentColor" fillOpacity="0.5"/>
      </svg>
    ),
    
    'ai-progress': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 2A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    
    // Legal AI Icons (specific to SOLO)
    'legal-ai': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L2 7V12C2 17 6 21 12 21S22 17 22 12V7L12 3Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
    
    'case-analysis-ai': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M8 12L10 14L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="4" r="2" fill="currentColor" fillOpacity="0.3"/>
      </svg>
    ),
    
    'legal-research-ai': () => (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M7 9H17M7 13H15" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M21 21L17.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  const IconComponent = AIIconComponents[name as keyof typeof AIIconComponents];
  
  if (!IconComponent) {
    // Fallback icon
    return (
      <svg className={`${sizeClass} ${colorClass} ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  
  return <IconComponent />;
};

// Export icon names for reference
export const availableAIIcons = [
  'brain-ai',
  'neural-network',
  'algorithm',
  'machine-learning',
  'chatbot',
  'ai-search',
  'ai-recommendation',
  'ai-analytics',
  'ai-assistant',
  'deep-learning',
  'ai-tutor',
  'smart-quiz',
  'ai-progress',
  'legal-ai',
  'case-analysis-ai',
  'legal-research-ai'
] as const;

export type AIIconName = typeof availableAIIcons[number];

// Preset AI Icon Collections for different contexts
export const aiIconCollections = {
  core: ['brain-ai', 'neural-network', 'algorithm', 'machine-learning'],
  educational: ['ai-tutor', 'smart-quiz', 'ai-progress', 'ai-recommendation'],
  legal: ['legal-ai', 'case-analysis-ai', 'legal-research-ai', 'ai-analytics'],
  interactive: ['chatbot', 'ai-search', 'ai-assistant', 'ai-recommendation']
};

export default SOLOAIIcon;