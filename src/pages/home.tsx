import { HeroSection } from '@/components/home/hero-section';
import { ServiceGrid } from '@/components/home/service-grid';
import { Features } from '@/components/home/features';
import { Process } from '@/components/home/process';
import { TrustSection } from '@/components/home/trust-section';
import { PricingAdvantage } from '@/components/home/pricing-advantage';
import { RecoWidget } from '@/components/home/reco-widget';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServiceGrid title="Få offert för" className="bg-transparent" />
      <PricingAdvantage />
      <RecoWidget showBackground={true} />
      <Features />
      <Process />
      <TrustSection />
    </div>
  );
}