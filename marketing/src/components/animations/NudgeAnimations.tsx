'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Brain, Zap, Target, BookOpen, Award, TrendingUp, Clock, Users, CheckCircle, Star } from 'lucide-react';

/* ===================================================================
   NUDGE ANIMATIONS - UI8 PREMIUM ANIMATION SYSTEM
   Revolutionary CLAT Education Platform Visual Components
   =================================================================== */

export enum NudgeTheme {
  LIGHT = 'light',
  DARK = 'dark',
  CLAT_BLUE = 'clat-blue',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface AnimationProps {
  theme?: NudgeTheme;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/* ===================================================================
   WELCOME ANIMATION - CLAT Student Onboarding
   =================================================================== */

export const WelcomeAnimation: React.FC<AnimationProps> = ({
  theme = NudgeTheme.LIGHT,
  size = 'md',
  autoPlay = true,
  loop = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const themeStyles = {
    [NudgeTheme.LIGHT]: {
      primary: '#2563eb',
      secondary: '#f59e0b',
      accent: '#059669',
      background: 'rgba(255, 255, 255, 0.9)'
    },
    [NudgeTheme.DARK]: {
      primary: '#60a5fa',
      secondary: '#fbbf24',
      accent: '#34d399',
      background: 'rgba(15, 23, 42, 0.9)'
    },
    [NudgeTheme.CLAT_BLUE]: {
      primary: '#1a365d',
      secondary: '#dc2626',
      accent: '#f59e0b',
      background: 'linear-gradient(135deg, #1a365d, #2563eb)'
    },
    [NudgeTheme.SUCCESS]: {
      primary: '#059669',
      secondary: '#f59e0b',
      accent: '#2563eb',
      background: 'linear-gradient(135deg, #059669, #34d399)'
    },
    [NudgeTheme.WARNING]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#2563eb',
      background: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
    },
    [NudgeTheme.ERROR]: {
      primary: '#dc2626',
      secondary: '#f59e0b',
      accent: '#1a365d',
      background: 'linear-gradient(135deg, #dc2626, #ef4444)'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      ref={animationRef}
      className={`relative ${sizeClasses[size]} ${className} ${isVisible ? 'animate-ui8-scale-in' : 'opacity-0'}`}
      style={{
        background: currentTheme.background,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(26, 54, 93, 0.25)',
        ...style
      }}
    >
      {/* Animated Graduation Cap */}
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full ${loop ? 'animate-ui8-pulse' : ''}`}
          style={{
            background: `radial-gradient(circle, ${currentTheme.primary}20, transparent)`,
            transform: 'scale(1.5)'
          }}
        />
        
        {/* Main Icon */}
        <BookOpen
          size={size === 'sm' ? 20 : size === 'md' ? 28 : size === 'lg' ? 36 : 48}
          style={{ color: currentTheme.primary }}
          className={loop ? 'animate-ui8-float' : ''}
        />
        
        {/* Success Badge */}
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{
            background: currentTheme.accent,
            boxShadow: `0 0 10px ${currentTheme.accent}40`
          }}
        >
          <CheckCircle size={10} color="white" />
        </div>
        
        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: currentTheme.secondary,
              top: `${20 + i * 15}%`,
              left: `${80 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animation: loop ? 'ui8-float 2s ease-in-out infinite' : 'none'
            }}
          />
        ))}
      </div>
      
      {/* Welcome Text Overlay for Large Sizes */}
      {size === 'xl' && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: currentTheme.primary,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Welcome
          </span>
        </div>
      )}
    </div>
  );
};

/* ===================================================================
   AI INSIGHT ANIMATION - CLAT Learning Analytics
   =================================================================== */

