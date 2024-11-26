import { ServiceHero } from '@/components/services/service-hero';
import { ServiceGrid } from '@/components/home/service-grid';
import { MovingAssistanceForm } from '@/components/forms/moving-assistance-form';
import { MovingBenefits } from '@/components/flytthjalp/moving-benefits';
import { MovingProcess } from '@/components/flytthjalp/moving-process';
import { WhyHireMover } from '@/components/flytthjalp/why-hire-mover';
import { TrustSection } from '@/components/flytthjalp/trust-section';
import { RecoWidget } from '@/components/home/reco-widget';

export function FlytthjalpPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero 
        title="Flyttfirma flytthjälp"
        subtitle="Hitta bästa flytthjälpen nära dig"
        description="Letar du efter en pålitlig flyttfirma? Vi hjälper dig jämföra priser och få offerter från noggrant utvalda och kvalitetssäkrade flyttföretag i ditt område."
        service="flytthjalp"
      />
      <div id="service-form">
        <MovingAssistanceForm />
      </div>
      <MovingBenefits />
      <MovingProcess />
      <RecoWidget />
      <WhyHireMover />
      <TrustSection />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}