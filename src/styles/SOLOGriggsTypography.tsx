import React from 'react';

// SOLO Griggs Typography System - Premium UI8 Variable Typeface Integration
// Complete integration of Griggs Variable Typeface for professional legal education platform

// Griggs Font Face Declarations
export const griggsTypographyCSS = `
  /* Griggs Sans Regular */
  @font-face {
    font-family: 'Griggs-Sans';
    src: url('/fonts/griggs/Griggs-Sans.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Sans Light */
  @font-face {
    font-family: 'Griggs-Sans';
    src: url('/fonts/griggs/Griggs-LightSans.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Sans SemiBold */
  @font-face {
    font-family: 'Griggs-Sans';
    src: url('/fonts/griggs/Griggs-SemiBoldSans.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Sans Bold */
  @font-face {
    font-family: 'Griggs-Sans';
    src: url('/fonts/griggs/Griggs-BoldSans.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Sans Black */
  @font-face {
    font-family: 'Griggs-Sans';
    src: url('/fonts/griggs/Griggs-BlackSans.otf') format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Serif Regular */
  @font-face {
    font-family: 'Griggs-Serif';
    src: url('/fonts/griggs/Griggs-Serif.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Serif Light */
  @font-face {
    font-family: 'Griggs-Serif';
    src: url('/fonts/griggs/Griggs-LightSerif.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Serif SemiBold */
  @font-face {
    font-family: 'Griggs-Serif';
    src: url('/fonts/griggs/Griggs-SemiBoldSerif.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Serif Bold */
  @font-face {
    font-family: 'Griggs-Serif';
    src: url('/fonts/griggs/Griggs-BoldSerif.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Flare Regular */
  @font-face {
    font-family: 'Griggs-Flare';
    src: url('/fonts/griggs/Griggs-Flare.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Flare Light */
  @font-face {
    font-family: 'Griggs-Flare';
    src: url('/fonts/griggs/Griggs-LightFlare.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Flare SemiBold */
  @font-face {
    font-family: 'Griggs-Flare';
    src: url('/fonts/griggs/Griggs-SemiBoldFlare.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Flare Bold */
  @font-face {
    font-family: 'Griggs-Flare';
    src: url('/fonts/griggs/Griggs-BoldFlare.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Griggs Variable Fonts - Future Enhancement */
  @font-face {
    font-family: 'Griggs-Variable';
    src: url('/fonts/griggs/Griggs-Variable.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-stretch: 75% 125%;
    font-style: oblique 0deg 20deg;
    font-display: swap;
  }
`;

// Enhanced SOLO Typography System with Griggs Integration
export const soloGriggsTheme = {
  typography: {
    // Enhanced font families with Griggs integration
    fontFamily: {
      // Primary: Griggs Sans for clean, modern UI
      primary: ['Griggs-Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      
      // Headings: Mix of Griggs Flare for impact and Griggs Sans for clarity
      heading: ['Griggs-Flare', 'Griggs-Sans', 'Plus Jakarta Sans', 'system-ui'],
      
      // Body: Griggs Sans for readability
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
    
    // Enhanced font sizes with responsive scaling
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      '5xl': ['3rem', { lineHeight: '3rem' }],        // 48px
      '6xl': ['3.75rem', { lineHeight: '3.75rem' }],  // 60px
      '7xl': ['4.5rem', { lineHeight: '4.5rem' }],    // 72px
      '8xl': ['6rem', { lineHeight: '6rem' }],        // 96px
      '9xl': ['8rem', { lineHeight: '8rem' }],        // 128px
    },
    
    // Font weights mapped to Griggs variants
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',      // Griggs Light
      normal: '400',     // Griggs Regular
      medium: '500',
      semibold: '600',   // Griggs SemiBold
      bold: '700',       // Griggs Bold
      extrabold: '800',
      black: '900',      // Griggs Black
    },
    
    // Enhanced letter spacing for better readability
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    
    // Line heights optimized for legal education content
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  }
};

