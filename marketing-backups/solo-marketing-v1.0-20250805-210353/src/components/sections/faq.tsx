'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    title: 'Getting Started',
    icon: '🚀',
    faqs: [
      {
        question:
          'What is SOLO and how is it different from traditional CLAT coaching?',
        answer:
          "SOLO is India's first AI-powered performance analytics platform for CLAT preparation. Unlike traditional coaching that uses a one-size-fits-all approach, SOLO creates personalized learning paths based on your unique performance patterns, learning style, and goals. Our AI analyzes 50+ parameters to provide 85% accurate rank predictions and adaptive study plans.",
      },
      {
        question: 'How do I get started with SOLO?',
        answer:
          "Simply sign up for a free 30-day trial at solo.legalight.in. No credit card required! You'll complete a quick assessment to understand your current level and goals, then our AI will create your personalized study plan. You can access all features during the trial period.",
      },
      {
        question: 'What devices and browsers are supported?',
        answer:
          'SOLO works on all modern devices - desktop, laptop, tablet, and mobile. We support Chrome, Firefox, Safari, and Edge browsers. Our platform is optimized for both online and offline study modes.',
      },
      {
        question: 'Do I need any special software or technical knowledge?',
        answer:
          'No special software needed! SOLO is a web-based platform that works directly in your browser. Our interface is designed to be intuitive and user-friendly, requiring no technical expertise.',
      },
    ],
  },
  {
    title: 'Features & Functionality',
    icon: '⚙️',
    faqs: [
      {
        question: 'How accurate is the AI Rank Predictor?',
        answer:
          'Our ML models achieve 85%+ accuracy in rank prediction, validated across 10,000+ students. The system analyzes your performance across all sections, timing patterns, improvement trends, and compares with historical CLAT data to provide category-wise rank predictions (General, OBC, SC, ST) with confidence intervals.',
      },
      {
        question:
          'What is the 3-Stage Mock Test Analysis (DECODE-TRACK-REFLECT)?',
        answer:
          'DECODE: Deep analysis of your performance patterns, question-level difficulty tracking, and time management. TRACK: Historical trends showing your improvement trajectory and comparison with top performers. REFLECT: AI-generated personalized action plans with specific recommendations for improvement.',
      },
      {
        question: 'How does the Daily Reading Mastery feature work?',
        answer:
          "Every day, you get curated passages from premium sources like The Hindu, Indian Express, and academic journals. The system tracks your reading speed, comprehension accuracy, and vocabulary building. You'll practice with questions similar to CLAT Reading Comprehension format.",
      },
      {
        question: 'What makes the Community Insights unique?',
        answer:
          'Join 10,000+ active students in completely anonymous peer learning. Compare your performance, participate in study groups matched by goals, get tips from CLAT toppers, and compete in challenges while maintaining complete privacy.',
      },
      {
        question: 'How does the AI Study Planner adapt to my schedule?',
        answer:
          'The AI learns your optimal study times, subject preferences, and performance patterns. It integrates with your calendar, adjusts for your availability, and creates dynamic daily targets based on your CLAT 2026 timeline and current progress.',
      },
    ],
  },
  {
    title: 'Pricing & Plans',
    icon: '💰',
    faqs: [
      {
        question: 'How much does SOLO cost?',
        answer:
          "SOLO Mastery (Annual) costs ₹4,999 - that's just ₹13.7/day, less than a cup of coffee! Compare this to traditional coaching (₹50K-1.5L) and you save 90%+ while getting personalized AI-powered preparation. We also offer monthly plans starting at ₹799.",
      },
      {
        question: 'What scholarships and financial aid are available?',
        answer:
          'We offer: 1) Shamnad Basheer Equity Scholarship (up to 100% fee waiver for economically disadvantaged students), 2) Financial aid based on family income criteria, 3) Special support for Persons with Disability (PwD), 4) Merit-based scholarships for top performers. Apply through our scholarship portal.',
      },
      {
        question: 'Is there really a 30-day free trial?',
        answer:
          'Yes! Full access to all features for 30 days, no credit card required. You can cancel anytime during the trial with no charges. After the trial, you can choose the plan that best fits your needs.',
      },
      {
        question: 'What\'s included in the "First 10,000 Students" offer?',
        answer:
          "Lifetime price lock guarantee, exclusive beta access to new features, founder's badge in your profile, priority customer support, and access to exclusive webinars with CLAT toppers and legal professionals.",
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer:
          "Absolutely! You can cancel your subscription anytime from your account settings. No questions asked, no cancellation fees. If you cancel during the trial, you won't be charged anything.",
      },
    ],
  },
  {
    title: 'Technical & Support',
    icon: '🛠️',
    faqs: [
      {
        question: 'What if I face technical issues?',
        answer:
          'We provide 24/7 technical support through multiple channels: live chat, email (hello@legalight.in), phone support, and comprehensive help documentation. Our average response time is under 2 hours.',
      },
      {
        question: 'How is my data protected and privacy maintained?',
        answer:
          'We use bank-grade security with SSL encryption, secure cloud storage, and strict privacy policies. Your personal data is never shared with third parties. Community features are completely anonymous - no one can see your identity.',
      },
      {
        question: 'What happens to my progress if I cancel?',
        answer:
          'You can export all your performance data, mock test results, and study materials before canceling. We also provide a 30-day data retention period in case you want to reactivate your account.',
      },
      {
        question: 'Does SOLO work offline?',
        answer:
          "Yes! You can download study materials, mock tests, and reading passages for offline access. Your progress syncs automatically when you're back online.",
      },
    ],
  },
  {
    title: 'CLAT Preparation',
    icon: '📚',
    faqs: [
      {
        question: 'Is SOLO enough for complete CLAT preparation?',
        answer:
          'Yes! SOLO provides comprehensive preparation covering all CLAT sections: Legal Reasoning, Logical Reasoning, Reading Comprehension, Quantitative Techniques, and Current Affairs. With 1000+ practice questions, daily current affairs, and complete study materials.',
      },
      {
        question: 'How many mock tests are included?',
        answer:
          'Unlimited mock tests! We provide full-length CLAT mocks, sectional tests, previous year papers, and custom practice sets. Each test comes with detailed 3-stage analysis and personalized improvement recommendations.',
      },
      {
        question: 'Which NLUs and colleges does the rank predictor cover?',
        answer:
          'All 24 National Law Universities participating in CLAT 2026, plus other law colleges accepting CLAT scores. We provide admission probability for each college based on your predicted rank and historical cutoffs.',
      },
      {
        question: 'How frequently is the current affairs content updated?',
        answer:
          "Daily! Our team of legal education experts curates current affairs content every single day, focusing on topics relevant to CLAT. You'll never miss important developments in law, politics, economics, and social issues.",
      },
      {
        question: "What if I'm starting CLAT preparation late?",
        answer:
          "SOLO's AI adapts to any timeline! Whether you have 12 months or 3 months, the system creates an intensive, focused study plan based on your available time. Our crash course modules are designed for quick concept mastery.",
      },
    ],
  },
  {
    title: 'Results & Success',
    icon: '🏆',
    faqs: [
      {
        question: 'What kind of results can I expect with SOLO?',
        answer:
          'Our students average +27 marks improvement within 3 months. 89% of students achieve their target rank, 78% maintain 10+ day study streaks, and 94% would recommend SOLO to other CLAT aspirants. Individual results may vary based on dedication and starting level.',
      },
      {
        question: 'How does SOLO help with time management during the exam?',
        answer:
          "Our mock tests simulate exact CLAT timing conditions. The AI tracks your section-wise time allocation, identifies bottlenecks, and provides personalized time management strategies. You'll learn optimal question selection and pacing techniques.",
      },
      {
        question: 'What support do I get for specific weaknesses?',
        answer:
          'SOLO identifies your weak areas through performance analytics and creates targeted improvement plans. You get extra practice questions, concept clarifications, video explanations, and one-on-one doubt sessions with subject experts.',
      },
      {
        question: 'Can parents track my progress?',
        answer:
          'Yes! Parents get a dedicated dashboard showing study time, performance trends, mock test scores, and milestone achievements. They receive weekly progress reports and can schedule calls with our academic counselors.',
      },
    ],
  },
];

