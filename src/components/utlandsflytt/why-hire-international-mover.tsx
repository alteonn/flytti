import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyHireInternationalMover() {
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
              Varför anlita professionell flyttfirma för utlandsflytt?
            </h2>
            <p className="text-lg text-text/80 leading-relaxed mb-6">
              En internationell flytt innebär många utmaningar som skiljer sig från en vanlig flytt inom landet. Det handlar inte bara om att transportera dina ägodelar – det finns också tull, olika länders regelverk och internationell logistik att ta hänsyn till.
            </p>
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              Professionella flyttfirmor med erfarenhet av internationella flyttar kan hjälpa dig navigera genom denna komplexa process. De har kunskap om dokumentation, tullregler och internationella transportlösningar som gör din flytt smidig och trygg.
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