import { ServiceHero } from '@/components/services/service-hero';
import { ServiceGrid } from '@/components/home/service-grid';
import { EstateForm } from '@/components/forms/estate-form';
import { EstateBenefits } from '@/components/dodsbo/estate-benefits';
import { EstateProcess } from '@/components/dodsbo/estate-process';
import { EstateServices } from '@/components/dodsbo/estate-services';
import { WhyHireEstatePro } from '@/components/dodsbo/why-hire-estate-pro';
import { EstateTrustSection } from '@/components/dodsbo/estate-trust-section';
import { RecoWidget } from '@/components/home/reco-widget';

export function EstatePage() {
  return (
    <div className="min-h-screen">
      <ServiceHero 
        title="Dödsbohantering"
        subtitle="Professionell hjälp med dödsbon"
        description="Behöver du hjälp med ett dödsbo? Vi hjälper dig hitta erfarna företag som kan hjälpa till med värdering, tömning, städning och bortforsling av dödsbon."
        service="dodsbo"
      />
      <div id="service-form">
        <EstateForm />
      </div>
      <EstateBenefits />
      <EstateProcess />
      <RecoWidget />
      <EstateServices />
      <WhyHireEstatePro />
      <EstateTrustSection />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}