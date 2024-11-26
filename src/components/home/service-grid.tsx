import { Truck, Building2, Globe, Sparkles, Box, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceGridProps {
  title?: string;
  className?: string;
  isFullWidth?: boolean;
}

const services = [
  {
    title: 'Flytthjälp',
    description: 'Professionell hjälp med flytt och transport',
    icon: Truck,
    href: '/flytthjalp',
  },
  {
    title: 'Kontorsflytt',
    description: 'Specialanpassade lösningar för företag',
    icon: Building2,
    href: '/kontorsflytt',
  },
  {
    title: 'Utlandsflytt',
    description: 'Säker och effektiv internationell flyttservice',
    icon: Globe,
    href: '/utlandsflytt',
  },
  {
    title: 'Flyttstädning',
    description: 'Grundlig städning enligt branschstandard',
    icon: Sparkles,
    href: '/flyttstadning',
  },
  {
    title: 'Magasinering',
    description: 'Säker förvaring av dina tillhörigheter',
    icon: Box,
    href: '/magasinering',
  },
  {
    title: 'Dödsbo',
    description: 'Varsam och respektfull hantering av dödsbon',
    icon: Home,
    href: '/dodsbo',
  },
];

export function ServiceGrid({ title = "Våra tjänster", className, isFullWidth }: ServiceGridProps) {
  const sectionClass = isFullWidth ? 'w-full' : 'container mx-auto';

  const scrollToForm = () => {
    document.getElementById('service-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="services-section" className={cn("py-16 md:py-32 relative overflow-hidden", className)}>
      <div className={sectionClass}>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6">
              {title}
            </h2>
            <p className="text-base md:text-lg text-text-light max-w-2xl mx-auto px-4">
              Vi erbjuder ett komplett utbud av flyttjänster för att göra din flytt så smidig som möjligt
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={service.href}
                  onClick={scrollToForm}
                  className="group block relative"
                >
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300" />
                  <div className="relative p-6 md:p-8 rounded-2xl border border-primary/10 bg-white">
                    {/* Icon */}
                    <div className="mb-4 md:mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                          <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-primary/5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-serif mb-2 md:mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-text-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Effect */}
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
                      "from-primary/0 via-primary to-primary/0",
                      "opacity-0 group-hover:opacity-100 transition-opacity"
                    )} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}