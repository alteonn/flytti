import { ServiceHero } from '@/components/services/service-hero';
import { ServiceGrid } from '@/components/home/service-grid';
import { InternationalMovingForm } from '@/components/forms/international-moving-form';
import { InternationalBenefits } from '@/components/utlandsflytt/international-benefits';
import { InternationalProcess } from '@/components/utlandsflytt/international-process';
import { InternationalShipping } from '@/components/utlandsflytt/international-shipping';
import { PackingOptions } from '@/components/utlandsflytt/packing-options';
import { WhyHireInternationalMover } from '@/components/utlandsflytt/why-hire-international-mover';
import { InternationalTrustSection } from '@/components/utlandsflytt/international-trust-section';
import { RecoWidget } from '@/components/home/reco-widget';

export function UtlandsflyttpPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero 
        title="Flyttfirma utlandsflytt"
        subtitle="Hitta bästa hjälpen för din utlandsflytt"
        description="Planerar du att flytta utomlands? Vi hjälper dig jämföra priser och få offerter från noggrant utvalda och kvalitetssäkrade flyttföretag som specialiserar sig på internationella flyttar."
        service="utlandsflytt"
      />
      <div id="service-form">
        <InternationalMovingForm />
      </div>
      <InternationalBenefits />
      <InternationalProcess />
      <InternationalShipping />
      <RecoWidget />
      <PackingOptions />
      <WhyHireInternationalMover />
      <InternationalTrustSection />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}