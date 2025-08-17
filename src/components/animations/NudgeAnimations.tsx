/**
 * UI8 Nudge Animations for CLAT Platform
 * 10 Premium animations customized for educational context
 */

import React, { useEffect, useRef, useState } from 'react';

// Animation contexts for CLAT platform
export enum NudgeAnimationContext {
  WELCOME = 'welcome',
  STUDY_PROGRESS = 'study-progress', 
  TEST_COMPLETION = 'test-completion',
  ACHIEVEMENT = 'achievement',
  SCORE_REVEAL = 'score-reveal',
  RANK_IMPROVEMENT = 'rank-improvement',
  AI_INSIGHT = 'ai-insight',
  SUBSCRIPTION_SUCCESS = 'subscription-success',
  COMMUNITY_JOIN = 'community-join',
  EXAM_REMINDER = 'exam-reminder'
}

// Animation theme types
export enum NudgeTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface NudgeAnimationProps {
  context: NudgeAnimationContext;
  theme?: NudgeTheme;
  autoPlay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  trigger?: 'onMount' | 'onHover' | 'onClick' | 'onIntersect';
  duration?: number;
}

// Animation mapping to files
const ANIMATION_MAPPING = {
  [NudgeAnimationContext.WELCOME]: {
    file: '1',
    description: 'Welcome animation for new students'
  },
  [NudgeAnimationContext.STUDY_PROGRESS]: {
    file: '2', 
    description: 'Study milestone completion'
  },
  [NudgeAnimationContext.TEST_COMPLETION]: {
    file: '3',
    description: 'Mock test completion celebration'
  },
  [NudgeAnimationContext.ACHIEVEMENT]: {
    file: '4',
    description: 'Achievement unlock animation'
  },
  [NudgeAnimationContext.SCORE_REVEAL]: {
    file: '5',
    description: 'Dramatic score reveal'
  },
  [NudgeAnimationContext.RANK_IMPROVEMENT]: {
    file: '6',
    description: 'Rank prediction improvement'
  },
  [NudgeAnimationContext.AI_INSIGHT]: {
    file: '7',
    description: 'AI recommendation reveal'
  },
  [NudgeAnimationContext.SUBSCRIPTION_SUCCESS]: {
    file: '8',
    description: 'Payment success confirmation'
  },
  [NudgeAnimationContext.COMMUNITY_JOIN]: {
    file: '9',
    description: 'Community feature engagement'
  },
  [NudgeAnimationContext.EXAM_REMINDER]: {
    file: '10',
    description: 'CLAT exam countdown alert'
  }
};

const SIZE_CLASSES = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16', 
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
};

