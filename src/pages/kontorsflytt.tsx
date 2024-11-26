import { ServiceHero } from '@/components/services/service-hero';
import { ServiceGrid } from '@/components/home/service-grid';
import { OfficeMovingForm } from '@/components/forms/office-moving-form';
import { OfficeBenefits } from '@/components/kontorsflytt/office-benefits';
import { OfficeProcess } from '@/components/kontorsflytt/office-process';
import { WhyHireOfficeMover } from '@/components/kontorsflytt/why-hire-office-mover';
import { OfficeTrustSection } from '@/components/kontorsflytt/office-trust-section';
import { RecoWidget } from '@/components/home/reco-widget';

export function KontorsflyttPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero 
        title="Flyttfirma kontorsflytt"
        subtitle="Hitta bästa flytthjälpen i kontorsflytt"
        description="Letar du efter en pålitlig flyttfirma för kontorsflytt? Vi hjälper dig jämföra priser och få offerter från noggrant utvalda och kvalitetssäkrade flyttföretag som specialiserar sig på kontorsflytt."
        service="kontorsflytt"
      />
      <div id="service-form">
        <OfficeMovingForm />
      </div>
      <OfficeBenefits />
      <OfficeProcess />
      <RecoWidget />
      <WhyHireOfficeMover />
      <OfficeTrustSection />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}