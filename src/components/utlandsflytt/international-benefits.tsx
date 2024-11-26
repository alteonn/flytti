import { motion } from 'framer-motion';
import { ArrowRight, Clock, PiggyBank, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Globe,
    title: 'Global expertis',
    description: 'Specialister på internationella flyttar med erfarenhet av olika länders regler',
  },
  {
    icon: Shield,
    title: 'Trygg transport',
    description: 'Fullständigt försäkringsskydd och säker hantering av dina ägodelar',
  },
  {
    icon: Clock,
    title: 'Smidig process',
    description: 'Vi hanterar all dokumentation och logistik för en problemfri flytt',
  },
  {
    icon: PiggyBank,
    title: 'Konkurrenskraftigt',
    description: 'Jämför priser från erfarna internationella flyttfirmor',
  },
];

export function InternationalBenefits() {
  const scrollToForm = () => {
    document.getElementById('service-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Professionell{' '}
            <span className="text-primary">utlandsflytt</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-light mb-8"
          >
            Vi hjälper dig hitta rätt flyttfirma för din internationella flytt. Jämför offerter och få 
            skräddarsydda lösningar för just dina behov.
          </motion.p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-dark"
            onClick={scrollToForm}
          >
            Få offerter nu <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 rounded-xl bg-white border border-primary/10 shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-text-light">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}