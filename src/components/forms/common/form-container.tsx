import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FormHeader } from './form-header';
import { FormStepIndicator } from './form-step-indicator';
import { FormNavigation } from './form-navigation';

interface FormContainerProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  children: ReactNode;
  isSubmitting?: boolean;
}

export function FormContainer({
  title,
  subtitle,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  children,
  isSubmitting,
}: FormContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <FormHeader title={title} subtitle={subtitle} />
          
          <form onSubmit={onSubmit}>
            <FormStepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="min-h-[400px]">
              {children}
            </div>
            
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={onPrevious}
              onNext={onNext}
              isSubmitting={isSubmitting}
            />
          </form>
        </motion.div>
      </div>
    </div>
  );
}