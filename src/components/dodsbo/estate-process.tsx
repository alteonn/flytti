import { motion } from 'framer-motion';
import { FileText, MessageSquare, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Beskriv dina behov',
    description: 'Fyll i vårt formulär med information om dödsboet.',
  },
  {
    icon: FileText,
    title: 'Få skräddarsydda offerter',
    description: 'Specialiserade företag kontaktar dig med anpassade lösningar.',
  },
  {
    icon: CheckCircle,
    title: 'Välj bästa alternativet',
    description: 'Jämför offerter och välj den partner som bäst möter dina behov.',
  },
];

export function EstateProcess() {
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
            Så fungerar dödsbohantering
          </h2>
          <p className="text-lg text-text-light">
            En smidig process för att hantera dödsbon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-primary/10">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}