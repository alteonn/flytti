import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Lead } from '@/types/admin';
import { SERVICES } from '@/types/admin';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

const LEAD_STATUSES = [
  { value: 'new', label: 'Ny', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'contacted', label: 'Kontaktad', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'completed', label: 'Avslutad', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'cancelled', label: 'Avbruten', color: 'bg-red-100 text-red-800 border-red-200' },
] as const;

export function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
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
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Lead type
      const transformedLeads = data?.map(lead => ({
        ...lead,
        assigned_companies: lead.assigned_companies?.map((assignment: any) => ({
          id: assignment.company.id,
          name: assignment.company.name,
          city: assignment.company.city,
          status: assignment.status,
          assigned_at: assignment.assigned_at
        })) || []
      })) || [];

      setLeads(transformedLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna lead?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeads(leads.filter(lead => lead.id !== id));
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getStatusColor = (status: string) => {
    return LEAD_STATUSES.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: sv });
    } catch {
      return dateString;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || lead.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif">Hantera leads</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Sök på namn eller e-post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrera på typ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla typer</SelectItem>
            {SERVICES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrera på status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla statusar</SelectItem>
            {LEAD_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-primary/10"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium">{lead.customer_name}</div>
                <div className="text-sm text-gray-500">{formatDate(lead.created_at)}</div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                {LEAD_STATUSES.find(s => s.value === lead.status)?.label}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="text-sm">
                <span className="text-gray-500">E-post:</span> {lead.customer_email}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Telefon:</span> {lead.customer_phone}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Typ:</span>{' '}
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light/20 text-primary">
                  {lead.type}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Tilldelade företag:</span>
                <div className="mt-1 space-y-1">
                  {lead.assigned_companies?.map((company) => (
                    <div key={company.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{company.name} ({company.city})</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                        {LEAD_STATUSES.find(s => s.value === company.status)?.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Link to={`/admin/leads/${lead.id}`}>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(lead.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-primary/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Kund
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Typ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tilldelade företag
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Åtgärder
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.customer_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lead.customer_email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lead.customer_phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light/20 text-primary">
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {LEAD_STATUSES.find(s => s.value === lead.status)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {lead.assigned_companies?.map((company) => (
                        <div key={company.id} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <span>{company.name} ({company.city})</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                            {LEAD_STATUSES.find(s => s.value === company.status)?.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/leads/${lead.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-primary/10">
          <p className="text-text-light">Inga leads hittades med valda filter.</p>
        </div>
      )}
    </div>
  );
}