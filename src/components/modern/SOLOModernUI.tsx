import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Play, 
  Sparkles,
  Zap,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Users,
  Shield,
  Globe,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';
import SOLOHolographicGradient from '../effects/SOLOVisualEffectsSystem';
import SOLOGlassIcon from '../icons/SOLOGlassIconsSystem';
import SOLOBusiness3DIcon from '../icons/SOLOBusiness3DIcons';
import styles from './SOLOModernUI.module.css';

// Modern Navigation Component
const SOLOModernNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Features',
      dropdown: [
        { icon: Brain, label: 'AI Learning', description: 'Claude-powered education' },
        { icon: BookOpen, label: 'Legal Content', description: 'Comprehensive CLAT materials' },
        { icon: Target, label: 'Practice Tests', description: '3D quiz system' },
        { icon: TrendingUp, label: 'Analytics', description: 'Performance tracking' }
      ]
    },
    {
      label: 'Resources',
      dropdown: [
        { icon: Shield, label: 'Study Guide', description: 'Complete CLAT preparation' },
        { icon: Users, label: 'Community', description: 'Connect with peers' },
        { icon: Globe, label: 'Blog', description: 'Legal insights & tips' },
        { icon: MessageSquare, label: 'Support', description: '24/7 assistance' }
      ]
    },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-white font-bold text-xl">SOLO</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      {item.dropdown.map((subItem, index) => (
                        <motion.a
                          key={subItem.label}
                          href="#"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors group"
                        >
                          <subItem.icon className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div>
                            <div className="text-white font-medium">{subItem.label}</div>
                            <div className="text-gray-400 text-sm">{subItem.description}</div>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href || '#'}
                    className="block text-white hover:text-blue-400 transition-colors py-2"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
              <div className="pt-4 space-y-3 border-t border-white/10">
                <button className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2">
                  Sign In
                </button>
                <button className="block w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Modern Hero Section
const SOLOModernHero: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const features = [
    'AI-Powered Legal Education',
    'CLAT Preparation Excellence',
    'Personalized Learning Paths',
    'Real-time Performance Analytics',
    '3D Interactive Assessments'
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
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-20">
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 ${styles.animateGradientShift}`} />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Gradient Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm">Powered by Claude AI</span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${styles.animateGradientX}`}>
                Everything App
              </span>
              <br />
              <span className="text-white">for Legal Education</span>
            </h1>
            
            {/* Animated Feature List */}
            <div className="h-8 relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 text-gray-300 text-xl"
                >
                  {features[currentFeature]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
          >
            {[
              { value: '50K+', label: 'Students' },
              { value: '95%', label: 'Success Rate' },
              { value: '1M+', label: 'Questions Solved' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  );
};

// Modern Feature Grid
const SOLOModernFeatures: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Claude AI analyzes your learning patterns and creates personalized study plans',
      image: '/images/features/ai-learning.png',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Target,
      title: '3D Assessment System',
      description: 'Interactive 3D visualizations make complex legal concepts easier to understand',
      image: '/images/features/3d-assessment.png',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your progress with Spotify Wrapped-style insights and predictions',
      image: '/images/features/analytics.png',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Legal Case Studies',
      description: 'Access comprehensive case law database with AI-powered analysis',
      image: '/images/features/case-studies.png',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with peers, share notes, and participate in study groups',
      image: '/images/features/collaboration.png',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Zap,
      title: 'Smart Reminders',
      description: 'AI-driven notifications keep you on track with your study goals',
      image: '/images/features/reminders.png',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> excel in law</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge AI technology with proven legal education methodologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Image */}
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                {/* Placeholder for actual feature image */}
                <div className="w-full h-full flex items-center justify-center">
                  <feature.icon className="w-24 h-24 text-white/20" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400">
                  {feature.description}
                </p>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-blue-400 font-medium"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Modern Showcase Section
const SOLOModernShowcase: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-400 text-sm">Live Dashboard</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              See everything in
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> one place</span>
            </h2>
            
            <p className="text-xl text-gray-400">
              Our unified dashboard brings together all your learning tools, progress tracking, and AI insights in a single, beautiful interface.
            </p>
            
            <ul className="space-y-4">
              {[
                'Real-time performance metrics',
                'AI-generated study recommendations',
                'Interactive 3D visualizations',
                'Collaborative study spaces'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all"
            >
              Explore Dashboard
            </motion.button>
          </motion.div>
          
          {/* Visual Showcase */}
          <div className="relative">
            <motion.div
              style={{ y: y1 }}
              className="relative z-20"
            >
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Mock Dashboard Element */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Learning Progress</p>
                      <p className="text-3xl font-bold text-white">87%</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-3">
                    {[
                      { label: 'Constitutional Law', progress: 92 },
                      { label: 'Criminal Law', progress: 78 },
                      { label: 'Contract Law', progress: 85 }
                    ].map((subject) => (
                      <div key={subject.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{subject.label}</span>
                          <span className="text-white">{subject.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${subject.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -top-8 -right-8 z-10"
            >
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Brain className="w-12 h-12 text-purple-400 mb-2" />
                <p className="text-white font-semibold">AI Insights</p>
                <p className="text-gray-400 text-sm">+24% this week</p>
              </div>
            </motion.div>
            
            <motion.div
              style={{ y: y1 }}
              className="absolute -bottom-8 -left-8 z-10"
            >
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Target className="w-12 h-12 text-blue-400 mb-2" />
                <p className="text-white font-semibold">Daily Goals</p>
                <p className="text-gray-400 text-sm">5/6 completed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modern Footer
const SOLOModernFooter: React.FC = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Roadmap']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Tutorials', 'Blog', 'Community']
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Press', 'Contact']
    },
    {
      title: 'Legal',
      links: ['Terms', 'Privacy', 'Cookies', 'License']
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-xl">SOLO</span>
            </div>
            <p className="text-gray-400 mb-6">
              Everything app for legal education. Powered by Claude AI.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            © 2024 SOLO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Modern UI Component
const SOLOModernUI: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <SOLOModernNav />
      <SOLOModernHero />
      <SOLOModernFeatures />
      <SOLOModernShowcase />
      <SOLOModernFooter />
      
    </div>
  );
};

export default SOLOModernUI;