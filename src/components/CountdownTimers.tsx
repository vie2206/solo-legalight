import React, { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  AcademicCapIcon, 
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BookOpenIcon,
  StarIcon,
  BellIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Types
interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface MockTest {
  id: string;
  name: string;
  date: Date;
  duration: number; // minutes
  subjects: string[];
  totalQuestions: number;
  importance: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'registered' | 'completed';
}

interface Milestone {
  id: string;
  name: string;
  date: Date;
  description: string;
  type: 'exam' | 'registration' | 'result' | 'preparation';
  completed: boolean;
}

const CountdownTimers: React.FC = () => {
  const [clatCountdown, setClatCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextMockCountdown, setNextMockCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  // CLAT 2026 - December 07, 2025, 2:00 PM IST
  const clatDate = new Date('December 07, 2025 14:00:00 GMT+0530');
  
  // Mock upcoming tests
  const mockTests: MockTest[] = [
    {
      id: '1',
      name: 'Full Length Mock Test #15',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: 120,
      subjects: ['Legal Reasoning', 'Logical Reasoning', 'English', 'GK', 'Quantitative'],
      totalQuestions: 150,
      importance: 'high',
      status: 'upcoming'
    },
    {
      id: '2', 
      name: 'Subject-wise: Legal Reasoning',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: 60,
      subjects: ['Legal Reasoning'],
      totalQuestions: 50,
      importance: 'medium',
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'Sectional Test: Current Affairs',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      duration: 45,
      subjects: ['Current Affairs', 'GK'],
      totalQuestions: 35,
      importance: 'medium',
      status: 'upcoming'
    }
  ];

  // CLAT preparation milestones
  const milestones: Milestone[] = [
    {
      id: '1',
      name: 'CLAT 2026 Registration Opens',
      date: new Date('August 15, 2025'),
      description: 'Registration window opens for CLAT 2026',
      type: 'registration',
      completed: false
    },
    {
      id: '2',
      name: 'CLAT 2026 Registration Closes',
      date: new Date('November 15, 2025'),
      description: 'Last date to register for CLAT 2026',
      type: 'registration',
      completed: false
    },
    {
      id: '3',
      name: 'Admit Card Release',
      date: new Date('November 25, 2025'),
      description: 'CLAT 2026 admit cards will be available for download',
      type: 'preparation',
      completed: false
    },
    {
      id: '4',
      name: 'CLAT 2026 Exam Day',
      date: clatDate,
      description: 'The main exam day - December 07, 2025 (2:00 PM - 4:00 PM)',
      type: 'exam',
      completed: false
    },
    {
      id: '5',
      name: 'Results Declaration',
      date: new Date('December 31, 2025'),
      description: 'CLAT 2026 results will be declared',
      type: 'result',
      completed: false
    }
  ];

  // Calculate countdown
  const calculateCountdown = (targetDate: Date): CountdownTime => {
    const now = currentTime.getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setClatCountdown(calculateCountdown(clatDate));
      
      // Find next mock test
      const upcomingMocks = mockTests.filter(test => test.date > now);
      if (upcomingMocks.length > 0) {
        const nextMock = upcomingMocks.sort((a, b) => a.date.getTime() - b.date.getTime())[0];
        setNextMockCountdown(calculateCountdown(nextMock.date));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getUrgencyLevel = (days: number) => {
    if (days <= 7) return 'critical';
    if (days <= 30) return 'high';
    if (days <= 90) return 'medium';
    return 'low';
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'from-red-600 to-red-700';
      case 'high': return 'from-orange-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-blue-500';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high': return ExclamationTriangleIcon;
      case 'medium': return ClockIcon;
      case 'low': return CheckCircleIcon;
      default: return BookOpenIcon;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-200 bg-green-50 text-green-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const urgencyLevel = getUrgencyLevel(clatCountdown.days);
  const nextMock = mockTests.filter(test => test.date > currentTime)[0];

  return (
    <div className="space-y-6">
      {/* Main CLAT 2026 Countdown */}
      <div className={`bg-gradient-to-r ${getUrgencyColor(urgencyLevel)} rounded-lg p-8 text-white shadow-xl`}>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrophyIcon className="h-10 w-10" />
            <h1 className="text-3xl font-bold">CLAT 2026</h1>
          </div>
          
          <p className="text-xl mb-2 opacity-90">December 07, 2025 • 2:00 PM - 4:00 PM</p>
          <p className="text-lg mb-6 opacity-80">The journey to your dream law college starts here</p>
          
          {/* Countdown Display */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Days', value: clatCountdown.days },
              { label: 'Hours', value: clatCountdown.hours },
              { label: 'Minutes', value: clatCountdown.minutes },
              { label: 'Seconds', value: clatCountdown.seconds }
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-1">{value.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-80">{label}</div>
              </div>
            ))}
          </div>
          
          {/* Urgency Message */}
          {urgencyLevel === 'critical' && (
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2 text-yellow-200">
                <FireIcon className="h-5 w-5" />
                <span className="font-semibold">Final Week! Every moment counts!</span>
              </div>
            </div>
          )}
          
          {urgencyLevel === 'high' && (
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span className="font-semibold">Exam approaching fast! Intensify your preparation!</span>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              {clatCountdown.days > 0 ? `${clatCountdown.days} days to go!` : 'Exam is today!'}
            </p>
            {clatCountdown.days > 30 && (
              <p className="opacity-80">You have time to build a strong foundation</p>
            )}
            {clatCountdown.days <= 30 && clatCountdown.days > 7 && (
              <p className="opacity-80">Time to focus on practice and revision</p>
            )}
            {clatCountdown.days <= 7 && (
              <p className="opacity-80">Final preparations and staying calm</p>
            )}
          </div>
        </div>
      </div>

      {/* Next Mock Test Countdown */}
      {nextMock && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AcademicCapIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Next Mock Test</h2>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">{nextMock.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImportanceColor(nextMock.importance)}`}>
                {nextMock.importance.charAt(0).toUpperCase() + nextMock.importance.slice(1)} Priority
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-blue-800 mb-2">
                  <strong>Date:</strong> {formatDate(nextMock.date)}
                </p>
                <p className="text-blue-800 mb-2">
                  <strong>Duration:</strong> {nextMock.duration} minutes
                </p>
                <p className="text-blue-800 mb-4">
                  <strong>Questions:</strong> {nextMock.totalQuestions}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {nextMock.subjects.map(subject => (
                    <span key={subject} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-blue-700 mb-2">Time Remaining</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Days', value: nextMockCountdown.days },
                    { label: 'Hrs', value: nextMockCountdown.hours },
                    { label: 'Min', value: nextMockCountdown.minutes },
                    { label: 'Sec', value: nextMockCountdown.seconds }
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-blue-100 rounded p-2">
                      <div className="text-lg font-bold text-blue-900">{value.toString().padStart(2, '0')}</div>
                      <div className="text-xs text-blue-700">{label}</div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Register for Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Upcoming Mock Tests */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <CalendarDaysIcon className="h-6 w-6 mr-2 text-green-600" />
          Upcoming Mock Tests
        </h2>
        
        <div className="space-y-4">
          {mockTests.map(test => {
            const countdown = calculateCountdown(test.date);
            const IconComponent = getImportanceIcon(test.importance);
            
            return (
              <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(test.importance)}`}>
                    {test.importance}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Date:</strong> {test.date.toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Duration:</strong> {test.duration} min
                  </div>
                  <div>
                    <strong>Questions:</strong> {test.totalQuestions}
                  </div>
                </div>
                
                <div className="mt-2 text-sm">
                  <strong>Time remaining:</strong> {countdown.days}d {countdown.hours}h {countdown.minutes}m
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CLAT 2026 Milestones */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <StarIcon className="h-6 w-6 mr-2 text-purple-600" />
          CLAT 2026 Timeline
        </h2>
        
        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const isUpcoming = milestone.date > currentTime;
            const countdown = calculateCountdown(milestone.date);
            
            return (
              <div key={milestone.id} className={`border-l-4 pl-4 py-3 ${
                milestone.completed ? 'border-green-400 bg-green-50' :
                isUpcoming ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{milestone.name}</h3>
                  {milestone.completed ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  ) : isUpcoming ? (
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                  ) : null}
                </div>
                
                <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                <p className="text-sm font-medium text-gray-800">
                  {formatDate(milestone.date)}
                </p>
                
                {isUpcoming && !milestone.completed && (
                  <p className="text-xs text-blue-600 mt-1">
                    In {countdown.days} days, {countdown.hours} hours
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Study Progress vs Time */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="h-6 w-6 mr-2 text-indigo-600" />
          Preparation Progress
        </h2>
        
        <div className="bg-indigo-50 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-indigo-900">{Math.round(((365 - clatCountdown.days) / 365) * 100)}%</div>
            <p className="text-indigo-700">Time Elapsed Since Last CLAT</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">68%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <BookOpenIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">42</div>
              <div className="text-sm text-gray-600">Mock Tests Taken</div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <TrophyIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">78.5</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-indigo-800 font-medium">
              {clatCountdown.days > 180 ? 'Perfect time to build concepts!' :
               clatCountdown.days > 90 ? 'Focus on practice and mock tests!' :
               clatCountdown.days > 30 ? 'Intensive revision phase!' :
               'Final preparation and staying confident!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimers;