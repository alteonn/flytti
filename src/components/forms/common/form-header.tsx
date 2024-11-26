import { motion } from 'framer-motion';

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

export function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-serif mb-4 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}