export default function FAQ() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-60 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 h-36 w-36 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </div>
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Questions?
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300 sm:text-2xl">
            Everything you need to know about SOLO, CLAT preparation, pricing,
            and more. Can't find what you're looking for? Reach out to our
            support team.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="text-4xl">{category.icon}</div>
                <h2 className="text-3xl font-bold text-white">
                  {category.title}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="rounded-xl border border-white/20 bg-white/5 px-6 backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-purple-200 [&[data-state=open]]:text-purple-300">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 leading-relaxed text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-12 shadow-xl backdrop-blur-md">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <h3 className="text-3xl font-bold text-white">
                Still Have Questions?
              </h3>
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>

            <p className="mb-8 text-xl text-gray-300">
              Our support team is here to help you 24/7. Get personalized
              assistance from CLAT preparation experts.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 text-2xl">💬</div>
                <h4 className="mb-2 font-semibold text-white">Live Chat</h4>
                <p className="text-sm text-gray-300">
                  Instant answers to your questions
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 text-2xl">📧</div>
                <h4 className="mb-2 font-semibold text-white">Email Support</h4>
                <p className="text-sm text-gray-300">hello@legalight.in</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 text-2xl">📞</div>
                <h4 className="mb-2 font-semibold text-white">Phone Support</h4>
                <p className="text-sm text-gray-300">+91 88888 88888</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="h-14 bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-lg font-semibold hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 border-white/30 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10"
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Questions Quick Access */}
        <div className="mt-16 rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-md">
          <h3 className="mb-6 text-center text-2xl font-bold text-white">
            🔥 Most Popular Questions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button className="rounded-xl border border-white/20 bg-white/5 p-4 text-left transition-all hover:bg-white/10">
              <div className="text-sm font-medium text-white">
                How accurate is rank prediction?
              </div>
              <div className="mt-1 text-xs text-gray-400">
                85%+ accuracy across 10K+ students
              </div>
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 p-4 text-left transition-all hover:bg-white/10">
              <div className="text-sm font-medium text-white">
                What's the cost?
              </div>
              <div className="mt-1 text-xs text-gray-400">
                ₹4,999/year - just ₹13.7/day
              </div>
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 p-4 text-left transition-all hover:bg-white/10">
              <div className="text-sm font-medium text-white">
                Is 30-day trial really free?
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Yes! No credit card required
              </div>
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 p-4 text-left transition-all hover:bg-white/10">
              <div className="text-sm font-medium text-white">
                Scholarships available?
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Shamnad Basheer Equity + more
              </div>
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 p-4 text-left transition-all hover:bg-white/10">
              <div className="text-sm font-medium text-white">
                What results can I expect?
              </div>
              <div className="mt-1 text-xs text-gray-400">
                +27 marks avg improvement
              </div>
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 p-4 text-left transition-all hover:bg-white/10">
              <div className="text-sm font-medium text-white">
                Complete CLAT preparation?
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Yes! All sections + unlimited mocks
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
