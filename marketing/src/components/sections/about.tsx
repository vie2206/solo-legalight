'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';

const founderStory = {
  name: 'Vivek Mishra',
  title: 'Founder & CEO',
  image: '/about/founder.webp', // You might want to add this image
  story: [
    "The idea for SOLO came to me during my final year of law school when I saw countless talented students struggling with CLAT preparation despite their potential. Traditional coaching methods were expensive, one-size-fits-all, and failed to provide personalized insights that each student desperately needed.",
    "As someone who loves both technology and education, I realized that AI could revolutionize how students prepare for competitive exams. After months of research and development, SOLO was born - India's first AI-powered CLAT preparation platform that provides 85% accurate rank predictions and personalized study paths.",
    "Today, I share my home with 13 rescue cats (each named after a different NLU!) and continue to be driven by the mission of making quality legal education accessible to every student, regardless of their background or location."
  ],
  cats: 13,
  dedication: "Making quality legal education accessible to every student across India"
};

const milestones = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Started SOLO with a vision to democratize CLAT preparation through AI',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    year: '2023',
    title: 'AI Breakthrough',
    description: 'Achieved 85% accuracy in rank prediction with our ML models',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: '2024',
    title: '10K+ Students',
    description: 'Crossed 10,000 active students with +27 marks average improvement',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2025',
    title: 'Industry Leader',
    description: 'Became India\'s most trusted AI-powered CLAT preparation platform',
    icon: Award,
    color: 'from-green-500 to-emerald-500',
  },
];

const teamValues = [
  {
    title: 'Student-First Approach',
    description: 'Every feature we build is designed with student success in mind',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
  },
  {
    title: 'Innovation Through AI',
    description: 'Leveraging cutting-edge technology to personalize learning',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'Accessibility for All',
    description: 'Making quality legal education affordable and accessible',
    icon: Users,
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'Continuous Learning',
    description: 'We evolve with our students and their changing needs',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
  },
];

const About = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-40 right-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>

      {/* Founder Story Section */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Heart className="h-5 w-5 text-pink-400" />
              Meet Our Founder
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              The Story Behind SOLO
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Born from a passion for education and a love for technology (and cats!)
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Founder Image and Quick Facts */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                      <span className="text-4xl font-bold text-white">VM</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{founderStory.name}</h3>
                  <p className="text-gray-300">{founderStory.title}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <div className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Cat Parent</div>
                      <div className="text-sm text-gray-300">13 rescue cats (named after NLUs!)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Mission</div>
                      <div className="text-sm text-gray-300">{founderStory.dedication}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Background</div>
                      <div className="text-sm text-gray-300">Law School + Tech Passion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Story Text */}
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
              <div className="space-y-6 text-gray-300">
                {founderStory.story.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 p-4">
                <Coffee className="h-5 w-5 text-green-400" />
                <span className="font-medium text-green-200">
                  "Every line of code I write is fueled by coffee and the dream of helping students succeed."
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Our Journey
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              From Idea to Impact
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Milestones that shaped SOLO into India's leading AI-powered CLAT platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div
                  key={milestone.year}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}></div>
                  
                  <div className="relative">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${milestone.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="mb-2 text-2xl font-bold text-white">{milestone.year}</div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{milestone.title}</h3>
                    <p className="text-sm text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Users className="h-5 w-5 text-blue-400" />
              Our Values
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              What Drives Us Every Day
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              The principles that guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {teamValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-2xl bg-gradient-to-r ${value.color} p-3 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-white">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Join Our Mission
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              Help Us Shape the Future of Legal Education
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Whether you're a student, educator, or technology enthusiast, there's a place for you in our mission
              to revolutionize CLAT preparation through AI.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-400" />
                <div className="font-semibold text-white">Join as Student</div>
                <div className="text-sm text-gray-300">Transform your CLAT journey</div>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-blue-400" />
                <div className="font-semibold text-white">Become Educator</div>
                <div className="text-sm text-gray-300">Share your expertise</div>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                <div className="font-semibold text-white">Partner with Us</div>
                <div className="text-sm text-gray-300">Build the future together</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-lg font-semibold shadow-2xl hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 border-white/30 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-md hover:bg-white/10"
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

// Legacy components for compatibility
interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <div className="flex-1 space-y-4 text-lg font-medium md:space-y-6">
      {title && <h2 className="text-primary text-4xl font-medium">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}