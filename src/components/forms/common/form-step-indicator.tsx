import { motion } from 'framer-motion';

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function FormStepIndicator({ currentStep, totalSteps }: FormStepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="h-2 bg-primary-light/30 rounded-full">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="mt-2 text-sm text-text-light text-center">
        Steg {currentStep} av {totalSteps}
      </div>
    </div>
  );
}