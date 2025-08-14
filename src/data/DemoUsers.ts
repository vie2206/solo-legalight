// 🎓 DEMO USER ACCOUNTS & SAMPLE DATA
// Comprehensive demo accounts for CLAT educational platform

export interface DemoUser {
  id: string;
  role: 'student' | 'parent' | 'educator' | 'admin' | 'manager';
  email: string;
  password: string; // For demo purposes only
  name: string;
  avatar: string;
  profile: any;
  credentials: {
    username: string;
    loginCode: string;
  };
  sampleData: any;
}

// 👨‍🎓 DEMO STUDENT ACCOUNTS
export const demoStudents: DemoUser[] = [
  {
    id: 'student_001',
    role: 'student',
    email: 'priya.sharma@demo.legalight.com',
    password: 'demo123',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150',
    credentials: {
      username: 'priya_clat2025',
      loginCode: 'PS2025'
    },
    profile: {
      grade: 12,
      targetExam: 'CLAT 2025',
      location: 'New Delhi',
      schoolName: 'Delhi Public School, RK Puram',
      targetRank: 500,
      targetCollege: 'NLSIU Bangalore',
      studyHours: 8,
      weakSubjects: ['Legal Reasoning', 'Current Affairs'],
      strongSubjects: ['English', 'Logical Reasoning'],
      joinedDate: '2024-06-15',
      subscriptionPlan: 'Premium',
      parentContact: '+91-9876543210'
    },
    sampleData: {
      mockTestsAttempted: 47,
      averageScore: 142,
      bestScore: 168,
      currentRank: 2847,
      studyStreak: 23,
      totalStudyHours: 456,
      subjectWisePerformance: {
        'Legal Reasoning': { score: 68, accuracy: 72, timeSpent: '45m' },
        'Logical Reasoning': { score: 85, accuracy: 89, timeSpent: '38m' },
        'English': { score: 92, accuracy: 94, timeSpent: '32m' },
        'GK & Current Affairs': { score: 58, accuracy: 65, timeSpent: '42m' },
        'Quantitative Techniques': { score: 76, accuracy: 82, timeSpent: '28m' }
      },
      recentActivity: [
        { type: 'mock_test', title: 'CLAT Mock Test #47', score: 156, date: '2025-01-12' },
        { type: 'study_session', title: 'Constitutional Law - Fundamental Rights', duration: 90, date: '2025-01-12' },
        { type: 'doubt_resolved', title: 'Contract Law - Breach of Contract', educator: 'Dr. Rajesh Kumar', date: '2025-01-11' }
      ]
    }
  },
  {
    id: 'student_002',
    role: 'student',
    email: 'arjun.patel@demo.legalight.com',
    password: 'demo123',
    name: 'Arjun Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    credentials: {
      username: 'arjun_clat2025',
      loginCode: 'AP2025'
    },
    profile: {
      grade: 12,
      targetExam: 'CLAT 2025',
      location: 'Mumbai',
      schoolName: 'Bombay Scottish School',
      targetRank: 200,
      targetCollege: 'NALSAR Hyderabad',
      studyHours: 10,
      weakSubjects: ['Quantitative Techniques', 'English'],
      strongSubjects: ['Legal Reasoning', 'GK & Current Affairs'],
      joinedDate: '2024-05-20',
      subscriptionPlan: 'Elite',
      parentContact: '+91-9823456789'
    },
    sampleData: {
      mockTestsAttempted: 62,
      averageScore: 158,
      bestScore: 184,
      currentRank: 1245,
      studyStreak: 41,
      totalStudyHours: 678,
      subjectWisePerformance: {
        'Legal Reasoning': { score: 95, accuracy: 91, timeSpent: '42m' },
        'Logical Reasoning': { score: 82, accuracy: 86, timeSpent: '35m' },
        'English': { score: 71, accuracy: 75, timeSpent: '38m' },
        'GK & Current Affairs': { score: 89, accuracy: 88, timeSpent: '39m' },
        'Quantitative Techniques': { score: 64, accuracy: 69, timeSpent: '31m' }
      },
      recentActivity: [
        { type: 'mock_test', title: 'CLAT Mock Test #62', score: 172, date: '2025-01-12' },
        { type: 'ai_session', title: 'AI Doubt Resolution - Tort Law', duration: 25, date: '2025-01-12' },
        { type: 'group_study', title: 'Criminal Law Discussion Group', participants: 8, date: '2025-01-11' }
      ]
    }
  },
  {
    id: 'student_003',
    role: 'student',
    email: 'kavya.reddy@demo.legalight.com',
    password: 'demo123',
    name: 'Kavya Reddy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    credentials: {
      username: 'kavya_clat2025',
      loginCode: 'KR2025'
    },
    profile: {
      grade: 12,
      targetExam: 'CLAT 2025',
      location: 'Hyderabad',
      schoolName: 'Oakridge International School',
      targetRank: 100,
      targetCollege: 'NLUD Delhi',
      studyHours: 12,
      weakSubjects: ['Logical Reasoning'],
      strongSubjects: ['Legal Reasoning', 'English', 'Current Affairs'],
      joinedDate: '2024-04-10',
      subscriptionPlan: 'Elite+',
      parentContact: '+91-9876123456'
    },
    sampleData: {
      mockTestsAttempted: 78,
      averageScore: 174,
      bestScore: 196,
      currentRank: 456,
      studyStreak: 67,
      totalStudyHours: 892,
      subjectWisePerformance: {
        'Legal Reasoning': { score: 98, accuracy: 96, timeSpent: '40m' },
        'Logical Reasoning': { score: 79, accuracy: 83, timeSpent: '41m' },
        'English': { score: 96, accuracy: 97, timeSpent: '30m' },
        'GK & Current Affairs': { score: 94, accuracy: 93, timeSpent: '35m' },
        'Quantitative Techniques': { score: 88, accuracy: 91, timeSpent: '26m' }
      },
      recentActivity: [
        { type: 'mock_test', title: 'CLAT Mock Test #78', score: 189, date: '2025-01-12' },
        { type: 'mentor_session', title: '1-on-1 Strategy Session', mentor: 'Adv. Priya Menon', duration: 60, date: '2025-01-12' },
        { type: 'achievement', title: 'Top 500 Rank Achievement', badge: 'Rising Star', date: '2025-01-11' }
      ]
    }
  }
];

