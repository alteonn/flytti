import { motion } from 'framer-motion';
import { ArrowRight, Clock, PiggyBank, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Shield,
    title: 'Professionell städning',
    description: 'Erfarna städare med rätt kompetens och utrustning',
  },
  {
    icon: Clock,
    title: 'Spara tid',
    description: 'Låt proffsen sköta städningen medan du fokuserar på flytten',
  },
  {
    icon: PiggyBank,
    title: 'Konkurrenskraftigt',
    description: 'Jämför priser från kvalitetssäkrade städfirmor',
  },
  {
    icon: Users,
    title: 'Garanterat resultat',
    description: 'Städning enligt branschstandard med nöjd-kund-garanti',
  },
];

export function MovingBenefits() {
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
            <span className="text-primary">flytthjälp</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-light mb-8"
          >
            Vi hjälper dig hitta rätt flyttfirma för dina behov. Jämför offerter och få 
            skräddarsydda lösningar för just din situation.
          </motion.p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-dark"
            onClick={scrollToForm}
          >
            Få offerter nu <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Benefits grid */}
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