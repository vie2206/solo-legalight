import React from 'react';
import './RevolutionaryLoading.css';

interface LoadingProps {
  variant?: 'default' | 'quiz' | 'analysis' | 'minimal';
  message?: string;
  progress?: number;
}

// 🚀 REVOLUTIONARY LOADING COMPONENTS
// Inspired by the 13 cutting-edge tech platforms analyzed

export const RevolutionaryLoading: React.FC<LoadingProps> = ({ 
  variant = 'default', 
  message = 'Loading amazing content...',
  progress 
}) => {
  switch (variant) {
    case 'quiz':
      return <QuizLoadingAnimation message={message} />;
    case 'analysis':
      return <AnalysisLoadingAnimation message={message} progress={progress} />;
    case 'minimal':
      return <MinimalLoadingAnimation />;
    default:
      return <DefaultLoadingAnimation message={message} />;
  }
};

// 🎯 DEFAULT LOADING - Inspired by Huly.io's smooth animations
const DefaultLoadingAnimation: React.FC<{ message: string }> = ({ message }) => (
  <div className="revolutionary-loading-container">
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-orb"></div>
    </div>
    <div className="loading-message">
      <h3 className="gradient-text">{message}</h3>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
);

// 📊 QUIZ LOADING - Educational context with brain animation
const QuizLoadingAnimation: React.FC<{ message: string }> = ({ message }) => (
  <div className="quiz-loading-container">
    <div className="brain-animation">
      <div className="brain-core">
        <div className="neural-network">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`neuron neuron-${i + 1}`}>
              <div className="pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="quiz-loading-text">
      <h3>🧠 {message}</h3>
      <p>Preparing your personalized learning experience...</p>
    </div>
  </div>
);

// 📈 ANALYSIS LOADING - Inspired by data visualization platforms
const AnalysisLoadingAnimation: React.FC<{ message: string; progress?: number }> = ({ 
  message, 
  progress 
}) => (
  <div className="analysis-loading-container">
    <div className="analysis-visualization">
      <div className="data-flow">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`data-stream stream-${i + 1}`}>
            <div className="data-particle"></div>
          </div>
        ))}
      </div>
      <div className="central-processor">
        <div className="processor-core"></div>
        <div className="processing-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>
      </div>
    </div>
    {progress !== undefined && (
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{progress}% Complete</span>
      </div>
    )}
    <div className="analysis-message">
      <h3>{message}</h3>
    </div>
  </div>
);

// ⚡ MINIMAL LOADING - For fast transitions
const MinimalLoadingAnimation: React.FC = () => (
  <div className="minimal-loading">
    <div className="minimal-spinner">
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  </div>
);

// 🌟 SKELETON LOADING - For content previews
export const SkeletonLoader: React.FC<{ 
  variant?: 'card' | 'list' | 'profile' | 'chart';
  count?: number;
}> = ({ variant = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className="skeleton-card">
            <div className="skeleton-header"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
            <div className="skeleton-footer">
              <div className="skeleton-button"></div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="skeleton-list-item">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-text">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="skeleton-profile">
            <div className="skeleton-avatar large"></div>
            <div className="skeleton-name"></div>
            <div className="skeleton-bio"></div>
            <div className="skeleton-stats">
              <div className="skeleton-stat"></div>
              <div className="skeleton-stat"></div>
              <div className="skeleton-stat"></div>
            </div>
          </div>
        );
      case 'chart':
        return (
          <div className="skeleton-chart">
            <div className="skeleton-chart-header"></div>
            <div className="skeleton-chart-body">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-bar" style={{ height: `${Math.random() * 100 + 20}%` }}></div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="skeleton-container">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="skeleton-wrapper">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

// 🎨 LOADING STATES FOR DIFFERENT CONTEXTS
export const StudySessionLoading: React.FC = () => (
  <div className="study-session-loading">
    <div className="study-preparation">
      <div className="book-animation">
        <div className="book-cover"></div>
        <div className="book-pages">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`page page-${i + 1}`}></div>
          ))}
        </div>
      </div>
      <div className="knowledge-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
    <h3>📚 Preparing your study session...</h3>
    <p>Optimizing content for maximum learning efficiency</p>
  </div>
);

export const MockTestLoading: React.FC = () => (
  <div className="mock-test-loading">
    <div className="exam-preparation">
      <div className="clock-animation">
        <div className="clock-face">
          <div className="clock-hand hour"></div>
          <div className="clock-hand minute"></div>
          <div className="clock-hand second"></div>
        </div>
      </div>
      <div className="focus-rings">
        <div className="focus-ring ring-1"></div>
        <div className="focus-ring ring-2"></div>
        <div className="focus-ring ring-3"></div>
      </div>
    </div>
    <h3>⏰ Preparing your mock test...</h3>
    <p>Creating the optimal exam environment</p>
  </div>
);

export const AIAnalysisLoading: React.FC = () => (
  <div className="ai-analysis-loading">
    <div className="ai-brain">
      <div className="brain-structure">
        <div className="neural-layer layer-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="neural-node"></div>
          ))}
        </div>
        <div className="neural-layer layer-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="neural-node"></div>
          ))}
        </div>
        <div className="neural-layer layer-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="neural-node"></div>
          ))}
        </div>
      </div>
      <div className="thinking-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </div>
    <h3>🤖 AI analyzing your performance...</h3>
    <p>Generating personalized insights and recommendations</p>
  </div>
);

export default RevolutionaryLoading;