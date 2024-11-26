import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyUs() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-light/20 rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Varför anlita en flyttfirma?
            </h2>
            <p className="text-lg text-text/80 leading-relaxed mb-6">
              Med en professionell flyttfirma blir upplevelsen en helt annan. Istället för att slita med tunga lådor och möbler i trånga trappor eller kämpa med att få plats med allt i en liten hyrbil, kan du fokusera på de positiva aspekterna av din flytt.
            </p>
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              Proffsen tar hand om allt det tunga arbetet och logistiken, vilket ger dig friheten att planera ditt nya hem i lugn och ro.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Få offerter nu <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}