// Typography utility classes for SOLO with Griggs
export const soloGriggsStyles = {
  // Headings with Griggs Flare and Sans
  heading: {
    h1: 'font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900',
    h2: 'font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900', 
    h3: 'font-heading text-2xl md:text-3xl font-bold tracking-tight text-gray-900',
    h4: 'font-heading text-xl md:text-2xl font-semibold tracking-tight text-gray-900',
    h5: 'font-heading text-lg md:text-xl font-semibold text-gray-900',
    h6: 'font-heading text-base md:text-lg font-semibold text-gray-900',
  },
  
  // Body text with Griggs Sans
  text: {
    body: 'font-body text-base text-gray-600 leading-relaxed',
    bodyLarge: 'font-body text-lg text-gray-600 leading-relaxed',
    caption: 'font-body text-sm text-gray-500',
    overline: 'font-body text-xs uppercase tracking-wide text-gray-500 font-medium',
    legal: 'font-legal text-base text-gray-700 leading-loose',
    emphasis: 'font-emphasis text-base font-semibold text-gray-900',
  },
  
  // Special legal typography
  legal: {
    document: 'font-legal text-base text-gray-800 leading-loose max-w-4xl mx-auto',
    case: 'font-legal text-sm italic text-gray-700',
    citation: 'font-mono text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded',
    statute: 'font-legal text-sm font-semibold text-gray-800',
    quote: 'font-legal text-base italic text-gray-700 border-l-4 border-blue-200 pl-4',
  },
  
  // Display typography for marketing and emphasis
  display: {
    hero: 'font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900',
    feature: 'font-display text-3xl md:text-4xl font-bold text-gray-900',
    stat: 'font-display text-4xl md:text-5xl font-black text-blue-600',
    cta: 'font-display text-xl md:text-2xl font-bold text-white',
  },
  
  // Professional contexts (dashboards, analytics)
  professional: {
    metric: 'font-professional text-2xl font-bold text-gray-900',
    label: 'font-professional text-sm font-medium text-gray-600',
    value: 'font-professional text-base font-semibold text-gray-800',
    caption: 'font-professional text-xs text-gray-500',
  }
};

// Responsive typography utilities
export const griggsResponsiveText = {
  // Hero text that scales beautifully
  hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  
  // Feature headlines
  feature: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  
  // Section headlines
  section: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  
  // Body text with appropriate scaling
  body: 'text-sm sm:text-base md:text-lg',
  
  // Captions and small text
  caption: 'text-xs sm:text-sm',
};

// CSS Variables for dynamic typography
export const griggsTypographyTokens = `
  :root {
    /* Griggs Font Families */
    --font-griggs-sans: 'Griggs-Sans', 'Plus Jakarta Sans', system-ui, sans-serif;
    --font-griggs-serif: 'Griggs-Serif', Georgia, serif;
    --font-griggs-flare: 'Griggs-Flare', 'Griggs-Sans', system-ui;
    --font-griggs-variable: 'Griggs-Variable', system-ui, sans-serif;
    
    /* Typography Scale */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    --text-5xl: 3rem;
    --text-6xl: 3.75rem;
    --text-7xl: 4.5rem;
    --text-8xl: 6rem;
    --text-9xl: 8rem;
    
    /* Font Weights */
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    --font-extrabold: 800;
    --font-black: 900;
    
    /* Line Heights */
    --leading-none: 1;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --leading-loose: 2;
    
    /* Letter Spacing */
    --tracking-tighter: -0.05em;
    --tracking-tight: -0.025em;
    --tracking-normal: 0em;
    --tracking-wide: 0.025em;
    --tracking-wider: 0.05em;
    --tracking-widest: 0.1em;
  }
  
  /* Enhanced font loading with fallbacks */
  .font-griggs-sans {
    font-family: var(--font-griggs-sans);
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  }
  
  .font-griggs-serif {
    font-family: var(--font-griggs-serif);
    font-feature-settings: 'kern', 'liga', 'onum';
  }
  
  .font-griggs-flare {
    font-family: var(--font-griggs-flare);
    font-feature-settings: 'kern', 'liga', 'swsh';
  }
  
  /* Legal document typography */
  .legal-document {
    font-family: var(--font-griggs-serif);
    font-size: var(--text-base);
    line-height: var(--leading-loose);
    color: #374151;
  }
  
  /* Professional interface typography */
  .professional-interface {
    font-family: var(--font-griggs-sans);
    font-feature-settings: 'kern', 'liga', 'tnum';
  }
  
  /* Display typography for marketing */
  .display-text {
    font-family: var(--font-griggs-flare);
    font-weight: var(--font-black);
    letter-spacing: var(--tracking-tight);
  }
`;

