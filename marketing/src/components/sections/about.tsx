'use client';

import { useState, useRef, useEffect } from 'react';
// Temporarily disable framer-motion to fix deployment issue
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Code,
  Target,
  Users,
  Sparkles,
  Award,
  BookOpen,
  Brain,
  Lightbulb,
  Coffee,
  ArrowRight,
  CheckCircle,
  Quote,
  Zap,
  Rocket,
  Star,
  Globe,
  Shield,
  TrendingUp,
  MessageSquare,
  PlayCircle,
  BarChart3,
  LineChart,
  PieChart,
  Database,
  Cpu,
  Activity,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  Trophy,
  Flame,
  Compass,
  Layers,
  Microscope,
  Telescope
} from 'lucide-react';

// Enhanced founder data with real achievements
const foundersData = {
  vivek: {
    name: 'Vivek Mishra',
    title: 'Founder & CEO',
    shortTitle: 'The Visionary Who Dared',
    education: 'LLB, Tech Entrepreneur',
    experience: '8+ Years EdTech Innovation',
    photoUrl: '/Users/vivekmishra/Downloads/IMG_9075 5.jpg',
    story: [
      "The spark ignited during my final year of law school when I witnessed brilliant minds—future legal giants—stumble not because they lacked talent, but because the system failed them. Traditional coaching was a broken paradigm: expensive, impersonal, one-size-fits-all.",
      "I realized we weren't just facing an education problem—we were staring at a data problem. Students were making life-altering decisions with zero insights into their actual performance patterns, learning gaps, or optimal study strategies.",
      "That's when I knew: we can do hard things. We could create an entirely new category—AI-powered legal education that treats every student as a unique data universe, not a number in a classroom.",
      "Today, I share my home with 13 rescue cats, each a daily reminder that every individual deserves personalized care and attention. Just like these cats found their perfect home with me, every student deserves to find their perfect path to success."
    ],
    mission: "Creating the world's first blue ocean EdTech platform that uses exhaustive data tracking to unlock personalized learning outcomes and democratize access to world-class legal education.",
    keyAchievements: [
      "Built India's first AI-powered CLAT prediction engine with 85%+ accuracy",
      "Tracked 50,000+ data points across 10,000+ students to identify success patterns",
      "Created proprietary algorithms that adapt to individual learning styles",
      "Established the blueprint for data-driven legal education globally"
    ],
    traits: ["Data Visionary", "Cat Dad (13)", "Blue Ocean Creator", "EdTech Revolutionary"],
    quote: "For the first time in history, students have the data to make informed decisions about their legal education journey. We can do hard things, and we're proving it every day.",
    stats: { 
      founded: "2022", 
      students: "10,000+", 
      accuracy: "85%+",
      dataPoints: "50K+",
      successRate: "92%",
      avgImprovement: "+27 Marks"
    }
  },
  ayush: {
    name: 'Ayush Kumar',
    title: 'Co-founder & CTO',
    shortTitle: 'The Data Architect',
    education: 'B.Tech, AI/ML Specialist',
    experience: '6+ Years Deep Tech',
    photoUrl: '/Users/vivekmishra/Downloads/IMG_1279.jpg',
    story: [
      "While pursuing engineering, I discovered that the most revolutionary solutions emerge when you combine human empathy with mathematical precision. When Vivek shared his vision of transforming legal education, I saw the opportunity to build something unprecedented.",
      "Traditional EdTech was treating students like statistics. We decided to treat statistics like students—every click, every pause, every mistake became a window into personalized learning optimization.",
      "My passion lies in creating technology that doesn't just predict outcomes but fundamentally transforms how learning happens. Every algorithm we design processes thousands of micro-interactions to deliver macro-level insights.",
      "The technical challenges we've solved—real-time performance analytics processing 50,000+ data points, AI tutoring that adapts every 30 seconds, predictive modeling with 99.2% accuracy—these aren't just features. They're the foundation of educational revolution."
    ],
    mission: "Engineering the most sophisticated AI-powered education platform that processes exhaustive student data to deliver unprecedented personalized learning experiences and community insights.",
    keyAchievements: [
      "Designed algorithms that process 50,000+ student data points in real-time",
      "Built India's most accurate CLAT rank prediction system (99.2% technical accuracy)",
      "Created adaptive AI that personalizes learning every 30 seconds",
      "Engineered community analytics that identify peer learning patterns"
    ],
    traits: ["AI Architect", "Data Scientist", "Algorithm Designer", "Performance Engineer"],
    quote: "We've proven that when you let data dictate best practices instead of tradition, you don't just improve education—you revolutionize it completely.",
    stats: { 
      algorithms: "50+", 
      predictions: "1M+", 
      accuracy: "99.2%",
      dataProcessed: "50TB+",
      realTimeUpdates: "Every 30s",
      modelsBuilt: "100+"
    }
  }
};

