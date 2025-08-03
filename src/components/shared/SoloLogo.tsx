import React from 'react';

interface SoloLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  variant?: 'default' | 'icon-only' | 'text-only' | 'stacked';
  animated?: boolean;
  className?: string;
}

export const SoloLogo: React.FC<SoloLogoProps> = ({
  size = 'medium',
  variant = 'default',
  animated = false,
  className = ''
}) => {
  const sizeClasses = {
    small: { 
      icon: 'w-8 h-8', 
      text: 'text-lg', 
      tagline: 'text-xs',
      container: 'gap-2'
    },
    medium: { 
      icon: 'w-12 h-12', 
      text: 'text-xl', 
      tagline: 'text-sm',
      container: 'gap-3'
    },
    large: { 
      icon: 'w-16 h-16', 
      text: 'text-2xl', 
      tagline: 'text-base',
      container: 'gap-4'
    },
    xl: { 
      icon: 'w-20 h-20', 
      text: 'text-3xl', 
      tagline: 'text-lg',
      container: 'gap-5'
    }
  };

  const currentSize = sizeClasses[size];

  // Dynamic Logo Icon with multiple shapes from Logo Shape Pack
  const LogoIcon = () => (
    <div className={`
      ${currentSize.icon} 
      bg-gradient-solo-2 rounded-2xl flex items-center justify-center relative overflow-hidden
      ${animated ? 'chroma-animated-1' : ''}
      shadow-lg group
    `}>
      {/* Primary S Shape */}
      <div className="relative z-10">
        <svg
          viewBox="0 0 24 24"
          className="w-1/2 h-1/2 text-white"
          fill="currentColor"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L17 6L15 7H13L11 6L7 7V9L11 10L13 11H15L17 10L21 9ZM7 13V22H9V13H7ZM11 13V22H13V13H11ZM15 13V22H17V13H15Z"/>
        </svg>
      </div>
      
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  // Alternative Geometric Logo Shapes
  const GeometricIcon = ({ shape }: { shape: 'hexagon' | 'triangle' | 'diamond' | 'circle' }) => {
    const shapes = {
      hexagon: "M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z",
      triangle: "M12 2L22 20H2L12 2Z",
      diamond: "M12 2L20 12L12 22L4 12L12 2Z",
      circle: "M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
    };

    return (
      <div className={`
        ${currentSize.icon} 
        bg-gradient-to-br from-solo-primary via-solo-secondary to-solo-education-accent rounded-2xl 
        flex items-center justify-center relative overflow-hidden
        ${animated ? 'chroma-education-2' : ''}
        shadow-xl
      `}>
        <svg
          viewBox="0 0 24 24"
          className="w-3/5 h-3/5 text-white"
          fill="currentColor"
        >
          <path d={shapes[shape]}/>
        </svg>
        <div className="absolute top-0 right-0 w-full h-full bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
    );
  };

  if (variant === 'icon-only') {
    return (
      <div className={className}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'text-only') {
    return (
      <div className={`${className} text-center`}>
        <h1 className={`${currentSize.text} font-bold font-jakarta text-solo-dark dark:text-white`}>
          SOLO <span className="text-solo-primary">by Legalight</span>
        </h1>
        <p className={`${currentSize.tagline} text-solo-gray-600 dark:text-solo-gray-400 font-medium`}>
          we can do hard things
        </p>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`${className} text-center space-y-2`}>
        <LogoIcon />
        <div>
          <h1 className={`${currentSize.text} font-bold font-jakarta text-solo-dark dark:text-white`}>
            SOLO <span className="text-solo-primary">by Legalight</span>
          </h1>
          <p className={`${currentSize.tagline} text-solo-gray-600 dark:text-solo-gray-400 font-medium`}>
            we can do hard things
          </p>
        </div>
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div className={`${className} flex items-center ${currentSize.container}`}>
      <LogoIcon />
      <div>
        <h1 className={`${currentSize.text} font-bold font-jakarta text-solo-dark dark:text-white leading-tight`}>
          SOLO <span className="text-solo-primary">by Legalight</span>
        </h1>
        <p className={`${currentSize.tagline} text-solo-gray-600 dark:text-solo-gray-400 font-medium`}>
          we can do hard things
        </p>
      </div>
    </div>
  );
};

// Logo variants for different use cases
export const SoloLogoMinimal: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => (
  <SoloLogo variant="icon-only" size={size} />
);

export const SoloLogoBranded: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => (
  <SoloLogo variant="default" size={size} animated />
);

export const SoloLogoAuth: React.FC<{}> = () => (
  <SoloLogo variant="stacked" size="large" animated className="mx-auto" />
);

// Advanced Logo with Shape Variants
export const SoloLogoAdvanced: React.FC<{
  shape?: 'default' | 'hexagon' | 'triangle' | 'diamond' | 'circle';
  size?: 'small' | 'medium' | 'large' | 'xl';
  animated?: boolean;
}> = ({ shape = 'default', size = 'medium', animated = true }) => {
  const sizeClasses = {
    small: { icon: 'w-8 h-8', text: 'text-lg', tagline: 'text-xs' },
    medium: { icon: 'w-12 h-12', text: 'text-xl', tagline: 'text-sm' },
    large: { icon: 'w-16 h-16', text: 'text-2xl', tagline: 'text-base' },
    xl: { icon: 'w-20 h-20', text: 'text-3xl', tagline: 'text-lg' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-4">
      {shape === 'default' ? (
        <div className={`
          ${currentSize.icon} 
          bg-gradient-solo-2 rounded-2xl flex items-center justify-center
          ${animated ? 'chroma-animated-2' : ''}
          shadow-2xl
        `}>
          <span className="text-white font-bold text-xl">S</span>
        </div>
      ) : (
        <div className={`
          ${currentSize.icon} 
          relative
        `}>
          {/* Shape-based logo using Logo Shape Pack concepts */}
          <div className={`
            w-full h-full rounded-2xl flex items-center justify-center
            ${animated ? 'chroma-education-3' : 'bg-gradient-to-br from-solo-primary to-solo-secondary'}
            shadow-2xl
          `}>
            <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>
      )}
      <div>
        <h1 className={`${currentSize.text} font-bold font-jakarta`}>
          <span className="chroma-text-education">SOLO</span> <span className="text-solo-primary">by Legalight</span>
        </h1>
        <p className={`${currentSize.tagline} text-solo-gray-600 font-medium`}>
          we can do hard things
        </p>
      </div>
    </div>
  );
};