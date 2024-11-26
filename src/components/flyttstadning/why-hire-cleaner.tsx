import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyHireCleaner() {
  const scrollToForm = () => {
    document.getElementById('service-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-light/20 rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Varför anlita professionell flyttstädning?
            </h2>
            <p className="text-lg text-text/80 leading-relaxed mb-6">
              En flyttstädning är mer omfattande än en vanlig städning och kräver både tid och kunskap. 
              Med professionell hjälp säkerställer du att städningen uppfyller alla krav och att du kan 
              fokusera på din flytt istället.
            </p>
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              Professionella städare har rätt utrustning och kunskap om olika material och ytor. 
              De vet exakt vad som krävs för en godkänd flyttstädning och kan hantera även svåra 
              fläckar och områden som lätt missas.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={scrollToForm}
            >
              Få offerter nu <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}