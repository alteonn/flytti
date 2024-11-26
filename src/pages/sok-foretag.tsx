import { ServiceGrid } from '@/components/home/service-grid';
import { CompanySearch } from '@/components/company-search/company-search';

export function SearchCompaniesPage() {
  return (
    <div className="pt-16">
      <CompanySearch />
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}