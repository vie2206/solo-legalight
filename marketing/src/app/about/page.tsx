import About from '@/components/sections/about';
import AboutHero from '@/components/sections/about-hero';

export const metadata = {
  title: 'About SOLO - Revolutionary CLAT Preparation Platform',
  description: 'Learn about SOLO by Legalight - India\'s first AI-powered CLAT preparation platform. Discover our mission, vision, and the technology behind revolutionary legal education.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <About />
    </>
  );
}