export const AIInsightAnimation: React.FC<AnimationProps> = ({
  theme = NudgeTheme.CLAT_BLUE,
  size = 'md',
  autoPlay = true,
  loop = true,
  className = '',
  style = {}
}) => {
  const [phase, setPhase] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoPlay, loop]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const themeStyles = {
    [NudgeTheme.LIGHT]: {
      primary: '#2563eb',
      secondary: '#f59e0b',
      accent: '#059669',
      neural: '#8b5cf6'
    },
    [NudgeTheme.DARK]: {
      primary: '#60a5fa',
      secondary: '#fbbf24',
      accent: '#34d399',
      neural: '#a78bfa'
    },
    [NudgeTheme.CLAT_BLUE]: {
      primary: '#1a365d',
      secondary: '#dc2626',
      accent: '#f59e0b',
      neural: '#8b5cf6'
    },
    [NudgeTheme.SUCCESS]: {
      primary: '#059669',
      secondary: '#f59e0b',
      accent: '#2563eb',
      neural: '#34d399'
    },
    [NudgeTheme.WARNING]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#2563eb',
      neural: '#fbbf24'
    },
    [NudgeTheme.ERROR]: {
      primary: '#dc2626',
      secondary: '#f59e0b',
      accent: '#1a365d',
      neural: '#ef4444'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      ref={animationRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.neural}20)`,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `0 10px 30px ${currentTheme.primary}20`,
        ...style
      }}
    >
      {/* Central Brain Icon */}
      <div className="relative">
        <Brain
          size={size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 40 : 56}
          style={{ 
            color: currentTheme.primary,
            filter: `drop-shadow(0 0 10px ${currentTheme.primary}40)`
          }}
          className={phase === 0 ? 'animate-ui8-pulse' : ''}
        />
        
        {/* Neural Network Connections */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: currentTheme.neural,
              top: `${15 + (i % 3) * 25}%`,
              left: `${10 + (i % 2) * 80}%`,
              opacity: phase === 1 ? 1 : 0.3,
              animation: phase === 1 ? 'ui8-pulse 0.5s ease-in-out' : 'none',
              animationDelay: `${i * 0.1}s`,
              boxShadow: `0 0 6px ${currentTheme.neural}`
            }}
          />
        ))}
        
        {/* Insight Spark */}
        <div
          className="absolute -top-2 -right-2"
          style={{
            opacity: phase === 2 ? 1 : 0,
            transform: phase === 2 ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.3s ease-out'
          }}
        >
          <Zap
            size={size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : 24}
            style={{ 
              color: currentTheme.accent,
              filter: `drop-shadow(0 0 8px ${currentTheme.accent}60)`
            }}
          />
        </div>
        
        {/* Success Indicator */}
        <div
          className="absolute -bottom-1 -right-1"
          style={{
            opacity: phase === 3 ? 1 : 0,
            transform: phase === 3 ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.3s ease-out'
          }}
        >
          <Target
            size={size === 'sm' ? 10 : size === 'md' ? 14 : size === 'lg' ? 18 : 22}
            style={{ 
              color: currentTheme.accent,
              filter: `drop-shadow(0 0 6px ${currentTheme.accent}60)`
            }}
          />
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                background: i === phase ? currentTheme.primary : `${currentTheme.primary}40`,
                boxShadow: i === phase ? `0 0 4px ${currentTheme.primary}` : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ===================================================================
   CLAT PROGRESS ANIMATION - Learning Journey Tracker
   =================================================================== */

export const CLATProgressAnimation: React.FC<AnimationProps & { 
  progress?: number; 
  targetScore?: number;
  currentScore?: number;
}> = ({
  theme = NudgeTheme.SUCCESS,
  size = 'lg',
  autoPlay = true,
  loop = false,
  className = '',
  style = {},
  progress = 75,
  targetScore = 150,
  currentScore = 120
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);

    return () => clearTimeout(timer);
  }, [autoPlay, progress]);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
    xl: 'w-52 h-52'
  };

  const themeStyles = {
    [NudgeTheme.LIGHT]: {
      primary: '#2563eb',
      secondary: '#f59e0b',
      accent: '#059669',
      background: '#f8fafc'
    },
    [NudgeTheme.DARK]: {
      primary: '#60a5fa',
      secondary: '#fbbf24',
      accent: '#34d399',
      background: '#1e293b'
    },
    [NudgeTheme.CLAT_BLUE]: {
      primary: '#1a365d',
      secondary: '#dc2626',
      accent: '#f59e0b',
      background: '#f1f5f9'
    },
    [NudgeTheme.SUCCESS]: {
      primary: '#059669',
      secondary: '#f59e0b',
      accent: '#2563eb',
      background: '#f0fdf4'
    },
    [NudgeTheme.WARNING]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#2563eb',
      background: '#fffbeb'
    },
    [NudgeTheme.ERROR]: {
      primary: '#dc2626',
      secondary: '#f59e0b',
      accent: '#1a365d',
      background: '#fef2f2'
    }
  };

  const currentTheme = themeStyles[theme];
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = `${(animatedProgress / 100) * circumference} ${circumference}`;

  return (
    <div
      ref={animationRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{
        background: currentTheme.background,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid rgba(255, 255, 255, 0.8)',
        boxShadow: `0 20px 40px ${currentTheme.primary}20, 0 0 20px ${currentTheme.primary}10`,
        ...style
      }}
    >
      {/* Progress Circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={`${currentTheme.primary}20`}
          strokeWidth="6"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={currentTheme.primary}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          style={{
            transition: 'stroke-dasharray 2s ease-out',
            filter: `drop-shadow(0 0 8px ${currentTheme.primary}60)`
          }}
        />
      </svg>
      
      {/* Center Content */}
      <div className="text-center z-10">
        {/* Trophy Icon */}
        <Award
          size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 32}
          style={{ 
            color: currentTheme.primary,
            marginBottom: '4px'
          }}
          className={animatedProgress >= 80 ? 'animate-ui8-bounce-in' : ''}
        />
        
        {/* Score Display */}
        <div 
          className="font-bold"
          style={{ 
            color: currentTheme.primary,
            fontSize: size === 'sm' ? '0.75rem' : size === 'md' ? '0.875rem' : size === 'lg' ? '1rem' : '1.25rem'
          }}
        >
          {currentScore}
        </div>
        
        {/* Progress Percentage */}
        <div 
          className="text-xs opacity-80"
          style={{ color: currentTheme.secondary }}
        >
          {Math.round(animatedProgress)}%
        </div>
      </div>
      
      {/* Achievement Stars */}
      {animatedProgress >= 80 && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={8}
              className="absolute animate-ui8-float"
              style={{
                color: currentTheme.accent,
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.3}s`,
                filter: `drop-shadow(0 0 4px ${currentTheme.accent}60)`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ===================================================================
   STUDY STREAK ANIMATION - Motivation Booster
   =================================================================== */

