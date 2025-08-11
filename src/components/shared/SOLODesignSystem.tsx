import React from 'react';

// SOLO Design System - Unified styling that matches marketing website
// while integrating UI8 premium assets

export const soloTheme = {
  colors: {
    // Primary SOLO brand colors (from marketing website)
    primary: '#0000ff', // SOLO blue
    primaryLight: '#3333ff',
    primaryDark: '#0000cc',
    
    // Supporting colors that complement SOLO brand
    secondary: '#6366f1', // Indigo for AI features
    success: '#10b981',   // Green for achievements
    warning: '#f59e0b',   // Amber for important items
    error: '#ef4444',     // Red for warnings
    
    // Neutral colors (professional legal context)
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // AI-enhanced colors (from Chroma gradients)
    aiGradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      holographic: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    }
  },
  
  typography: {
    // Enhanced font families with Griggs Variable Typeface (UI8)
    fontFamily: {
      // Primary: Griggs Sans for clean, modern UI
      primary: ['Griggs-Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      
      // Headings: Mix of Griggs Flare for impact and Griggs Sans for clarity
      heading: ['Griggs-Flare', 'Griggs-Sans', 'Plus Jakarta Sans', 'system-ui'],
      
      // Body: Griggs Sans for optimal readability
      body: ['Griggs-Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      
      // Legal documents: Griggs Serif for traditional legal feel
      legal: ['Griggs-Serif', 'Georgia', 'serif'],
      
      // Emphasis: Griggs Flare for attention-grabbing text
      emphasis: ['Griggs-Flare', 'Griggs-Sans', 'system-ui'],
      
      // Technical: Monospace for code and technical content
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      
      // Professional: Griggs Sans for business contexts
      professional: ['Griggs-Sans', 'system-ui', 'sans-serif'],
      
      // Display: Griggs Flare for large display text
      display: ['Griggs-Flare', 'Griggs-Sans', 'system-ui']
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    }
  },
  
  spacing: {
    // Consistent spacing system
    px: '1px',
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  }
};

// Component CSS variables for consistent styling
export const soloDesignTokens = `
  :root {
    /* SOLO Brand Colors */
    --solo-primary: ${soloTheme.colors.primary};
    --solo-primary-light: ${soloTheme.colors.primaryLight};
    --solo-primary-dark: ${soloTheme.colors.primaryDark};
    
    /* AI Enhancement Colors */
    --solo-secondary: ${soloTheme.colors.secondary};
    --solo-success: ${soloTheme.colors.success};
    --solo-warning: ${soloTheme.colors.warning};
    --solo-error: ${soloTheme.colors.error};
    
    /* Gray Scale */
    --solo-gray-50: ${soloTheme.colors.gray[50]};
    --solo-gray-100: ${soloTheme.colors.gray[100]};
    --solo-gray-200: ${soloTheme.colors.gray[200]};
    --solo-gray-300: ${soloTheme.colors.gray[300]};
    --solo-gray-400: ${soloTheme.colors.gray[400]};
    --solo-gray-500: ${soloTheme.colors.gray[500]};
    --solo-gray-600: ${soloTheme.colors.gray[600]};
    --solo-gray-700: ${soloTheme.colors.gray[700]};
    --solo-gray-800: ${soloTheme.colors.gray[800]};
    --solo-gray-900: ${soloTheme.colors.gray[900]};
    
    /* AI Gradients */
    --solo-ai-gradient-primary: ${soloTheme.colors.aiGradient.primary};
    --solo-ai-gradient-accent: ${soloTheme.colors.aiGradient.accent};
    --solo-ai-gradient-holographic: ${soloTheme.colors.aiGradient.holographic};
    
    /* Typography */
    --solo-font-primary: ${soloTheme.typography.fontFamily.primary.join(', ')};
    --solo-font-heading: ${soloTheme.typography.fontFamily.heading.join(', ')};
    --solo-font-legal: ${soloTheme.typography.fontFamily.legal.join(', ')};
    --solo-font-professional: ${soloTheme.typography.fontFamily.professional.join(', ')};
  }
`;

// Utility classes for consistent styling
export const soloStyles = {
  // Container classes
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSmall: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  containerLarge: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20',
  
  // Typography classes
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900',
    h3: 'text-2xl md:text-3xl font-bold tracking-tight text-gray-900',
    h4: 'text-xl md:text-2xl font-semibold tracking-tight text-gray-900',
    h5: 'text-lg md:text-xl font-semibold text-gray-900',
    h6: 'text-base md:text-lg font-semibold text-gray-900',
  },
  
  text: {
    body: 'text-base text-gray-600 leading-relaxed',
    bodyLarge: 'text-lg text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-500',
    overline: 'text-xs uppercase tracking-wide text-gray-500 font-medium',
  },
  
  // Button classes (matching SOLO marketing website)
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors',
    ai: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
  },
  
  // Card classes
  card: {
    base: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
    hover: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer',
    ai: 'bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6',
    premium: 'bg-white rounded-2xl shadow-lg border border-gray-200 p-8',
  },
  
  // Layout classes
  grid: {
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    bento: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  },
  
  // Spacing classes
  section: 'py-16 md:py-20 lg:py-24',
  sectionSmall: 'py-12 md:py-16',
  sectionLarge: 'py-20 md:py-28 lg:py-32',
};

// Export CSS injection function
export const injectSOLOStyles = () => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = soloDesignTokens;
    document.head.appendChild(styleElement);
  }
};

export default soloTheme;