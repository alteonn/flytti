import { motion } from 'framer-motion';

interface RecoWidgetProps {
  className?: string;
  showBackground?: boolean;
}

export function RecoWidget({ className = '', showBackground = true }: RecoWidgetProps) {
  return (
    <section className={`py-12 relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className={`${showBackground ? 'bg-white rounded-2xl shadow-lg border border-primary/10' : ''} p-6`}>
            <iframe 
              src="https://widget.reco.se/v2/widget/5925461?mode=HORIZONTAL_QUOTE&inverted=false&border=false" 
              title="Flytti.se - Omdömen på Reco" 
              height="225" 
              className="w-full border-0 block overflow-hidden"
              data-reactroot=""
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}