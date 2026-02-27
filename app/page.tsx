import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Screenshots from '@/components/sections/Screenshots';
import CTA from '@/components/sections/CTA';
import TopBarbersAndWorkplaces from '@/components/sections/TopBarbersAndWorkplaces';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-10 md:-mt-20">
        <TopBarbersAndWorkplaces />
      </div>
      <Features />
      <Screenshots />
      <CTA />
    </>
  );
}

