import React from 'react';

// SOLO Complete AI Icons - Premium IntelIcons AI Icon Kit Integration
// 30 sophisticated AI icons with consistent styling and theming

interface AIIconProps {
  name: string;
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  theme?: 'light' | 'dark' | 'colored' | 'outline' | 'gradient';
  className?: string;
  color?: string;
}

const iconSizes = {
  xs: 'w-3 h-3',
  small: 'w-4 h-4',
  medium: 'w-6 h-6', 
  large: 'w-8 h-8',
  xl: 'w-12 h-12',
  xxl: 'w-16 h-16'
};

const SOLOCompleteAIIcon: React.FC<AIIconProps> = ({ 
  name, 
  size = 'medium', 
  theme = 'colored', 
  className = '',
  color 
}) => {
  const sizeClass = iconSizes[size];
  
  const getIconColor = () => {
    if (color) return { color };
    
    switch (theme) {
      case 'light': return { color: '#ffffff' };
      case 'dark': return { color: '#1f2937' };
      case 'outline': return { color: '#3b82f6', fill: 'none', stroke: 'currentColor' };
      case 'gradient': return { 
        fill: 'url(#aiGradient)',
        color: '#6366f1'
      };
      case 'colored': 
      default: return { color: '#3b82f1' };
    }
  };

  const iconStyle = getIconColor();

  // Premium AI Icon Components (IntelIcons AI Kit)
  const AIIconComponents = {
    // Core AI Intelligence Icons
    'ai-sparkles': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>
        </defs>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.7999 8.2975L19.189 7.8375C17.7082 7.4175 16.5775 6.2775 16.1473 4.7975L15.687 3.1875C15.617 2.9375 15.1968 2.9375 15.1167 3.1875L14.6565 4.7975C14.2362 6.2775 13.0956 7.4175 11.6148 7.8375L10.0039 8.2975C9.87381 8.3375 9.79377 8.4475 9.79377 8.5775C9.79377 8.7075 9.88382 8.8275 10.0039 8.8575L11.6148 9.3175C13.0956 9.7375 14.2262 10.8775 14.6565 12.3575L15.1167 13.9675C15.1568 14.0975 15.2668 14.1775 15.3969 14.1775C15.527 14.1775 15.647 14.0875 15.677 13.9675L16.1373 12.3575C16.5575 10.8775 17.6982 9.7375 19.179 9.3175L20.7899 8.8575C20.92 8.8175 21 8.7075 21 8.5775C21 8.4475 20.91 8.3275 20.7899 8.2975H20.7999ZM12.9555 16.5475L11.7349 16.1975C10.6142 15.8775 9.75375 15.0175 9.43357 13.8975L9.08338 12.6775C9.03335 12.4875 8.71317 12.4875 8.65314 12.6775L8.30294 13.8975C7.98277 15.0175 7.12229 15.8775 6.00166 16.1975L4.78099 16.5475C4.68093 16.5775 4.6209 16.6675 4.6209 16.7575C4.6209 16.8475 4.69094 16.9475 4.78099 16.9675L6.00166 17.3175C7.12229 17.6375 7.98277 18.4975 8.30294 19.6175L8.65314 20.8375C8.68315 20.9375 8.7632 20.9975 8.86325 20.9975C8.96331 20.9975 9.05336 20.9275 9.07337 20.8375L9.42357 19.6175C9.74374 18.4975 10.6042 17.6375 11.7248 17.3175L12.9455 16.9675C13.0456 16.9375 13.1056 16.8575 13.1056 16.7575C13.1056 16.6575 13.0356 16.5675 12.9455 16.5475H12.9555ZM6.13174 10.4575L5.86159 9.5075H5.8716C5.62146 8.6375 4.95108 7.9675 4.0806 7.7175L3.13007 7.4475C3.05003 7.4275 3 7.3575 3 7.2775C3 7.1975 3.06003 7.1275 3.13007 7.1075L4.0806 6.8375C4.95108 6.5875 5.62146 5.9175 5.8716 5.0475L6.14175 4.0975C6.18177 3.9475 6.43191 3.9475 6.47193 4.0975L6.74208 5.0475C6.99222 5.9175 7.66259 6.5875 8.53308 6.8375L9.4836 7.1075C9.56365 7.1275 9.61368 7.1975 9.61368 7.2775C9.61368 7.3575 9.55364 7.4275 9.4836 7.4475L8.53308 7.7175C7.66259 7.9675 6.99222 8.6375 6.74208 9.5075L6.47193 10.4575C6.45192 10.5375 6.38188 10.5875 6.30184 10.5875C6.22179 10.5875 6.15175 10.5275 6.13174 10.4575Z" />
      </svg>
    ),

    'ai-wand': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.5927 9.60728C20.7626 9.60728 20.9024 9.70728 20.9724 9.85728H20.9624C21.0323 10.0073 21.0023 10.1773 20.8924 10.2973L13.4697 18.5573C13.3898 18.6473 13.2699 18.6973 13.16 18.6973C13.1101 18.6973 13.0601 18.6873 13.0102 18.6673C12.8403 18.5973 12.7404 18.4473 12.7404 18.2773V12.6073C12.7404 12.3173 12.5007 12.0773 12.211 12.0773C12.0791 12.0773 11.9455 12.076 11.8109 12.0746C10.6092 12.0628 9.32304 12.05 8.42468 12.9673C7.97512 13.4273 7.74535 14.0573 7.54554 14.6473C7.31577 15.3373 6.33673 15.3373 6.10695 14.6473C5.57747 13.0473 5.1379 12.6073 3.52948 12.0673C3.17982 11.9473 3 11.6573 3 11.3473C3 11.0373 3.17982 10.7473 3.52948 10.6273C5.1379 10.0873 5.57747 9.64728 6.11694 8.03728C6.34672 7.33728 7.32576 7.34728 7.55553 8.03728C7.88521 9.02728 8.18491 9.57728 8.73438 9.97728C9.17394 10.2973 9.79334 10.1973 10.153 9.79728L16.1471 3.13728C16.267 3.00728 16.4468 2.96728 16.6067 3.02728C16.7765 3.09728 16.8764 3.24728 16.8764 3.41728V9.07728C16.8764 9.36728 17.1162 9.60728 17.4059 9.60728H20.5927ZM10.153 18.1373C10.2729 18.2173 10.3927 18.2873 10.8223 18.5073V18.4873C11.2019 18.6773 11.2019 19.2273 10.8223 19.4173C10.3927 19.6373 10.2729 19.7073 10.153 19.7873C10.0331 19.8673 9.97315 19.9373 9.89323 20.0473C9.81331 20.1673 9.74338 20.2873 9.5236 20.7173C9.32379 21.1273 8.72438 21.0873 8.58452 20.6573C8.56619 20.6114 8.54996 20.5677 8.53488 20.527C8.51707 20.4789 8.50084 20.4352 8.48461 20.3973C8.35474 20.0773 8.26483 19.9573 8.03506 19.8073C7.8852 19.7173 7.74534 19.6473 7.29578 19.4273C7.10597 19.3373 7.00606 19.1473 7.00606 18.9673C7.00606 18.7873 7.10597 18.5973 7.29578 18.5073C7.72536 18.2873 7.84524 18.2173 7.96512 18.1373C8.08501 18.0573 8.14495 17.9873 8.22487 17.8773C8.30479 17.7573 8.37472 17.6373 8.59451 17.2073C8.78432 16.8273 9.33378 16.8273 9.5236 17.2073C9.74338 17.6373 9.81331 17.7573 9.89323 17.8773C9.97315 17.9973 10.0431 18.0573 10.153 18.1373Z" />
      </svg>
    ),

    'ai-brain-circuit': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M12 3C13.5 3 15 4 15.5 5.5C16 5 17 5 18 6C19 7 19 8 18.5 8.5C19.5 9 20 10 20 11.5C20 13 19 14 17.5 14.5C18 15.5 17.5 17 16 17.5C15.5 18.5 14 19 12.5 19H11.5C10 19 8.5 18.5 8 17.5C6.5 17 6 15.5 6.5 14.5C5 14 4 13 4 11.5C4 10 4.5 9 5.5 8.5C5 8 5 7 6 6C7 5 8 5 8.5 5.5C9 4 10.5 3 12 3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
        <path d="M8 13.5L10.5 11L13.5 11L16 13.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10.5 11V14M13.5 11V14" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),

    'ai-processor': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M2 8H4M2 12H4M2 16H4M20 8H22M20 12H22M20 16H22" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 2V4M12 2V4M16 2V4M8 20V22M12 20V22M16 20V22" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10" cy="10" r="1" fill="currentColor"/>
        <circle cx="14" cy="10" r="1" fill="currentColor"/>
        <circle cx="10" cy="14" r="1" fill="currentColor"/>
        <circle cx="14" cy="14" r="1" fill="currentColor"/>
      </svg>
    ),

    'ai-nodes': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.3"/>
        <path d="M8.5 7.5L10 10.5M15.5 7.5L14 10.5M8.5 16.5L10 13.5M15.5 16.5L14 13.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),

    'ai-learning': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M8 12H10M14 12H16M12 8V10M12 14V16" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),

    'ai-automation': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M12 2V8M12 16V22M2 12H8M16 12H22" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),

    'ai-insight': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 12L12 8L16 12L12 16Z" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <path d="M12 6V4M12 20V22M6 12H4M20 12H22" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),

    'ai-analytics': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="7" cy="16" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="12" cy="11" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="16" cy="15" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="21" cy="10" r="2" fill="currentColor" fillOpacity="0.3"/>
      </svg>
    ),

    'ai-prediction': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M3 12H21M12 3V21" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 8L12 6L18 8L12 10Z" fill="currentColor" fillOpacity="0.2"/>
        <path d="M6 16L12 18L18 16L12 14Z" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),

    // Educational AI Icons
    'ai-tutor-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M7 8H17M7 12H15" stroke="currentColor" strokeWidth="2"/>
        <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M17.5 18.5L18.5 19.5L20.5 17.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="9" cy="20" r="1" fill="currentColor"/>
        <circle cx="15" cy="20" r="1" fill="currentColor"/>
      </svg>
    ),

    'ai-knowledge': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M4 6V20H20V6H4Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M4 6L12 2L20 6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M8 10H16M8 14H14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="8" r="2" fill="currentColor" fillOpacity="0.3"/>
      </svg>
    ),

    'ai-quiz-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M9.09 9A3 3 0 0 1 15 9C15 10.5 12 11.5 12 13" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="17" r="1" fill="currentColor"/>
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
        <circle cx="8" cy="8" r="1" fill="currentColor" fillOpacity="0.7"/>
        <circle cx="16" cy="8" r="1" fill="currentColor" fillOpacity="0.7"/>
      </svg>
    ),

    'ai-progress-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 2A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M12 6A6 6 0 0 1 18 12" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),

    'ai-recommendation-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3"/>
        <path d="M8 4L12 8L16 4M8 20L12 16L16 20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"/>
      </svg>
    ),

    // Advanced AI Features
    'ai-assistant-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M7 20.66C8.95 19.58 10.41 18 12 18S15.05 19.58 17 20.66" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="9" cy="9" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
        <path d="M6 6L18 6M6 18L18 18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
      </svg>
    ),

    'ai-deep-learning': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
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

    'ai-search-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="11" cy="11" r="4" fill="currentColor" fillOpacity="0.2"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 11H14M11 8V14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="1" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="14" cy="8" r="1" fill="currentColor" fillOpacity="0.5"/>
      </svg>
    ),

    'ai-chatbot-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.89 20 9.84 19.79 8.88 19.41L3 21L4.59 15.12C4.21 14.16 4 13.11 4 12C4 7.582 8.03 4 12 4S21 7.582 21 12Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="8" cy="12" r="1" fill="currentColor"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <circle cx="16" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),

    'ai-optimization': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2"/>
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M12 12L15 9M12 12L9 15" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),

    // Legal-specific AI Icons
    'legal-ai-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M12 3L2 7V12C2 17 6 21 12 21S22 17 22 12V7L12 3Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M12 8V16M8 12L16 12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"/>
      </svg>
    ),

    'case-analysis-ai-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M8 12L10 14L16 8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="4" r="2" fill="currentColor" fillOpacity="0.3"/>
        <path d="M6 8H12M6 16H14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),

    'legal-research-ai-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M7 9H17M7 13H15" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M21 21L17.5 17.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="11" r="1" fill="currentColor"/>
      </svg>
    ),

    // Machine Learning Specific
    'ml-algorithm': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="3" y="3" width="6" height="6" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="3" width="6" height="6" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
        <rect x="9" y="15" width="6" height="6" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 6H15M6 9V12M18 9V12M9 12V15M15 12V15" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),

    'neural-network-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="6" cy="6" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="6" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="6" cy="18" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="18" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 6L10.5 10.5M16 6L13.5 10.5M8 18L10.5 13.5M16 18L13.5 13.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"/>
      </svg>
    ),

    'machine-learning-advanced': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M3 12H6L8 6L12 18L16 9L18 12H21" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="8" cy="6" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="12" cy="18" r="2" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="16" cy="9" r="2" fill="currentColor" fillOpacity="0.2"/>
        <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
        <path d="M4 20L20 4" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
      </svg>
    ),

    // Data and Analytics
    'ai-data-flow': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <path d="M4 8L12 4L20 8L12 12L4 8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 16L12 12L20 16L12 20L4 16Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 8V16M20 8V16" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),

    'ai-pattern-recognition': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="16" cy="8" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="8" cy="16" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="0.3"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),

    'ai-decision-tree': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="12" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="12" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="6" cy="20" r="1" fill="currentColor"/>
        <circle cx="10" cy="20" r="1" fill="currentColor"/>
        <circle cx="14" cy="20" r="1" fill="currentColor"/>
        <circle cx="18" cy="20" r="1" fill="currentColor"/>
        <path d="M12 6V8M10 10L8 12M14 10L16 12M8 14V18M16 14V18" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 18V20M10 18V20M14 18V20M18 18V20" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),

    'ai-natural-language': () => (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
        <path d="M7 10H11M7 14H17M13 10H17" stroke="currentColor" strokeWidth="2"/>
        <circle cx="19" cy="5" r="2" fill="currentColor" fillOpacity="0.3"/>
        <path d="M5 19L7 17L9 19" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    )
  };

  const IconComponent = AIIconComponents[name as keyof typeof AIIconComponents];
  
  if (!IconComponent) {
    // Fallback to a generic AI icon
    return (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3"/>
        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    );
  }
  
  return <IconComponent />;
};

