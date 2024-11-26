import { motion } from 'framer-motion';
import { Clock, PauseCircle, Settings, Calendar } from 'lucide-react';

const flexibilityFeatures = [
  {
    icon: Clock,
    title: 'Inga bindningstider',
    description: 'Samarbeta på dina villkor',
  },
  {
    icon: PauseCircle,
    title: 'Pausa när du vill',
    description: 'Pausa eller stoppa leadflödet när det passar dig',
  },
  {
    icon: Settings,
    title: 'Anpassningsbar volym',
    description: 'Anpassa antalet leads efter din kapacitet',
  },
  {
    icon: Calendar,
    title: 'Periodvis kontroll',
    description: 'Sätt maxgränser för leads under specifika perioder',
  },
];

export function Flexibility() {
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
            Flexibilitet i fokus
          </h2>
          <p className="text-lg text-text-light">
            Med Flytti.se har du alltid full kontroll över mängden och typen av förfrågningar. 
            Fokusera din energi på att leverera förstklassig service till dina kunder.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flexibilityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-6 shadow-lg border border-primary/10">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-light">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}