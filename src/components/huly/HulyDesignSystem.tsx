import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import './HulyDesignSystem.css';

// Import additional components - forward declarations
let HulyFeatures: React.FC;
let HulyDashboardPreview: React.FC;
let HulyPricing: React.FC;
let HulyFooter: React.FC;
import {
  ArrowRight,
  Menu,
  X,
  Play,
  Sparkles,
  Zap,
  BookOpen,
  Users,
  Award,
  Target,
  Brain,
  Layers,
  Shield,
  Globe,
  ChevronDown,
  Check,
  Star,
  MessageSquare,
  BarChart,
  Clock,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Grid,
  List,
  Plus,
  Filter,
  Download,
  Upload,
  Share2,
  Eye,
  Edit,
  Trash2,
  Copy,
  Move,
  Archive,
  Lock,
  Unlock,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Link,
  ExternalLink,
  Code,
  Terminal,
  Cpu,
  Database,
  Cloud,
  Wifi,
  Battery,
  Moon,
  Sun,
  Command
} from 'lucide-react';

// Huly-inspired color palette
const colors = {
  background: {
    primary: '#0a0a0b',
    secondary: '#0f0f10',
    tertiary: '#141416',
    elevated: '#1a1a1d',
    overlay: 'rgba(0, 0, 0, 0.8)'
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
    tertiary: '#707070',
    muted: '#505050'
  },
  accent: {
    primary: '#5865f2',
    secondary: '#7289da',
    success: '#43b581',
    warning: '#faa61a',
    danger: '#f04747',
    info: '#00b0f4'
  },
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tertiary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    dark: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)'
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    heavy: 'rgba(255, 255, 255, 0.15)'
  }
};

// Glass morphism component
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'light' | 'medium' | 'heavy';
  gradient?: boolean;
  onClick?: () => void;
}> = ({ children, className = '', blur = 'md', intensity = 'medium', gradient = false, onClick }) => {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${blurValues[blur]} ${className}`}
      style={{
        backgroundColor: colors.glass[intensity],
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      onClick={onClick}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Minimal Navigation
const HulyNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Product',
      icon: <Layers className="w-4 h-4" />,
      dropdown: ['Features', 'AI Engine', 'Analytics', 'Security']
    },
    {
      label: 'Solutions',
      icon: <Target className="w-4 h-4" />,
      dropdown: ['For Students', 'For Educators', 'For Institutions', 'Enterprise']
    },
    {
      label: 'Resources',
      icon: <BookOpen className="w-4 h-4" />,
      dropdown: ['Documentation', 'API', 'Community', 'Blog']
    },
    {
      label: 'Pricing',
      icon: <Star className="w-4 h-4" />
    }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor: scrolled ? colors.background.overlay : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl">SOLO</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  onMouseEnter={() => item.dropdown && setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.dropdown && <ChevronDown className="w-3 h-3" />}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && dropdownOpen === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48"
                      onMouseEnter={() => setDropdownOpen(item.label)}
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      <GlassCard intensity="heavy" blur="xl">
                        <div className="py-2">
                          {item.dropdown.map((subItem) => (
                            <motion.a
                              key={subItem}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                              whileHover={{ x: 4 }}
                            >
                              {subItem}
                            </motion.a>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="px-5 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <GlassCard intensity="heavy" blur="xl" className="mx-4 mt-2">
              <div className="py-4 px-4 space-y-3">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center space-x-2 text-gray-300 py-2">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.dropdown && (
                      <div className="ml-6 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            className="block py-1 text-xs text-gray-400 hover:text-white"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 space-y-2">
                  <button className="w-full py-2 text-sm text-gray-300 hover:text-white">
                    Sign In
                  </button>
                  <button className="w-full py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                    Get Started
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section with Video Background
const HulyHero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    { icon: <Brain />, text: "AI-Powered Learning" },
    { icon: <Target />, text: "Personalized Study Plans" },
    { icon: <Award />, text: "Real-time Analytics" },
    { icon: <Users />, text: "Collaborative Learning" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 mb-8"
        >
          <GlassCard intensity="light" blur="sm" className="px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-300">New: Claude AI Integration</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-white">Everything you need</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            for CLAT Success
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          AI-powered platform that adapts to your learning style, tracks your progress, 
          and helps you achieve your legal education goals.
        </motion.p>

        {/* Feature Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center space-x-4 mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-3"
            >
              <div className="text-purple-400">
                {React.cloneElement(features[currentFeature].icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <span className="text-white font-medium">{features[currentFeature].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            className="px-8 py-4 text-white rounded-full font-medium flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlassCard intensity="light" blur="md" className="px-8 py-4">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </div>
            </GlassCard>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Active Students', value: '50K+' },
            { label: 'Success Rate', value: '94%' },
            { label: 'Practice Questions', value: '100K+' },
            { label: 'Expert Mentors', value: '500+' }
          ].map((stat) => (
            <GlassCard key={stat.label} intensity="light" blur="md" className="py-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="text-white/50" />
      </motion.div>
    </section>
  );
};

// Export main component
const HulyDesignSystem: React.FC = () => {
  // Lazy load components to avoid circular dependency
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  
  useEffect(() => {
    Promise.all([
      import('./HulyFeatureCards'),
      import('./HulyPricing'),
      import('./HulyFooter')
    ]).then(([featureModule, pricingModule, footerModule]) => {
      HulyFeatures = featureModule.HulyFeatures;
      HulyDashboardPreview = featureModule.HulyDashboardPreview;
      HulyPricing = pricingModule.default;
      HulyFooter = footerModule.default;
      setComponentsLoaded(true);
    });
  }, []);

  if (!componentsLoaded) {
    return (
      <div style={{ backgroundColor: colors.background.primary, minHeight: '100vh' }}>
        <HulyNav />
        <HulyHero />
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: colors.background.primary, minHeight: '100vh' }}>
      <HulyNav />
      <HulyHero />
      <HulyFeatures />
      <HulyDashboardPreview />
      <HulyPricing />
      <HulyFooter />
    </div>
  );
};

export default HulyDesignSystem;
export { GlassCard, HulyNav, HulyHero, colors };