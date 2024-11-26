import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyHireStorage() {
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
              Varför välja professionell magasinering?
            </h2>
            <p className="text-lg text-text/80 leading-relaxed mb-6">
              Professionell magasinering erbjuder en säker och flexibel lösning för dina förvaringsbehov. 
              Med moderna säkerhetssystem, klimatkontrollerade utrymmen och professionell hantering kan du 
              vara trygg med att dina ägodelar tas om hand på bästa sätt.
            </p>
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              Oavsett om du behöver korttids- eller långtidsförvaring, finns det lösningar som passar 
              just dina behov. Med tillgång dygnet runt och möjlighet till tilläggstjänster som 
              flytthjälp och packmaterial blir din magasinering både smidig och bekväm.
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