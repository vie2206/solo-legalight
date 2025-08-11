import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import Features3D from '@/components/sections/features-3d';
import HowItWorks from '@/components/sections/how-it-works';
import Pricing from '@/components/sections/pricing';
import Testimonials from '@/components/sections/testimonials';
import FAQ from '@/components/sections/faq';
import CTA from '@/components/sections/cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Features3D />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
