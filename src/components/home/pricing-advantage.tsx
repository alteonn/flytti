import { motion } from 'framer-motion';
import { TrendingDown, ShieldCheck, Users } from 'lucide-react';

const advantages = [
  {
    icon: TrendingDown,
    title: 'Konkurrenskraftiga priser',
    description: 'Företagen tävlar om att ge dig det bästa erbjudandet',
  },
  {
    icon: ShieldCheck,
    title: 'Kvalitetssäkrat',
    description: 'Endast verifierade och pålitliga flyttfirmor',
  },
  {
    icon: Users,
    title: 'Stort nätverk',
    description: 'Tillgång till Sveriges bästa flyttfirmor',
  },
];

export function PricingAdvantage() {
  return (
    <section id="pricing-section" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-light/10 to-white" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Bästa priserna genom{' '}
              <span className="text-primary">smart konkurrens</span>
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Företagen vi samlar in erbjudanden från vet att de konkurrerar om dig som kund. 
              Det gör att du får deras bästa pris, varje gång.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300" />
                <div className="relative p-8 bg-white rounded-2xl border border-primary/10">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                      <advantage.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{advantage.title}</h3>
                  <p className="text-text-light leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}