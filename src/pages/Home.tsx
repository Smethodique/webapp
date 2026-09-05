import HeroSection from '@/pages/home/HeroSection';
import MarqueeBand from '@/pages/home/MarqueeBand';
import WorksSection from '@/pages/home/WorksSection';
import ServicesSection from '@/pages/home/ServicesSection';
import ProcessSection from '@/pages/home/ProcessSection';
import TestimonialsSection from '@/pages/home/TestimonialsSection';
import CtaSection from '@/pages/home/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <WorksSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
