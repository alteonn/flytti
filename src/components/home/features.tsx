import { Shield, Clock, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Tryggt',
    description: 'Vi kvalitetssäkrar att alla företag som är ansluta till oss har bra omdöme, har rätt tillstånd och är försäkrade.',
    icon: Shield,
  },
  {
    title: 'Enkelt',
    description: 'Spara tid genom att jämföra flera företag samtidigt. Vi hjälper dig hitta rätt företag för dina behov.',
    icon: Clock,
  },
  {
    title: 'Spara pengar',
    description: 'Genom att enkelt jämföra flera företag och tjänster kan du fatta bättre och snabbare beslut, få kunskap och spara pengar.',
    icon: PiggyBank,
  },
];

export function Features() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-primary-light/30 flex items-center justify-center mx-auto mb-8 transform -rotate-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary-light/50 absolute top-1 left-1" />
                  <feature.icon className="w-10 h-10 text-primary relative z-10" />
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-4">{feature.title}</h3>
              <p className="text-text/70 leading-relaxed max-w-sm mx-auto">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}