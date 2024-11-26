import { motion } from 'framer-motion';
import { Truck, Ship, Plane, Users } from 'lucide-react';

const shippingOptions = [
  {
    icon: Truck,
    title: 'Vägfrakt inom Europa',
    description: 'Flexibelt och kostnadseffektivt för flyttar inom Europa.',
    features: [
      'Direktleverans till de flesta destinationer',
      'Kostnadseffektivt för kortare sträckor',
      'Snabbare än sjöfrakt',
      'Perfekt för flyttar till närliggande länder'
    ]
  },
  {
    icon: Ship,
    title: 'Sjöfrakt/Containerfrakt',
    description: 'Idealiskt för långväga flyttar till andra kontinenter.',
    features: [
      'Kostnadseffektivt för stora volymer',
      'Miljövänligt alternativ',
      'Flera containerstorlekar tillgängliga',
      'Möjlighet till samfrakt'
    ]
  },
  {
    icon: Plane,
    title: 'Flygfrakt',
    description: 'Snabbaste alternativet för brådskande flyttar.',
    features: [
      'Leverans inom dagar',
      'Högre säkerhet',
      'Perfekt för värdefulla föremål',
      'Ideal för mindre volymer'
    ]
  },
  {
    icon: Users,
    title: 'Samfrakt',
    description: 'Ekonomiskt val där du delar transportutrymme.',
    features: [
      'Lägre kostnader',
      'Miljövänligt alternativ',
      'Perfekt för mindre flyttar',
      'Flexibel lösning'
    ]
  }
];

export function InternationalShipping() {
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
            Fraktalternativ för din utlandsflytt
          </h2>
          <p className="text-lg text-text-light">
            Välj det fraktsätt som passar bäst för din situation och destination
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shippingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-primary/10 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">
                  {option.title}
                </h3>
                <p className="text-text-light mb-6">{option.description}</p>
                <ul className="space-y-3">
                  {option.features.map((feature, i) => (
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