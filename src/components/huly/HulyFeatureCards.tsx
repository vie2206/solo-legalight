import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Target,
  Award,
  Users,
  BarChart,
  Shield,
  Zap,
  Globe,
  Clock,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  TrendingUp,
  FileText,
  Video,
  MessageSquare,
  Calendar,
  Settings
} from 'lucide-react';
import { GlassCard, colors } from './HulyDesignSystem';

// Feature card component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  delay?: number;
}> = ({ icon, title, description, features, gradient, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard intensity="medium" blur="lg" gradient className="h-full p-6 cursor-pointer group">
        <div className="relative">
          {/* Icon with gradient background */}
          <motion.div 
            className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
            style={{ background: gradient }}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white">
              {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
            </div>
          </motion.div>

          {/* Title and description */}
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          {/* Features list */}
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2 text-sm"
              >
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Learn more link */}
          <motion.div
            className="flex items-center space-x-2 text-purple-400 group-hover:text-purple-300 transition-colors"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Hover effect overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 -z-10 rounded-2xl"
                style={{
                  background: `${gradient}20`,
                  filter: 'blur(20px)'
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Main features section
const HulyFeatures: React.FC = () => {
  const features = [
    {
      icon: <Brain />,
      title: "AI-Powered Learning",
      description: "Claude AI integration for personalized study paths and instant explanations",
      features: [
        "Smart content recommendations",
        "Adaptive difficulty adjustment",
        "Real-time performance analysis",
        "Personalized study schedules"
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: <Target />,
      title: "CLAT Preparation",
      description: "Comprehensive test prep with 100,000+ practice questions",
      features: [
        "Full-length mock tests",
        "Section-wise practice",
        "Previous year papers",
        "Detailed solutions"
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: <BarChart />,
      title: "Advanced Analytics",
      description: "Deep insights into your performance and progress",
      features: [
        "Performance tracking",
        "Weakness identification",
        "Peer comparison",
        "Progress predictions"
      ],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: <Users />,
      title: "Collaborative Learning",
      description: "Learn together with peers and expert mentors",
      features: [
        "Study groups",
        "Discussion forums",
        "Live doubt sessions",
        "Peer-to-peer learning"
      ],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      icon: <Shield />,
      title: "Stress Management",
      description: "Mental wellness tools for exam preparation",
      features: [
        "Guided meditation",
        "Stress tracking",
        "Breathing exercises",
        "Wellness activities"
      ],
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      icon: <Zap />,
      title: "Instant Feedback",
      description: "Real-time evaluation and improvement suggestions",
      features: [
        "Instant grading",
        "Detailed explanations",
        "Improvement tips",
        "Performance alerts"
      ],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center space-x-2 mb-4"
        >
          <GlassCard intensity="light" blur="sm" className="px-4 py-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-300">Powerful Features</span>
            </div>
          </GlassCard>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Everything you need to
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> succeed</span>
        </h2>
        <p className="text-lg text-gray-400">
          Comprehensive tools and features designed to maximize your learning potential
        </p>
      </motion.div>

      {/* Features grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explore All Features</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
};

// Dashboard preview section
const HulyDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('student');

  const dashboards = {
    student: {
      title: "Student Dashboard",
      features: ["Study Progress", "Mock Tests", "AI Tutor", "Analytics"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    educator: {
      title: "Educator Dashboard", 
      features: ["Class Management", "Content Creation", "Student Analytics", "Live Sessions"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    parent: {
      title: "Parent Dashboard",
      features: ["Child Progress", "Performance Reports", "Communication", "Schedule"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful dashboards for
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> everyone</span>
          </h2>
          <p className="text-lg text-gray-400">
            Role-specific interfaces designed for optimal user experience
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <GlassCard intensity="light" blur="md" className="inline-flex p-1">
            {Object.keys(dashboards).map((key) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </motion.button>
            ))}
          </GlassCard>
        </div>

        {/* Dashboard preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard intensity="medium" blur="xl" className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - Features */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {dashboards[activeTab as keyof typeof dashboards].title}
                  </h3>
                  <ul className="space-y-3">
                    {dashboards[activeTab as keyof typeof dashboards].features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: dashboards[activeTab as keyof typeof dashboards].gradient }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium inline-flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Right side - Mock dashboard */}
                <div className="relative">
                  <GlassCard intensity="heavy" blur="md" className="aspect-video p-4">
                    <div className="h-full rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4">
                      {/* Mock dashboard elements */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-20 rounded-lg bg-white/5 animate-pulse" />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-32 rounded-lg bg-white/5 animate-pulse" />
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 rounded-xl"
                    style={{ background: dashboards[activeTab as keyof typeof dashboards].gradient }}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export { HulyFeatures, HulyDashboardPreview };