import { motion } from 'framer-motion';
import { Shield, CheckCircle, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Specialiserade partners',
    description: 'Erfarna kontorsflyttare med rätt kompetens',
  },
  {
    icon: CheckCircle,
    title: 'Fullständig försäkring',
    description: 'Omfattande försäkringsskydd för er trygghet',
  },
  {
    icon: Users,
    title: 'Projektledning',
    description: 'Dedikerad kontaktperson genom hela processen',
  },
];

export function OfficeTrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Er trygghet är vår prioritet
          </h2>
          <p className="text-lg text-text-light">
            Vi samarbetar endast med erfarna och professionella kontorsflyttare
            som förstår era specifika behov.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-primary/10">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}