export const NudgeAnimation: React.FC<NudgeAnimationProps> = ({
  context,
  theme = NudgeTheme.DARK,
  autoPlay = true,
  loop = false,
  onComplete,
  className = '',
  size = 'md',
  trigger = 'onMount',
  duration
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const animation = ANIMATION_MAPPING[context];
  const videoSrc = `/ui8-assets/nudge-animations/${animation.file}-${theme}.mp4`;

  // Intersection Observer for onIntersect trigger
  useEffect(() => {
    if (trigger !== 'onIntersect') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldPlay(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [trigger]);

  // Auto-play handling
  useEffect(() => {
    if (trigger === 'onMount' && autoPlay) {
      setShouldPlay(true);
    }
  }, [trigger, autoPlay]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (onComplete) onComplete();
      if (loop) {
        video.currentTime = 0;
        video.play();
      }
    };

    const handleCanPlay = () => {
      if (shouldPlay) {
        video.play().catch(console.error);
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [shouldPlay, loop, onComplete]);

  // Play video when shouldPlay changes
  useEffect(() => {
    if (shouldPlay && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [shouldPlay]);

  const handleClick = () => {
    if (trigger === 'onClick') {
      setShouldPlay(true);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'onHover') {
      setShouldPlay(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`inline-block ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      title={animation.description}
    >
      <video
        ref={videoRef}
        className={`${SIZE_CLASSES[size]} object-cover rounded-lg`}
        muted
        playsInline
        preload="metadata"
        style={{ 
          filter: theme === NudgeTheme.DARK ? 'brightness(0.9)' : 'brightness(1.1)',
          ...(duration && { animationDuration: `${duration}ms` })
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Pre-built animation components for common use cases
export const WelcomeAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.WELCOME} {...props} />
);

export const StudyProgressAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.STUDY_PROGRESS} {...props} />
);

export const TestCompletionAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.TEST_COMPLETION} {...props} />
);

export const AchievementAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.ACHIEVEMENT} {...props} />
);

export const ScoreRevealAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.SCORE_REVEAL} {...props} />
);

export const RankImprovementAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.RANK_IMPROVEMENT} {...props} />
);

export const AIInsightAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.AI_INSIGHT} {...props} />
);

export const SubscriptionSuccessAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.SUBSCRIPTION_SUCCESS} {...props} />
);

export const CommunityJoinAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.COMMUNITY_JOIN} {...props} />
);

export const ExamReminderAnimation: React.FC<Omit<NudgeAnimationProps, 'context'>> = (props) => (
  <NudgeAnimation context={NudgeAnimationContext.EXAM_REMINDER} {...props} />
);

// Hook for programmatic animation control
export const useNudgeAnimation = (context: NudgeAnimationContext) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => setIsPlaying(true);
  const stop = () => setIsPlaying(false);

  return {
    isPlaying,
    play,
    stop,
    Component: (props: Omit<NudgeAnimationProps, 'context'>) => (
      <NudgeAnimation 
        context={context} 
        autoPlay={isPlaying}
        {...props} 
      />
    )
  };
};

// Animation trigger utilities
export const createAnimationTriggers = () => {
  return {
    // Trigger welcome animation for new users
    welcomeNewStudent: () => (
      <WelcomeAnimation 
        theme={NudgeTheme.LIGHT}
        size="lg"
        autoPlay={true}
        onComplete={() => console.log('Welcome animation completed')}
      />
    ),

    // Trigger when student completes a mock test
    celebrateTestCompletion: (score: number) => (
      <TestCompletionAnimation
        theme={score > 80 ? NudgeTheme.LIGHT : NudgeTheme.DARK}
        size="xl"
        autoPlay={true}
        onComplete={() => console.log(`Test completed with score: ${score}`)}
      />
    ),

    // Trigger when AI provides new insights
    showAIInsight: (insight: string) => (
      <AIInsightAnimation
        theme={NudgeTheme.DARK}
        size="md"
        trigger="onIntersect"
        onComplete={() => console.log(`AI insight shown: ${insight}`)}
      />
    ),

    // Trigger for rank improvement celebrations
    celebrateRankImprovement: (oldRank: number, newRank: number) => (
      <RankImprovementAnimation
        theme={NudgeTheme.LIGHT}
        size="lg"
        autoPlay={true}
        duration={3000}
        onComplete={() => console.log(`Rank improved from ${oldRank} to ${newRank}`)}
      />
    ),

    // Trigger for study milestone achievements
    celebrateStudyMilestone: (milestone: string) => (
      <AchievementAnimation
        theme={NudgeTheme.LIGHT}
        size="lg"
        loop={false}
        onComplete={() => console.log(`Milestone achieved: ${milestone}`)}
      />
    )
  };
};

// Animation preloader for better performance
export const preloadNudgeAnimations = async (): Promise<void> => {
  const promises = Object.keys(ANIMATION_MAPPING).map(async (context) => {
    const animation = ANIMATION_MAPPING[context as NudgeAnimationContext];
    
    // Preload both light and dark versions
    const lightSrc = `/ui8-assets/nudge-animations/${animation.file}-light.mp4`;
    const darkSrc = `/ui8-assets/nudge-animations/${animation.file}-dark.mp4`;
    
    const lightVideo = document.createElement('video');
    const darkVideo = document.createElement('video');
    
    lightVideo.src = lightSrc;
    darkVideo.src = darkSrc;
    
    return Promise.all([
      new Promise((resolve) => {
        lightVideo.addEventListener('loadeddata', resolve);
        lightVideo.load();
      }),
      new Promise((resolve) => {
        darkVideo.addEventListener('loadeddata', resolve);
        darkVideo.load();
      })
    ]);
  });
  
  await Promise.all(promises);
  console.log('🎬 All nudge animations preloaded');
};

export default NudgeAnimation;