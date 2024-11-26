import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Vill din flyttfirma få{' '}
            <span className="text-primary">fler kunder?</span>
          </h1>
          <p className="text-lg md:text-xl text-text-light mb-12 max-w-3xl mx-auto">
            Vi kopplar dig samman med privatpersoner och företag som söker flyttjänster, 
            oavsett var i landet du befinner dig. Dessa leads är ett kostnadseffektivt 
            och enkelt sätt att öka din försäljning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary-dark"
            >
              Anslut dig <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = 'mailto:info@flytti.se'}
              className="border-primary/20 hover:bg-primary-light/20"
            >
              <Mail className="mr-2 h-4 w-4" />
              info@flytti.se
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}