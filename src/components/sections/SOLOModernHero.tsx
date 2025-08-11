import React, { useState, useEffect } from 'react';
// import Image from 'next/image'; // Removed for React app
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Trophy, 
  ArrowRight,
  Play,
  Sparkles,
  BookOpen,
  GraduationCap,
  Scale,
  Zap,
  Star,
  CheckCircle,
  Globe,
  Award,
  Clock
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo?: () => void;
}

const SOLOModernHero: React.FC<HeroProps> = ({ onGetStarted, onWatchDemo }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: 'AI-Powered Learning',
      description: 'Personalized study plans adapted to your learning style and progress.',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      stats: '95% improvement rate'
    },
    {
      title: 'CLAT Specialization',
      description: 'Comprehensive coverage of all CLAT sections with expert content.',
      icon: Scale,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      stats: '10,000+ questions'
    },
    {
      title: 'Real-time Progress',
      description: 'Track your performance with detailed analytics and insights.',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      stats: '24/7 monitoring'
    },
    {
      title: 'Expert Mentorship',
      description: 'Connect with top legal educators and CLAT toppers.',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      stats: '1000+ mentors'
    }
  ];

  const achievements = [
    { label: 'Students Enrolled', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: Trophy },
    { label: 'Top NLUs', value: '22', icon: Star },
    { label: 'AI Sessions', value: '1M+', icon: Brain }
  ];

  const testimonialHighlights = [
    { text: "SOLO's AI coaching helped me crack NLSIU!", author: "Priya S.", rank: "AIR 23" },
    { text: "The personalized study plan was game-changing.", author: "Rahul M.", rank: "AIR 45" },
    { text: "Best CLAT prep platform with amazing mentors.", author: "Anjali K.", rank: "AIR 67" }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <section className="relative py-20 lg:py-32 lg:pt-44">
        <div className={soloStyles.container}>
          <div className="flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
            
            {/* Left side - Main content */}
            <div className="flex-1 max-w-2xl">
              {/* Brand Badge */}
              <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI-Powered Legal Education</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Main Headline */}
              <h1 className={`${soloStyles.heading.h1} mb-6 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                Master Legal Education with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </h1>

              {/* Subheading */}
              <p className={`${soloStyles.text.bodyLarge} mb-8 ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
                SOLO combines cutting-edge AI technology with expert legal content to deliver 
                personalized CLAT preparation that adapts to your unique learning style and pace.
                <span className="block mt-2 font-medium text-blue-700">
                  Join 50,000+ students who chose SOLO for CLAT success.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
                <button 
                  onClick={onGetStarted}
                  className={`${soloStyles.button.ai} text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all`}
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                {onWatchDemo && (
                  <button 
                    onClick={onWatchDemo}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center group-hover:shadow-xl transition-shadow">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                    <span>Watch Demo</span>
                  </button>
                )}
              </div>

              {/* Quick Stats */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isVisible ? 'animate-fade-in-up animation-delay-800' : 'opacity-0'}`}>
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{achievement.value}</div>
                      <div className="text-sm text-gray-600">{achievement.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side - Interactive Features */}
            <div className="flex-1 flex flex-col justify-center space-y-6 max-lg:pt-10 lg:ps-10">
              
              {/* Dashed Line Separator (Mainline style) */}
              <div className="hidden lg:block absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

              {/* Interactive Features */}
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = index === activeFeature;
                  
                  return (
                    <div
                      key={index}
                      className={`group cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-6 transform scale-105' 
                          : 'hover:bg-white/50 rounded-xl p-4'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="flex gap-3 lg:gap-5">
                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? feature.bgColor : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 transition-colors ${
                            isActive ? feature.color : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className={`font-semibold transition-colors ${
                            isActive ? 'text-gray-900 text-lg' : 'text-gray-700'
                          }`}>
                            {feature.title}
                          </h3>
                          <p className={`text-sm mt-1 transition-all ${
                            isActive ? 'text-gray-600' : 'text-gray-500 max-lg:hidden'
                          }`}>
                            {feature.description}
                          </p>
                          {isActive && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-medium text-green-700">
                                {feature.stats}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Testimonials */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-gray-800">Student Success</span>
                </div>
                <div className="space-y-3">
                  {testimonialHighlights.map((testimonial, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700">"{testimonial.text}"</p>
                        <p className="text-xs text-gray-500 mt-1">
                          - {testimonial.author}, {testimonial.rank}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default SOLOModernHero;