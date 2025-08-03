import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Play, ChevronDown, Star, Users, Trophy, 
  Zap, Target, Brain, Sparkles, Infinity, Shield,
  Globe, BarChart3, BookOpen, Award, Lightbulb
} from 'lucide-react';
import { SoloLogo } from '../shared/SoloLogo';
import { SoloBentoGrid } from '../shared/SoloBentoGrid';
import { SoloEducationIcon, MedalIcon, TrophyIcon, LightBulbIcon } from '../shared/SoloEducationIcons';

interface AppleStyleLandingProps {
  onGetStarted: () => void;
}

export const AppleStyleLanding: React.FC<AppleStyleLandingProps> = ({ onGetStarted }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Apple-style advanced logo using shape creator
  const AppleLogo = () => (
    <div className="relative group">
      {/* Primary geometric logo shape */}
      <div className="relative w-16 h-16 mx-auto">
        {/* Background holographic gradient */}
        <div className="absolute inset-0 chroma-education-1 rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Main logo shape - sophisticated geometric design */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-white">
            {/* Sophisticated S shape with geometric elements */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>
              </linearGradient>
            </defs>
            
            {/* Main S letterform */}
            <path 
              d="M 20 15 Q 32 8 44 15 Q 50 20 44 28 Q 38 32 32 32 Q 26 32 20 28 Q 14 36 20 44 Q 32 56 44 49 Q 50 45 44 40"
              stroke="url(#logoGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
            
            {/* Geometric accent elements */}
            <circle cx="16" cy="16" r="2" fill="url(#logoGradient)" opacity="0.6"/>
            <circle cx="48" cy="48" r="2" fill="url(#logoGradient)" opacity="0.6"/>
            <circle cx="32" cy="32" r="1.5" fill="url(#logoGradient)" opacity="0.8"/>
            
            {/* Dynamic connecting lines */}
            <line x1="16" y1="16" x2="32" y2="32" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4"/>
            <line x1="32" y1="32" x2="48" y2="48" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Hover effect - additional geometric shapes */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
          <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        </div>
        
        {/* Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-3xl"></div>
      </div>
    </div>
  );

  // Bento grid items for modern layout
  const bentoFeatures = [
    {
      id: 'ai-powered',
      title: 'AI That Thinks',
      description: 'Like You Do',
      size: 'large' as const,
      color: 'primary' as const,
      className: 'chroma-education-1',
      children: (
        <div className="relative h-full flex flex-col justify-between p-8 text-white">
          <div>
            <Brain className="w-12 h-12 mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Intelligence<br/>Amplified</h3>
            <p className="text-white/80 text-lg">Our AI doesn't just test you. It understands how you learn, adapts to your pace, and evolves with your progress.</p>
          </div>
          <div className="flex items-center text-white/60 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by advanced neural networks
          </div>
        </div>
      )
    },
    {
      id: 'performance',
      title: '10,000+',
      description: 'Dreams Realized',
      size: 'medium' as const,
      color: 'success' as const,
      children: (
        <div className="text-center h-full flex flex-col justify-center">
          <TrophyIcon size="xl" />
          <div className="text-4xl font-bold mt-4">10,000+</div>
          <div className="text-sm opacity-80 mt-2">Students who achieved their dreams</div>
          <div className="text-xs opacity-60 mt-1">95% success rate</div>
        </div>
      )
    },
    {
      id: 'innovation',
      title: 'Beyond',
      description: 'Traditional Learning',
      size: 'medium' as const,
      color: 'secondary' as const,
      children: (
        <div className="text-center h-full flex flex-col justify-center">
          <LightBulbIcon size="large" />
          <div className="text-xl font-bold mt-4">Innovation</div>
          <div className="text-sm opacity-80 mt-2">Redefining Education</div>
          <div className="text-xs opacity-60 mt-1">Through Technology</div>
        </div>
      )
    },
    {
      id: 'precision',
      title: 'Precision',
      description: 'Meets Passion',
      size: 'wide' as const,
      color: 'warning' as const,
      children: (
        <div className="flex items-center justify-between h-full p-6">
          <div>
            <Target className="w-8 h-8 mb-3" />
            <div className="text-2xl font-bold">Precision Learning</div>
            <div className="text-sm opacity-80 mt-1">Every question, every concept, perfectly calibrated</div>
          </div>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-12 rounded-full ${i < 4 ? 'bg-current opacity-80' : 'bg-current opacity-30'}`} />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'global',
      title: 'Global',
      description: 'Impact',
      size: 'small' as const,
      children: (
        <div className="text-center h-full flex flex-col justify-center">
          <Globe className="w-8 h-8 mx-auto mb-3" />
          <div className="text-lg font-bold">Global</div>
          <div className="text-xs opacity-80">Reach</div>
        </div>
      )
    },
    {
      id: 'infinite',
      title: 'Limitless',
      description: 'Potential',
      size: 'small' as const,
      children: (
        <div className="text-center h-full flex flex-col justify-center">
          <Infinity className="w-8 h-8 mx-auto mb-3" />
          <div className="text-lg font-bold">Infinite</div>
          <div className="text-xs opacity-80">Possibilities</div>
        </div>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <AppleLogo />
              <div>
                <div className="font-bold text-lg">SOLO</div>
                <div className="text-xs text-gray-400">by Legalight</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm">
              <a href="#innovation" className="text-gray-300 hover:text-white transition-colors">Innovation</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Intelligence</a>
              <a href="#impact" className="text-gray-300 hover:text-white transition-colors">Impact</a>
              <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
            </div>

            <button
              onClick={onGetStarted}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 chroma-education-1 opacity-20"></div>
          <div 
            className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="space-y-8 animate-fadeIn">
            {/* Main tagline */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-thin tracking-tight">
                We can do
                <br />
                <span className="font-bold chroma-text-education">hard things</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                The most advanced AI-powered legal education platform. 
                <br />
                Where intelligence meets ambition.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={onGetStarted}
                className="group bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 flex items-center"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="flex items-center text-white px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Watch the Story
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin mb-6">
              Innovation
              <br />
              <span className="font-bold">Redefined</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We didn't just build another education platform. We reimagined what learning could be 
              when technology truly understands human potential.
            </p>
          </div>

          {/* Modern Bento Grid */}
          <div className="mb-20">
            <SoloBentoGrid items={bentoFeatures} />
          </div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section id="features" className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-thin mb-6">
                  Intelligence
                  <br />
                  <span className="font-bold chroma-text-education">Amplified</span>
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Our AI doesn't just adapt to how you learn. It anticipates what you need, 
                  when you need it. Every interaction makes it smarter. Every challenge makes you stronger.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Brain, title: 'Neural Learning Paths', desc: 'AI that thinks like you do' },
                  { icon: Target, title: 'Precision Targeting', desc: 'Every question perfectly calibrated' },
                  { icon: Zap, title: 'Instant Adaptation', desc: 'Real-time difficulty adjustment' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <div className="w-32 h-32 chroma-education-2 rounded-full flex items-center justify-center">
                    <Brain className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-thin mb-12">
            Global
            <br />
            <span className="font-bold">Impact</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: '10,000+', label: 'Dreams Realized', icon: Users },
              { number: '95%', label: 'Success Rate', icon: Trophy },
              { number: '50M+', label: 'Questions Mastered', icon: BookOpen },
              { number: '#1', label: 'Platform Choice', icon: Award }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2 chroma-text-education">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <blockquote className="text-2xl md:text-3xl font-light text-gray-300 max-w-4xl mx-auto mb-8">
            "SOLO didn't just help me pass CLAT. It transformed how I think about challenges. 
            Now I truly believe we can do hard things."
          </blockquote>
          <cite className="text-gray-500">
            — Ananya Sharma, NLSIU Bangalore, AIR 47
          </cite>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-thin mb-12">
            Experience
            <br />
            <span className="font-bold chroma-text-education">Excellence</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Every detail crafted for those who refuse to settle. Every feature designed for those who dare to dream.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Journey
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg hover:border-white/40 transition-colors">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <AppleLogo />
              <div>
                <div className="font-bold">SOLO by Legalight</div>
                <div className="text-sm text-gray-400">We can do hard things</div>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 SOLO by Legalight. Designed for dreamers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppleStyleLanding;