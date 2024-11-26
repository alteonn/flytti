import { ServiceHero } from '@/components/services/service-hero';
import { ServiceGrid } from '@/components/home/service-grid';
import { StorageForm } from '@/components/forms/storage-form';
import { StorageBenefits } from '@/components/magasinering/storage-benefits';
import { StorageProcess } from '@/components/magasinering/storage-process';
import { StorageServices } from '@/components/magasinering/storage-services';
import { WhyHireStorage } from '@/components/magasinering/why-hire-storage';
import { StorageTrustSection } from '@/components/magasinering/storage-trust-section';
import { RecoWidget } from '@/components/home/reco-widget';

export function StoragePage() {
  return (
    <div className="min-h-screen">
      <ServiceHero 
        title="Magasinering nära dig"
        subtitle="Hitta säker förvaring för dina ägodelar"
        description="Letar du efter pålitlig magasinering? Vi hjälper dig jämföra priser och få offerter från noggrant utvalda och kvalitetssäkrade magasineringsföretag i ditt område."
        service="magasinering"
      />
      <div id="service-form">
        <StorageForm />
      </div>
      <StorageBenefits />
      <StorageProcess />
      <RecoWidget />
      <StorageServices />
      <WhyHireStorage />
      <StorageTrustSection />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}