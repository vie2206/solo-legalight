'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Code,
  Target,
  Users,
  Sparkles,
  Award,
  BookOpen,
  Brain,
  Lightbulb,
  Coffee,
  ArrowRight,
  CheckCircle,
  Quote,
  Zap,
  Rocket,
  Star,
  Globe,
  Shield,
  TrendingUp,
  MessageSquare,
  PlayCircle
} from 'lucide-react';

const Trophy = Award;

const foundersData = {
  vivek: {
    name: 'Vivek Mishra',
    title: 'Founder & CEO',
    shortTitle: 'The Visionary',
    avatar: '/about/vivek-illustration.svg', // We'll create this
    story: [
      "The spark ignited during my final year of law school. I watched brilliant minds—future legal giants—stumble not because they lacked talent, but because they lacked the right guidance. Traditional coaching was a broken system: expensive, impersonal, one-size-fits-all.",
      "I had a choice: accept the status quo or revolutionize it. Having always been fascinated by the intersection of technology and human potential, I saw what others missed—AI could be the great equalizer in education.",
      "Today, I share my home with 13 rescue cats, each a reminder that every individual deserves care, attention, and the chance to thrive. Just like these cats found their way to me, I believe every student can find their path to success—they just need the right platform."
    ],
    mission: "Democratizing legal education through AI, making quality preparation accessible to every student, regardless of their background or location.",
    traits: ["Visionary", "Cat Lover", "Tech Enthusiast", "Education Revolutionary"],
    quote: "Every student has the potential to be extraordinary. Our job is to unlock it.",
    stats: { founded: "2022", students: "10,000+", accuracy: "85%" }
  },
  ayush: {
    name: 'Ayush Kumar',
    title: 'Co-founder & CTO',
    shortTitle: 'The Architect',
    avatar: '/about/ayush-illustration.svg', // We'll create this
    story: [
      "While pursuing my engineering degree, I discovered that the most complex problems often have elegant solutions. When Vivek shared his vision of transforming CLAT preparation, I saw not just a business opportunity, but a chance to build something that could change lives.",
      "My passion lies in creating technology that feels human. Every algorithm we design, every feature we build, every prediction we make—it all comes back to one thing: helping students achieve their dreams with unprecedented precision.",
      "The technical challenges we've solved—85% accurate rank predictions, personalized AI tutoring, real-time performance analytics—these aren't just features. They're the building blocks of a future where every student has access to world-class preparation."
    ],
    mission: "Building the most advanced AI-powered education platform that adapts to each student's unique learning journey.",
    traits: ["AI Expert", "Problem Solver", "System Architect", "Innovation Driver"],
    quote: "Technology should amplify human potential, not replace it. That's the philosophy behind every line of code we write.",
    stats: { algorithms: "50+", predictions: "1M+", accuracy: "99.2%" }
  }
};

const milestones = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Two friends with a shared vision to democratize legal education started building the future of CLAT preparation',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    achievement: 'Founded SOLO'
  },
  {
    year: '2023',
    title: 'AI Breakthrough',
    description: 'Achieved industry-leading 85% accuracy in rank prediction, setting a new standard for educational AI',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    achievement: '85% Prediction Accuracy'
  },
  {
    year: '2023',
    title: 'Platform Launch',
    description: 'Launched comprehensive CLAT preparation platform with personalized AI coaching and analytics',
    icon: Rocket,
    color: 'from-green-500 to-blue-500',
    achievement: 'Full Platform Live'
  },
  {
    year: '2024',
    title: 'Student Success',
    description: 'Celebrated first batch of CLAT toppers trained exclusively on SOLO platform',
    icon: Trophy,
    color: 'from-gold to-yellow-500',
    achievement: '1000+ Successful Students'
  },
  {
    year: '2024',
    title: 'Scale & Growth',
    description: 'Reached 10,000+ active students and expanded to serve aspiring lawyers across India',
    icon: Globe,
    color: 'from-blue-500 to-purple-500',
    achievement: '10K+ Active Users'
  },
  {
    year: '2025',
    title: 'The Future',
    description: 'Pioneering next-generation AI features and expanding to transform legal education globally',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    achievement: 'Global Expansion'
  }
];

const coreValues = [
  {
    title: 'Student-First Philosophy',
    description: 'Every decision we make starts with one question: How does this help our students succeed?',
    icon: Heart,
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'Relentless Innovation',
    description: 'We never settle. Each day brings new possibilities to make learning more effective and accessible.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Radical Transparency',
    description: 'Honest feedback, clear progress tracking, and transparent pricing. No hidden agendas, just results.',
    icon: Shield,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Precision Engineering',
    description: 'Our AI doesn\'t just predict—it understands. Every algorithm is crafted with mathematical precision.',
    icon: Target,
    color: 'from-purple-500 to-indigo-500'
  }
];

