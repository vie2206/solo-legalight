'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  ArrowRight,
  Users,
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Calendar,
  BarChart3,
  Zap,
  Star,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Phone,
  Video,
  MessageSquare,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

// Step-by-step process data
const processSteps = [
  {
    step: 1,
    title: "Sign Up & Profile Setup",
    duration: "2 minutes",
    description: "Create your account and complete your CLAT preparation profile. Tell us about your target NLUs, current preparation level, and study preferences.",
    features: [
      "Quick Google/SMS sign-up",
      "Personalized goal setting",
      "Study schedule preferences",
      "Target NLU selection"
    ],
    icon: Users,
    color: "from-blue-600 to-cyan-600",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
  },
  {
    step: 2,
    title: "AI-Powered Diagnostic Test",
    duration: "45 minutes",
    description: "Take our comprehensive diagnostic assessment that evaluates your current level across all CLAT sections and creates your personalized learning path.",
    features: [
      "Full-length diagnostic test",
      "Section-wise analysis",
      "Strengths & weaknesses mapping",
      "Personalized study plan generation"
    ],
    icon: Brain,
    color: "from-purple-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
  },
  {
    step: 3,
    title: "Personalized Study Dashboard",
    duration: "Ongoing",
    description: "Access your AI-curated dashboard with daily study plans, progress tracking, and performance insights tailored to your learning style and goals.",
    features: [
      "Daily study schedule",
      "Progress tracking",
      "Performance analytics",
      "Goal milestone tracking"
    ],
    icon: Target,
    color: "from-green-600 to-emerald-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    step: 4,
    title: "Smart Content & Practice",
    duration: "Daily",
    description: "Engage with our adaptive learning content, spaced repetition flashcards, and AI-recommended practice questions based on your performance patterns.",
    features: [
      "Adaptive content delivery",
      "Spaced repetition system",
      "Smart question recommendations",
      "Video explanations"
    ],
    icon: BookOpen,
    color: "from-orange-600 to-red-600",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"
  },
  {
    step: 5,
    title: "Mock Tests & Analysis",
    duration: "Weekly",
    description: "Take full-length mock tests with our 42-page analysis system. Get detailed insights, rank prediction, and actionable improvement strategies.",
    features: [
      "Full-length mock tests",
      "42-page detailed analysis",
      "Rank prediction accuracy",
      "Improvement action plans"
    ],
    icon: BarChart3,
    color: "from-yellow-600 to-orange-600",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    step: 6,
    title: "AI Rank Prediction & NLU Selection",
    duration: "Real-time",
    description: "Get 85%+ accurate rank predictions and explore your admission chances across all 26 NLUs with our 3D visualization system.",
    features: [
      "85%+ accurate predictions",
      "3D NLU visualization",
      "Admission probability analysis",
      "Strategic college selection"
    ],
    icon: Trophy,
    color: "from-purple-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  }
];

const keyFeatures = [
  {
    title: "AI-Powered Personalization",
    description: "Machine learning algorithms adapt to your learning style and optimize your study plan in real-time",
    icon: Brain,
    stats: "99% personalization accuracy"
  },
  {
    title: "Predictive Analytics",
    description: "Advanced algorithms predict your CLAT rank with 85%+ accuracy and suggest improvement strategies",
    icon: TrendingUp,
    stats: "85%+ prediction accuracy"
  },
  {
    title: "Comprehensive Mock Tests",
    description: "Full-length tests with detailed 42-page analysis covering every aspect of your performance",
    icon: Target,
    stats: "42-page detailed analysis"
  },
  {
    title: "Smart Study System",
    description: "Spaced repetition, adaptive questioning, and personalized content delivery for maximum retention",
    icon: Zap,
    stats: "3x faster learning"
  }
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                How SOLO Works
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Discover the revolutionary 6-step process that's helping thousands of students 
              achieve their CLAT dreams with AI-powered personalization and smart analytics.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                size="lg"
                onClick={() => setShowVideo(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo Video
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 hover:bg-white/20"
              >
                <Phone className="mr-2 h-5 w-5" />
                Schedule Live Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Why SOLO is Different</h2>
          <p className="text-gray-300">Revolutionary features that transform CLAT preparation</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3">
                {(() => {
                  const IconComponent = feature.icon;
                  return <IconComponent className="h-6 w-6 text-purple-400" />;
                })()}
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="mb-3 text-sm text-gray-400">{feature.description}</p>
              <div className="text-sm font-medium text-purple-400">{feature.stats}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Your Journey to CLAT Success</h2>
          <p className="text-xl text-gray-300">6 simple steps to transform your preparation</p>
        </div>

        {/* Step Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {processSteps.map((step) => (
            <Button
              key={step.step}
              variant={activeStep === step.step ? 'default' : 'outline'}
              onClick={() => setActiveStep(step.step)}
              className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              Step {step.step}
            </Button>
          ))}
        </div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Step Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${processSteps[activeStep - 1].color}`}>
                {(() => {
                  const IconComponent = processSteps[activeStep - 1].icon;
                  return <IconComponent className="h-8 w-8 text-white" />;
                })()}
              </div>
              <div>
                <div className="text-sm text-purple-400">Step {processSteps[activeStep - 1].step}</div>
                <h3 className="text-2xl font-bold text-white">{processSteps[activeStep - 1].title}</h3>
                <div className="text-gray-400">⏱️ {processSteps[activeStep - 1].duration}</div>
              </div>
            </div>

            <p className="text-lg text-gray-300">{processSteps[activeStep - 1].description}</p>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Key Features:</h4>
              {processSteps[activeStep - 1].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {activeStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="border-white/20 bg-white/10"
                >
                  Previous Step
                </Button>
              )}
              {activeStep < processSteps.length ? (
                <Button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Start Your Journey
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Step Visual */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={processSteps[activeStep - 1].image}
                alt={processSteps[activeStep - 1].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="mb-2 text-lg font-semibold text-white">
                  {processSteps[activeStep - 1].title}
                </h4>
                <p className="text-sm text-gray-300">
                  See how this step works in practice
                </p>
              </div>
              <Button
                size="sm"
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Process Timeline */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-white">Complete Process Timeline</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  activeStep === step.step
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
                onClick={() => setActiveStep(step.step)}
              >
                <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${step.color}`}>
                  {(() => {
                    const IconComponent = step.icon;
                    return <IconComponent className="h-6 w-6 text-white" />;
                  })()}
                </div>
                <div className="text-xs text-purple-400">Step {step.step}</div>
                <div className="text-sm font-semibold text-white">{step.title}</div>
                <div className="text-xs text-gray-400">{step.duration}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Resources */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Need Help Getting Started?</h2>
            <p className="mb-8 text-gray-300">
              Our support team is here to guide you through every step of your CLAT journey
            </p>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Video className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                <h3 className="mb-2 font-semibold text-white">Live Demo</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Schedule a personalized demo with our CLAT experts
                </p>
                <Button size="sm" className="w-full">Book Demo</Button>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-green-400" />
                <h3 className="mb-2 font-semibold text-white">Chat Support</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Get instant answers to your questions 24/7
                </p>
                <Button size="sm" variant="outline" className="w-full border-white/20">Start Chat</Button>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Phone className="mx-auto mb-4 h-12 w-12 text-purple-400" />
                <h3 className="mb-2 font-semibold text-white">Call Support</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Speak directly with our preparation counselors
                </p>
                <Button size="sm" variant="outline" className="w-full border-white/20">Call Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Ready to Start Your Success Story?</h2>
          <p className="mb-8 text-xl text-gray-300">
            Join thousands of students who've transformed their CLAT preparation with SOLO
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start 30-Day Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/10 hover:bg-white/20"
            >
              View Success Stories
              <Star className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}