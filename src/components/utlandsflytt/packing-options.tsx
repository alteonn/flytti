import { motion } from 'framer-motion';
import { Package, Shield, Clock, AlertTriangle } from 'lucide-react';

const packingOptions = [
  {
    title: 'Packa själv',
    icon: Package,
    pros: [
      'Kostnadseffektivt alternativ',
      'Flexibel packningstid',
      'Full kontroll över processen'
    ],
    cons: [
      'Tidskrävande',
      'Risk för felaktig packning',
      'Begränsat försäkringsskydd',
      'Kräver egen packningsmaterial'
    ]
  },
  {
    title: 'Professionell packhjälp',
    icon: Shield,
    pros: [
      'Expertis i korrekt packning',
      'Sparar tid och minskar stress',
      'Omfattande försäkringsskydd',
      'Professionellt packmaterial',
      'Särskild hantering av ömtåliga föremål'
    ],
    cons: [
      'Högre kostnad',
      'Kräver planering av packningstid'
    ]
  }
];

export function PackingOptions() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Packa själv eller anlita hjälp?
          </h2>
          <p className="text-lg text-text-light">
            Jämför alternativen och välj det som passar dig bäst
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-primary/10 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-6 group-hover:text-primary transition-colors">
                  {option.title}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Fördelar</h4>
                    <ul className="space-y-2">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-text-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-light mb-3">Nackdelar</h4>
                    <ul className="space-y-2">
                      {option.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-text-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-text-light mt-2" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 bg-white rounded-xl p-6 border border-primary/10 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-1" />
            <p className="text-text-light">
              Observera att flyttfirmans försäkring ofta inte täcker egenpackat bohag. 
              För värdefulla eller ömtåliga föremål rekommenderas professionell packhjälp 
              för maximal trygghet under transporten.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}