export default function About() {
  const [activeFounder, setActiveFounder] = useState<'vivek' | 'ayush'>('vivek');
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Founders Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Meet the Minds
              </span>
              <br />
              <span className="text-white">Behind the Revolution</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Two visionaries who dared to challenge the status quo and built the future of legal education
            </p>
          </motion.div>

          {/* Founder Selector */}
          <div className="mb-12 flex justify-center">
            <div className="flex rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
              {Object.entries(foundersData).map(([key, founder]) => (
                <button
                  key={key}
                  onClick={() => setActiveFounder(key as 'vivek' | 'ayush')}
                  className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                    activeFounder === key
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {founder.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Founder Profile */}
          <motion.div
            key={activeFounder}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 lg:grid-cols-2"
          >
            {/* Founder Illustration */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl">
                {/* Custom Illustration for Vivek */}
                {activeFounder === 'vivek' && (
                  <div className="relative">
                    {/* Main Portrait */}
                    <div className="mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full border-4 border-purple-400/50 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                      {/* Stylized Avatar */}
                      <div className="relative h-full w-full">
                        {/* Face */}
                        <div className="absolute left-1/2 top-1/4 h-32 w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-200 to-amber-300" />
                        {/* Hair */}
                        <div className="absolute left-1/2 top-1/4 h-16 w-28 -translate-x-1/2 -translate-y-4 rounded-t-full bg-gray-800" />
                        {/* Eyes */}
                        <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 gap-3">
                          <div className="h-2 w-3 rounded-full bg-gray-800" />
                          <div className="h-2 w-3 rounded-full bg-gray-800" />
                        </div>
                        {/* Smile */}
                        <div className="absolute left-1/2 top-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-gray-700" />
                        {/* Formal Attire */}
                        <div className="absolute bottom-0 left-1/2 h-20 w-32 -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-slate-800 to-slate-900" />
                      </div>
                    </div>

                    {/* 13 Cats Around */}
                    <div className="absolute inset-0">
                      {[...Array(13)].map((_, i) => {
                        const angle = (i * 360) / 13;
                        const radius = 140;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;
                        
                        return (
                          <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2"
                            style={{
                              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                            }}
                            animate={{
                              y: [0, -10, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.1,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {/* Cat Emoji as illustration */}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-sm">
                              🐱
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Cat Counter */}
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-purple-300">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm font-medium">13 Rescue Cats</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Illustration for Ayush */}
                {activeFounder === 'ayush' && (
                  <div className="relative">
                    {/* Main Portrait */}
                    <div className="mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full border-4 border-blue-400/50 bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
                      {/* Stylized Avatar */}
                      <div className="relative h-full w-full">
                        {/* Face */}
                        <div className="absolute left-1/2 top-1/4 h-32 w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-200 to-amber-300" />
                        {/* Hair */}
                        <div className="absolute left-1/2 top-1/4 h-16 w-28 -translate-x-1/2 -translate-y-4 rounded-t-full bg-gray-800" />
                        {/* Beard */}
                        <div className="absolute left-1/2 top-1/2 h-8 w-16 -translate-x-1/2 translate-y-2 rounded-b-full bg-gray-700" />
                        {/* Eyes */}
                        <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 gap-3">
                          <div className="h-2 w-3 rounded-full bg-gray-800" />
                          <div className="h-2 w-3 rounded-full bg-gray-800" />
                        </div>
                        {/* Casual Attire */}
                        <div className="absolute bottom-0 left-1/2 h-20 w-32 -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-blue-500 to-blue-600" />
                      </div>
                    </div>

                    {/* Tech Elements Around */}
                    <div className="absolute inset-0">
                      {[Code, Brain, Zap, Target, Rocket, Globe].map((Icon, i) => {
                        const angle = (i * 360) / 6;
                        const radius = 120;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;
                        
                        return (
                          <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2"
                            style={{
                              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                            }}
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 10,
                              delay: i * 0.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 backdrop-blur-sm">
                              <Icon className="h-5 w-5 text-blue-400" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Tech Badge */}
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
                        <Code className="h-4 w-4" />
                        <span className="text-sm font-medium">AI Architect</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Founder Story */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-4xl font-bold text-white">
                  {foundersData[activeFounder].name}
                </h3>
                <p className="mb-1 text-xl text-purple-400">
                  {foundersData[activeFounder].title}
                </p>
                <p className="text-lg text-gray-400">
                  {foundersData[activeFounder].shortTitle}
                </p>
              </div>

              {/* Quote */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <Quote className="absolute top-4 left-4 h-8 w-8 text-purple-400/50" />
                <p className="pl-12 text-lg italic text-gray-300">
                  "{foundersData[activeFounder].quote}"
                </p>
              </div>

              {/* Story */}
              <div className="space-y-4">
                {foundersData[activeFounder].story.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Mission */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 backdrop-blur-sm">
                <h4 className="mb-3 text-lg font-semibold text-white">Mission</h4>
                <p className="text-gray-300">{foundersData[activeFounder].mission}</p>
              </div>

              {/* Traits */}
              <div>
                <h4 className="mb-3 text-lg font-semibold text-white">Key Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {foundersData[activeFounder].traits.map((trait, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(foundersData[activeFounder].stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Our Journey</h2>
            <p className="text-xl text-gray-300">From vision to reality - the milestones that shaped SOLO</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-purple-500 to-pink-500" />

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-purple-600 to-pink-600">
                    {(() => {
                      const IconComponent = milestone.icon;
                      return <IconComponent className="h-8 w-8 text-white" />;
                    })()}
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <div className="mb-2 text-sm font-semibold text-purple-400">{milestone.year}</div>
                      <h3 className="mb-3 text-2xl font-bold text-white">{milestone.title}</h3>
                      <p className="mb-4 text-gray-300">{milestone.description}</p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                        <CheckCircle className="h-4 w-4" />
                        {milestone.achievement}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Our Core Values</h2>
            <p className="text-xl text-gray-300">The principles that guide every decision we make</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${value.color}`}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-12 text-center backdrop-blur-sm">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Join the Revolution?
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Experience the future of CLAT preparation. Join thousands of students who've already transformed their journey.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 hover:bg-white/20"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}