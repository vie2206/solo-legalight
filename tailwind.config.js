/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // SOLO by Legalight Brand Colors
        'solo': {
          'primary': '#00A1FF',
          'primary-dark': '#0091E5',
          'primary-light': 'rgba(0, 161, 255, 0.125)',
          'primary-hover': '#0085D9',
          
          'secondary': '#8965E5',
          'secondary-dark': '#7c57d9',
          'secondary-light': 'rgba(137, 101, 229, 0.125)',
          
          'success': '#00ceb6',
          'success-light': 'rgba(0, 206, 182, 0.145)',
          'success-dark': '#10bd9d',
          
          'warning': '#FFB900',
          'warning-light': 'rgba(255, 185, 0, 0.145)',
          'warning-dark': '#d9941a',
          
          'error': '#FF6692',
          'error-light': 'rgba(255, 102, 146, 0.188)',
          'error-dark': '#d9577c',
          
          'info': '#46caeb',
          'info-light': 'rgba(70, 202, 235, 0.145)',
          'info-dark': '#3cacc8',
          
          'dark': '#111c2d',
          'gray': {
            900: '#1A2537',
            800: '#2A3851',
            700: '#333F55',
            600: '#2a3547',
            500: '#7b8893',
            400: '#cfd6db',
            300: '#e0e6eb',
            200: '#EFF4FA',
            100: '#F6F9FC',
            50: '#F8FAFD',
          },
          
          'education': {
            'primary': '#0A7EA4',
            'secondary': '#CCDA4E',
            'accent': '#47D7BC',
          }
        },
        
        // Legacy colors (keeping for backwards compatibility)
        'brand': {
          'dark': '#363535',
          'coral': '#fb5053', 
          'yellow': '#ffdd6d',
          'light': '#f4f212',
        },
        'bright': {
          'green': '#B6FA82',
          'orange': '#FB6D39', 
          'black': '#000000',
          'gray': '#EFEDEE',
        },
        'subject': {
          'math': '#7dd3fc',
          'history': '#fdba74',
          'physics': '#a78bfa',
          'biology': '#86efac',
          'spanish': '#fca5a5',
          'english': '#fde047',
        }
      },
      
      // MaterialM-inspired shadows
      boxShadow: {
        'sm': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
        'md': '0px 1px 4px 0px rgba(133, 146, 173, 0.2)',
        'lg': '0 1rem 3rem rgba(0, 0, 0, 0.175)',
        'xl': '0px 12px 30px -2px rgba(58, 75, 116, 0.14)',
        '2xl': '0px 24px 24px -12px rgba(0, 0, 0, 0.05)',
        'holographic': '0px 24px 24px -12px rgba(99, 91, 255, 0.15)',
        'dark-md': 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.02) 0px 12px 24px -4px',
        'btn': '0 17px 20px -8px rgba(77, 91, 236, .231372549)',
        'card': '0px 12px 30px -2px rgba(58,75,116,0.14)',
      },
      
      // Custom border radius
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'tw': '12px',
      },
      
      // Typography
      fontSize: {
        '13': '13px',
        '15': '15px',
        '17': '17px',
        '22': '22px',
        '28': '28px',
        '34': '34px',
        '40': '40px',
        '44': '44px',
        '50': '50px',
        '56': '56px',
        '64': '64px',
      },
      
      // Spacing
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Layout
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      // Animation
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      
      // Background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-solo-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-solo-2': 'linear-gradient(135deg, #00A1FF 0%, #8965E5 100%)',
        'gradient-solo-3': 'linear-gradient(135deg, #0A7EA4 0%, #47D7BC 100%)',
        'gradient-holographic': 'linear-gradient(135deg, #00A1FF 0%, #8965E5 25%, #47D7BC 50%, #CCDA4E 75%, #00A1FF 100%)',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}