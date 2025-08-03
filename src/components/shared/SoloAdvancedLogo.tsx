import React, { useState, useEffect } from 'react';

interface SoloAdvancedLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  animated?: boolean;
  variant?: 'default' | 'geometric' | 'minimal' | 'holographic';
  className?: string;
}

export const SoloAdvancedLogo: React.FC<SoloAdvancedLogoProps> = ({
  size = 'medium',
  animated = true,
  variant = 'default',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [animated]);

  const sizeMap = {
    small: { container: 'w-8 h-8', svg: 'w-6 h-6', text: 'text-xs' },
    medium: { container: 'w-16 h-16', svg: 'w-12 h-12', text: 'text-sm' },
    large: { container: 'w-24 h-24', svg: 'w-18 h-18', text: 'text-base' },
    xl: { container: 'w-32 h-32', svg: 'w-24 h-24', text: 'text-lg' }
  };

  const currentSize = sizeMap[size];

  // Geometric Logo with Shape Creator Elements
  const GeometricLogo = () => (
    <div 
      className={`relative ${currentSize.container} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background holographic layer */}
      <div className={`absolute inset-0 rounded-3xl overflow-hidden ${
        animated ? 'chroma-education-1' : 'bg-gradient-to-br from-solo-primary to-solo-secondary'
      }`}>
        {/* Animated gradient overlay */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 animate-pulse"></div>
        )}
      </div>

      {/* Main Logo SVG */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          className={`${currentSize.svg} text-white drop-shadow-lg`}
          style={{
            filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Sophisticated S letterform using shapes */}
          <defs>
            <linearGradient id="soloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>
            </linearGradient>
            
            <radialGradient id="soloRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6"/>
            </radialGradient>

            {/* Dynamic filter effects */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Primary S shape - sophisticated curves */}
          <path
            d="M 25 20 Q 35 10 50 15 Q 65 20 70 30 Q 75 40 65 45 Q 55 50 50 50 Q 45 50 35 55 Q 25 60 30 70 Q 35 80 50 85 Q 65 90 75 80"
            stroke="url(#soloGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={isHovered ? "url(#glow)" : "none"}
            style={{
              strokeDasharray: animated ? '200' : 'none',
              strokeDashoffset: animated ? `${200 - (animationPhase * 50)}` : '0',
              transition: 'all 0.8s ease-in-out'
            }}
          />

          {/* Geometric accent elements from Shape Creator */}
          <g opacity={isHovered ? "1" : "0.7"} style={{ transition: 'opacity 0.3s ease' }}>
            {/* Corner geometric shapes */}
            <polygon 
              points="15,15 25,10 25,20" 
              fill="url(#soloRadial)" 
              opacity="0.6"
              style={{
                transform: animated ? `rotate(${animationPhase * 90}deg)` : 'none',
                transformOrigin: '20px 15px',
                transition: 'transform 0.8s ease-in-out'
              }}
            />
            
            <polygon 
              points="75,85 85,80 85,90" 
              fill="url(#soloRadial)" 
              opacity="0.6"
              style={{
                transform: animated ? `rotate(${-animationPhase * 90}deg)` : 'none',
                transformOrigin: '80px 85px',
                transition: 'transform 0.8s ease-in-out'
              }}
            />

            {/* Dynamic connecting elements */}
            <circle 
              cx="20" 
              cy="20" 
              r="3" 
              fill="url(#soloGradient)" 
              opacity="0.8"
              style={{
                transform: animated ? `scale(${1 + Math.sin(animationPhase * Math.PI / 2) * 0.3})` : 'none',
                transition: 'transform 0.3s ease'
              }}
            />
            
            <circle 
              cx="80" 
              cy="80" 
              r="3" 
              fill="url(#soloGradient)" 
              opacity="0.8"
              style={{
                transform: animated ? `scale(${1 + Math.cos(animationPhase * Math.PI / 2) * 0.3})` : 'none',
                transition: 'transform 0.3s ease'
              }}
            />

            {/* Central focal point */}
            <circle 
              cx="50" 
              cy="50" 
              r="2" 
              fill="url(#soloGradient)" 
              opacity="0.9"
              style={{
                transform: animated ? `scale(${1.5 + Math.sin(animationPhase * Math.PI) * 0.5})` : 'none',
                transition: 'transform 0.4s ease'
              }}
            />

            {/* Dynamic connection lines */}
            <line 
              x1="20" 
              y1="20" 
              x2="50" 
              y2="50" 
              stroke="url(#soloGradient)" 
              strokeWidth="1" 
              opacity="0.4"
              strokeDasharray="2,2"
              style={{
                strokeDashoffset: animated ? `${animationPhase * 2}` : '0',
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
            
            <line 
              x1="50" 
              y1="50" 
              x2="80" 
              y2="80" 
              stroke="url(#soloGradient)" 
              strokeWidth="1" 
              opacity="0.4"
              strokeDasharray="2,2"
              style={{
                strokeDashoffset: animated ? `${-animationPhase * 2}` : '0',
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </g>

          {/* Hover enhancement elements */}
          {isHovered && (
            <g opacity="0.3">
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#soloGradient)" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
              </circle>
            </g>
          )}
        </svg>
      </div>

      {/* Light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-3xl opacity-60"></div>
      
      {/* Hover glow effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-white/10 rounded-3xl animate-pulse"></div>
      )}
    </div>
  );

  // Minimal variant for smaller spaces
  const MinimalLogo = () => (
    <div className={`${currentSize.container} ${className} relative`}>
      <div className="w-full h-full bg-gradient-to-br from-solo-primary to-solo-secondary rounded-2xl flex items-center justify-center">
        <span className="text-white font-bold text-xl">S</span>
      </div>
    </div>
  );

  // Holographic variant with advanced effects
  const HolographicLogo = () => (
    <div className={`${currentSize.container} ${className} relative group`}>
      <div className="absolute inset-0 chroma-animated-1 rounded-3xl"></div>
      <div className="absolute inset-0 chroma-animated-2 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-solo-primary font-bold">S</span>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'minimal':
      return <MinimalLogo />;
    case 'holographic':
      return <HolographicLogo />;
    case 'geometric':
    default:
      return <GeometricLogo />;
  }
};

// Logo with text combination
export const SoloAdvancedBrand: React.FC<SoloAdvancedLogoProps & { 
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
}> = ({ 
  size = 'medium', 
  animated = true, 
  variant = 'default',
  showText = true,
  layout = 'horizontal',
  className = ''
}) => {
  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
    xl: 'text-2xl'
  };

  if (!showText) {
    return <SoloAdvancedLogo size={size} animated={animated} variant={variant} className={className} />;
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <SoloAdvancedLogo size={size} animated={animated} variant={variant} />
        <div className="text-center">
          <div className={`font-bold font-jakarta text-solo-dark ${textSizes[size]}`}>
            SOLO <span className="chroma-text-education">by Legalight</span>
          </div>
          <div className="text-xs text-solo-gray-600 font-medium">
            we can do hard things
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <SoloAdvancedLogo size={size} animated={animated} variant={variant} />
      <div>
        <div className={`font-bold font-jakarta text-solo-dark ${textSizes[size]} leading-tight`}>
          SOLO <span className="chroma-text-education">by Legalight</span>
        </div>
        <div className="text-xs text-solo-gray-600 font-medium">
          we can do hard things
        </div>
      </div>
    </div>
  );
};