// 👨‍👩‍👧‍👦 DEMO PARENT ACCOUNTS
export const demoParents: DemoUser[] = [
  {
    id: 'parent_001',
    role: 'parent',
    email: 'rajesh.sharma@demo.legalight.com',
    password: 'demo123',
    name: 'Rajesh Sharma',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    credentials: {
      username: 'rajesh_parent',
      loginCode: 'RS_P01'
    },
    profile: {
      children: ['student_001'],
      occupation: 'Software Engineer',
      location: 'New Delhi',
      concerns: ['Study schedule optimization', 'Performance tracking'],
      communicationPreference: 'WhatsApp + Email',
      involvementLevel: 'High'
    },
    sampleData: {
      childPerformance: {
        'student_001': {
          currentRank: 2847,
          monthlyProgress: '+15%',
          studyConsistency: 92,
          areasOfConcern: ['Legal Reasoning', 'Time Management'],
          recommendedActions: ['Extra practice sessions', 'Mock test analysis']
        }
      },
      communicationHistory: [
        { type: 'progress_report', title: 'Weekly Performance Report', date: '2025-01-12' },
        { type: 'educator_feedback', educator: 'Dr. Rajesh Kumar', feedback: 'Good improvement in logical reasoning', date: '2025-01-10' },
        { type: 'suggestion', title: 'Study Schedule Optimization', status: 'implemented', date: '2025-01-08' }
      ]
    }
  }
];

// 👨‍🏫 DEMO EDUCATOR ACCOUNTS
export const demoEducators: DemoUser[] = [
  {
    id: 'educator_001',
    role: 'educator',
    email: 'dr.kumar@demo.legalight.com',
    password: 'demo123',
    name: 'Dr. Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    credentials: {
      username: 'dr_rajesh_kumar',
      loginCode: 'DRK_E01'
    },
    profile: {
      specialization: ['Constitutional Law', 'Legal Reasoning'],
      experience: 12,
      qualification: 'LLM from NLS Bangalore, PhD in Constitutional Law',
      teachingStyle: 'Interactive and Case-study based',
      rating: 4.8,
      studentsAssigned: 156,
      languages: ['English', 'Hindi']
    },
    sampleData: {
      studentsManaged: ['student_001', 'student_002'],
      doubtsResolved: 1247,
      averageResponseTime: '8 minutes',
      satisfaction: 96,
      recentSessions: [
        { student: 'Priya Sharma', topic: 'Fundamental Rights', duration: 45, rating: 5, date: '2025-01-12' },
        { student: 'Arjun Patel', topic: 'Contract Law Basics', duration: 30, rating: 5, date: '2025-01-11' }
      ],
      monthlyStats: {
        sessionsCompleted: 89,
        averageRating: 4.9,
        studentsHelped: 67,
        topicsCovered: 23
      }
    }
  }
];

