import { motion } from 'framer-motion';
import { HeadphonesIcon } from 'lucide-react';

export function CustomerService() {
  return (
    <section className="py-32 bg-gradient-to-b from-primary-light/30 to-bg-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            Kundtjänst
          </h1>
          <p className="text-lg text-text-light mb-8">
            Hur kan vi hjälpa dig?
          </p>
          
          {/* Placeholder for customer service content */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-text-light">
              <HeadphonesIcon className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
              Kundtjänstfunktioner kommer snart
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}