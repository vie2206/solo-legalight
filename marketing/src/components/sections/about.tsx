import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: '/about/1.webp', alt: 'Team collaboration' },
            { src: '/about/2.webp', alt: 'Team workspace' },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="The SOLO Team"
          paragraphs={[
            'We started building SOLO in 2022 with a vision to revolutionize CLAT preparation through AI. Every feature has been designed from the ground up — with cutting-edge machine learning and personalized analytics. We are purpose-built to power legal education innovation for the next generation of lawyers.',
            'We are 100% founder-owned, profitable, and we keep our team focused on student success. Our team includes former CLAT toppers, legal education experts, and AI engineers working together to transform how students prepare for law entrance exams.',
            "If you're passionate about legal education and AI technology, we'd love to hear from you.",
          ]}
          ctaButton={{
            href: '/contact',
            text: 'Join our mission',
          }}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          paragraphs={[
            "At SOLO by Legalight, we are dedicated to transforming how students prepare for CLAT and other law entrance exams. Our mission is to provide every student with AI-powered performance analytics that give them an unbeatable edge over traditional preparation methods. We'll stop at nothing to help you achieve your target rank and secure admission to your dream law school.",
            "We're student-obsessed — investing the time to understand every aspect of your preparation journey so that we can help you perform better than ever before. We're all in this together because your success is our success. In our journey as a company, we've helped thousands of students improve their ranks and achieve their legal career dreams.",
          ]}
        />
        <ImageSection
          images={[
            { src: '/about/3.webp', alt: 'Modern workspace' },
            { src: '/about/4.webp', alt: 'Team collaboration' },
          ]}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

export default About;

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
