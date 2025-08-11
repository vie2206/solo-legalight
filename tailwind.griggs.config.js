const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Griggs Typography Integration
      fontFamily: {
        // Primary: Griggs Sans for modern UI
        'sans': ['Griggs-Sans', 'Plus Jakarta Sans', ...fontFamily.sans],
        
        // Enhanced font families with Griggs
        'primary': ['Griggs-Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'heading': ['Griggs-Flare', 'Griggs-Sans', 'Plus Jakarta Sans', 'system-ui'],
        'body': ['Griggs-Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'legal': ['Griggs-Serif', 'Georgia', 'serif'],
        'emphasis': ['Griggs-Flare', 'Griggs-Sans', 'system-ui'],
        'professional': ['Griggs-Sans', 'system-ui', 'sans-serif'],
        'display': ['Griggs-Flare', 'Griggs-Sans', 'system-ui'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
        
        // Specific Griggs variants
        'griggs-sans': ['Griggs-Sans', 'system-ui', 'sans-serif'],
        'griggs-serif': ['Griggs-Serif', 'Georgia', 'serif'],
        'griggs-flare': ['Griggs-Flare', 'system-ui', 'sans-serif'],
        'griggs-variable': ['Griggs-Variable', 'system-ui', 'sans-serif'],
      },
      
      // Enhanced font sizes for better hierarchy
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '3.75rem', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '-0.05em' }],
        '8xl': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '8rem', letterSpacing: '-0.05em' }],
      },
      
      // Font weights mapped to Griggs variants
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',    // Griggs Light
        'normal': '400',   // Griggs Regular
        'medium': '500',
        'semibold': '600', // Griggs SemiBold
        'bold': '700',     // Griggs Bold
        'extrabold': '800',
        'black': '900',    // Griggs Black
      },
      
      // Enhanced letter spacing
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      
      // Line heights optimized for legal content
      lineHeight: {
        'none': '1',
        'tighter': '1.1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
        'extra-loose': '2.5',
      },
      
      // SOLO Brand Colors
      colors: {
        // Primary SOLO colors
        'solo': {
          'blue': '#0000ff',
          'blue-light': '#3333ff',
          'blue-dark': '#0000cc',
        },
        
        // Enhanced color palette for AI features
        'ai': {
          '50': '#f0f4ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
        },
        
        // Legal professional colors
        'legal': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
        },
      },
      
      // Typography-specific spacing
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
      },
      
      // Enhanced animation for typography
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      
      // Enhanced shadows for depth
      boxShadow: {
        'text-sm': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        'text-md': '1px 1px 3px rgba(0, 0, 0, 0.1)',
        'text-lg': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'hard': '0 8px 35px rgba(0, 0, 0, 0.15)',
      },
      
      // Backdrop blur for modern glass effects
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      
      // Typography-aware border radius
      borderRadius: {
        'text': '0.25rem',
        'element': '0.5rem',
        'card': '1rem',
        'large': '1.5rem',
      },
    },
  },
  plugins: [
    // Typography plugin for better text handling
    require('@tailwindcss/typography')({
      modifiers: ['sm', 'lg', 'xl', '2xl'],
      className: 'prose',
    }),
    
    // Custom typography utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // Legal document styling
        '.prose-legal': {
          fontFamily: theme('fontFamily.legal'),
          fontSize: theme('fontSize.base')[0],
          lineHeight: theme('lineHeight.loose'),
          color: theme('colors.gray.700'),
          maxWidth: '65ch',
        },
        
        // Professional interface styling
        '.text-professional': {
          fontFamily: theme('fontFamily.professional'),
          fontFeatureSettings: '"kern", "liga", "tnum"',
        },
        
        // Display text styling
        '.text-display': {
          fontFamily: theme('fontFamily.display'),
          fontWeight: theme('fontWeight.black'),
          letterSpacing: theme('letterSpacing.tight'),
          lineHeight: theme('lineHeight.tight'),
        },
        
        // AI feature text
        '.text-ai': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        
        // Emphasis text with Griggs Flare
        '.text-emphasis': {
          fontFamily: theme('fontFamily.emphasis'),
          fontWeight: theme('fontWeight.semibold'),
        },
        
        // Better text rendering
        '.text-crisp': {
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        
        // Responsive text utilities
        '.text-responsive-xs': {
          fontSize: theme('fontSize.sm')[0],
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.base')[0],
          },
        },
        '.text-responsive-sm': {
          fontSize: theme('fontSize.base')[0],
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.lg')[0],
          },
        },
        '.text-responsive-md': {
          fontSize: theme('fontSize.lg')[0],
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.xl')[0],
          },
          '@media (min-width: 768px)': {
            fontSize: theme('fontSize.2xl')[0],
          },
        },
        '.text-responsive-lg': {
          fontSize: theme('fontSize.xl')[0],
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.2xl')[0],
          },
          '@media (min-width: 768px)': {
            fontSize: theme('fontSize.3xl')[0],
          },
          '@media (min-width: 1024px)': {
            fontSize: theme('fontSize.4xl')[0],
          },
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
};