import React, { useState } from 'react';
import {
  Brain,
  BookOpen,
  Trophy,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Star,
  Target,
  Zap,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  GraduationCap,
  Scale,
  FileText,
  Search,
  Lightbulb,
  Flame,
  CheckCircle,
  ArrowRight,
  Play,
  Volume2,
  Heart,
  Shield,
  Sparkles,
  Globe,
  Camera,
  Mic,
  Video,
  Share,
  Download,
  Edit,
  Plus,
  Eye
} from 'lucide-react';
import { soloStyles, soloTheme } from '../shared/SOLODesignSystem';
import SOLOAIIcon from '../icons/SOLOAIIcons';

interface BentoCardProps {
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'hero';
  title: string;
  description?: string;
  value?: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ElementType;
  aiIcon?: string;
  color: string;
  gradient?: string;
  interactive?: boolean;
  chart?: 'line' | 'bar' | 'pie' | 'area' | 'progress';
  data?: number[];
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  size,
  title,
  description,
  value,
  change,
  icon: Icon,
  aiIcon,
  color,
  gradient,
  interactive = false,
  chart,
  data,
  children,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 min-h-[120px]';
      case 'medium':
        return 'col-span-2 row-span-1 min-h-[120px]';
      case 'large':
        return 'col-span-2 row-span-2 min-h-[280px]';
      case 'wide':
        return 'col-span-3 row-span-1 min-h-[120px]';
      case 'tall':
        return 'col-span-1 row-span-2 min-h-[280px]';
      case 'hero':
        return 'col-span-3 row-span-2 min-h-[280px]';
      default:
        return 'col-span-1 row-span-1 min-h-[120px]';
    }
  };

  const backgroundClass = gradient || color;

  const renderChart = () => {
    if (!chart || !data) return null;

    switch (chart) {
      case 'line':
        return (
          <div className="flex items-end space-x-1 h-16 mt-4">
            {data.map((point, index) => (
              <div key={index} className="flex-1 bg-white/30 rounded-sm transition-all duration-300 hover:bg-white/50" style={{ height: `${point}%` }} />
            ))}
          </div>
        );
      case 'bar':
        return (
          <div className="flex items-end space-x-2 h-16 mt-4">
            {data.map((point, index) => (
              <div key={index} className="w-6 bg-white/30 rounded-t transition-all duration-300 hover:bg-white/50" style={{ height: `${point}%` }} />
            ))}
          </div>
        );
      case 'progress':
        return (
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="h-full bg-white/60 rounded-full transition-all duration-500" style={{ width: `${data[0] || 0}%` }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        ${getSizeClasses()}
        ${backgroundClass}
        rounded-2xl p-6 text-white relative overflow-hidden
        ${interactive ? 'cursor-pointer hover:scale-[1.02] transition-all duration-300' : ''}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern/Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/20 blur-xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10 blur-lg" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            )}
            {aiIcon && (
              <div className="bg-white/20 px-2 py-1 rounded-lg">
                <SOLOAIIcon name={aiIcon} size="small" theme="light" />
              </div>
            )}
          </div>
          
          {interactive && (
            <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`font-semibold mb-2 ${size === 'hero' ? 'text-2xl' : size === 'large' ? 'text-lg' : 'text-base'}`}>
            {title}
          </h3>
          
          {description && (
            <p className={`text-white/80 mb-4 ${size === 'hero' ? 'text-lg' : 'text-sm'} ${size === 'small' ? 'line-clamp-2' : 'line-clamp-3'}`}>
              {description}
            </p>
          )}

          {value && (
            <div className="mb-2">
              <div className={`font-bold ${size === 'hero' ? 'text-4xl' : size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                {value}
              </div>
              {change && (
                <div className={`text-sm flex items-center gap-1 mt-1 ${
                  change.type === 'increase' ? 'text-green-200' : 'text-red-200'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${change.type === 'decrease' ? 'rotate-180' : ''}`} />
                  <span>{Math.abs(change.value)}%</span>
                </div>
              )}
            </div>
          )}

          {children}
        </div>

        {/* Footer/Chart */}
        {renderChart()}
      </div>
    </div>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-max ${className}`}>
      {children}
    </div>
  );
};

const SOLOBentoSystem: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'student' | 'teacher' | 'admin'>('student');

  const studentBentoCards = (
    <>
      {/* Hero Card - Main Performance */}
      <BentoCard
        size="hero"
        title="Your CLAT Journey"
        description="Track your progress across all subjects with AI-powered insights and personalized recommendations for optimal performance."
        value="87%"
        change={{ value: 12, type: 'increase' }}
        icon={GraduationCap}
        aiIcon="ai-progress"
        color="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600"
        interactive
        chart="line"
        data={[40, 60, 45, 70, 85, 78, 87, 92]}
      />

      {/* Quick Stats */}
      <BentoCard
        size="small"
        title="Study Hours"
        value="124h"
        icon={Clock}
        color="bg-gradient-to-br from-green-500 to-emerald-600"
        interactive
      />

      <BentoCard
        size="small"
        title="Rank Prediction"
        value="AIR 245"
        icon={Trophy}
        aiIcon="ai-recommendation"
        color="bg-gradient-to-br from-purple-500 to-pink-500"
        interactive
      />

      {/* AI Features */}
      <BentoCard
        size="medium"
        title="AI Study Planner"
        description="Get personalized study schedules optimized for your learning patterns and goals."
        icon={Brain}
        aiIcon="ai-tutor"
        color="bg-gradient-to-br from-indigo-500 to-blue-600"
        interactive
      >
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/90">Next session in 25 minutes</span>
        </div>
      </BentoCard>

      {/* Performance Breakdown */}
      <BentoCard
        size="tall"
        title="Subject Performance"
        description="Detailed analysis of your strengths and areas for improvement."
        icon={BarChart3}
        color="bg-gradient-to-br from-orange-500 to-red-500"
        interactive
      >
        <div className="space-y-3 mt-4">
          {[
            { subject: 'Constitutional Law', score: 92, color: 'bg-green-400' },
            { subject: 'Legal Reasoning', score: 87, color: 'bg-blue-400' },
            { subject: 'Current Affairs', score: 78, color: 'bg-yellow-400' },
            { subject: 'English', score: 84, color: 'bg-purple-400' }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/90">{item.subject}</span>
                <span className="font-medium">{item.score}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Recent Achievement */}
      <BentoCard
        size="medium"
        title="Latest Achievement"
        description="Constitutional Law Quiz Master - 94% accuracy rate!"
        icon={Award}
        color="bg-gradient-to-br from-yellow-500 to-orange-500"
        interactive
      >
        <div className="flex items-center gap-2 mt-4">
          <Trophy className="w-5 h-5" />
          <span className="text-sm font-medium">7-day study streak</span>
        </div>
      </BentoCard>

      {/* AI Insights */}
      <BentoCard
        size="wide"
        title="AI Insights & Recommendations"
        description="Focus on Contract Law this week - AI detected 15% improvement opportunity based on your learning patterns."
        icon={Lightbulb}
        aiIcon="ai-recommendation"
        color="bg-gradient-to-r from-cyan-500 to-blue-600"
        interactive
      />

      {/* Quick Actions */}
      <BentoCard
        size="small"
        title="Mock Test"
        icon={Target}
        color="bg-gradient-to-br from-teal-500 to-green-600"
        interactive
      >
        <button className="mt-2 text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors">
          Start Now
        </button>
      </BentoCard>

      <BentoCard
        size="small"
        title="AI Tutor"
        icon={Brain}
        aiIcon="chatbot"
        color="bg-gradient-to-br from-violet-500 to-purple-600"
        interactive
      >
        <div className="flex items-center gap-1 mt-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-white/90">Online</span>
        </div>
      </BentoCard>

      {/* Weekly Progress */}
      <BentoCard
        size="medium"
        title="Weekly Progress"
        value="12%"
        change={{ value: 5, type: 'increase' }}
        icon={TrendingUp}
        color="bg-gradient-to-br from-pink-500 to-rose-500"
        chart="progress"
        data={[68]}
        interactive
      />
    </>
  );

  const teacherBentoCards = (
    <>
      {/* Teacher Hero Card */}
      <BentoCard
        size="hero"
        title="Teaching Dashboard"
        description="Monitor student progress, create assignments, and leverage AI to enhance your teaching effectiveness."
        value="156"
        icon={Users}
        aiIcon="ai-tutor"
        color="bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600"
        interactive
      >
        <div className="text-sm text-white/80 mt-2">Active Students</div>
      </BentoCard>

      {/* Quick Stats for Teachers */}
      <BentoCard
        size="small"
        title="Assignments"
        value="23"
        icon={FileText}
        color="bg-gradient-to-br from-blue-500 to-indigo-600"
        interactive
      />

      <BentoCard
        size="small"
        title="Avg Performance"
        value="82%"
        icon={BarChart3}
        color="bg-gradient-to-br from-green-500 to-teal-600"
        interactive
      />

      {/* Class Performance */}
      <BentoCard
        size="large"
        title="Class Performance Overview"
        description="Real-time analytics of your students' progress across different subjects and topics."
        icon={PieChart}
        color="bg-gradient-to-br from-purple-500 to-pink-600"
        interactive
        chart="bar"
        data={[85, 78, 92, 67, 88, 75]}
      />

      {/* AI Teaching Assistant */}
      <BentoCard
        size="wide"
        title="AI Teaching Assistant"
        description="Get intelligent suggestions for lesson plans, identify struggling students, and optimize your teaching methods."
        icon={Brain}
        aiIcon="ai-assistant"
        color="bg-gradient-to-r from-indigo-500 to-purple-600"
        interactive
      />

      <BentoCard
        size="medium"
        title="Student Alerts"
        description="3 students need attention this week"
        icon={Shield}
        color="bg-gradient-to-br from-orange-500 to-red-500"
        interactive
      />
    </>
  );

  const adminBentoCards = (
    <>
      {/* Admin Hero Card */}
      <BentoCard
        size="hero"
        title="Admin Control Center"
        description="Complete oversight of the SOLO platform with advanced analytics, user management, and system optimization tools."
        value="2,847"
        icon={Shield}
        aiIcon="ai-analytics"
        color="bg-gradient-to-br from-gray-700 via-gray-800 to-black"
        interactive
      >
        <div className="text-sm text-white/80 mt-2">Total Users</div>
      </BentoCard>

      {/* System Stats */}
      <BentoCard
        size="small"
        title="Server Status"
        value="99.9%"
        icon={Activity}
        color="bg-gradient-to-br from-green-500 to-emerald-600"
        interactive
      />

      <BentoCard
        size="small"
        title="API Calls"
        value="1.2M"
        icon={Globe}
        color="bg-gradient-to-br from-blue-500 to-cyan-600"
        interactive
      />

      {/* Revenue/Usage */}
      <BentoCard
        size="large"
        title="Platform Analytics"
        description="Comprehensive metrics covering user engagement, feature usage, and system performance."
        icon={LineChart}
        color="bg-gradient-to-br from-violet-500 to-purple-600"
        interactive
        chart="line"
        data={[65, 72, 68, 85, 91, 87, 94, 89]}
      />

      <BentoCard
        size="wide"
        title="User Management"
        description="Advanced user controls, role management, and bulk operations for efficient administration."
        icon={Users}
        color="bg-gradient-to-r from-teal-500 to-green-600"
        interactive
      />
    </>
  );

  const getCurrentCards = () => {
    switch (selectedView) {
      case 'teacher':
        return teacherBentoCards;
      case 'admin':
        return adminBentoCards;
      default:
        return studentBentoCards;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div className={soloStyles.container}>
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-heading">
                  SOLO Bento Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Modern card-based interface for intuitive navigation
                </p>
              </div>
              
              {/* View Selector */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'student', label: 'Student', icon: GraduationCap },
                  { key: 'teacher', label: 'Teacher', icon: BookOpen },
                  { key: 'admin', label: 'Admin', icon: Shield }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedView(key as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedView === key
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className={soloStyles.container}>
        <div className="py-8">
          <BentoGrid>
            {getCurrentCards()}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
export default SOLOBentoSystem;