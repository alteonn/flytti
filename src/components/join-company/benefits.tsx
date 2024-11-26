import { motion } from 'framer-motion';
import { Clock, Settings, Filter, Users, CreditCard } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Flexibelt',
    description: 'Ingen bindningstid eller uppsägningstid',
  },
  {
    icon: Settings,
    title: 'Anpassningsbart',
    description: 'Välj antal förfrågningar per dag, vecka eller månad',
  },
  {
    icon: Filter,
    title: 'Skräddarsytt',
    description: 'Filtrera leads baserat på geografi, kundtyp och uppdragstyp',
  },
  {
    icon: Users,
    title: 'Begränsad konkurrens',
    description: 'Varje lead delas med max två andra flyttfirmor',
  },
  {
    icon: CreditCard,
    title: 'Rättvist',
    description: 'Betala endast för mottagna leads, fakturering i efterskott',
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/20 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-6">
            Fördelar med Flytti.se
          </h2>
          <p className="text-lg text-text-light">
            Som partner får du färska flyttförfrågningar direkt via e-post eller ditt CRM-system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-6 shadow-lg border border-primary/10">
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