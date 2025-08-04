'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Clock,
  Users,
  Star,
  Phone,
  Video,
  MessageSquare,
  Shield,
  Zap,
  Trophy,
  Target,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const demoOptions = [
  {
    id: 'self-guided',
    title: 'Self-Guided Demo',
    duration: '15 minutes',
    description: 'Explore SOLO at your own pace with our interactive walkthrough',
    features: [
      'Full platform access',
      'Sample mock test',
      'AI diagnostic preview',
      'Dashboard exploration'
    ],
    icon: Play,
    color: 'from-blue-600 to-cyan-600',
    cta: 'Start Demo Now',
    popular: false
  },
  {
    id: 'live-demo',
    title: 'Live Demo Call',
    duration: '30 minutes',
    description: 'Get a personalized demo from our CLAT preparation experts',
    features: [
      'One-on-one expert guidance',
      'Personalized strategy session',
      'Q&A with CLAT mentors',
      'Custom preparation roadmap'
    ],
    icon: Video,
    color: 'from-purple-600 to-pink-600',
    cta: 'Schedule Live Demo',
    popular: true
  },
  {
    id: 'phone-consultation',
    title: 'Phone Consultation',
    duration: '20 minutes',
    description: 'Speak directly with our counselors about your CLAT goals',
    features: [
      'Preparation assessment',
      'Goal setting guidance',
      'Platform walkthrough',
      'Strategy recommendations'
    ],
    icon: Phone,
    color: 'from-green-600 to-emerald-600',
    cta: 'Schedule Call',
    popular: false
  }
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const testimonials = [
  {
    name: "Arjun Sharma",
    rank: "AIR 45",
    text: "The demo call convinced me SOLO was different. The personalized approach was exactly what I needed.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    name: "Priya Menon",
    rank: "AIR 89", 
    text: "The live demo showed me features I never knew existed. Game-changer for my preparation.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c41e0c3b?w=400&q=80"
  },
  {
    name: "Rohit Agarwal",
    rank: "AIR 156",
    text: "30 minutes that changed my CLAT journey. The strategy session was incredibly valuable.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
  }
];

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState('live-demo');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentLevel: '',
    targetNLU: '',
    challenges: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Demo request:', { selectedDemo, selectedDate, selectedTime, ...formData });
  };

  // Generate next 7 days for date selection
  const getNextWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

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
                Experience SOLO
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              See why thousands of CLAT aspirants choose SOLO. Get a personalized demo 
              and discover how our AI-powered platform can transform your preparation.
            </p>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>100% Free Demo</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>No Time Commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </motion.div>

          {/* Demo Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4"
          >
            {[
              { number: "10,000+", label: "Demos Conducted", icon: Video },
              { number: "4.9/5", label: "Demo Rating", icon: Star },
              { number: "95%", label: "Convert to Trial", icon: TrendingUp },
              { number: "24/7", label: "Support Available", icon: MessageSquare }
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                {(() => {
                  const IconComponent = stat.icon;
                  return <IconComponent className="mx-auto mb-3 h-8 w-8 text-purple-400" />;
                })()}
                <div className="mb-2 text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Options */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Choose Your Demo Experience</h2>
          <p className="text-gray-300">Select the demo format that works best for you</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {demoOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative cursor-pointer rounded-2xl border p-6 transition-all ${
                selectedDemo === option.id
                  ? 'border-purple-400 bg-purple-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              onClick={() => setSelectedDemo(option.id)}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${option.color}`}>
                {(() => {
                  const IconComponent = option.icon;
                  return <IconComponent className="h-6 w-6 text-white" />;
                })()}
              </div>
              
              <h3 className="mb-2 text-xl font-semibold text-white">{option.title}</h3>
              <div className="mb-3 text-sm text-purple-400">⏱️ {option.duration}</div>
              <p className="mb-4 text-gray-300">{option.description}</p>
              
              <div className="space-y-2">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={`mt-6 w-full ${
                  selectedDemo === option.id 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'border-white/20 bg-white/10'
                }`}
                variant={selectedDemo === option.id ? 'default' : 'outline'}
              >
                {option.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
              {selectedDemo === 'self-guided' ? 'Start Your Demo' : 'Schedule Your Demo'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="currentLevel" className="text-white">Current Preparation Level</Label>
                  <select
                    id="currentLevel"
                    name="currentLevel"
                    value={formData.currentLevel}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white"
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Just Starting</option>
                    <option value="intermediate">6 months preparation</option>
                    <option value="advanced">1+ year preparation</option>
                    <option value="final-stage">Final preparation stage</option>
                  </select>
                </div>
              </div>

              {/* Date and Time Selection for Live Demos */}
              {selectedDemo !== 'self-guided' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-white">Preferred Date *</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {getNextWeekDates().map((date) => (
                        <button
                          key={date.value}
                          type="button"
                          onClick={() => setSelectedDate(date.value)}
                          className={`rounded-lg border p-2 text-xs transition-all ${
                            selectedDate === date.value
                              ? 'border-purple-400 bg-purple-500/20 text-white'
                              : 'border-white/20 bg-white/10 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          {date.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Preferred Time *</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {timeSlots.slice(0, 8).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border p-2 text-xs transition-all ${
                            selectedTime === time
                              ? 'border-purple-400 bg-purple-500/20 text-white'
                              : 'border-white/20 bg-white/10 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="targetNLU" className="text-white">Target NLU (Optional)</Label>
                <Input
                  id="targetNLU"
                  name="targetNLU"
                  value={formData.targetNLU}
                  onChange={handleInputChange}
                  className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                  placeholder="e.g., NLSIU Bengaluru, NALSAR Hyderabad"
                />
              </div>

              <div>
                <Label htmlFor="challenges" className="text-white">Current Challenges (Optional)</Label>
                <Textarea
                  id="challenges"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                  placeholder="Tell us about your current preparation challenges..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {selectedDemo === 'self-guided' ? 'Start Demo Now' : 'Schedule My Demo'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">What Students Say About Our Demos</h2>
          <p className="text-gray-300">Real feedback from CLAT toppers who started with a demo</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-purple-400">{testimonial.rank}</p>
                </div>
              </div>
              <p className="text-gray-300">"{testimonial.text}"</p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">Demo FAQs</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is the demo really free?",
                a: "Yes! Our demos are completely free with no hidden charges or commitments."
              },
              {
                q: "How long does the demo take?",
                a: "Self-guided demos take about 15 minutes, live demos are 30 minutes, and phone consultations are 20 minutes."
              },
              {
                q: "Will I get access to the full platform?",
                a: "During the demo, you'll see all major features. After the demo, you can start a 30-day free trial for full access."
              },
              {
                q: "Can I reschedule my demo?",
                a: "Absolutely! You can reschedule up to 2 hours before your appointment through the confirmation email."
              }
            ].map((faq, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-2 font-semibold text-white">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}