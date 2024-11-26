import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Loader2 } from 'lucide-react';
import type { Lead } from '@/types/admin';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { supabase } from '@/lib/supabase';
import { formatFormData } from '@/lib/format-form-data';

interface LeadFormProps {
  initialData: Lead;
  onSubmit: (data: Partial<Lead>) => void;
  isSubmitting: boolean;
}

const LEAD_STATUSES = [
  { value: 'new', label: 'Ny', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'contacted', label: 'Kontaktad', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'completed', label: 'Avslutad', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'cancelled', label: 'Avbruten', color: 'bg-red-100 text-red-800 border-red-200' },
] as const;

const COMPANY_ASSIGNMENT_STATUSES = [
  { value: 'pending', label: 'Väntar', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'accepted', label: 'Accepterad', color: 'bg-green-100 text-green-800' },
  { value: 'declined', label: 'Avböjd', color: 'bg-red-100 text-red-800' },
  { value: 'completed', label: 'Genomförd', color: 'bg-blue-100 text-blue-800' },
];

export function LeadForm({ initialData, onSubmit, isSubmitting }: LeadFormProps) {
  const [companies, setCompanies] = useState<{ id: string; name: string; city: string }[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Array<{
    id: string;
    name: string;
    city: string;
    status: string;
    assigned_at?: string;
  }>>(initialData.assigned_companies || []);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Partial<Lead>>({
    defaultValues: initialData,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data } = await supabase
        .from('companies')
        .select('id, name, city')
        .order('name');
      
      if (data) {
        setCompanies(data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setIsLoadingCompanies(false);
    }
  };

  const handleAddCompany = async (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;

    try {
      const { error } = await supabase
        .from('lead_company_assignments')
        .insert({
          lead_id: initialData.id,
          company_id: companyId,
          assigned_by: '00000000-0000-0000-0000-000000000000', // System user
          status: 'pending'
        });

      if (error) throw error;

      setSelectedCompanies(prev => [...prev, {
        ...company,
        status: 'pending',
        assigned_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error assigning company:', error);
    }
  };

  const handleRemoveCompany = async (companyId: string) => {
    try {
      const { error } = await supabase
        .from('lead_company_assignments')
        .delete()
        .match({ lead_id: initialData.id, company_id: companyId });

      if (error) throw error;

      setSelectedCompanies(prev => prev.filter(c => c.id !== companyId));
    } catch (error) {
      console.error('Error removing company assignment:', error);
    }
  };

  const handleUpdateCompanyStatus = async (companyId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('lead_company_assignments')
        .update({ status })
        .match({ lead_id: initialData.id, company_id: companyId });

      if (error) throw error;

      setSelectedCompanies(prev => prev.map(c => 
        c.id === companyId ? { ...c, status } : c
      ));
    } catch (error) {
      console.error('Error updating company status:', error);
    }
  };

  // Format form data for display
  const formattedData = formatFormData(initialData.form_data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Kundinformation</h3>
          
          <div className="space-y-4">
            <Label>Namn</Label>
            <Input
              {...register('customer_name', { required: true })}
              placeholder="Kundens namn"
              className={errors.customer_name ? 'border-red-500' : ''}
              disabled
            />
          </div>

          <div className="space-y-4">
            <Label>E-post</Label>
            <Input
              {...register('customer_email', { required: true })}
              placeholder="E-post"
              className={errors.customer_email ? 'border-red-500' : ''}
              disabled
            />
          </div>

          <div className="space-y-4">
            <Label>Telefon</Label>
            <Input
              {...register('customer_phone', { required: true })}
              placeholder="Telefonnummer"
              className={errors.customer_phone ? 'border-red-500' : ''}
              disabled
            />
          </div>

          <div className="space-y-4">
            <Label>Status</Label>
            <Select
              value={watch('status')}
              onValueChange={(value) => setValue('status', value as Lead['status'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Välj status" />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                      {status.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Tilldelade företag</Label>
            {isLoadingCompanies ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <Select
                  onValueChange={handleAddCompany}
                  value=""
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Lägg till företag" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies
                      .filter(company => !selectedCompanies.some(sc => sc.id === company.id))
                      .map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name} ({company.city})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <div className="space-y-3 mt-4">
                  {selectedCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.city}</div>
                        {company.assigned_at && (
                          <div className="text-xs text-gray-500">
                            Tilldelad: {format(new Date(company.assigned_at), 'PPP', { locale: sv })}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={company.status}
                          onValueChange={(value) => handleUpdateCompanyStatus(company.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPANY_ASSIGNMENT_STATUSES.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                  {status.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCompany(company.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Lead Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Förfrågningsinformation</h3>
          
          <div className="space-y-4">
            <Label>Typ av tjänst</Label>
            <Input
              value={initialData.type}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-4">
            <Label>Skapad</Label>
            <Input
              value={format(new Date(initialData.created_at), 'PPP', { locale: sv })}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-4">
            <Label>Anteckningar</Label>
            <Textarea
              {...register('notes')}
              placeholder="Interna anteckningar..."
              className="min-h-[100px]"
            />
          </div>

          {/* Form Data */}
          {formattedData && formattedData.length > 0 && (
            <div className="space-y-4">
              <Label>Formulärdata</Label>
              <div className="bg-gray-50 rounded-lg p-4 space-y-6">
                {formattedData.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-900">{section.title}</h4>
                    <div className="space-y-2">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-gray-600">{field.label}:</span>
                          <span className="text-gray-900">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link to="/admin/leads">
          <Button type="button" variant="outline">
            Avbryt
          </Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sparar...' : 'Spara'}
        </Button>
      </div>
    </form>
  );
}