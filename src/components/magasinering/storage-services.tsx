import { motion } from 'framer-motion';
import { Box, Lock, Truck, Calendar } from 'lucide-react';

const services = [
  {
    icon: Box,
    title: 'Olika förvaringsstorlekar',
    description: 'Flexibla lösningar för alla behov.',
    features: [
      'Från små förråd (1-4 m²)',
      'Mellanstora utrymmen (5-15 m²)',
      'Stora lagerlokaler (16-40 m²)',
      'Anpassningsbara lösningar'
    ]
  },
  {
    icon: Lock,
    title: 'Säker förvaring',
    description: 'Modern säkerhetsteknik för din trygghet.',
    features: [
      'Larmade lokaler',
      'Kameraövervakning',
      'Personlig kod/nyckel',
      'Brandsäkra utrymmen'
    ]
  },
  {
    icon: Calendar,
    title: 'Flexibla avtal',
    description: 'Hyresperioder som passar dig.',
    features: [
      'Korttidsförvaring',
      'Långtidsförvaring',
      'Månadsvis betalning',
      'Ingen bindningstid'
    ]
  },
  {
    icon: Truck,
    title: 'Tilläggstjänster',
    description: 'Extra service för smidig hantering.',
    features: [
      'Flytthjälp',
      'Packmaterial',
      'Transport',
      'Försäkring'
    ]
  }
];

export function StorageServices() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Omfattande magasineringstjänster
          </h2>
          <p className="text-lg text-text-light">
            Professionell magasinering som möter alla behov
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-primary/10 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-light mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}