import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyHireOfficeMover() {
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
              Varför anlita professionell kontorsflytt?
            </h2>
            <p className="text-lg text-text/80 leading-relaxed mb-6">
              En kontorsflytt kräver noggrann planering och specialistkompetens. Det handlar inte bara om att flytta möbler och utrustning – det handlar om att säkerställa att er verksamhet kan fortsätta fungera med minimal störning.
            </p>
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              Professionella kontorsflyttare har erfarenhet av att hantera allt från känslig IT-utrustning till omfattande kontorsinventarier. De kan planera och genomföra flytten på ett sätt som minimerar avbrottstiden för er verksamhet.
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