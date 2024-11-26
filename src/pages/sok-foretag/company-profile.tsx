import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Shield, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle, 
  Award,
  Truck,
  Building2,
  Plane,
  Sparkles,
  Box,
  Home
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Company } from '@/types/admin';

const serviceIcons: Record<string, any> = {
  'Flytthjälp': Truck,
  'Företagsflytt': Building2,
  'Utlandsflytt': Plane,
  'Flyttstädning': Sparkles,
  'Magasinering': Box,
  'Dödsbo': Home,
  'Städning': Sparkles,
};

export function CompanyProfilePage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany();
  }, [slug]);

  const fetchCompany = async () => {
    try {
      // Create a normalized version of the slug for comparison
      const normalizedSlug = slug?.toLowerCase().replace(/-/g, ' ');
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .ilike('name', normalizedSlug || '')
        .single();

      if (error) throw error;

      setCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
      navigate('/sok-foretag');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/50 rounded-lg w-1/3" />
            <div className="h-64 bg-white/50 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-text-light">
              Företaget kunde inte hittas
            </h1>
            <Link 
              to="/sok-foretag"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Tillbaka till företag
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/sok-foretag"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="w-4 h-4" />
            Tillbaka till företag
          </Link>
        </motion.div>

        {/* Verification Badge */}
        {company.is_verified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/20 text-primary rounded-lg">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Verifierat och kvalitetssäkrat företag</span>
            </div>
          </motion.div>
        )}

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            {company.name}
          </h1>
          <div className="flex items-center text-text-light">
            <MapPin className="w-5 h-5 mr-2" />
            {company.city}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-3xl mb-12"
        >
          <p>{company.description}</p>
        </motion.div>

        {/* Certifications */}
        {company.certifications && company.certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10 mb-12"
          >
            <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Certifieringar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-4 p-4 rounded-xl bg-green-50/50 border border-green-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">{cert}</h3>
                    <p className="text-sm text-green-700">Verifierad certifiering</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Verification Details */}
        {company.is_verified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10 mb-12"
          >
            <h2 className="text-2xl font-serif mb-6 flex items-center gap-2 text-primary">
              <Shield className="w-6 h-6" />
              Kontrollerat och verifierat företag
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Kvalitetssäkrad verksamhet</h3>
                  <p className="text-text-light text-sm">
                    Företaget uppfyller alla våra kvalitetskrav
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Kontrollerade referenser</h3>
                  <p className="text-text-light text-sm">
                    Vi har verifierat tidigare kunders omdömen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Verifierade uppgifter</h3>
                  <p className="text-text-light text-sm">
                    All företagsinformation är kontrollerad
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-serif mb-6">Tjänster</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {company.services.map((service) => {
              const ServiceIcon = serviceIcons[service] || Box;
              return (
                <div
                  key={service}
                  className="bg-white p-6 rounded-xl shadow-sm border border-primary/10 text-center group hover:border-primary/30 transition-colors"
                >
                  <div className="mb-3 flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-light/20 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                      <ServiceIcon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <span className="text-primary font-medium">{service}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10"
        >
          <h2 className="text-2xl font-serif mb-6">Kontaktuppgifter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-light/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-light mb-1">Ring oss</div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {company.phone}
                </div>
              </div>
            </a>

            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-light/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-light mb-1">Maila oss</div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {company.email}
                </div>
              </div>
            </a>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-light/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-text-light mb-1">Besök hemsida</div>
                  <div className="font-medium group-hover:text-primary transition-colors">
                    Klicka här
                  </div>
                </div>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}