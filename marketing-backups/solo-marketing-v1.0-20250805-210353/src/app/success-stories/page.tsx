'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Users,
  TrendingUp,
  Award,
  Play,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

// Success Stories Data
const successStories = [
  {
    id: 1,
    name: "Arjun Sharma",
    rank: 45,
    nlu: "NLSIU Bengaluru",
    year: "2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    story: "SOLO's AI-powered rank predictor gave me the confidence to aim higher. The 3D NLU showcase helped me visualize my dream college every day. From rank 1200 in my first mock to AIR 45 - this platform transformed my CLAT journey completely.",
    beforeRank: "1200+ in initial mocks",
    afterRank: "AIR 45",
    studyHours: "8-10 hours daily",
    testimonial: "The personalized study plan and AI insights were game-changers. I could identify my weak areas precisely and work on them systematically.",
    videoUrl: "/testimonials/arjun-story.mp4",
    category: "Top 50"
  },
  {
    id: 2,
    name: "Priya Menon",
    rank: 89,
    nlu: "NALSAR Hyderabad",
    year: "2024",
    image: "https://images.unsplash.com/photo-1494790108755-2616c41e0c3b?w=400&q=80",
    story: "Coming from a small town in Kerala, I had limited resources. SOLO's comprehensive mock test analysis and reading mastery program bridged that gap. The community support was incredible - like having CLAT toppers as study buddies.",
    beforeRank: "800+ in practice tests",
    afterRank: "AIR 89",
    studyHours: "6-8 hours daily",
    testimonial: "The platform's accessibility features and multilingual support made quality CLAT prep possible from anywhere in India.",
    videoUrl: "/testimonials/priya-story.mp4",
    category: "Top 100"
  },
  {
    id: 3,
    name: "Rohit Agarwal",
    rank: 156,
    nlu: "NLIU Bhopal",
    year: "2024",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    story: "The spaced repetition flashcards and GK database were phenomenal. I improved my GK score from 15/35 to 32/35 consistently. The countdown timers kept me motivated throughout my preparation journey.",
    beforeRank: "600+ in sectional tests",
    afterRank: "AIR 156",
    studyHours: "7-9 hours daily",
    testimonial: "SOLO made CLAT preparation enjoyable. The gamification elements kept me engaged even during the toughest study sessions.",
    videoUrl: "/testimonials/rohit-story.mp4",
    category: "Top 200"
  },
  {
    id: 4,
    name: "Sneha Patel",
    rank: 234,
    nlu: "WBNUJS Kolkata",
    year: "2024",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    story: "As a working student, time was my biggest constraint. SOLO's AI study planner optimized my limited study hours perfectly. The platform adapted to my schedule and maximized every minute I could dedicate to CLAT prep.",
    beforeRank: "900+ in mocks",
    afterRank: "AIR 234",
    studyHours: "4-5 hours daily",
    testimonial: "The efficiency gains were incredible. I achieved more in 4 hours with SOLO than I did in 8 hours with traditional methods.",
    videoUrl: "/testimonials/sneha-story.mp4",
    category: "Working Student"
  },
  {
    id: 5,
    name: "Vikram Singh",
    rank: 312,
    nlu: "NLU Jodhpur",
    year: "2024",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    story: "The peer comparison feature motivated me to push harder. Seeing students with similar profiles achieve great ranks gave me confidence. The weekly insights helped me track progress scientifically.",
    beforeRank: "1000+ in practice",
    afterRank: "AIR 312",
    studyHours: "6-7 hours daily",
    testimonial: "SOLO created a competitive yet supportive environment. The community aspect made solo preparation feel less isolating.",
    videoUrl: "/testimonials/vikram-story.mp4",
    category: "Top 500"
  },
  {
    id: 6,
    name: "Ananya Reddy",
    rank: 445,
    nlu: "HNLU Raipur",
    year: "2024",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    story: "The detailed error analysis after each mock test was incredibly valuable. I could see exactly where I was losing marks and how to improve. The prediction accuracy gave me realistic goal-setting capability.",
    beforeRank: "1200+ initially",
    afterRank: "AIR 445",
    studyHours: "5-6 hours daily",
    testimonial: "Data-driven preparation made all the difference. Every study decision was backed by AI insights and performance analytics.",
    videoUrl: "/testimonials/ananya-story.mp4",
    category: "Data-Driven Success"
  }
];

