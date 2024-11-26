import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Settings, Sparkles } from 'lucide-react';

const customizationOptions = [
  {
    icon: MapPin,
    text: 'Välj geografiskt verksamhetsområde',
  },
  {
    icon: Settings,
    text: 'Specificera önskad uppdragstyp och storlek',
  },
  {
    icon: Sparkles,
    text: 'Inkludera eller exkludera tilläggstjänster',
  },
];

export function Requirements() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-light/20 rounded-3xl p-12 md:p-16"
          >
            <div className="flex items-start gap-4 mb-8">
              <CheckCircle className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-serif mb-2">Krav för partnerskap</h3>
                <p className="text-text-light">Giltigt yrkestrafiktillstånd</p>
              </div>
            </div>

            <h2 className="text-3xl font-serif mb-8">
              Skräddarsy dina leads
            </h2>

            <div className="space-y-6">
              {customizationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center">
                    <option.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg">{option.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}