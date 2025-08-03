import Pricing from '@/components/sections/pricing';
import CTA from '@/components/sections/cta';

export const metadata = {
  title: 'SOLO Pricing - Affordable AI-Powered CLAT Preparation',
  description: 'Choose the perfect SOLO plan for your CLAT preparation. Start with our 30-day free trial and experience the power of AI-driven performance analytics.',
};

export default function PricingPage() {
  return (
    <>
      <div className="pt-32">
        <Pricing />
      </div>
      <CTA />
    </>
  );
}