// Complete icon registry with categorization
export const completeAIIcons = [
  // Core AI Intelligence (10 icons)
  'ai-sparkles', 'ai-wand', 'ai-brain-circuit', 'ai-processor', 'ai-nodes',
  'ai-learning', 'ai-automation', 'ai-insight', 'ai-analytics', 'ai-prediction',
  
  // Educational AI (5 icons) 
  'ai-tutor-advanced', 'ai-knowledge', 'ai-quiz-advanced', 'ai-progress-advanced', 'ai-recommendation-advanced',
  
  // Advanced AI Features (5 icons)
  'ai-assistant-advanced', 'ai-deep-learning', 'ai-search-advanced', 'ai-chatbot-advanced', 'ai-optimization',
  
  // Legal AI (3 icons)
  'legal-ai-advanced', 'case-analysis-ai-advanced', 'legal-research-ai-advanced',
  
  // Machine Learning (3 icons)
  'ml-algorithm', 'neural-network-advanced', 'machine-learning-advanced',
  
  // Data & Analytics (4 icons)
  'ai-data-flow', 'ai-pattern-recognition', 'ai-decision-tree', 'ai-natural-language'
] as const;

export type CompleteAIIconName = typeof completeAIIcons[number];

// Categorized icon collections for easy selection
export const completeAIIconCollections = {
  core: completeAIIcons.slice(0, 10),
  educational: completeAIIcons.slice(10, 15), 
  advanced: completeAIIcons.slice(15, 20),
  legal: completeAIIcons.slice(20, 23),
  ml: completeAIIcons.slice(23, 26),
  analytics: completeAIIcons.slice(26, 30)
};

export default SOLOCompleteAIIcon;