// 👨‍💼 DEMO ADMIN ACCOUNTS
export const demoAdmins: DemoUser[] = [
  {
    id: 'admin_001',
    role: 'admin',
    email: 'admin@demo.legalight.com',
    password: 'demo123',
    name: 'Aditi Verma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    credentials: {
      username: 'aditi_admin',
      loginCode: 'AV_A01'
    },
    profile: {
      department: 'Platform Management',
      permissions: ['user_management', 'content_management', 'analytics', 'system_config'],
      experience: 5,
      specialization: 'Educational Technology'
    },
    sampleData: {
      platformStats: {
        totalStudents: 12547,
        activeStudents: 8934,
        totalEducators: 234,
        mockTestsCompleted: 45672,
        doubtsResolved: 23456,
        dailyActiveUsers: 3421
      },
      recentActions: [
        { action: 'Mock Test Published', details: 'CLAT Mock Test #48', timestamp: '2025-01-12 10:30 AM' },
        { action: 'Content Update', details: 'Current Affairs - January 2025', timestamp: '2025-01-12 09:15 AM' },
        { action: 'User Issue Resolved', details: 'Payment gateway timeout fix', timestamp: '2025-01-11 11:45 PM' }
      ]
    }
  }
];

// 👨‍💼 DEMO OPERATION MANAGER ACCOUNTS
export const demoManagers: DemoUser[] = [
  {
    id: 'manager_001',
    role: 'manager',
    email: 'operations@demo.legalight.com',
    password: 'demo123',
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1559531162-6c0146cd6b5e?w=150',
    credentials: {
      username: 'vikram_ops',
      loginCode: 'VS_M01'
    },
    profile: {
      department: 'Operations',
      responsibilities: ['Performance Monitoring', 'Resource Allocation', 'Quality Assurance'],
      experience: 8,
      teamSize: 15
    },
    sampleData: {
      kpiMetrics: {
        studentSatisfaction: 94.2,
        educatorEfficiency: 87.5,
        systemUptime: 99.8,
        responseTime: 285,
        issueResolutionTime: '2.3 hours'
      },
      teamPerformance: {
        totalTickets: 456,
        resolvedTickets: 434,
        pendingTickets: 22,
        averageResolutionTime: '1.8 hours',
        customerSatisfaction: 4.6
      }
    }
  }
];

// 📊 SAMPLE DATA GENERATORS
export const generateSampleMockTests = () => [
  {
    id: 'mock_001',
    title: 'CLAT 2025 Mock Test #1',
    difficulty: 'Medium',
    totalQuestions: 120,
    duration: 120,
    maxMarks: 120,
    subjects: {
      'Legal Reasoning': 28,
      'Logical Reasoning': 22,
      'English': 24,
      'GK & Current Affairs': 28,
      'Quantitative Techniques': 18
    },
    attemptedBy: 8934,
    averageScore: 67.8,
    topScore: 112,
    dateCreated: '2025-01-01'
  },
  {
    id: 'mock_002',
    title: 'CLAT 2025 Mock Test #2',
    difficulty: 'Hard',
    totalQuestions: 120,
    duration: 120,
    maxMarks: 120,
    subjects: {
      'Legal Reasoning': 30,
      'Logical Reasoning': 20,
      'English': 22,
      'GK & Current Affairs': 30,
      'Quantitative Techniques': 18
    },
    attemptedBy: 7654,
    averageScore: 59.2,
    topScore: 108,
    dateCreated: '2025-01-08'
  }
];

export const generateSampleLeaderboard = () => [
  { rank: 1, name: 'Aisha Khan', score: 196, location: 'Mumbai', streak: 45 },
  { rank: 2, name: 'Rohit Agarwal', score: 194, location: 'Delhi', streak: 38 },
  { rank: 3, name: 'Kavya Reddy', score: 189, location: 'Hyderabad', streak: 67 },
  { rank: 4, name: 'Siddharth Jain', score: 187, location: 'Pune', streak: 29 },
  { rank: 5, name: 'Priyanka Nair', score: 185, location: 'Bangalore', streak: 33 }
];

// 🎯 DEMO DATA AGGREGATION
export const getAllDemoUsers = (): DemoUser[] => [
  ...demoStudents,
  ...demoParents,
  ...demoEducators,
  ...demoAdmins,
  ...demoManagers
];

export const getDemoUserByRole = (role: DemoUser['role']): DemoUser[] => {
  const allUsers = getAllDemoUsers();
  return allUsers.filter(user => user.role === role);
};

export const getDemoUserById = (id: string): DemoUser | undefined => {
  const allUsers = getAllDemoUsers();
  return allUsers.find(user => user.id === id);
};

// 🔐 DEMO LOGIN HELPER
export const validateDemoLogin = (username: string, password: string): DemoUser | null => {
  const allUsers = getAllDemoUsers();
  return allUsers.find(user => 
    (user.credentials.username === username || user.email === username) && 
    user.password === password
  ) || null;
};

export default {
  students: demoStudents,
  parents: demoParents,
  educators: demoEducators,
  admins: demoAdmins,
  managers: demoManagers,
  getAllDemoUsers,
  getDemoUserByRole,
  getDemoUserById,
  validateDemoLogin,
  generateSampleMockTests,
  generateSampleLeaderboard
};