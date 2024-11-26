import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { FormHeader } from './form-header';

interface BaseFormProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  children: ReactNode;
  isSubmitting?: boolean;
}

export function BaseForm({
  title,
  subtitle,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  children,
  isSubmitting = false,
}: BaseFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    try {
      await onSubmit(e);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <FormHeader title={title} subtitle={subtitle} />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-primary-light/30 rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-text-light text-center">
                Steg {currentStep} av {totalSteps}
              </div>
            </div>

            {/* Form Content */}
            <div className="min-h-[400px]">{children}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-primary/10">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep === 1 || isSubmitting}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Föregående
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      Skicka
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={onNext}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2"
                >
                  Nästa
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}