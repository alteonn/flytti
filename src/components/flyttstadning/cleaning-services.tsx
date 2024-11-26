import { motion } from 'framer-motion';
import { Sparkles, Trash2, Droplets, Brush } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Grundlig rengöring',
    description: 'Noggrann städning av alla ytor och utrymmen enligt checklista.',
    tasks: [
      'Dammsugning och våttorkning av golv',
      'Rengöring av fönster och karmar',
      'Avtorkning av väggar och tak',
      'Rengöring av dörrar och karmar'
    ]
  },
  {
    icon: Trash2,
    title: 'Kök & Badrum',
    description: 'Extra fokus på hygienutrymmen och köksytor.',
    tasks: [
      'Rengöring av vitvaror in- och utvändigt',
      'Avkalkning av kakel och sanitet',
      'Rengöring av köksfläkt och filter',
      'Grundlig rengöring av badrumsporslinet'
    ]
  },
  {
    icon: Droplets,
    title: 'Specialrengöring',
    description: 'Anpassad rengöring för olika material och ytor.',
    tasks: [
      'Rengöring av element och ventiler',
      'Behandling av olika golvmaterial',
      'Putsning av rostfria ytor',
      'Rengöring av garderober och skåp'
    ]
  },
  {
    icon: Brush,
    title: 'Tilläggstjänster',
    description: 'Extra tjänster för ett komplett resultat.',
    tasks: [
      'Balkong- och terrassstädning',
      'Förrådsstädning',
      'Garagestädning',
      'Fönsterputsning av svåråtkomliga fönster'
    ]
  }
];

export function CleaningServices() {
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
            Omfattande flyttstädning
          </h2>
          <p className="text-lg text-text-light">
            Professionell flyttstädning som uppfyller alla krav
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
                  {service.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>{task}</span>
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