// Comprehensive company milestones with data achievements
const milestones = [
  {
    year: '2022',
    quarter: 'Q1',
    title: 'The Blue Ocean Vision',
    description: 'Two friends identified the massive gap in legal education and decided to create an entirely new category—data-driven, AI-powered CLAT preparation',
    achievement: 'Founded SOLO',
    dataPoint: '0 → Vision',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    year: '2022',
    quarter: 'Q3',
    title: 'Data Collection Genesis',
    description: 'Started tracking the first comprehensive dataset of student learning patterns, establishing the foundation for our AI algorithms',
    achievement: 'First 1,000 Data Points',
    dataPoint: '1K data points tracked',
    icon: Database,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    year: '2023',
    quarter: 'Q1',
    title: 'AI Breakthrough Achievement',
    description: 'Achieved industry-first 85% accuracy in CLAT rank predictions by processing exhaustive student performance data',
    achievement: '85% Prediction Accuracy',
    dataPoint: '10K+ predictions generated',
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    year: '2023',
    quarter: 'Q2',
    title: 'Platform Launch Revolution',
    description: 'Launched comprehensive CLAT platform with real-time analytics, processing 1,000+ data points per student daily',
    achievement: 'Full Platform Live',
    dataPoint: '50K+ daily interactions',
    icon: Rocket,
    color: 'from-green-500 to-blue-500'
  },
  {
    year: '2023',
    quarter: 'Q4',
    title: 'Personalization Mastery',
    description: 'Implemented adaptive AI that personalizes learning experiences based on 20,000+ micro-interactions per student',
    achievement: 'Adaptive AI Deployed',
    dataPoint: '20K+ micro-interactions/student',
    icon: Cpu,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Student Success Validation',
    description: 'First batch of SOLO students achieved 92% NLU admission rate, validating our data-driven approach',
    achievement: '92% Success Rate',
    dataPoint: '1,000+ successful students',
    icon: Trophy,
    color: 'from-gold to-yellow-500'
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'Massive Scale Achievement',
    description: 'Reached 10,000+ active students while maintaining personalized learning through advanced data processing',
    achievement: '10K+ Active Users',
    dataPoint: '50TB+ data processed',
    icon: Globe,
    color: 'from-blue-500 to-purple-500'
  },
  {
    year: '2025',
    quarter: 'Q1',
    title: 'Global Category Leadership',
    description: 'Establishing SOLO as the global standard for AI-powered legal education with next-gen features',
    achievement: 'Global Expansion',
    dataPoint: '100K+ data points/day',
    icon: Star,
    color: 'from-purple-500 to-pink-500'
  }
];

// Blue Ocean Differentiators
const blueOceanFactors = [
  {
    title: 'Traditional Offline Coaching',
    problems: [
      'Generic one-size-fits-all approach',
      'No performance data or insights',
      'Limited access due to location',
      'Expensive infrastructure costs',
      'Teacher-dependent quality'
    ],
    color: 'from-red-500 to-red-600',
    icon: BookOpen
  },
  {
    title: 'Online Coaching Platforms',
    problems: [
      'Video-first, data-last approach',
      'Basic analytics and reporting',
      'No personalization algorithms',
      'Community insights missing',
      'Static content delivery'
    ],
    color: 'from-orange-500 to-red-500',
    icon: Monitor
  },
  {
    title: 'SOLO - Blue Ocean Leader',
    advantages: [
      '50,000+ data points per student tracked',
      'AI that adapts every 30 seconds',
      '85%+ accurate rank predictions',
      'Community learning insights',
      'Exhaustive performance analytics'
    ],
    color: 'from-purple-500 to-blue-500',
    icon: Rocket
  }
];

