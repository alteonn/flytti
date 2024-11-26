import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyHireEstatePro() {
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
              Varför anlita professionell dödsbohantering?
            </h2>
            <p className="text-lg text-text/80 leading-relaxed mb-6">
              Att hantera ett dödsbo kan vara både känslomässigt och praktiskt utmanande. 
              Med professionell hjälp kan du fokusera på det viktiga medan experter tar hand 
              om det praktiska på ett respektfullt och effektivt sätt.
            </p>
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              Professionella dödsbohanterare har erfarenhet av att hantera alla aspekter - 
              från värdering och sortering till bortforsling och städning. De säkerställer 
              att allt hanteras korrekt och enligt gällande regler.
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