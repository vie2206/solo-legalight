import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Star,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Settings,
  Info,
  Calendar,
  Clock,
  BookOpen,
  Brain
} from 'lucide-react';

interface RankPrediction {
  currentRank: number;
  predictedRank: number;
  confidenceLevel: number;
  improvementNeeded: number;
  timeToTarget: number;
  targetNLUs: string[];
  strengths: string[];
  weaknesses: string[];
  recommendedActions: string[];
}

interface PerformanceData {
  legalReasoning: number;
  readingComprehension: number;
  currentAffairs: number;
  logicalReasoning: number;
  quantitative: number;
  overallScore: number;
  mockTestsCompleted: number;
  studyHours: number;
  accuracy: number;
}

interface NLUData {
  name: string;
  cutoff2023: number;
  seats: number;
  difficulty: 'High' | 'Medium' | 'Low';
  color: string;
  position: { x: number; y: number; z: number };
  scale: number;
}

const CLATRankPredictor3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [performanceData] = useState<PerformanceData>({
    legalReasoning: 85,
    readingComprehension: 78,
    currentAffairs: 65,
    logicalReasoning: 72,
    quantitative: 58,
    overallScore: 71.6,
    mockTestsCompleted: 23,
    studyHours: 342,
    accuracy: 76
  });

  const [prediction] = useState<RankPrediction>({
    currentRank: 1847,
    predictedRank: 756,
    confidenceLevel: 87,
    improvementNeeded: 12,
    timeToTarget: 45,
    targetNLUs: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata'],
    strengths: ['Legal Reasoning', 'Reading Comprehension'],
    weaknesses: ['Current Affairs', 'Quantitative Techniques'],
    recommendedActions: [
      'Increase Current Affairs study by 30 minutes daily',
      'Focus on Quantitative fundamentals',
      'Take 2 full mocks weekly',
      'Join current affairs test series'
    ]
  });

  const nluData: NLUData[] = [
    { name: 'NLSIU Bangalore', cutoff2023: 99, seats: 120, difficulty: 'High', color: '#FF6B6B', position: { x: 0, y: 200, z: 0 }, scale: 1.5 },
    { name: 'NALSAR Hyderabad', cutoff2023: 156, seats: 120, difficulty: 'High', color: '#4ECDC4', position: { x: 100, y: 180, z: -50 }, scale: 1.4 },
    { name: 'WBNUJS Kolkata', cutoff2023: 234, seats: 120, difficulty: 'High', color: '#45B7D1', position: { x: -100, y: 160, z: 50 }, scale: 1.3 },
    { name: 'NUALS Kochi', cutoff2023: 312, seats: 120, difficulty: 'Medium', color: '#96CEB4', position: { x: 50, y: 140, z: 100 }, scale: 1.2 },
    { name: 'GNLU Gandhinagar', cutoff2023: 445, seats: 180, difficulty: 'Medium', color: '#FFEAA7', position: { x: -50, y: 120, z: -100 }, scale: 1.1 },
    { name: 'RMNLU Lucknow', cutoff2023: 567, seats: 120, difficulty: 'Medium', color: '#DDA0DD', position: { x: 150, y: 100, z: 0 }, scale: 1.0 },
    { name: 'CNLU Patna', cutoff2023: 689, seats: 120, difficulty: 'Medium', color: '#FFB74D', position: { x: -150, y: 80, z: 75 }, scale: 0.9 },
    { name: 'NUSRL Ranchi', cutoff2023: 812, seats: 120, difficulty: 'Low', color: '#81C784', position: { x: 75, y: 60, z: -75 }, scale: 0.8 },
    { name: 'DSNLU Visakhapatnam', cutoff2023: 934, seats: 120, difficulty: 'Low', color: '#F06292', position: { x: -75, y: 40, z: 150 }, scale: 0.7 },
    { name: 'TNNLS Tiruchirappalli', cutoff2023: 1123, seats: 120, difficulty: 'Low', color: '#7986CB', position: { x: 0, y: 20, z: -150 }, scale: 0.6 }
  ];

  const [rotationY, setRotationY] = useState(0);
  const [selectedNLU, setSelectedNLU] = useState<NLUData | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = canvas.width / (2 * window.devicePixelRatio);
    const centerY = canvas.height / (2 * window.devicePixelRatio);

    const drawTower = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        const x = (i * canvas.width / 10) / window.devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height / window.devicePixelRatio);
        ctx.stroke();
        
        const y = (i * canvas.height / 10) / window.devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width / window.devicePixelRatio, y);
        ctx.stroke();
      }

      // Sort NLUs by cutoff for proper depth rendering
      const sortedNLUs = [...nluData].sort((a, b) => 
        Math.sin(rotationY) * (a.position.z - b.position.z) + Math.cos(rotationY) * (a.position.x - b.position.x)
      );

      // Draw NLU towers
      sortedNLUs.forEach((nlu, index) => {
        const rotatedX = Math.cos(rotationY) * nlu.position.x - Math.sin(rotationY) * nlu.position.z;
        const rotatedZ = Math.sin(rotationY) * nlu.position.x + Math.cos(rotationY) * nlu.position.z;
        
        // 3D projection
        const perspective = 300;
        const projectedX = centerX + (rotatedX * perspective) / (perspective + rotatedZ);
        const projectedY = centerY - nlu.position.y + (rotatedZ * 0.1);
        
        // Tower height based on difficulty
        const towerHeight = 150 * nlu.scale;
        const towerWidth = 60 * nlu.scale;
        
        // Draw tower shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(projectedX - towerWidth/2 + 10, centerY + 50, towerWidth, 20);
        
        // Draw tower base
        ctx.fillStyle = nlu.color + '40';
        ctx.fillRect(projectedX - towerWidth/2, projectedY, towerWidth, towerHeight);
        
        // Draw tower top
        const gradient = ctx.createLinearGradient(0, projectedY, 0, projectedY - towerHeight);
        gradient.addColorStop(0, nlu.color);
        gradient.addColorStop(1, nlu.color + 'CC');
        ctx.fillStyle = gradient;
        ctx.fillRect(projectedX - towerWidth/2, projectedY - towerHeight, towerWidth, towerHeight);
        
        // Draw tower edges for 3D effect
        ctx.strokeStyle = nlu.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(projectedX - towerWidth/2, projectedY - towerHeight, towerWidth, towerHeight);
        
        // Draw rank number on tower
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${12 * nlu.scale}px Inter`;
        ctx.textAlign = 'center';
        ctx.fillText(nlu.cutoff2023.toString(), projectedX, projectedY - towerHeight/2);
        
        // Draw NLU name
        ctx.fillStyle = '#374151';
        ctx.font = `${10 * nlu.scale}px Inter`;
        const shortName = nlu.name.split(' ')[0];
        ctx.fillText(shortName, projectedX, projectedY + 20);
        
        // Highlight user's predicted position
        if (nlu.cutoff2023 >= prediction.predictedRank - 100 && nlu.cutoff2023 <= prediction.predictedRank + 100) {
          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 4;
          ctx.strokeRect(projectedX - towerWidth/2 - 5, projectedY - towerHeight - 5, towerWidth + 10, towerHeight + 10);
          
          // Draw user indicator
          ctx.fillStyle = '#EF4444';
          ctx.beginPath();
          ctx.arc(projectedX + towerWidth/2 + 15, projectedY - towerHeight/2, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px Inter';
          ctx.fillText('YOU', projectedX + towerWidth/2 + 15, projectedY - towerHeight/2 + 3);
        }
      });

      // Draw current rank indicator
      const currentRankY = centerY + 100;
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(20, currentRankY - 10, 200, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(`Current Rank: ${prediction.currentRank}`, 30, currentRankY + 3);

      // Draw predicted rank indicator
      const predictedRankY = centerY + 130;
      ctx.fillStyle = '#10B981';
      ctx.fillRect(20, predictedRankY - 10, 200, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Predicted Rank: ${prediction.predictedRank}`, 30, predictedRankY + 3);
    };

    drawTower();

    // Auto rotation
    const rotationInterval = setInterval(() => {
      if (isRotating) {
        setRotationY(prev => prev + 0.02);
      }
    }, 50);

    return () => clearInterval(rotationInterval);
  }, [rotationY, isRotating, prediction]);

  const getRankColor = (rank: number) => {
    if (rank <= 200) return 'text-green-600';
    if (rank <= 500) return 'text-blue-600';
    if (rank <= 1000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSubjectColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CLAT Rank Predictor 3D</h1>
                <p className="text-gray-600">AI-powered rank prediction with 3D NLU visualization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isRotating ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {isRotating ? 'Pause' : 'Rotate'}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prediction Overview */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{prediction.currentRank}</div>
              <div className="text-purple-200">Current Rank</div>
              <div className="text-sm text-purple-100 mt-1">Based on performance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-yellow-300">{prediction.predictedRank}</div>
              <div className="text-purple-200">Predicted Rank</div>
              <div className="text-sm text-purple-100 mt-1">With improvements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-green-300">{prediction.confidenceLevel}%</div>
              <div className="text-purple-200">Confidence</div>
              <div className="text-sm text-purple-100 mt-1">AI prediction accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-orange-300">{prediction.timeToTarget}</div>
              <div className="text-purple-200">Days to Target</div>
              <div className="text-sm text-purple-100 mt-1">With focused study</div>
            </div>
          </div>
        </div>

        {/* 3D Visualization and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">3D NLU Tower Visualization</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Your Target Range</span>
                </div>
              </div>
              
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 border border-gray-200 rounded-lg cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // Handle NLU selection logic here
                  }}
                />
                
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-3">
                  <div className="text-xs font-medium text-gray-700 mb-2">Controls:</div>
                  <div className="text-xs text-gray-600">
                    • Click to pause rotation<br/>
                    • Red outline = Your range<br/>
                    • Tower height = Difficulty
                  </div>
                </div>
              </div>
              
              {/* NLU Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                {nluData.slice(0, 6).map((nlu, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: nlu.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{nlu.name.split(' ')[0]}</span>
                    <span className="text-xs text-gray-500">({nlu.cutoff2023})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="space-y-6">
            {/* Subject Scores */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Subject Performance</h3>
              <div className="space-y-4">
                {[
                  { name: 'Legal Reasoning', score: performanceData.legalReasoning },
                  { name: 'Reading Comprehension', score: performanceData.readingComprehension },
                  { name: 'Current Affairs', score: performanceData.currentAffairs },
                  { name: 'Logical Reasoning', score: performanceData.logicalReasoning },
                  { name: 'Quantitative', score: performanceData.quantitative }
                ].map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getSubjectColor(subject.score)}`}>
                        {subject.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          subject.score >= 80 ? 'bg-green-500' :
                          subject.score >= 70 ? 'bg-blue-500' :
                          subject.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target NLUs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Target NLUs</h3>
              <div className="space-y-3">
                {prediction.targetNLUs.map((nlu, index) => {
                  const nluInfo = nluData.find(n => n.name === nlu);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{nlu}</div>
                        <div className="text-sm text-gray-600">{nluInfo?.seats} seats</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getRankColor(nluInfo?.cutoff2023 || 0)}`}>
                          #{nluInfo?.cutoff2023}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          nluInfo?.difficulty === 'High' ? 'bg-red-100 text-red-700' :
                          nluInfo?.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {nluInfo?.difficulty}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Plan */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths & Weaknesses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Strengths
                </h4>
                <div className="space-y-2">
                  {prediction.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 bg-green-50 p-2 rounded">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Areas for Improvement
                </h4>
                <div className="space-y-2">
                  {prediction.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-center gap-2 bg-red-50 p-2 rounded">
                      <ArrowUp className="w-4 h-4 text-red-600" />
                      <span className="text-red-800">{weakness}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI Recommendations</h3>
            <div className="space-y-3">
              {prediction.recommendedActions.map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-blue-800 font-medium leading-relaxed">{action}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Improvement Potential</span>
              </div>
              <p className="text-purple-800 text-sm">
                Following these recommendations could improve your rank by {prediction.currentRank - prediction.predictedRank} positions 
                in approximately {prediction.timeToTarget} days with consistent effort.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{performanceData.mockTestsCompleted}</div>
              <div className="text-sm text-gray-600">Mock Tests</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{performanceData.studyHours}h</div>
              <div className="text-sm text-gray-600">Study Hours</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{performanceData.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{performanceData.overallScore.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLATRankPredictor3D;