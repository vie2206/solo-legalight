import React from 'react';

import Link from 'next/link';

import { Facebook, Linkedin, Twitter } from 'lucide-react';

import { DashedLine } from '../dashed-line';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    title: 'Legalight Office',
    content: (
      <p className="text-muted-foreground mt-3">
        India's Leading Legal Education Platform
        <br />
        New Delhi, India
      </p>
    ),
  },
  {
    title: 'Email us',
    content: (
      <div className="mt-3">
        <div>
          <p className="">Student Support</p>
          <Link
            href="mailto:hello@legalight.in"
            className="text-muted-foreground hover:text-foreground"
          >
            hello@legalight.in
          </Link>
        </div>
        <div className="mt-1">
          <p className="">Partnership</p>
          <Link
            href="mailto:partners@legalight.in"
            className="text-muted-foreground hover:text-foreground"
          >
            partners@legalight.in
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: 'Follow us',
    content: (
      <div className="mt-3 flex gap-6 lg:gap-10">
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Facebook className="size-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Twitter className="size-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Linkedin className="size-5" />
        </Link>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section className="relative py-28 lg:py-32 lg:pt-44 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_1.png')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-10 right-10 w-80 h-80 opacity-15 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl text-white">
          Contact us
        </h1>
        <p className="text-gray-300 mt-4 text-center leading-snug font-medium lg:mx-auto">
          Hopefully this form gets through our spam filters.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium text-white">{info.title}</h2>
              <div className="text-gray-300">{info.content}</div>
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="text-lg font-semibold text-white">Inquiries</h2>
          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input placeholder="First and last name" />
            </div>
            <div className="space-y-2">
              <Label>Work email address</Label>
              <Input placeholder="me@company.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label>
                Company name{' '}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input placeholder="Company name" />
            </div>
            <div className="space-y-2">
              <Label>
                Number of employees{' '}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input placeholder="e.g. 10-50" />
            </div>
            <div className="space-y-2">
              <Label>Your message</Label>
              <Textarea
                placeholder="Write your message"
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <Button size="lg" type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
