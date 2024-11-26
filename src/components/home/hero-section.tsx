import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, Home, Truck, MapPin, ClipboardCheck } from 'lucide-react';

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const floatingIcons = [
    { icon: Truck, delay: 0, x: -50, y: -40, startPosition: { left: '15%', top: '20%' } },
    { icon: Box, delay: 0.2, x: 60, y: 30, startPosition: { left: '75%', top: '15%' } },
    { icon: Home, delay: 0.4, x: -40, y: 50, startPosition: { left: '25%', top: '60%' } },
    { icon: MapPin, delay: 0.6, x: 50, y: -30, startPosition: { left: '80%', top: '70%' } },
    { icon: ClipboardCheck, delay: 0.8, x: -30, y: 40, startPosition: { left: '10%', top: '40%' } },
    { icon: Box, delay: 1.0, x: 40, y: -50, startPosition: { left: '60%', top: '40%' } },
    { icon: Truck, delay: 1.2, x: -45, y: 35, startPosition: { left: '35%', top: '25%' } },
    { icon: Home, delay: 1.4, x: 55, y: -45, startPosition: { left: '85%', top: '45%' } },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-light/30 to-bg-light pt-24 md:pt-48 pb-20 md:pb-32 min-h-[90vh] md:min-h-[95vh] flex items-center">
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            x: [0, item.x, 0],
            y: [0, item.y, 0],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute"
          style={{
            left: item.startPosition.left,
            top: item.startPosition.top,
          }}
        >
          <item.icon className="w-8 h-8 md:w-10 md:h-10 text-primary/15" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 md:mb-8 leading-tight"
          >
            <span className="text-text">Moving </span>
            <span className="bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
              made easy
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-text-light mb-8 md:mb-12 leading-relaxed px-4"
          >
            Jämför priser och tjänster från verifierade flyttfirmor i hela Sverige. 
            Få kostnadsfria offerter och välj det bästa alternativet för dig.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 px-4 sm:px-0 sm:flex-row sm:gap-6 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white group text-lg w-full sm:w-auto px-8 py-6"
              onClick={scrollToServices}
            >
              Få offerter 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/20 hover:bg-primary-light/20 text-lg w-full sm:w-auto px-8 py-6"
              onClick={scrollToServices}
            >
              Läs mer om våra tjänster
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg-light" />
    </div>
  );
}