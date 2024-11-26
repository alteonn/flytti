import { motion } from 'framer-motion';

export function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 -left-64 w-[600px] h-[600px] rounded-full bg-primary/10"
      />

      {/* Decorative elements */}
      <div className="absolute top-32 left-[15%] grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </div>

      {/* Floating squares */}
      <motion.div
        initial={{ opacity: 0, rotate: -10, y: 20 }}
        animate={{ opacity: 1, rotate: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 right-[20%] w-16 h-16 border-2 border-primary/20 rounded-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, rotate: 10, y: -20 }}
        animate={{ opacity: 1, rotate: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-1/4 left-[30%] w-24 h-24 border-2 border-primary/10 rounded-xl"
      />
    </div>
  );
}