import { MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Beskriv dina behov',
    description: 'Fyll i vårt snabba formulär - det tar mindre än en minut!',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Få offerter',
    description: 'Upp till tre flyttfirmor kontaktar dig med sina bästa erbjudanden.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Välj och boka',
    description: 'Jämför och välj det bästa erbjudandet för din situation.',
    icon: CheckCircle,
  },
];

export function Process() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Så fungerar det
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-light"
          >
            Vi gör din flytt enkel och stressfri
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-primary/5 group-hover:border-primary/20 transition-colors">
                {/* Step Number */}
                <div className="absolute -top-6 right-8">
                  <span className="font-serif text-7xl font-light text-primary/10 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line (only between cards) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-16 h-px bg-gradient-to-r from-primary/20 to-transparent" />
                )}
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary-light/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}