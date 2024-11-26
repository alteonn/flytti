import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeadForm } from '@/components/admin/leads/lead-form';
import { Skeleton } from '@/components/ui/skeleton';
import type { Lead } from '@/types/admin';
import { supabase } from '@/lib/supabase';

export function LeadEdit() {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError('Inget lead-ID angivet');
      setIsLoading(false);
      return;
    }
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      // Fetch lead with assigned companies
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .select(`
          *,
          assigned_companies:lead_company_assignments(
            company:companies(
              id,
              name,
              city
            ),
            status,
            assigned_at
          )
        `)
        .eq('id', id)
        .single();

      if (leadError) throw leadError;

      if (!leadData) {
        throw new Error('Lead kunde inte hittas');
      }

      // Transform the data to match our Lead type
      const transformedLead = {
        ...leadData,
        assigned_companies: leadData.assigned_companies.map((assignment: any) => ({
          id: assignment.company.id,
          name: assignment.company.name,
          city: assignment.company.city,
          status: assignment.status,
          assigned_at: assignment.assigned_at
        }))
      };

      setLead(transformedLead);
      setError(null);
    } catch (error) {
      console.error('Error fetching lead:', error);
      setError(error instanceof Error ? error.message : 'Ett fel uppstod vid hämtning av lead');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<Lead>) => {
    setIsSubmitting(true);
    try {
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          status: data.status,
          notes: data.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Create activity log for the update
      const { error: activityError } = await supabase
        .from('lead_activities')
        .insert([{
          lead_id: id,
          created_by: '00000000-0000-0000-0000-000000000000', // System user
          activity_type: 'updated',
          description: 'Lead uppdaterad via admin',
          metadata: {
            updated_fields: ['status', 'notes'],
            timestamp: new Date().toISOString()
          }
        }]);

      if (activityError) {
        console.error('Error creating activity log:', activityError);
      }

      navigate('/admin/leads');
    } catch (error) {
      console.error('Error updating lead:', error);
      setError(error instanceof Error ? error.message : 'Ett fel uppstod vid uppdatering av lead');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
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
          onClick={() => navigate('/admin/leads')}
          className="mt-4 text-red-600 hover:text-red-800 font-medium"
        >
          Tillbaka till leads
        </button>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">Lead kunde inte hittas</h2>
        <button
          onClick={() => navigate('/admin/leads')}
          className="mt-4 text-yellow-600 hover:text-yellow-800 font-medium"
        >
          Tillbaka till leads
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif">Redigera lead</h1>
      <LeadForm 
        initialData={lead} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}