export const StudyStreakAnimation: React.FC<AnimationProps & { 
  streakDays?: number; 
  isActive?: boolean;
}> = ({
  theme = NudgeTheme.WARNING,
  size = 'md',
  autoPlay = true,
  loop = true,
  className = '',
  style = {},
  streakDays = 7,
  isActive = true
}) => {
  const [flame, setFlame] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || !isActive) return;

    const interval = setInterval(() => {
      setFlame(prev => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(interval);
  }, [autoPlay, isActive, loop]);

  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-20 h-24',
    lg: 'w-24 h-28',
    xl: 'w-32 h-36'
  };

  const themeStyles = {
    [NudgeTheme.LIGHT]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#059669'
    },
    [NudgeTheme.DARK]: {
      primary: '#fbbf24',
      secondary: '#ef4444',
      accent: '#34d399'
    },
    [NudgeTheme.CLAT_BLUE]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#1a365d'
    },
    [NudgeTheme.SUCCESS]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#059669'
    },
    [NudgeTheme.WARNING]: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#2563eb'
    },
    [NudgeTheme.ERROR]: {
      primary: '#ef4444',
      secondary: '#dc2626',
      accent: '#f59e0b'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      ref={animationRef}
      className={`relative ${sizeClasses[size]} ${className} flex flex-col items-center justify-end`}
      style={style}
    >
      {/* Flame Animation */}
      <div className="relative mb-2">
        {/* Base Fire */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: size === 'sm' ? '20px' : size === 'md' ? '24px' : size === 'lg' ? '28px' : '36px',
            height: size === 'sm' ? '28px' : size === 'md' ? '32px' : size === 'lg' ? '36px' : '44px',
            background: `linear-gradient(180deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: `drop-shadow(0 0 10px ${currentTheme.primary}60)`,
            transform: `scale(${isActive ? 1 + flame * 0.1 : 0.8})`,
            opacity: isActive ? 1 : 0.5,
            transition: 'all 0.3s ease-out'
          }}
        />
        
        {/* Inner Flame */}
        <div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
          style={{
            width: size === 'sm' ? '12px' : size === 'md' ? '14px' : size === 'lg' ? '16px' : '20px',
            height: size === 'sm' ? '20px' : size === 'md' ? '24px' : size === 'lg' ? '28px' : '32px',
            background: `linear-gradient(180deg, ${currentTheme.accent} 0%, ${currentTheme.primary} 100%)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: `scale(${isActive ? 1 + flame * 0.15 : 0.6})`,
            opacity: isActive ? 0.9 : 0.3,
            transition: 'all 0.2s ease-out'
          }}
        />
        
        {/* Sparks */}
        {isActive && [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: currentTheme.accent,
              top: `${10 + i * 5}%`,
              left: `${40 + i * 20}%`,
              opacity: flame === i ? 1 : 0.3,
              transform: `translateY(${flame === i ? '-4px' : '0'})`,
              transition: 'all 0.3s ease-out',
              boxShadow: `0 0 4px ${currentTheme.accent}`
            }}
          />
        ))}
      </div>
      
      {/* Streak Counter */}
      <div
        className="text-center px-2 py-1 rounded-lg"
        style={{
          background: isActive ? currentTheme.primary : `${currentTheme.primary}40`,
          color: 'white',
          fontSize: size === 'sm' ? '0.75rem' : size === 'md' ? '0.875rem' : '1rem',
          fontWeight: '700',
          boxShadow: isActive ? `0 4px 8px ${currentTheme.primary}40` : 'none',
          minWidth: '40px'
        }}
      >
        {streakDays}
        <div style={{ fontSize: '0.6em', opacity: 0.9 }}>
          day{streakDays !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

/* ===================================================================
   RANK PREDICTION ANIMATION - AI Powered Insights
   =================================================================== */

export const RankPredictionAnimation: React.FC<AnimationProps & { 
  predictedRank?: number; 
  confidence?: number;
  isCalculating?: boolean;
}> = ({
  theme = NudgeTheme.CLAT_BLUE,
  size = 'lg',
  autoPlay = true,
  loop = true,
  className = '',
  style = {},
  predictedRank = 1250,
  confidence = 85,
  isCalculating = false
}) => {
  const [calculation, setCalculation] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || !isCalculating) return;

    const interval = setInterval(() => {
      setCalculation(prev => (prev + 1) % 8);
    }, 200);

    return () => clearInterval(interval);
  }, [autoPlay, isCalculating, loop]);

  const sizeClasses = {
    sm: 'w-24 h-16',
    md: 'w-32 h-20',
    lg: 'w-40 h-24',
    xl: 'w-52 h-32'
  };

  const themeStyles = {
    [NudgeTheme.LIGHT]: {
      primary: '#2563eb',
      secondary: '#059669',
      accent: '#f59e0b',
      background: '#f8fafc'
    },
    [NudgeTheme.DARK]: {
      primary: '#60a5fa',
      secondary: '#34d399',
      accent: '#fbbf24',
      background: '#1e293b'
    },
    [NudgeTheme.CLAT_BLUE]: {
      primary: '#1a365d',
      secondary: '#059669',
      accent: '#f59e0b',
      background: 'linear-gradient(135deg, #1a365d10, #2563eb10)'
    },
    [NudgeTheme.SUCCESS]: {
      primary: '#059669',
      secondary: '#2563eb',
      accent: '#f59e0b',
      background: '#f0fdf4'
    },
    [NudgeTheme.WARNING]: {
      primary: '#f59e0b',
      secondary: '#2563eb',
      accent: '#dc2626',
      background: '#fffbeb'
    },
    [NudgeTheme.ERROR]: {
      primary: '#dc2626',
      secondary: '#059669',
      accent: '#f59e0b',
      background: '#fef2f2'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      ref={animationRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{
        background: currentTheme.background,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        boxShadow: `0 10px 30px ${currentTheme.primary}20`,
        ...style
      }}
    >
      {/* Rank Display */}
      <div className="flex-1">
        <div 
          className="font-bold"
          style={{ 
            color: currentTheme.primary,
            fontSize: size === 'sm' ? '1.25rem' : size === 'md' ? '1.5rem' : size === 'lg' ? '1.75rem' : '2rem'
          }}
        >
          {isCalculating ? (
            <span className="animate-ui8-pulse">
              {Array.from({ length: String(predictedRank).length }, (_, i) => 
                calculation >= i ? String(predictedRank)[i] : '?'
              ).join('')}
            </span>
          ) : (
            `#${predictedRank}`
          )}
        </div>
        
        <div 
          className="text-xs opacity-80"
          style={{ color: currentTheme.secondary }}
        >
          {isCalculating ? 'Calculating...' : `${confidence}% confidence`}
        </div>
      </div>
      
      {/* Trending Icon */}
      <div className="ml-3">
        <TrendingUp
          size={size === 'sm' ? 20 : size === 'md' ? 24 : size === 'lg' ? 28 : 32}
          style={{ 
            color: currentTheme.secondary,
            filter: `drop-shadow(0 0 8px ${currentTheme.secondary}40)`
          }}
          className={isCalculating ? 'animate-ui8-pulse' : 'animate-ui8-float'}
        />
      </div>
      
      {/* AI Indicator */}
      <div
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: currentTheme.accent,
          boxShadow: `0 0 10px ${currentTheme.accent}60`
        }}
      >
        <Brain size={12} color="white" className={isCalculating ? 'animate-ui8-pulse' : ''} />
      </div>
      
      {/* Calculation Waves */}
      {isCalculating && (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full"
              style={{
                left: `${calculation * 12.5 - 50 + i * 20}%`,
                width: '2px',
                background: `linear-gradient(90deg, transparent, ${currentTheme.accent}60, transparent)`,
                animation: 'ui8-fade-in-right 0.5s ease-out'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ===================================================================
   EXPORT ALL ANIMATIONS
   =================================================================== */

export default WelcomeAnimation;