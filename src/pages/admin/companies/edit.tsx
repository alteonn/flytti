import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyForm } from '@/components/admin/companies/company-form';
import type { Company } from '@/types/admin';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

export function CompanyEdit() {
  const [company, setCompany] = useState<Company | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    if (!id) {
      setError('Inget företags-ID angivet');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      if (!data) {
        throw new Error('Företaget kunde inte hittas');
      }

      setCompany(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching company:', error);
      setError(error instanceof Error ? error.message : 'Ett fel uppstod vid hämtning av företaget');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<Company>) => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      const { error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id);

      if (updateError) throw updateError;

      navigate('/admin/companies');
    } catch (error) {
      console.error('Error updating company:', error);
      setError(error instanceof Error ? error.message : 'Ett fel uppstod vid uppdatering av företaget');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Ett fel uppstod</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate('/admin/companies')}
          className="mt-4 text-red-600 hover:text-red-800 font-medium"
        >
          Tillbaka till företagslistan
        </button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">Företaget kunde inte hittas</h2>
        <button
          onClick={() => navigate('/admin/companies')}
          className="mt-4 text-yellow-600 hover:text-yellow-800 font-medium"
        >
          Tillbaka till företagslistan
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif">Redigera företag</h1>
      <CompanyForm 
        initialData={company} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}