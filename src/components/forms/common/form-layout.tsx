import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { FormHeader } from './form-header';
import { FormSkeleton } from './form-skeleton';
import { FormSuccess } from './form-success';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  children: ReactNode;
  isSubmitting?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  successTitle?: string;
  successDescription?: string;
}

export function FormLayout({
  title,
  subtitle,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  children,
  isSubmitting = false,
  isLoading = false,
  isSuccess = false,
  successTitle = "Tack för din förfrågan!",
  successDescription = "Vi har mottagit din förfrågan och återkommer inom kort med offerter från våra samarbetspartners."
}: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Form Card */}
          <div className="relative">
            {/* Background Effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-[20px] blur-xl" />
            
            {/* Main Content */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/10 p-8 md:p-10 overflow-hidden">
              <FormHeader title={title} subtitle={subtitle} />

              {isSuccess ? (
                <FormSuccess 
                  title={successTitle}
                  description={successDescription}
                />
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="h-2 bg-primary-light/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-text-light">Steg {currentStep} av {totalSteps}</span>
                      <span className="text-primary font-medium">{Math.round((currentStep / totalSteps) * 100)}% klart</span>
                    </div>
                  </div>

                  {/* Form Content */}
                  <motion.div 
                    className="min-h-[400px] relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isLoading ? <FormSkeleton /> : children}
                  </motion.div>

                  {/* Terms of Service Consent */}
                  {currentStep === totalSteps && (
                    <div className="text-sm text-text-light text-center px-4">
                      Genom att skicka in formuläret godkänner du våra{' '}
                      <a 
                        href="/villkor" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark underline"
                      >
                        användarvillkor
                      </a>
                      .
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-8 border-t border-primary/10">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onPrevious}
                      disabled={currentStep === 1 || isSubmitting || isLoading}
                      className="flex items-center gap-2 border-primary/20 hover:bg-primary-light/20"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Föregående
                    </Button>

                    <Button
                      type={currentStep === totalSteps ? 'submit' : 'button'}
                      onClick={currentStep === totalSteps ? undefined : onNext}
                      disabled={isSubmitting || isLoading}
                      className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2 min-w-[120px] justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {currentStep === totalSteps ? (
                        isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Skickar...
                          </>
                        ) : (
                          <>
                            Skicka
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )
                      ) : (
                        <>
                          Nästa
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}