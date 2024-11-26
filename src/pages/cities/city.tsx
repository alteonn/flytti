import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Shield, PiggyBank, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceGrid } from '@/components/home/service-grid';
import { Process } from '@/components/home/process';
import { Features } from '@/components/home/features';
import { TrustSection } from '@/components/home/trust-section';
import { RecoWidget } from '@/components/home/reco-widget';
import { generateCityContent } from '@/lib/cities';

const benefitIcons = {
  local: Truck,
  quality: Shield,
  price: PiggyBank,
} as const;

export function CityPage() {
  const { city } = useParams();
  const content = generateCityContent(city || '');

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-text-light mb-8">
              {content.hero.subtitle}
            </p>
            <p className="text-lg text-text-light mb-12 max-w-3xl mx-auto">
              {content.hero.description}
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark"
              onClick={scrollToServices}
            >
              Få offerter <MapPin className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.benefits.map((benefit, index) => {
              const Icon = benefitIcons[Object.keys(benefitIcons)[index] as keyof typeof benefitIcons];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative h-full p-8 rounded-xl bg-white border border-primary/10 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-light/30 to-transparent flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-primary/5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-text-light leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id="services-section">
        <ServiceGrid title={`Få offert för flyttjänster i ${city}`} />
      </div>

      <RecoWidget />
      <Process />
      <Features />
      <TrustSection />
    </div>
  );
}