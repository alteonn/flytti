import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormSuccessProps {
  title: string;
  description: string;
}

export function FormSuccess({ title, description }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      {/* Success Icon */}
      <div className="relative mx-auto w-32 h-32 mb-8">
        {/* Animated Background Rings */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-full"
          animate={{ 
            scale: [1.1, 1.3, 1.1],
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        
        {/* Main Icon Container */}
        <div className="relative h-full rounded-full p-6">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-light/5 rounded-full shadow-xl border border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-full" />
          </div>
          
          {/* Icon Circle */}
          <div className="relative h-full bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full" />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <CheckCircle className="w-12 h-12 text-white drop-shadow-md" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4 mb-8">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-text-light max-w-lg mx-auto"
        >
          {description}
        </motion.p>
      </div>

      {/* Action Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Tillbaka till startsidan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </motion.div>
  );
}