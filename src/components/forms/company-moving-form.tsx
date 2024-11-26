import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CompanyMovingFormData, initialCompanyMovingFormData } from '@/types/company-moving';
import { Step1 } from './company-moving-form/steps/step1';
import { Step2 } from './company-moving-form/steps/step2';
import { Step3 } from './company-moving-form/steps/step3';
import { Step4 } from './company-moving-form/steps/step4';
import { Step5 } from './company-moving-form/steps/step5';

export function CompanyMovingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CompanyMovingFormData>(initialCompanyMovingFormData);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const updateStepData = (step: keyof CompanyMovingFormData, data: Partial<CompanyMovingFormData[keyof CompanyMovingFormData]>) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            data={formData.step1}
            updateData={(data) => updateStepData('step1', data)}
          />
        );
      case 2:
        return (
          <Step2
            data={formData.step2}
            updateData={(data) => updateStepData('step2', data)}
          />
        );
      case 3:
        return (
          <Step3
            data={formData.step3}
            updateData={(data) => updateStepData('step3', data)}
          />
        );
      case 4:
        return (
          <Step4
            data={formData.step4}
            updateData={(data) => updateStepData('step4', data)}
          />
        );
      case 5:
        return (
          <Step5
            data={formData.step5}
            updateData={(data) => updateStepData('step5', data)}
          />
        );
      default:
        return null;
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
          <form onSubmit={handleSubmit}>
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
            <div className="min-h-[400px]">{renderStep()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-primary/10">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Föregående
              </Button>

              <Button
                type="button"
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Skicka' : 'Nästa'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}