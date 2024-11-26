import { motion } from 'framer-motion';
import { ClipboardCheck, MessageSquare, Users } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Anslut dig',
    description: 'Fyll i formuläret eller maila oss direkt på info@flytti.se',
  },
  {
    icon: MessageSquare,
    title: 'Ta emot leads',
    description: 'Du delar leadsen med max 2 andra flyttfirmor',
  },
  {
    icon: Users,
    title: 'Landa jobbet',
    description: 'Få direktkontakt med dina kunder till en låg kostnad',
  },
];

export function ProcessSteps() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
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