import { useState } from 'react';
import { MovingFormData, initialMovingFormData } from '@/types/moving-form';
import { FormLayout } from '../common/form-layout';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';
import { Step4 } from './steps/step4';
import { Step5 } from './steps/step5';
import { createLead } from '@/lib/leads';
import { useToast } from '@/hooks/use-toast';

export function MovingAssistanceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MovingFormData>(initialMovingFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

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

  const validateForm = () => {
    const { name, email, phone } = formData.step5;
    
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

    setIsSubmitting(true);

    try {
      const { success, error } = await createLead({
        type: 'Flytthjälp',
        customerName: formData.step5.name,
        customerEmail: formData.step5.email,
        customerPhone: formData.step5.phone,
        formData: formData
      });

      if (success) {
        toast({
          title: "Tack för din förfrågan!",
          description: "Vi kommer att kontakta dig inom kort med offerter från våra flyttfirmor.",
        });
        
        // Show success view
        setIsSuccess(true);
        
        // Reset form
        setFormData(initialMovingFormData);
        setCurrentStep(1);
      } else {
        throw error;
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Ett fel uppstod",
        description: error instanceof Error ? error.message : "Kunde inte skicka din förfrågan. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStepData = (step: keyof MovingFormData, data: Partial<MovingFormData[keyof MovingFormData]>) => {
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
      case 5:
        return <Step5 data={formData.step5} updateData={(data) => updateStepData('step5', data)} />;
      default:
        return null;
    }
  };

  return (
    <FormLayout
      title="Få hjälp med flytthjälp"
      subtitle="Tjänsten är gratis och du är inte bunden till någonting."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      successTitle="Tack för din förfrågan!"
      successDescription="Vi har mottagit din förfrågan och kommer inom kort att kontakta dig med offerter från våra kvalitetssäkrade flyttfirmor."
    >
      {renderStep()}
    </FormLayout>
  );
}