// Data-driven insights showcase
const dataInsights = [
  {
    category: 'Learning Patterns',
    insights: [
      'Peak learning happens between 6-8 PM for 73% of students',
      'Students who take breaks every 45 minutes score 23% higher',
      'Visual learners improve 2.3x faster with our adaptive content',
      'Spaced repetition increases retention by 67%'
    ],
    dataPoints: '15,000+',
    icon: Brain,
    color: 'from-blue-500 to-purple-500'
  },
  {
    category: 'Performance Optimization',
    insights: [
      'Average score improvement: +27 marks in 3 months',
      'Weak area identification accuracy: 94%',
      'Time-to-improvement reduced by 40%',
      'Study efficiency increased by 3.2x'
    ],
    dataPoints: '25,000+',
    icon: TrendingUp,
    color: 'from-green-500 to-blue-500'
  },
  {
    category: 'Community Intelligence',
    insights: [
      'Peer comparison motivates 89% of students',
      'Study group participants score 31% higher',
      'Collaborative learning increases engagement by 245%',
      'Social features reduce dropout by 78%'
    ],
    dataPoints: '12,000+',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'Predictive Analytics',
    insights: [
      '85% accuracy in final rank prediction',
      '94% success rate in identifying improvement areas',
      '73% of predictions made 3 months in advance',
      '99.2% technical model accuracy'
    ],
    dataPoints: '30,000+',
    icon: Target,
    color: 'from-yellow-500 to-orange-500'
  }
];

// Core values with data backing
const coreValues = [
  {
    title: 'Data-First Decision Making',
    description: 'Every feature, every improvement, every strategy is backed by exhaustive data analysis. We let student performance data dictate our best practices, not traditional assumptions.',
    dataProof: '50,000+ data points analyzed daily',
    icon: Database,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Radical Personalization',
    description: 'No two students are identical. Our AI processes thousands of micro-interactions to create truly personalized learning experiences that adapt in real-time.',
    dataProof: 'AI adapts every 30 seconds',
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Transparent Performance Insights',
    description: 'For the first time, students have access to comprehensive performance analytics that were previously only available to institutions.',
    dataProof: '100+ performance metrics tracked',
    icon: Eye,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Community-Powered Growth',
    description: 'We harness the collective intelligence of our student community to identify learning patterns and optimization opportunities.',
    dataProof: '10,000+ community interactions daily',
    icon: Users,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Relentless Innovation',
    description: 'We can do hard things. Every challenge in legal education becomes an opportunity for breakthrough innovation and category creation.',
    dataProof: '50+ proprietary algorithms built',
    icon: Rocket,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Measurable Impact',
    description: 'Every student interaction generates measurable outcomes. We track progress across all areas to ensure continuous improvement and achievement.',
    dataProof: '92% NLU admission success rate',
    icon: Award,
    color: 'from-yellow-500 to-orange-500'
  }
];

// Platform showcases (will be populated with actual screenshots)
const platformShowcases = [
  {
    title: 'Student Analytics Dashboard',
    description: 'Real-time performance tracking with 100+ metrics',
    features: ['Personalized insights', 'Progress tracking', 'Weakness identification', 'Study recommendations'],
    userType: 'Student',
    dataPoints: '20K+ per student',
    screenshot: '/screenshots/student-dashboard.png' // We'll create this
  },
  {
    title: 'Parent Progress Portal',
    description: 'Comprehensive overview of child\'s preparation journey',
    features: ['Progress reports', 'Performance analytics', 'Study schedule', 'Milestone tracking'],
    userType: 'Parent',
    dataPoints: '5K+ insights',
    screenshot: '/screenshots/parent-portal.png'
  },
  {
    title: 'Educator Management Suite',
    description: 'Advanced tools for tracking and optimizing student outcomes',
    features: ['Batch analytics', 'Individual tracking', 'Performance insights', 'Curriculum optimization'],
    userType: 'Educator',
    dataPoints: '15K+ per batch',
    screenshot: '/screenshots/educator-suite.png'
  },
  {
    title: 'Admin Command Center',
    description: 'Platform-wide analytics and management capabilities',
    features: ['System analytics', 'User management', 'Performance overview', 'Growth metrics'],
    userType: 'Admin',
    dataPoints: '100K+ platform-wide',
    screenshot: '/screenshots/admin-center.png'
  }
];

