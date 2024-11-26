import { ServiceHero } from '@/components/services/service-hero';
import { ServiceGrid } from '@/components/home/service-grid';
import { CleaningForm } from '@/components/forms/cleaning-form';
import { CleaningBenefits } from '@/components/flyttstadning/cleaning-benefits';
import { CleaningProcess } from '@/components/flyttstadning/cleaning-process';
import { CleaningServices } from '@/components/flyttstadning/cleaning-services';
import { WhyHireCleaner } from '@/components/flyttstadning/why-hire-cleaner';
import { CleaningTrustSection } from '@/components/flyttstadning/cleaning-trust-section';
import { RecoWidget } from '@/components/home/reco-widget';

export function MovingCleaningPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero 
        title="Flyttstädning med garanti"
        subtitle="Hitta bästa flyttstädningen nära dig"
        description="Letar du efter professionell flyttstädning? Vi hjälper dig jämföra priser och få offerter från noggrant utvalda och kvalitetssäkrade städfirmor i ditt område."
        service="flyttstadning"
      />
      <div id="service-form">
        <CleaningForm />
      </div>
      <CleaningBenefits />
      <CleaningProcess />
      <RecoWidget />
      <CleaningServices />
      <WhyHireCleaner />
      <CleaningTrustSection />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}