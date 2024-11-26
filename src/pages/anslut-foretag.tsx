import { ServiceGrid } from '@/components/home/service-grid';
import { JoinCompany } from '@/components/join-company/join-company';

export function JoinCompanyPage() {
  return (
    <div className="pt-16">
      <JoinCompany />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}