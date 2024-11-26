import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { MapPin, ChevronDown, ChevronUp, Search, Building2, ArrowRight } from 'lucide-react';
import { cities, createSlug } from '@/lib/cities';

export function CitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const filterCities = (cityName: string) => {
    return cityName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Hitta tjänster i{' '}
            <span className="text-primary">din stad</span>
          </h1>
          <p className="text-lg md:text-xl text-text-light mb-12">
            Vi hjälper dig att hitta kvalitetssäkrade flyttfirmor och relaterade tjänster i hela Sverige
          </p>

          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl blur-xl" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <Input
                type="text"
                placeholder="Sök efter region eller stad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Regions Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          {Object.entries(cities).map(([region, { name, cities: regionCities }], index) => {
            const filteredCities = regionCities.filter(filterCities);
            if (filteredCities.length === 0) return null;

            return (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm border border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-md">
                  <button
                    onClick={() => toggleRegion(region)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary-light/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="absolute inset-0 rounded-lg bg-primary/5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                      </div>
                      <div>
                        <span className="font-serif text-lg">
                          {name}
                        </span>
                        <span className="text-sm text-text-light ml-2">
                          ({filteredCities.length} {filteredCities.length === 1 ? 'stad' : 'städer'})
                        </span>
                      </div>
                    </div>
                    {expandedRegions.includes(region) ? (
                      <ChevronUp className="w-5 h-5 text-text-light" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-light" />
                    )}
                  </button>

                  {expandedRegions.includes(region) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6 bg-gray-50/50">
                      {filteredCities.map((city) => (
                        <Link
                          key={city}
                          to={`/${createSlug(city)}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-light hover:text-primary hover:bg-primary-light/20 transition-colors group"
                        >
                          <Building2 className="w-4 h-4" />
                          <span>{city}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}