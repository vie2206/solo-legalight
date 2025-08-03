import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Users, BookOpen, Award, Star, TrendingUp,
  CheckCircle, ArrowRight, Phone, Mail, MapPin, Globe,
  Zap, Target, Brain, Trophy, Lightbulb, BarChart3
} from 'lucide-react';
import { SoloLogo, SoloLogoBranded } from '../shared/SoloLogo';
import { SoloCard } from '../shared/SoloCard';
import { SoloBentoGrid } from '../shared/SoloBentoGrid';
import { SoloEducationIcon, MedalIcon, TrophyIcon, LightBulbIcon } from '../shared/SoloEducationIcons';
import { SoloButton } from '../shared/SoloButton';

interface SoloLandingPageProps {
  onGetStarted: () => void;
}

const SoloLandingPage: React.FC<SoloLandingPageProps> = ({ onGetStarted }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Hero Stats using Bento Grid
  const heroStats = [
    {
      id: 'students',
      title: '10,000+',
      description: 'Students Empowered',
      size: 'small' as const,
      color: 'primary' as const,
      icon: Users,
      children: (
        <div className="text-center">
          <SoloEducationIcon name="graduation" size="medium" />
          <div className="mt-2 text-2xl font-bold">10K+</div>
          <div className="text-sm opacity-80">Active Learners</div>
        </div>
      )
    },
    {
      id: 'success',
      title: '95%',
      description: 'Success Rate',
      size: 'small' as const,
      color: 'success' as const,
      icon: TrendingUp,
      children: (
        <div className="text-center">
          <TrophyIcon size="medium" />
          <div className="mt-2 text-2xl font-bold">95%</div>
          <div className="text-sm opacity-80">Success Rate</div>
        </div>
      )
    },
    {
      id: 'rank',
      title: '#1',
      description: 'CLAT Prep Platform',
      size: 'small' as const,
      color: 'warning' as const,
      icon: Award,
      children: (
        <div className="text-center">
          <MedalIcon size="medium" />
          <div className="mt-2 text-2xl font-bold">#1</div>
          <div className="text-sm opacity-80">Ranked Platform</div>
        </div>
      )
    },
    {
      id: 'ai',
      title: 'AI-Powered',
      description: 'Personalized Learning',
      size: 'medium' as const,
      color: 'secondary' as const,
      icon: Brain,
      children: (
        <div className="text-center">
          <LightBulbIcon size="large" />
          <div className="mt-4">
            <div className="text-xl font-bold">AI-Powered</div>
            <div className="text-sm opacity-80 mt-1">Personalized Learning Paths</div>
            <div className="text-xs opacity-70 mt-2">Advanced algorithms adapt to your learning style</div>
          </div>
        </div>
      )
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized study paths that adapt to your learning style and pace.',
      color: 'bg-solo-primary'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Complete CLAT syllabus with 10,000+ questions and detailed explanations.',
      color: 'bg-solo-secondary'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track your progress with detailed performance analytics and insights.',
      color: 'bg-solo-success'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Get guidance from top CLAT educators and successful law students.',
      color: 'bg-solo-warning'
    },
    {
      icon: Trophy,
      title: 'Mock Tests',
      description: 'Unlimited practice tests with instant results and performance analysis.',
      color: 'bg-solo-error'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set targets, track milestones, and achieve your dream law school admission.',
      color: 'bg-solo-info'
    }
  ];

  const testimonials = [
    {
      name: 'Ananya Sharma',
      role: 'NLSIU, Bangalore',
      image: '👩‍🎓',
      quote: 'SOLO by Legalight transformed my CLAT preparation. The AI-powered study plan helped me score 95+ percentile!',
      rank: 'AIR 47'
    },
    {
      name: 'Rohan Patel',
      role: 'NALSAR, Hyderabad',
      image: '👨‍🎓',
      quote: 'The mock tests and detailed analytics were game-changers. I could identify my weak areas and improve systematically.',
      rank: 'AIR 23'
    },
    {
      name: 'Priya Gupta',
      role: 'ILS Law College, Pune',
      image: '👩‍💼',
      quote: 'Amazing platform! The comprehensive content and expert mentorship helped me crack CLAT in my first attempt.',
      rank: 'AIR 156'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₹999',
      period: '/month',
      features: [
        '1,000+ Practice Questions',
        '5 Mock Tests/month',
        'Basic Performance Analytics',
        'Email Support',
        'Mobile App Access'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '₹1,999',
      period: '/month',
      features: [
        '10,000+ Practice Questions',
        'Unlimited Mock Tests',
        'AI-Powered Study Plans',
        'Detailed Analytics & Insights',
        'Expert Mentorship',
        'Priority Support',
        'All-India Rank Prediction'
      ],
      popular: true
    },
    {
      name: 'Elite',
      price: '₹2,999',
      period: '/month',
      features: [
        'Everything in Pro',
        '1-on-1 Expert Sessions',
        'Custom Study Materials',
        'Interview Preparation',
        'College Admission Guidance',
        'Scholarship Assistance',
        '24/7 Support'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-solo-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <SoloLogoBranded size="medium" />
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-solo-gray-700 hover:text-solo-primary transition-colors">Features</a>
              <a href="#testimonials" className="text-solo-gray-700 hover:text-solo-primary transition-colors">Success Stories</a>
              <a href="#pricing" className="text-solo-gray-700 hover:text-solo-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-solo-gray-700 hover:text-solo-primary transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-solo-gray-700 hover:text-solo-primary font-medium">
                Sign In
              </button>
              <SoloButton onClick={onGetStarted} size="small">
                Get Started
              </SoloButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Chroma Background */}
        <div className="absolute inset-0 chroma-education-1 opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-solo-primary-light text-solo-primary rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  #1 CLAT Preparation Platform
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold font-jakarta leading-tight">
                  Master <span className="chroma-text-education">CLAT</span> with{' '}
                  <span className="text-solo-primary">AI-Powered</span> Learning
                </h1>
                
                <p className="text-xl text-solo-gray-600 leading-relaxed">
                  Join 10,000+ successful students who cracked CLAT with our comprehensive, 
                  AI-driven preparation platform. Get personalized study plans, unlimited mock tests, 
                  and expert mentorship.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SoloButton 
                  onClick={onGetStarted}
                  size="large"
                  className="chroma-button"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </SoloButton>
                
                <button className="flex items-center justify-center px-8 py-4 border-2 border-solo-primary text-solo-primary rounded-xl font-semibold hover:bg-solo-primary hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-solo-primary rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-solo-gray-600">10,000+ students</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-solo-gray-600 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Hero Stats Bento Grid */}
            <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0 transform translate-x-10'}`}>
              <SoloBentoGrid items={heroStats} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-solo-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-jakarta mb-4">
              Why Choose <span className="chroma-text-education">SOLO by Legalight</span>?
            </h2>
            <p className="text-xl text-solo-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with proven teaching methodologies 
              to give you the best CLAT preparation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <SoloCard
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 chroma-card"
              >
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.color} text-white mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold font-jakarta">{feature.title}</h3>
                  <p className="text-solo-gray-600">{feature.description}</p>
                  
                  <button className="inline-flex items-center text-solo-primary font-semibold group-hover:text-solo-primary-dark transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SoloCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 chroma-education-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-jakarta mb-4 text-white">
              Success Stories
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hear from our successful students who achieved their dream law school admissions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-white/80">{testimonial.role}</p>
                    <div className="inline-flex items-center px-2 py-1 bg-white/20 rounded-full text-xs font-semibold mt-1">
                      <Trophy className="w-3 h-3 mr-1" />
                      {testimonial.rank}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-white/90 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-jakarta mb-4">
              Choose Your <span className="chroma-text-education">Success Plan</span>
            </h2>
            <p className="text-xl text-solo-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed for every student's needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-solo-primary bg-solo-primary-light/10 scale-105' 
                    : 'border-solo-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-solo-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold font-jakarta mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-solo-gray-600">{plan.period}</span>
                  </div>
                  
                  <SoloButton 
                    variant={plan.popular ? 'primary' : 'ghost'}
                    className="w-full mb-8"
                    onClick={onGetStarted}
                  >
                    Get Started
                  </SoloButton>
                  
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-solo-success mr-3 flex-shrink-0" />
                        <span className="text-solo-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 chroma-education-2">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-jakarta">
              Ready to Ace CLAT 2025?
            </h2>
            
            <p className="text-xl text-white/90">
              Join thousands of successful students and start your journey today. 
              Get instant access to our AI-powered platform with a free trial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SoloButton 
                onClick={onGetStarted}
                size="large"
                variant="secondary"
                className="bg-white text-solo-primary hover:bg-solo-gray-100"
              >
                Start Free Trial
                <Zap className="w-5 h-5 ml-2" />
              </SoloButton>
              
              <button className="flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-solo-primary transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Call +91 98765 43210
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-solo-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <SoloLogo variant="stacked" size="medium" />
              <p className="text-solo-gray-400">
                Empowering law aspirants with AI-powered education technology since 2024.
              </p>
              <div className="flex space-x-4">
                {/* Social Links */}
                <div className="w-10 h-10 bg-solo-primary rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-solo-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-solo-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-3 text-solo-gray-400">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-solo-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-solo-primary" />
                  <span>hello@legalight.org.in</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-solo-primary" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-solo-gray-700 mt-12 pt-8 text-center text-solo-gray-400">
            <p>&copy; 2024 SOLO by Legalight. All rights reserved. Made with ❤️ for law aspirants.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SoloLandingPage;