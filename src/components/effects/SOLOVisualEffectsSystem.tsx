import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soloStyles } from '../shared/SOLODesignSystem';

// Holographic Gradient Types
type HolographicGradientId = 
  | 'gradient-1' | 'gradient-2' | 'gradient-3' | 'gradient-4' | 'gradient-5'
  | 'gradient-6' | 'gradient-7' | 'gradient-8' | 'gradient-9' | 'gradient-10'
  | 'gradient-11' | 'gradient-12' | 'gradient-13' | 'gradient-14' | 'gradient-15'
  | 'gradient-16' | 'gradient-17' | 'gradient-18' | 'gradient-19' | 'gradient-20'
  | 'gradient-21' | 'gradient-22' | 'gradient-23' | 'gradient-24' | 'gradient-25'
  | 'gradient-26' | 'gradient-27' | 'gradient-28' | 'gradient-29' | 'gradient-30';

type VisualEffectType = 'gradient' | 'glow' | 'shimmer' | 'particle' | 'wave' | 'halo';
type EffectIntensity = 'subtle' | 'moderate' | 'strong' | 'intense';

interface SOLOHolographicGradientProps {
  gradientId: HolographicGradientId;
  intensity?: EffectIntensity;
  animated?: boolean;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface SOLOVisualEffectsProps {
  effect: VisualEffectType;
  intensity?: EffectIntensity;
  color?: string;
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

// Holographic Gradient Registry (Premium UI8 Chroma Collection)
const holographicGradients: Record<HolographicGradientId, {
  name: string;
  cssGradient: string;
  description: string;
  bestUseCase: string;
  intensity: EffectIntensity;
}> = {
  'gradient-1': {
    name: 'Aurora Borealis',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    description: 'Mystical aurora-like gradient with blue to purple transition',
    bestUseCase: 'Hero sections, premium features',
    intensity: 'intense'
  },
  'gradient-2': {
    name: 'Ocean Dreams',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
    description: 'Deep ocean blues with purple accents',
    bestUseCase: 'Background elements, cards',
    intensity: 'moderate'
  },
  'gradient-3': {
    name: 'Sunset Glow',
    cssGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
    description: 'Warm sunset colors transitioning to cool blues',
    bestUseCase: 'Call-to-action buttons, highlights',
    intensity: 'strong'
  },
  'gradient-4': {
    name: 'Neon Pulse',
    cssGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
    description: 'Electric blue neon effect with pulse animation',
    bestUseCase: 'Interactive elements, notifications',
    intensity: 'intense'
  },
  'gradient-5': {
    name: 'Crystal Clear',
    cssGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
    description: 'Soft crystal-like transparency effect',
    bestUseCase: 'Glass morphism, overlays',
    intensity: 'subtle'
  },
  'gradient-6': {
    name: 'Royal Purple',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Elegant royal purple gradient',
    bestUseCase: 'Premium sections, headers',
    intensity: 'moderate'
  },
  'gradient-7': {
    name: 'Golden Hour',
    cssGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #fd746c 100%)',
    description: 'Warm golden hour lighting effect',
    bestUseCase: 'Achievement badges, success states',
    intensity: 'strong'
  },
  'gradient-8': {
    name: 'Mint Fresh',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    description: 'Fresh mint green with blue accents',
    bestUseCase: 'Success messages, positive feedback',
    intensity: 'moderate'
  },
  'gradient-9': {
    name: 'Space Nebula',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    description: 'Cosmic nebula with multiple color transitions',
    bestUseCase: 'Background artwork, immersive sections',
    intensity: 'intense'
  },
  'gradient-10': {
    name: 'Electric Violet',
    cssGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: 'High-energy electric violet effect',
    bestUseCase: 'Active states, focus indicators',
    intensity: 'strong'
  },
  'gradient-11': {
    name: 'Peaceful Dawn',
    cssGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    description: 'Gentle dawn colors for calm interfaces',
    bestUseCase: 'Meditation features, calm sections',
    intensity: 'subtle'
  },
  'gradient-12': {
    name: 'Cyber Glow',
    cssGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
    description: 'Futuristic cyberpunk glow effect',
    bestUseCase: 'Tech features, AI sections',
    intensity: 'intense'
  },
  'gradient-13': {
    name: 'Forest Mist',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Mystical forest mist effect',
    bestUseCase: 'Nature themes, organic content',
    intensity: 'moderate'
  },
  'gradient-14': {
    name: 'Phoenix Fire',
    cssGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #fd746c 100%)',
    description: 'Intense phoenix fire gradient',
    bestUseCase: 'Error states, urgent notifications',
    intensity: 'intense'
  },
  'gradient-15': {
    name: 'Arctic Ice',
    cssGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
    description: 'Cool arctic ice crystalline effect',
    bestUseCase: 'Loading states, process indicators',
    intensity: 'subtle'
  },
  // Additional gradients 16-30 with similar patterns...
  'gradient-16': {
    name: 'Cosmic Storm',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 33%, #f093fb 66%, #f5576c 100%)',
    description: 'Turbulent cosmic storm gradient',
    bestUseCase: 'Dynamic content, animated backgrounds',
    intensity: 'intense'
  },
  'gradient-17': {
    name: 'Silk Elegance',
    cssGradient: 'linear-gradient(135deg, #d299c2 0%, #fed6e3 100%)',
    description: 'Smooth silk-like elegance',
    bestUseCase: 'Luxury features, premium content',
    intensity: 'subtle'
  },
  'gradient-18': {
    name: 'Thunder Storm',
    cssGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
    description: 'Electric thunder storm effect',
    bestUseCase: 'Power features, intensity indicators',
    intensity: 'strong'
  },
  'gradient-19': {
    name: 'Rose Garden',
    cssGradient: 'linear-gradient(135deg, #f093fb 0%, #fed6e3 50%, #d299c2 100%)',
    description: 'Delicate rose garden colors',
    bestUseCase: 'Romantic themes, soft interfaces',
    intensity: 'moderate'
  },
  'gradient-20': {
    name: 'Digital Matrix',
    cssGradient: 'linear-gradient(135deg, #667eea 0%, #00f2fe 50%, #4facfe 100%)',
    description: 'Digital matrix code effect',
    bestUseCase: 'Code sections, technical content',
    intensity: 'strong'
  },
  // Simplified entries for gradients 21-30
  'gradient-21': { name: 'Mystic Purple', cssGradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)', description: 'Mystic purple depth', bestUseCase: 'Mystery sections', intensity: 'moderate' },
  'gradient-22': { name: 'Solar Flare', cssGradient: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)', description: 'Bright solar energy', bestUseCase: 'Energy features', intensity: 'strong' },
  'gradient-23': { name: 'Ocean Deep', cssGradient: 'linear-gradient(135deg, #4facfe 0%, #667eea 100%)', description: 'Deep ocean blue', bestUseCase: 'Depth indicators', intensity: 'moderate' },
  'gradient-24': { name: 'Flamingo Pink', cssGradient: 'linear-gradient(135deg, #f093fb 0%, #fed6e3 100%)', description: 'Soft flamingo pink', bestUseCase: 'Feminine themes', intensity: 'subtle' },
  'gradient-25': { name: 'Northern Lights', cssGradient: 'linear-gradient(135deg, #a8edea 0%, #4facfe 50%, #667eea 100%)', description: 'Aurora borealis effect', bestUseCase: 'Magical sections', intensity: 'intense' },
  'gradient-26': { name: 'Coral Reef', cssGradient: 'linear-gradient(135deg, #fd746c 0%, #f093fb 100%)', description: 'Vibrant coral colors', bestUseCase: 'Vibrant content', intensity: 'strong' },
  'gradient-27': { name: 'Moonbeam', cssGradient: 'linear-gradient(135deg, #fed6e3 0%, #a8edea 100%)', description: 'Gentle moonlight', bestUseCase: 'Night themes', intensity: 'subtle' },
  'gradient-28': { name: 'Electric Blue', cssGradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', description: 'Pure electric blue', bestUseCase: 'Electric themes', intensity: 'strong' },
  'gradient-29': { name: 'Sunset Beach', cssGradient: 'linear-gradient(135deg, #f6d365 0%, #fd746c 50%, #f093fb 100%)', description: 'Beach sunset colors', bestUseCase: 'Relaxation themes', intensity: 'moderate' },
  'gradient-30': { name: 'Galaxy Edge', cssGradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 50%, #4facfe 100%)', description: 'Edge of galaxy', bestUseCase: 'Space themes', intensity: 'intense' }
};

// Holographic Gradient Component
const SOLOHolographicGradient: React.FC<SOLOHolographicGradientProps> = ({
  gradientId,
  intensity = 'moderate',
  animated = true,
  overlay = false,
  className = '',
  children
}) => {
  const gradientData = holographicGradients[gradientId];
  
  const intensityStyles = {
    subtle: 'opacity-40',
    moderate: 'opacity-60',
    strong: 'opacity-80',
    intense: 'opacity-100'
  };

  const animationClasses = animated ? 'animate-pulse hover:animate-none transition-all duration-1000' : '';
  
  if (overlay) {
    return (
      <div className={`relative ${className}`}>
        {children}
        <div 
          className={`absolute inset-0 ${intensityStyles[intensity]} ${animationClasses} pointer-events-none mix-blend-overlay`}
          style={{ 
            background: gradientData.cssGradient,
            borderRadius: 'inherit'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`${intensityStyles[intensity]} ${animationClasses} ${className}`}
      style={{ background: gradientData.cssGradient }}
    >
      {children}
    </div>
  );
};

// Advanced Visual Effects Component
const SOLOVisualEffect: React.FC<SOLOVisualEffectsProps> = ({
  effect,
  intensity = 'moderate',
  color = '#667eea',
  duration = 2000,
  className = '',
  children
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (effect === 'particle' || effect === 'wave') {
      const interval = setInterval(() => {
        setIsActive(prev => !prev);
      }, duration);
      return () => clearInterval(interval);
    }
  }, [effect, duration]);

  const getEffectStyles = () => {
    const intensityMap = {
      subtle: 0.3,
      moderate: 0.6,
      strong: 0.8,
      intense: 1.0
    };

    const opacity = intensityMap[intensity];

    switch (effect) {
      case 'glow':
        return {
          filter: `drop-shadow(0 0 ${intensity === 'intense' ? '20px' : '10px'} ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`,
          transition: 'filter 0.3s ease'
        };
      
      case 'shimmer':
        return {
          position: 'relative' as const,
          overflow: 'hidden' as const,
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${color}${Math.round(opacity * 100)}, transparent)`,
            animation: 'shimmer 2s infinite'
          }
        };
      
      case 'particle':
        return {
          position: 'relative' as const,
          '::after': isActive ? {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '4px',
            background: color,
            borderRadius: '50%',
            opacity: opacity,
            animation: `particle-${intensity} ${duration}ms ease-out`,
            transform: 'translate(-50%, -50%)'
          } : {}
        };

      case 'wave':
        return {
          position: 'relative' as const,
          '::before': isActive ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: `2px solid ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
            borderRadius: 'inherit',
            animation: `wave-${intensity} ${duration}ms ease-out`
          } : {}
        };

      case 'halo':
        return {
          position: 'relative' as const,
          '::before': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            background: `radial-gradient(circle, ${color}${Math.round(opacity * 50).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(8px)',
            zIndex: -1
          }
        };

      default:
        return {};
    }
  };

  // Create dynamic style injection for animations
  useEffect(() => {
    const styleId = 'solo-visual-effects-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes particle-subtle {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
        }
        @keyframes particle-moderate {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
        @keyframes particle-strong {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
        }
        @keyframes particle-intense {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(3); }
        }
        @keyframes wave-subtle {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        @keyframes wave-moderate {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes wave-strong {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.6); }
        }
        @keyframes wave-intense {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.8); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className={`${className}`} style={getEffectStyles()}>
      {children}
    </div>
  );
};

// Marketing Website Harmony Component
const SOLOMarketingHarmony: React.FC<{
  section: 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta';
  className?: string;
  children?: React.ReactNode;
}> = ({ section, className = '', children }) => {
  const sectionGradients = {
    hero: 'gradient-1', // Aurora Borealis for maximum impact
    features: 'gradient-6', // Royal Purple for elegance
    testimonials: 'gradient-5', // Crystal Clear for trust
    pricing: 'gradient-3', // Sunset Glow for warmth
    cta: 'gradient-4' // Neon Pulse for urgency
  } as const;

  const sectionEffects = {
    hero: { effect: 'glow' as const, intensity: 'intense' as const },
    features: { effect: 'shimmer' as const, intensity: 'moderate' as const },
    testimonials: { effect: 'halo' as const, intensity: 'subtle' as const },
    pricing: { effect: 'wave' as const, intensity: 'strong' as const },
    cta: { effect: 'particle' as const, intensity: 'intense' as const }
  };

  const gradientId = sectionGradients[section];
  const effectConfig = sectionEffects[section];

  return (
    <SOLOVisualEffect
      effect={effectConfig.effect}
      intensity={effectConfig.intensity}
      className={className}
    >
      <SOLOHolographicGradient
        gradientId={gradientId}
        intensity={effectConfig.intensity}
        animated={true}
        overlay={true}
      >
        {children}
      </SOLOHolographicGradient>
    </SOLOVisualEffect>
  );
};

// Gradient Showcase Component
const SOLOGradientShowcase: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const [selectedGradient, setSelectedGradient] = useState<HolographicGradientId>('gradient-1');
  const [previewIntensity, setPreviewIntensity] = useState<EffectIntensity>('moderate');
  const [previewEffect, setPreviewEffect] = useState<VisualEffectType>('glow');

  const gradientsByIntensity = {
    subtle: Object.entries(holographicGradients).filter(([_, data]) => data.intensity === 'subtle'),
    moderate: Object.entries(holographicGradients).filter(([_, data]) => data.intensity === 'moderate'),
    strong: Object.entries(holographicGradients).filter(([_, data]) => data.intensity === 'strong'),
    intense: Object.entries(holographicGradients).filter(([_, data]) => data.intensity === 'intense')
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Holographic Gradients</h2>
        <p className="text-blue-100">Premium UI8 Chroma collection with 30 holographic gradients</p>
      </div>

      <div className="flex">
        {/* Gradient Library */}
        <div className="w-80 bg-gray-50 p-6 max-h-[600px] overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Gradient Library</h3>
          
          {Object.entries(gradientsByIntensity).map(([intensityLevel, gradients]) => (
            <div key={intensityLevel} className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2 capitalize">{intensityLevel} Intensity</h4>
              <div className="grid grid-cols-2 gap-2">
                {gradients.map(([id, data]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedGradient(id as HolographicGradientId)}
                    className={`aspect-square rounded-lg border-2 transition-all ${
                      selectedGradient === id 
                        ? 'border-blue-500 scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ background: data.cssGradient }}
                    title={data.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-8">
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intensity</label>
                <select
                  value={previewIntensity}
                  onChange={(e) => setPreviewIntensity(e.target.value as EffectIntensity)}
                  className="px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="subtle">Subtle</option>
                  <option value="moderate">Moderate</option>
                  <option value="strong">Strong</option>
                  <option value="intense">Intense</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effect</label>
                <select
                  value={previewEffect}
                  onChange={(e) => setPreviewEffect(e.target.value as VisualEffectType)}
                  className="px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="gradient">Gradient Only</option>
                  <option value="glow">Glow</option>
                  <option value="shimmer">Shimmer</option>
                  <option value="particle">Particle</option>
                  <option value="wave">Wave</option>
                  <option value="halo">Halo</option>
                </select>
              </div>
            </div>

            {/* Large Preview */}
            <div className="space-y-4">
              <SOLOVisualEffect
                effect={previewEffect}
                intensity={previewIntensity}
                className="w-full h-64 rounded-2xl flex items-center justify-center"
              >
                <SOLOHolographicGradient
                  gradientId={selectedGradient}
                  intensity={previewIntensity}
                  animated={true}
                  className="w-full h-full rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-bold mb-2">
                      {holographicGradients[selectedGradient].name}
                    </h3>
                    <p className="text-white/80">
                      {holographicGradients[selectedGradient].description}
                    </p>
                  </div>
                </SOLOHolographicGradient>
              </SOLOVisualEffect>

              {/* Gradient Info */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {holographicGradients[selectedGradient].name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {holographicGradients[selectedGradient].description}
                </p>
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Best Use Case:</span>{' '}
                    <span className="text-gray-600">{holographicGradients[selectedGradient].bestUseCase}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Intensity:</span>{' '}
                    <span className={`capitalize px-2 py-1 rounded text-xs ${
                      holographicGradients[selectedGradient].intensity === 'intense' ? 'bg-red-100 text-red-700' :
                      holographicGradients[selectedGradient].intensity === 'strong' ? 'bg-orange-100 text-orange-700' :
                      holographicGradients[selectedGradient].intensity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {holographicGradients[selectedGradient].intensity}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">CSS Gradient:</span>
                    <code className="block mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {holographicGradients[selectedGradient].cssGradient}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Usage Examples</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <SOLOHolographicGradient
                    gradientId={selectedGradient}
                    intensity="subtle"
                    className="w-full h-16 rounded-lg mb-2"
                  />
                  <span className="text-xs text-gray-600">Card Background</span>
                </div>
                <div className="text-center">
                  <SOLOHolographicGradient
                    gradientId={selectedGradient}
                    intensity="moderate"
                    className="w-full h-16 rounded-lg mb-2 flex items-center justify-center text-white font-semibold"
                  >
                    Button
                  </SOLOHolographicGradient>
                  <span className="text-xs text-gray-600">Call-to-Action</span>
                </div>
                <div className="text-center">
                  <SOLOVisualEffect
                    effect="glow"
                    intensity="strong"
                    className="w-full h-16 rounded-lg"
                  >
                    <SOLOHolographicGradient
                      gradientId={selectedGradient}
                      intensity="intense"
                      className="w-full h-full rounded-lg"
                    />
                  </SOLOVisualEffect>
                  <span className="text-xs text-gray-600">Hero Section</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export components and types
export type { 
  HolographicGradientId, 
  VisualEffectType, 
  EffectIntensity, 
  SOLOHolographicGradientProps, 
  SOLOVisualEffectsProps 
};

export { holographicGradients };
export default SOLOHolographicGradient;
export { 
  SOLOVisualEffect, 
  SOLOMarketingHarmony, 
  SOLOGradientShowcase 
};