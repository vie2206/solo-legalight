import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Footer() {
  const navigation = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'For Parents', href: '/parents' },
    { name: 'Success Stories', href: '/#testimonials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const social = [
    { name: 'Twitter', href: 'https://twitter.com/legalight' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/legalight' },
    { name: 'Instagram', href: 'https://instagram.com/legalight' },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Background with animations */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_1.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Halos */}
      <div 
        className="absolute top-10 right-10 w-96 h-96 opacity-10 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-10 w-64 h-64 opacity-15 animate-pulse delay-2000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="relative flex flex-col items-center gap-14 pt-28 lg:pt-32">
        <div className="container space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Ready to Transform Your CLAT Journey?
            </span>
          </h2>
          <p className="mx-auto max-w-xl leading-snug font-medium text-balance text-gray-300">
            Join thousands of students who've discovered the power of AI-driven
            CLAT preparation. Start your 30-day free trial today.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl"
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </div>

        <nav className="container flex flex-col items-center gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="font-medium text-white transition-opacity hover:opacity-75"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {social.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-0.5 font-medium text-white transition-opacity hover:opacity-75"
                >
                  {item.name} <ArrowUpRight className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {legal.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-300 transition-opacity hover:opacity-75"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Bottom */}
        <div className="container border-t border-white/20 pt-8 pb-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  SOLO
                </span>
              </div>
              <div className="font-serif text-sm text-gray-300 italic">
                by Legalight
              </div>
            </div>
            <p className="text-xs text-gray-300">
              © 2025 Legalight Technologies. All rights reserved. | WHERE LAWYERS
              ARE BORN
            </p>
            <p className="max-w-2xl text-xs text-gray-300">
              SOLO is India's first AI-powered performance analytics platform for
              CLAT preparation. Our mission: <span className="text-purple-300 font-semibold">WE CAN DO HARD THINGS.</span>
            </p>
          </div>
        </div>

        <Image
          src="/footer.svg"
          alt="SOLO by Legalight"
          width={1570}
          height={400}
          className="mt-4 opacity-90"
        />
      </div>
    </footer>
  );
}