// Font loading utility
export const loadGriggsFonts = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = griggsTypographyCSS + griggsTypographyTokens;
    document.head.appendChild(style);
    
    // Add font classes to document
    document.documentElement.classList.add('griggs-typography-loaded');
  }
};

// Typography showcase component for design system documentation
export const GriggsTypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-12 p-8 bg-white">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">SOLO Griggs Typography System</h2>
        
        {/* Headings */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Headings (Griggs Flare + Sans)</h3>
          <div className="space-y-4">
            <h1 className={soloGriggsStyles.heading.h1}>Heading 1 - Hero Headlines</h1>
            <h2 className={soloGriggsStyles.heading.h2}>Heading 2 - Section Titles</h2>
            <h3 className={soloGriggsStyles.heading.h3}>Heading 3 - Subsection Titles</h3>
            <h4 className={soloGriggsStyles.heading.h4}>Heading 4 - Component Titles</h4>
            <h5 className={soloGriggsStyles.heading.h5}>Heading 5 - Card Titles</h5>
            <h6 className={soloGriggsStyles.heading.h6}>Heading 6 - Small Headings</h6>
          </div>
        </section>
        
        {/* Body Text */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Body Text (Griggs Sans)</h3>
          <div className="space-y-4 max-w-3xl">
            <p className={soloGriggsStyles.text.body}>
              This is body text using Griggs Sans. It's designed for optimal readability in legal education content, 
              providing excellent legibility at various sizes while maintaining a professional, modern appearance.
            </p>
            <p className={soloGriggsStyles.text.bodyLarge}>
              This is large body text, perfect for introductory paragraphs or important content that needs emphasis.
            </p>
            <p className={soloGriggsStyles.text.caption}>
              This is caption text for supplementary information, metadata, or small details.
            </p>
            <p className={soloGriggsStyles.text.overline}>
              This is overline text for labels and categories
            </p>
          </div>
        </section>
        
        {/* Legal Typography */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Legal Typography (Griggs Serif)</h3>
          <div className="space-y-4">
            <p className={soloGriggsStyles.legal.document}>
              This is legal document text using Griggs Serif, designed for traditional legal readability 
              with proper spacing and classic serif characteristics that legal professionals expect.
            </p>
            <p className={soloGriggsStyles.legal.case}>
              Kesavananda Bharati v. State of Kerala (1973) - Case citation styling
            </p>
            <div className={soloGriggsStyles.legal.citation}>
              AIR 1973 SC 1461
            </div>
            <blockquote className={soloGriggsStyles.legal.quote}>
              "The Constitution is a living document. The founding fathers have, it is said, 
              built better than they knew." - Legal quote formatting
            </blockquote>
          </div>
        </section>
        
        {/* Display Typography */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Display Typography (Griggs Flare)</h3>
          <div className="space-y-6">
            <h1 className={soloGriggsStyles.display.hero}>Hero Display Text</h1>
            <h2 className={soloGriggsStyles.display.feature}>Feature Headlines</h2>
            <div className={soloGriggsStyles.display.stat}>95%</div>
            <div className="bg-blue-600 p-4 rounded-lg inline-block">
              <span className={soloGriggsStyles.display.cta}>Call to Action Text</span>
            </div>
          </div>
        </section>
        
        {/* Professional Interface */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Professional Interface</h3>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className={soloGriggsStyles.professional.metric}>2,847</div>
            <div className={soloGriggsStyles.professional.label}>Total Students</div>
            <div className={soloGriggsStyles.professional.value}>Active Now</div>
            <div className={soloGriggsStyles.professional.caption}>Last updated: 2 minutes ago</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default griggsTypographyCSS;