const stats = [
  {
    number: "2,500+",
    label: "Success Stories",
    sublabel: "CLAT 2024 Qualifiers"
  },
  {
    number: "85%+",
    label: "Accuracy Rate",
    sublabel: "Rank Predictions"
  },
  {
    number: "92%",
    label: "NLU Admission Rate",
    sublabel: "Top 1000 Scorers"
  },
  {
    number: "4.9/5",
    label: "Student Rating",
    sublabel: "Platform Experience"
  }
];

export default function SuccessStoriesPage() {
  const [selectedStory, setSelectedStory] = useState(successStories[0]);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredStories = successStories.filter(story => 
    filterCategory === 'all' || story.category === filterCategory
  );

  const categories = ['all', 'Top 50', 'Top 100', 'Top 200', 'Working Student', 'Data-Driven Success'];

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
                Success Stories
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Real students, real results. Discover how SOLO transformed CLAT preparation 
              for thousands of students across India and helped them achieve their NLU dreams.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div className="mb-2 text-4xl font-bold text-white">{stat.number}</div>
                <div className="mb-1 font-semibold text-white">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? 'default' : 'outline'}
              onClick={() => setFilterCategory(category)}
              className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              {category === 'all' ? 'All Stories' : category}
            </Button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Stories List */}
          <div className="lg:col-span-1">
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStory(story)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    selectedStory.id === story.id
                      ? 'border-purple-400 bg-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image 
                        src={story.image} 
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{story.name}</h3>
                      <p className="text-sm text-gray-400">AIR {story.rank} • {story.nlu}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                          {story.category}
                        </span>
                        <span className="text-xs text-gray-500">{story.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Featured Story */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
            >
              <div className="p-8">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full">
                      <Image 
                        src={selectedStory.image} 
                        alt={selectedStory.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedStory.name}</h2>
                      <p className="text-lg text-purple-300">AIR {selectedStory.rank} • {selectedStory.nlu}</p>
                      <p className="text-gray-400">CLAT {selectedStory.year}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/20 bg-white/10">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 bg-white/10">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Story Content */}
                <div className="mb-8 space-y-6">
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                    <Quote className="absolute top-4 left-4 h-8 w-8 text-purple-400 opacity-50" />
                    <p className="pl-12 text-lg leading-relaxed text-gray-300">
                      {selectedStory.story}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-white">Key Testimonial</h3>
                    <p className="italic text-gray-300">"{selectedStory.testimonial}"</p>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-green-500/10 p-4 text-center">
                    <div className="mb-2 text-2xl font-bold text-green-400">Before</div>
                    <div className="text-sm text-gray-300">{selectedStory.beforeRank}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-purple-500/10 p-4 text-center">
                    <div className="mb-2 text-2xl font-bold text-purple-400">After</div>
                    <div className="text-sm text-gray-300">{selectedStory.afterRank}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-blue-500/10 p-4 text-center">
                    <div className="mb-2 text-2xl font-bold text-blue-400">Daily Study</div>
                    <div className="text-sm text-gray-300">{selectedStory.studyHours}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Video Story
                  </Button>
                  <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Connect with {selectedStory.name.split(' ')[0]}
                  </Button>
                  <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Journey
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 text-center backdrop-blur-sm"
            >
              <h3 className="mb-4 text-2xl font-bold text-white">
                Ready to Write Your Success Story?
              </h3>
              <p className="mb-6 text-gray-300">
                Join thousands of students who transformed their CLAT journey with SOLO
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Start Your Free Trial
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/10 hover:bg-white/20"
                >
                  Schedule Demo Call
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}