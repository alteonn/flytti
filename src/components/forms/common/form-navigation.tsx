import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export function FormNavigation({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  isSubmitting 
}: FormNavigationProps) {
  return (
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

      <Button
        type={currentStep === totalSteps ? 'submit' : 'button'}
        onClick={currentStep === totalSteps ? undefined : onNext}
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2"
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
  );
}