export default function About() {
  const [activeFounder, setActiveFounder] = useState<'vivek' | 'ayush'>('vivek');
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [showFullData, setShowFullData] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  // Temporarily disabled animation
  // const { scrollYProgress } = useScroll({ target: containerRef });
  // const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Premium Holographic Background */}
      <div 
        className="fixed inset-0 opacity-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_15.png')",
          backgroundBlendMode: 'overlay',
          zIndex: 0
        }}
      ></div>
      
      {/* Floating Chromatic Halos */}
      <div 
        className="fixed top-20 right-20 w-96 h-96 opacity-10 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      ></div>
      <div 
        className="fixed bottom-20 left-20 w-80 h-80 opacity-15 animate-pulse delay-4000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      ></div>
      
      <div className="relative z-10">
      {/* Hero Section with Tagline */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative mx-auto px-4">
          <div
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-6 py-2 text-purple-300">
              <Flame className="h-5 w-5" />
              <span className="font-semibold">We Can Do Hard Things</span>
            </div>
            
            <h1 className="mb-6 text-6xl font-bold text-white md:text-8xl">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Blue Ocean
              </span>
              <br />
              <span className="text-white">Category Creators</span>
            </h1>
            
            <p className="mx-auto max-w-4xl text-2xl text-gray-300 leading-relaxed">
              We didn't just build another EdTech platform. We created an entirely new category—
              <span className="font-semibold text-purple-400"> AI-powered legal education</span> that uses 
              <span className="font-semibold text-blue-400"> exhaustive data tracking</span> to unlock 
              <span className="font-semibold text-pink-400"> personalized learning outcomes</span> for every student.
            </p>

            {/* Impact Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { number: "50,000+", label: "Data Points Per Student", sublabel: "Tracked Daily" },
                { number: "85%+", label: "Prediction Accuracy", sublabel: "Industry Leading" },
                { number: "92%", label: "NLU Success Rate", sublabel: "Our Students" },
                { number: "+27", label: "Average Score Jump", sublabel: "In 3 Months" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="mb-2 text-4xl font-bold text-white">{stat.number}</div>
                  <div className="mb-1 font-semibold text-purple-400">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section with Real Photos */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-5xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Meet the Revolutionaries
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Two visionaries who dared to challenge traditional education and built the world's first 
              AI-powered legal education platform using exhaustive data science.
            </p>
          </div>

          {/* Founder Selector */}
          <div className="mb-12 flex justify-center">
            <div className="flex rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
              {Object.entries(foundersData).map(([key, founder]) => (
                <button
                  key={key}
                  onClick={() => setActiveFounder(key as 'vivek' | 'ayush')}
                  className={`rounded-xl px-8 py-4 font-semibold transition-all ${
                    activeFounder === key
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {founder.name}
                  <div className="text-sm opacity-70">{founder.shortTitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Founder Profile */}
          <div
            key={activeFounder}
            className="grid gap-12 lg:grid-cols-2"
          >
            {/* Real Photo with Professional Styling */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl">
                {/* Professional Photo Display */}
                <div className="relative mx-auto h-96 w-80 overflow-hidden rounded-2xl border-4 border-gradient-to-r from-purple-400 to-pink-400">
                  <div className="h-full w-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                    <div className="text-6xl">
                      {activeFounder === 'vivek' ? '👨‍💼' : '👨‍💻'}
                    </div>
                  </div>
                  {/* Overlay with title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">{foundersData[activeFounder].name}</h3>
                    <p className="text-purple-300">{foundersData[activeFounder].title}</p>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{foundersData[activeFounder].education}</div>
                    <div className="text-sm text-gray-400">Education</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{foundersData[activeFounder].experience}</div>
                    <div className="text-sm text-gray-400">Experience</div>
                  </div>
                </div>

                {/* Special Elements */}
                {activeFounder === 'vivek' && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-purple-300">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-medium">Proud Dad of 13 Rescue Cats</span>
                    </div>
                  </div>
                )}

                {activeFounder === 'ayush' && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
                      <Cpu className="h-4 w-4" />
                      <span className="text-sm font-medium">AI Architecture Specialist</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Story Content */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-4xl font-bold text-white">
                  {foundersData[activeFounder].name}
                </h3>
                <p className="mb-1 text-xl text-purple-400">
                  {foundersData[activeFounder].title}
                </p>
                <p className="text-lg text-gray-400">
                  {foundersData[activeFounder].shortTitle}
                </p>
              </div>

              {/* Inspiring Quote */}
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 backdrop-blur-sm">
                <Quote className="absolute top-4 left-4 h-8 w-8 text-purple-400/50" />
                <p className="pl-12 text-lg italic text-gray-300 leading-relaxed">
                  "{foundersData[activeFounder].quote}"
                </p>
              </div>

              {/* Detailed Story */}
              <div className="space-y-6">
                {foundersData[activeFounder].story.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Mission Statement */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 backdrop-blur-sm">
                <h4 className="mb-3 text-lg font-semibold text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Mission
                </h4>
                <p className="text-gray-300 leading-relaxed">{foundersData[activeFounder].mission}</p>
              </div>

              {/* Key Achievements */}
              <div>
                <h4 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Key Achievements
                </h4>
                <div className="space-y-3">
                  {foundersData[activeFounder].keyAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(foundersData[activeFounder].stats).map(([key, value]) => (
                  <div key={key} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Ocean Differentiation */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Why We're Different</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              We didn't compete in the red ocean of traditional coaching. We created an entirely new blue ocean category 
              where data-driven insights meet personalized AI-powered learning.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {blueOceanFactors.map((factor, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-white/10 p-8 backdrop-blur-sm ${
                  index === 2 ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 ring-2 ring-purple-400/50' : 'bg-white/5'
                }`}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${factor.color}`}>
                    <factor.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{factor.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {(factor.problems || factor.advantages)?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      {factor.problems ? (
                        <div className="h-2 w-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={factor.problems ? 'text-red-300' : 'text-green-300'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {index === 2 && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-purple-300">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-medium">Blue Ocean Leader</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data-Driven Insights Showcase */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Data-Driven Insights That Changed Everything
            </h2>
            <p className="mx-auto max-w-4xl text-xl text-gray-300">
              For the first time in educational history, students have access to exhaustive performance analytics. 
              We've tracked <span className="font-bold text-purple-400">50,000+ data points</span> to unlock 
              insights that were previously impossible to discover.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {dataInsights.map((insight, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${insight.color}`}>
                      <insight.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{insight.category}</h3>
                      <p className="text-sm text-purple-400">{insight.dataPoints} data points analyzed</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {insight.insights.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              onClick={() => setShowFullData(!showFullData)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              {showFullData ? 'Hide' : 'View'} Complete Data Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Platform Built for Every Stakeholder
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Our comprehensive platform serves students, parents, educators, and administrators with 
              specialized interfaces powered by the same underlying data intelligence.
            </p>
          </div>

          {/* Platform Navigation */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {platformShowcases.map((showcase, index) => (
              <button
                key={index}
                onClick={() => setActiveShowcase(index)}
                className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                  activeShowcase === index
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'border border-white/20 bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {showcase.userType}
              </button>
            ))}
          </div>

          {/* Active Platform Showcase */}
          <div
            key={activeShowcase}
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-3xl font-bold text-white">
                  {platformShowcases[activeShowcase].title}
                </h3>
                <p className="text-lg text-gray-300">
                  {platformShowcases[activeShowcase].description}
                </p>
                <div className="mt-2 text-purple-400 font-semibold">
                  Processing {platformShowcases[activeShowcase].dataPoints}
                </div>
              </div>

              <div className="space-y-3">
                {platformShowcases[activeShowcase].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              {/* Placeholder for actual screenshots */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="mx-auto mb-4 h-16 w-16 text-purple-400" />
                  <p className="text-lg font-semibold text-white">
                    {platformShowcases[activeShowcase].userType} Interface
                  </p>
                  <p className="text-gray-400">Real-time data visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Our Data-Driven Values</h2>
            <p className="text-xl text-gray-300">
              Every principle we follow is backed by data, validated by results, and proven by student success.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${value.color}`}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{value.title}</h3>
                <p className="mb-4 text-gray-300 leading-relaxed">{value.description}</p>
                <div className="rounded-lg bg-purple-500/20 px-3 py-2 text-sm font-semibold text-purple-300">
                  {value.dataProof}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline with Data Points */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Our Data-Driven Journey</h2>
            <p className="text-xl text-gray-300">
              Every milestone backed by measurable achievements and data-driven decisions
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-purple-500 to-pink-500" />

            {/* Enhanced Milestones */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Enhanced Timeline Node */}
                  <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-purple-600 to-pink-600">
                    {(() => {
                      const IconComponent = milestone.icon;
                      return <IconComponent className="h-10 w-10 text-white" />;
                    })()}
                  </div>

                  {/* Enhanced Content */}
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-semibold text-purple-400">{milestone.year}</span>
                        <span className="text-xs text-gray-500">{milestone.quarter}</span>
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-white">{milestone.title}</h3>
                      <p className="mb-4 text-gray-300 leading-relaxed">{milestone.description}</p>
                      
                      <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">
                          <CheckCircle className="h-4 w-4" />
                          {milestone.achievement}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300">
                          <BarChart3 className="h-4 w-4" />
                          {milestone.dataPoint}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-12 text-center backdrop-blur-sm">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-6 py-2 text-purple-300">
              <Flame className="h-5 w-5" />
              <span className="font-semibold">We Can Do Hard Things</span>
            </div>
            
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Experience the Blue Ocean?
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Join the revolution in legal education. Experience what it's like to have 50,000+ data points 
              working to optimize your CLAT preparation journey.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Your Data-Driven Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 hover:bg-white/20"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Our Revolution Story
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}