import React from 'react';
import { ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { PerformanceStats } from '../../types';
import { cn } from '../../utils';

interface AnalyticsViewProps {
  stats: PerformanceStats;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ stats }) => {
  const subjectData = [
    { subject: 'Reading Comprehension', accuracy: 85, trend: '+5%', avgTime: '2.5 min', strength: 'High', color: '#87CEEB', improvement: 'excellent' },
    { subject: 'Legal Reasoning', accuracy: 78, trend: '+8%', avgTime: '3.1 min', strength: 'Medium', color: '#F4A460', improvement: 'good' },
    { subject: 'Logical Reasoning', accuracy: 82, trend: '+3%', avgTime: '2.8 min', strength: 'High', color: '#87CEFA', improvement: 'good' },
    { subject: 'Current Affairs', accuracy: 88, trend: '+2%', avgTime: '1.2 min', strength: 'High', color: '#90EE90', improvement: 'stable' },
    { subject: 'Quantitative', accuracy: 72, trend: '+12%', avgTime: '3.8 min', strength: 'Low', color: '#FFB6C1', improvement: 'improving' }
  ];

  const monthlyScores = [65, 68, 72, 75, 78.5];
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

  return (
    <div className="space-y-6">
      {/* Main Analytics Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#363535' }}>📊 Personalized Performance Analytics</h2>
            <p className="text-gray-500 mt-1">AI-powered insights tailored to your learning journey</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: '#87CEEB' }}>
              <ChartBarIcon className="w-6 h-6" style={{ color: '#363535' }} />
            </div>
            <div className="p-3 rounded-2xl" style={{ backgroundColor: '#ffdd6d' }}>
              <SparklesIcon className="w-6 h-6" style={{ color: '#363535' }} />
            </div>
          </div>
        </div>
        
        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <OverviewCard
            title="Study Hours"
            value={stats.totalHours}
            change="+15% from last month"
            target="150hrs"
            color="#87CEEB"
          />
          <OverviewCard
            title="Questions Mastered"
            value={stats.questionsAttempted}
            change={`${stats.accuracyRate}% accuracy rate`}
            target="1,500"
            color="#90EE90"
          />
          <OverviewCard
            title="Performance Score"
            value={stats.averageScore}
            change={`+${stats.monthlyImprovement}% improvement`}
            target="85"
            color="#FFB6C1"
          />
          <OverviewCard
            title="All India Rank"
            value={stats.clatRank}
            change="↑ 891 positions"
            target="<2,000"
            color="#F4A460"
          />
        </div>
        
        {/* Learning Pattern Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#363535' }}>📈 Performance Trajectory</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Monthly Progress Trend</span>
                  <span className="text-sm font-bold text-green-600">📈 Upward Trend</span>
                </div>
                <div className="h-32 flex items-end space-x-2">
                  {monthlyScores.map((score, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t-lg transition-all duration-500" 
                        style={{ 
                          height: `${(score / 85) * 100}%`, 
                          backgroundColor: idx === 4 ? '#ffdd6d' : '#87CEEB',
                          minHeight: '20px'
                        }}
                      ></div>
                      <span className="text-xs mt-2 font-semibold" style={{ color: '#363535' }}>{score}%</span>
                      <span className="text-xs text-gray-500">{months[idx]}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <MetricCard label="Points Gained" value="+13.5" color="text-green-600" />
                <MetricCard label="Months" value="5" color="text-blue-600" />
                <MetricCard label="Avg Gain/Month" value="2.7" color="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#363535' }}>🎯 Learning Velocity</h3>
            <div className="space-y-4">
              <VelocityCard
                title="Current Pace"
                status="Accelerating"
                value="+12.5%"
                description="Improvement this month"
                color="green"
              />
              <VelocityCard
                title="Study Consistency"
                status="Excellent"
                value="87%"
                description="Schedule adherence"
                color="blue"
              />
              <VelocityCard
                title="Focus Score"
                status="Good"
                value="78/100"
                description="Concentration index"
                color="purple"
              />
            </div>
          </div>
        </div>
        
        {/* Subject-wise Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#363535' }}>📚 Subject Mastery Analysis</h3>
            <div className="space-y-4">
              {subjectData.map((subject, idx) => (
                <SubjectCard key={idx} subject={subject} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#363535' }}>🧠 AI-Powered Insights</h3>
            <div className="space-y-4">
              <InsightCard
                icon="💡"
                title="Key Strength Identified"
                content="Your Current Affairs performance (88%) is exceptional and consistently improving. This is your competitive advantage!"
                impact="Impact: This strength can boost your overall score by 8-12 points in actual CLAT"
                color="yellow"
              />
              <InsightCard
                icon="🎯"
                title="Priority Focus Area"
                content="Quantitative Techniques needs attention (72% accuracy). However, you're showing +12% improvement trend!"
                impact="Recommendation: 20 minutes daily practice can improve this to 80%+ in 3 weeks"
                color="red"
              />
              <InsightCard
                icon="⚡"
                title="Optimal Study Pattern"
                content="Analysis shows you perform best between 2-4 PM with 90 min focused sessions followed by 15 min breaks."
                impact="Peak Performance Window: 2:00 PM - 4:00 PM (85% accuracy rate)"
                color="blue"
              />
              <InsightCard
                icon="📊"
                title="Progress Prediction"
                content="Based on current trajectory, you're likely to achieve 85+ score by June 2025 if you maintain this pace."
                impact="Target Achievement: 87% probability of reaching your goal score"
                color="green"
              />
            </div>
          </div>
        </div>
        
        {/* Personalized Action Plan */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-xl text-purple-800">🎯 Your Personalized Action Plan</h3>
              <p className="text-purple-600 text-sm mt-1">AI-generated recommendations based on your performance data</p>
            </div>
            <div className="bg-purple-500 rounded-full p-3">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionPlanCard
              period="This Week"
              icon="📈"
              actions={[
                'Focus 60% time on Quantitative',
                'Take 2 mock tests',
                'Review Current Affairs daily',
                'Practice during 2-4 PM slot'
              ]}
            />
            <ActionPlanCard
              period="This Month"
              icon="🎯"
              actions={[
                'Achieve 78% in Math',
                'Complete 8 full mocks',
                'Maintain Current Affairs lead',
                'Improve speed by 15%'
              ]}
            />
            <ActionPlanCard
              period="Long Term"
              icon="🏆"
              actions={[
                'Target 85+ overall score',
                'Rank under 2000',
                'Master all 5 subjects',
                'Build exam temperament'
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
interface OverviewCardProps {
  title: string;
  value: number;
  change: string;
  target: string;
  color: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, change, target, color }) => (
  <div className="p-6 rounded-2xl relative overflow-hidden" style={{ backgroundColor: color }}>
    <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-20 rounded-full -mr-8 -mt-8"></div>
    <h3 className="font-semibold" style={{ color: '#363535' }}>{title}</h3>
    <div className="text-3xl font-bold mt-2" style={{ color: '#363535' }}>{value.toLocaleString()}</div>
    <p className="text-sm mt-1" style={{ color: '#363535' }}>{change}</p>
    <div className="flex items-center mt-2">
      <div className="w-8 h-1 bg-white bg-opacity-60 rounded-full mr-2"></div>
      <span className="text-xs" style={{ color: '#363535' }}>Target: {target}</span>
    </div>
  </div>
);

interface MetricCardProps {
  label: string;
  value: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, color }) => (
  <div className="text-center p-3 bg-white bg-opacity-70 rounded-xl">
    <div className={cn("text-lg font-bold", color)}>{value}</div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

interface VelocityCardProps {
  title: string;
  status: string;
  value: string;
  description: string;
  color: 'green' | 'blue' | 'purple';
}

const VelocityCard: React.FC<VelocityCardProps> = ({ title, status, value, description, color }) => {
  const colorClasses = {
    green: { border: 'border-green-200', bg: 'bg-green-50', title: 'text-green-800', status: 'text-green-600', value: 'text-green-700', desc: 'text-green-600' },
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', title: 'text-blue-800', status: 'text-blue-600', value: 'text-blue-700', desc: 'text-blue-600' },
    purple: { border: 'border-purple-200', bg: 'bg-purple-50', title: 'text-purple-800', status: 'text-purple-600', value: 'text-purple-700', desc: 'text-purple-600' }
  };

  const classes = colorClasses[color];

  return (
    <div className={cn("p-4 rounded-2xl border-2", classes.border, classes.bg)}>
      <div className="flex items-center justify-between mb-2">
        <span className={cn("font-semibold", classes.title)}>{title}</span>
        <span className={cn("font-bold", classes.status)}>{status}</span>
      </div>
      <div className={cn("text-2xl font-bold mb-1", classes.value)}>{value}</div>
      <p className={cn("text-sm", classes.desc)}>{description}</p>
    </div>
  );
};

interface SubjectCardProps {
  subject: {
    subject: string;
    accuracy: number;
    trend: string;
    avgTime: string;
    strength: string;
    color: string;
    improvement: string;
  };
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => (
  <div 
    className="p-4 rounded-2xl border-2 hover:shadow-lg transition-all duration-300" 
    style={{ borderColor: subject.color, backgroundColor: `${subject.color}15` }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color }}></div>
        <span className="font-semibold" style={{ color: '#363535' }}>{subject.subject}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-bold text-green-600">{subject.trend}</span>
        <span 
          className="px-2 py-1 text-xs font-medium rounded-full"
          style={{ 
            backgroundColor: subject.strength === 'High' ? '#90EE90' : subject.strength === 'Medium' ? '#ffdd6d' : '#FFB6C1',
            color: '#363535'
          }}
        >
          {subject.strength}
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4 mb-3">
      <div className="text-center">
        <div className="font-bold text-lg" style={{ color: '#363535' }}>{subject.accuracy}%</div>
        <div className="text-xs text-gray-600">Accuracy</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg" style={{ color: '#363535' }}>{subject.avgTime}</div>
        <div className="text-xs text-gray-600">Avg Time</div>
      </div>
      <div className="text-center">
        <div className={cn("font-bold text-lg", 
          subject.improvement === 'excellent' ? 'text-green-500' : 
          subject.improvement === 'good' ? 'text-blue-500' : 
          subject.improvement === 'improving' ? 'text-yellow-500' : 'text-gray-500'
        )}>
          {subject.improvement === 'excellent' ? '🚀' : 
           subject.improvement === 'good' ? '📈' : 
           subject.improvement === 'improving' ? '⬆️' : '➡️'}
        </div>
        <div className="text-xs text-gray-600 capitalize">{subject.improvement}</div>
      </div>
    </div>
    
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="h-2 rounded-full transition-all duration-500" 
        style={{ 
          backgroundColor: subject.color,
          width: `${subject.accuracy}%`
        }}
      ></div>
    </div>
  </div>
);

interface InsightCardProps {
  icon: string;
  title: string;
  content: string;
  impact: string;
  color: 'yellow' | 'red' | 'blue' | 'green';
}

const InsightCard: React.FC<InsightCardProps> = ({ icon, title, content, impact, color }) => {
  const colorClasses = {
    yellow: { gradient: 'from-yellow-50 to-orange-50', border: 'border-yellow-200', bg: 'bg-yellow-400', title: 'text-yellow-800', content: 'text-yellow-700', impact: 'bg-yellow-200', impactText: 'text-yellow-800' },
    red: { gradient: 'from-red-50 to-pink-50', border: 'border-red-200', bg: 'bg-red-400', title: 'text-red-800', content: 'text-red-700', impact: 'bg-red-200', impactText: 'text-red-800' },
    blue: { gradient: 'from-blue-50 to-cyan-50', border: 'border-blue-200', bg: 'bg-blue-400', title: 'text-blue-800', content: 'text-blue-700', impact: 'bg-blue-200', impactText: 'text-blue-800' },
    green: { gradient: 'from-green-50 to-emerald-50', border: 'border-green-200', bg: 'bg-green-400', title: 'text-green-800', content: 'text-green-700', impact: 'bg-green-200', impactText: 'text-green-800' }
  };

  const classes = colorClasses[color];

  return (
    <div className={cn("p-5 rounded-2xl bg-gradient-to-r border-2", classes.gradient, classes.border)}>
      <div className="flex items-center mb-3">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-3", classes.bg)}>
          <span className="text-sm font-bold text-white">{icon}</span>
        </div>
        <h4 className={cn("font-bold", classes.title)}>{title}</h4>
      </div>
      <p className={cn("text-sm mb-3", classes.content)}>{content}</p>
      <div className={cn("bg-opacity-50 rounded-lg p-3", classes.impact)}>
        <p className={cn("text-xs font-medium", classes.impactText)}>
          {color === 'yellow' ? '💰' : color === 'red' ? '📈' : color === 'blue' ? '🕐' : '🎯'} {impact}
        </p>
      </div>
    </div>
  );
};

interface ActionPlanCardProps {
  period: string;
  icon: string;
  actions: string[];
}

const ActionPlanCard: React.FC<ActionPlanCardProps> = ({ period, icon, actions }) => (
  <div className="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-md transition-all duration-300">
    <div className="text-center mb-3">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-bold text-purple-800">{period}</h4>
    </div>
    <ul className="space-y-2 text-sm text-purple-700">
      {actions.map((action, idx) => (
        <li key={idx} className="flex items-center">
          <span className="mr-2">•</span> {action}
        </li>
      ))}
    </ul>
  </div>
);

export default AnalyticsView;