import { motion } from 'framer-motion';
import { History, Timer, Laptop, Shield } from 'lucide-react';

const qualityFeatures = [
  {
    icon: History,
    title: 'Över ett decennium av expertis',
    description: 'Expertis inom offert- och jämförelsetjänster',
  },
  {
    icon: Timer,
    title: 'Precision i timing',
    description: 'Vi hittar kunder redo för flytthjälp',
  },
  {
    icon: Laptop,
    title: 'Toppmodernt system',
    description: 'Tekniskt system för snabb leverans av leads',
  },
  {
    icon: Shield,
    title: 'GDPR-kompatibel',
    description: 'Säker hantering av alla förfrågningar',
  },
];

export function Quality() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-6">
            Kvalitet genom erfarenhet
          </h2>
          <p className="text-lg text-text-light">
            Vårt erfarna team på Flytti.se levererar högkvalitativa, "heta" leads direkt till dig. 
            Vi förstår flyttbranschens dynamik och matchar dig med kunder som aktivt söker dina tjänster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualityFeatures.map((feature, index) => (
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