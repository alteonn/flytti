import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Truck, Building2, Globe, Sparkles, Box, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  service: 'flytthjalp' | 'kontorsflytt' | 'utlandsflytt' | 'flyttstadning' | 'magasinering' | 'dodsbo';
}

const serviceIcons = {
  flytthjalp: Truck,
  kontorsflytt: Building2,
  utlandsflytt: Globe,
  flyttstadning: Sparkles,
  magasinering: Box,
  dodsbo: Home,
} as const;

export function ServiceHero({ title, subtitle, description, service }: ServiceHeroProps) {
  const Icon = serviceIcons[service];

  const scrollToForm = () => {
    document.getElementById('service-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-2xl blur-lg opacity-20" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary-light/90 to-white rounded-2xl flex items-center justify-center shadow-lg">
                <Icon className="w-10 h-10 text-primary" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            {title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-text-light mb-8">
            {subtitle}
          </h2>
          <p className="text-lg md:text-xl text-text-light mb-12 max-w-3xl mx-auto">
            {description}
          </p>
          
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className={cn(
              "bg-primary hover:bg-primary-dark text-white group text-lg px-8 py-6",
              "transform hover:scale-105 transition-all duration-200"
            )}
          >
            Få offerter nu
            <Icon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg-light" />
    </section>
  );
}