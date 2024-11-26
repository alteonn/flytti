import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Building2, MapPin, Shield, Phone, Mail, Globe, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Company } from '@/types/admin';
import { SERVICES } from '@/types/admin';
import { createSlug } from '@/lib/cities';
import { MetaTags } from '@/components/seo/meta-tags';

export function CompanySearch() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');

      if (error) throw error;

      setCompanies(data || []);
      // Extract unique cities
      const uniqueCities = [...new Set(data?.map(company => company.city) || [])];
      setCities(uniqueCities.sort());
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTermLower) ||
      company.description.toLowerCase().includes(searchTermLower) ||
      company.city.toLowerCase().includes(searchTermLower);
    const matchesService = selectedService === 'all' || company.services.includes(selectedService);
    const matchesCity = selectedCity === 'all' || company.city === selectedCity;
    const matchesVerified = !showVerifiedOnly || company.is_verified;

    return matchesSearch && matchesService && matchesCity && matchesVerified;
  });

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-light/30 to-bg-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-text">
              Sök företag
            </h1>
            <p className="text-lg md:text-xl text-text-light mb-12">
              Hitta kvalitetssäkrade företag som kan hjälpa dig med allt från flytthjälp till städning
            </p>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Sök på företag eller stad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alla tjänster" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla tjänster</SelectItem>
                    {SERVICES.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant={showVerifiedOnly ? "default" : "outline"}
                  onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                  className={`flex items-center gap-2 ${
                    showVerifiedOnly ? 'bg-primary hover:bg-primary-dark' : ''
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Visa endast verifierade företag
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Companies Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/foretag/${createSlug(company.name)}`} className="block">
                <div className={`relative bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 ${
                  company.is_verified 
                    ? 'border-2 border-primary/30 hover:border-primary shadow-primary/5 hover:shadow-primary/10' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}>
                  {/* Verified Badge */}
                  {company.is_verified && (
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-2 shadow-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                  )}

                  {/* Company Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-serif mb-2 pr-8 group-hover:text-primary transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center text-text-light">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      {company.city}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-light mb-6 line-clamp-3">
                    {company.description}
                  </p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {company.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light/20 text-primary"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-text-light">
                      <Phone className="w-4 h-4" />
                      {company.phone}
                    </div>
                    <div className="flex items-center gap-2 text-text-light">
                      <Mail className="w-4 h-4" />
                      {company.email}
                    </div>
                    {company.website && (
                      <div className="flex items-center gap-2 text-text-light">
                        <Globe className="w-4 h-4" />
                        Besök hemsida
                      </div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Empty State */}
          {filteredCompanies.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-text-light">
                Inga företag hittades med de valda filtren.
              </p>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-text-light">
                Laddar företag...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}