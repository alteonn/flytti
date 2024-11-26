import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyForm } from '@/components/admin/companies/company-form';
import type { Company } from '@/types/admin';
import { supabase } from '@/lib/supabase';

export function CompanyCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<Company>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('companies')
        .insert([data]);

      if (error) throw error;

      navigate('/admin/companies');
    } catch (error) {
      console.error('Error creating company:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif">Lägg till företag</h1>
      <CompanyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}