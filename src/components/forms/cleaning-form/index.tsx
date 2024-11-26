import { useState } from 'react';
import { CleaningFormData, initialCleaningFormData } from '@/types/cleaning-form';
import { FormLayout } from '../common/form-layout';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';
import { Step4 } from './steps/step4';
import { useZapier } from '@/hooks/use-zapier';
import { ZAPIER_WEBHOOKS } from '@/lib/zapier-webhooks';
import { useToast } from '@/hooks/use-toast';

export function CleaningForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CleaningFormData>(initialCleaningFormData);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { submit, isSubmitting } = useZapier({ webhookUrl: ZAPIER_WEBHOOKS.CLEANING });

  const totalSteps = 4;

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

  const validateForm = () => {
    const { name, email, phone } = formData.step4;
    
    if (!name || !email || !phone) {
      toast({
        title: "Fyll i alla obligatoriska fält",
        description: "Namn, e-post och telefon måste fyllas i.",
        variant: "destructive",
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ogiltig e-postadress",
        description: "Vänligen ange en giltig e-postadress.",
        variant: "destructive",
      });
      return false;
    }

    // Validate phone format
    const phoneRegex = /^[0-9+() -]{8,}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Ogiltigt telefonnummer",
        description: "Vänligen ange ett giltigt telefonnummer.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { success, error } = await submit({
        type: 'Flyttstädning',
        customerName: formData.step4.name,
        customerEmail: formData.step4.email,
        customerPhone: formData.step4.phone,
        formData: formData
      });

      if (success) {
        toast({
          title: "Tack för din förfrågan!",
          description: "Vi kommer att kontakta dig inom kort med offerter från våra städfirmor.",
        });
        setIsSuccess(true);
        setFormData(initialCleaningFormData);
        setCurrentStep(1);
      } else {
        throw new Error(error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Ett fel uppstod",
        description: error instanceof Error ? error.message : "Kunde inte skicka din förfrågan. Försök igen senare.",
        variant: "destructive",
      });
    }
  };

  const updateStepData = (step: keyof CleaningFormData, data: Partial<CleaningFormData[keyof CleaningFormData]>) => {
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
        return <Step1 data={formData.step1} updateData={(data) => updateStepData('step1', data)} />;
      case 2:
        return <Step2 data={formData.step2} updateData={(data) => updateStepData('step2', data)} />;
      case 3:
        return <Step3 data={formData.step3} updateData={(data) => updateStepData('step3', data)} />;
      case 4:
        return <Step4 data={formData.step4} updateData={(data) => updateStepData('step4', data)} />;
      default:
        return null;
    }
  };

  return (
    <FormLayout
      title="Få hjälp med flyttstädning"
      subtitle="Tjänsten är gratis och du är inte bunden till någonting."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      successTitle="Tack för din förfrågan!"
      successDescription="Vi har mottagit din förfrågan och kommer inom kort att kontakta dig med offerter från våra kvalitetssäkrade städfirmor."
    >
      {renderStep()}
    </FormLayout>
  );
}