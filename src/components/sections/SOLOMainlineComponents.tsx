import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Star, 
  ArrowRight, 
  ChevronRight,
  Play,
  Pause,
  Quote,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Brain,
  Shield,
  Trophy,
  Zap,
  Target,
  Globe,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Download,
  Heart,
  Share,
  Eye,
  MessageSquare,
  ThumbsUp,
  Calendar,
  Clock,
  Bookmark
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';
import SOLOAIIcon from '../icons/SOLOAIIcons';

// Mainline-style Pricing Component adapted for SOLO
interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  aiFeatures?: string[];
}

const SOLOMainlinePricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const pricingTiers: PricingTier[] = [
    {
      name: 'Foundation',
      price: billingCycle === 'yearly' ? '₹2,999' : '₹349',
      period: billingCycle === 'yearly' ? '/year' : '/month',
      description: 'Perfect for CLAT beginners starting their preparation journey',
      features: [
        'Access to all CLAT subjects',
        'Basic practice questions (5,000+)',
        'Weekly mock tests',
        'Progress tracking',
        'Mobile app access',
        'Email support'
      ],
      buttonText: 'Start Foundation'
    },
    {
      name: 'Professional',
      price: billingCycle === 'yearly' ? '₹5,999' : '₹699',
      period: billingCycle === 'yearly' ? '/year' : '/month',
      description: 'Advanced preparation with AI-powered features for serious aspirants',
      features: [
        'Everything in Foundation',
        'AI-powered study planner',
        'Advanced practice questions (15,000+)',
        'Live doubt-clearing sessions',
        'Personalized performance analytics',
        'AI text explainer & vocabulary builder',
        'Priority support'
      ],
      highlighted: true,
      buttonText: 'Go Professional',
      aiFeatures: [
        'AI Study Planner',
        'Smart Recommendations',
        'AI Text Explainer',
        'Vocabulary AI'
      ]
    },
    {
      name: 'Elite',
      price: billingCycle === 'yearly' ? '₹9,999' : '₹1,199',
      period: billingCycle === 'yearly' ? '/year' : '/month',
      description: 'Complete CLAT mastery with 1-on-1 mentorship and premium AI features',
      features: [
        'Everything in Professional',
        '1-on-1 expert mentorship',
        'All practice questions (25,000+)',
        'AI rank predictor 3D system',
        'Advanced case analysis tools',
        'Unlimited AI tutoring sessions',
        'White-glove onboarding',
        'Dedicated success manager'
      ],
      buttonText: 'Choose Elite',
      aiFeatures: [
        'Complete AI Suite',
        '3D Rank Predictor',
        'AI Mentor',
        'Advanced Analytics'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className={soloStyles.container}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Flexible Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Choose Your Path to <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CLAT Success
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Start with our Foundation plan and upgrade as you progress. All plans include our core CLAT preparation materials.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
                tier.highlighted
                  ? 'border-blue-500 shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600">{tier.period}</span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </div>

              {/* AI Features Badge */}
              {tier.aiFeatures && (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <SOLOAIIcon name="brain-ai" size="small" />
                    <span className="font-semibold text-purple-800">AI-Powered Features</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {tier.aiFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-purple-500 rounded-full" />
                        <span className="text-purple-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {tier.buttonText}
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 7-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mainline-style Feature Showcase adapted for SOLO
const SOLOMainlineFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'AI-Powered Learning Intelligence',
      description: 'Advanced machine learning algorithms analyze your learning patterns and adapt content delivery for optimal retention and performance.',
      icon: Brain,
      aiIcon: 'neural-network',
      benefits: [
        'Personalized study schedules based on your peak performance hours',
        'Adaptive difficulty adjustment as you progress through topics',
        'Intelligent content recommendations to fill knowledge gaps',
        'Real-time performance optimization suggestions'
      ],
      stats: '95% improvement rate',
      gradient: 'bg-gradient-to-br from-purple-500 to-blue-600'
    },
    {
      title: 'Comprehensive CLAT Coverage',
      description: 'Complete coverage of all five CLAT sections with expert-curated content, updated annually to reflect the latest exam patterns.',
      icon: BookOpen,
      aiIcon: 'legal-ai',
      benefits: [
        '25,000+ practice questions across all subjects',
        'Latest constitutional amendments and current affairs',
        'Landmark case studies with detailed analysis',
        'Section-wise performance tracking and analytics'
      ],
      stats: '100% syllabus coverage',
      gradient: 'bg-gradient-to-br from-blue-500 to-teal-600'
    },
    {
      title: 'Interactive Learning Experience',
      description: 'Engage with content through immersive simulations, interactive case studies, and gamified learning modules.',
      icon: Target,
      aiIcon: 'smart-quiz',
      benefits: [
        '3D courtroom simulations for practical legal scenarios',
        'Interactive constitutional timeline and case maps',
        'Gamified learning with achievements and progress tracking',
        'Collaborative study groups and peer learning features'
      ],
      stats: '4.9/5 engagement score',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="py-20 bg-white">
      <div className={soloStyles.container}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Cutting-Edge Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Everything You Need for <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CLAT Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover the features that make SOLO the preferred choice for serious CLAT aspirants
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-2 flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeFeature === index
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Feature {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Feature Display */}
        <div className="max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                activeFeature === index ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-purple-100 px-3 py-1 rounded-lg">
                      <SOLOAIIcon name={feature.aiIcon} size="medium" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">
                      {feature.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`${feature.gradient} p-6 rounded-xl text-white`}>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6" />
                      <span className="text-lg font-semibold">{feature.stats}</span>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className={`${feature.gradient} rounded-3xl p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                    
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <feature.icon className="w-20 h-20 mx-auto mb-4 opacity-80" />
                        <h4 className="text-2xl font-bold mb-2">{feature.title}</h4>
                        <div className="w-16 h-1 bg-white/50 mx-auto rounded-full" />
                      </div>
                      
                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-white/30 rounded-full mb-2" style={{ width: `${80 + item * 5}%` }} />
                              <div className="h-1 bg-white/20 rounded-full" style={{ width: `${60 + item * 10}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mainline-style Testimonials with enhanced design
const SOLOMainlineTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'NLSIU Bangalore',
      rank: 'AIR 23',
      content: 'SOLO\'s AI-powered study planner was a game-changer. The personalized approach helped me identify my weak areas and focus my preparation effectively. The 3D rank predictor kept me motivated throughout my journey.',
      avatar: '👩‍💼',
      rating: 5,
      subjects: ['Constitutional Law', 'Legal Reasoning'],
      improvement: '+45%'
    },
    {
      name: 'Rahul Mehta',
      role: 'NALSAR Hyderabad',
      rank: 'AIR 67',
      content: 'The AI text explainer feature made complex legal concepts crystal clear. I could highlight any text and get instant, contextual explanations. This saved me hours of research time.',
      avatar: '👨‍💻',
      rating: 5,
      subjects: ['Current Affairs', 'English'],
      improvement: '+38%'
    },
    {
      name: 'Anjali Patel',
      role: 'WBNUJS Kolkata',
      rank: 'AIR 89',
      content: 'The comprehensive coverage and regular updates kept me ahead of the curve. The mock tests with AI feedback helped me understand my mistakes and improve consistently.',
      avatar: '👩‍🎓',
      rating: 5,
      subjects: ['Legal Knowledge', 'Logical Reasoning'],
      improvement: '+52%'
    },
    {
      name: 'Arjun Singh',
      role: 'RGNUL Punjab',
      rank: 'AIR 145',
      content: 'SOLO\'s stress management features were incredibly helpful during the intense preparation phase. The breathing exercises and wellness tracking kept me mentally prepared for the exam.',
      avatar: '👨‍⚖️',
      rating: 5,
      subjects: ['All Subjects'],
      improvement: '+41%'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className={soloStyles.container}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-600 fill-current" />
            <span className="text-sm font-medium text-yellow-800">Student Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Join Thousands of <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Successful Students
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how SOLO has helped students achieve their dream NLU admissions
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-semibold text-yellow-700">{testimonial.rank}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="bg-green-100 px-2 py-1 rounded-full">
                    <span className="text-xs font-semibold text-green-700">{testimonial.improvement} improvement</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2">
                {testimonial.subjects.map((subject, subIndex) => (
                  <span key={subIndex} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Student Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">22</div>
              <div className="text-gray-600">Top NLUs Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SOLOMainlinePricing, SOLOMainlineFeatures, SOLOMainlineTestimonials };