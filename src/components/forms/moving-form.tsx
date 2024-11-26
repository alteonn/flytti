import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowRight, ArrowLeft, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface FormData {
  step1: {
    moveType: string;
    homeType: string;
    rooms: string;
    fromAddress: string;
    toAddress: string;
  };
  step2: {
    moveDate: Date | undefined;
    isFlexible: boolean;
    packingHelp: boolean;
    cleaningHelp: boolean;
  };
  step3: {
    floor: string;
    hasElevator: boolean;
    parkingDistance: string;
  };
  step4: {
    heavyItems: {
      hasHeavyItems: boolean;
      items: string;
    };
    fragileItems: {
      hasFragileItems: boolean;
      items: string;
    };
  };
  step5: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
}

const initialFormData: FormData = {
  step1: {
    moveType: '',
    homeType: '',
    rooms: '',
    fromAddress: '',
    toAddress: '',
  },
  step2: {
    moveDate: undefined,
    isFlexible: false,
    packingHelp: false,
    cleaningHelp: false,
  },
  step3: {
    floor: '',
    hasElevator: false,
    parkingDistance: '',
  },
  step4: {
    heavyItems: {
      hasHeavyItems: false,
      items: '',
    },
    fragileItems: {
      hasFragileItems: false,
      items: '',
    },
  },
  step5: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};

export function MovingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Typ av flytt</Label>
                <Select
                  value={formData.step1.moveType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, moveType: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj typ av flytt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Lokalflytt</SelectItem>
                    <SelectItem value="long-distance">Långdistansflytt</SelectItem>
                    <SelectItem value="international">Utlandsflytt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Bostadstyp</Label>
                <Select
                  value={formData.step1.homeType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, homeType: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj bostadstyp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Lägenhet</SelectItem>
                    <SelectItem value="house">Villa</SelectItem>
                    <SelectItem value="townhouse">Radhus</SelectItem>
                    <SelectItem value="storage">Förråd</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Antal rum</Label>
                <Select
                  value={formData.step1.rooms}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, rooms: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj antal rum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 rum</SelectItem>
                    <SelectItem value="2">2 rum</SelectItem>
                    <SelectItem value="3">3 rum</SelectItem>
                    <SelectItem value="4">4 rum</SelectItem>
                    <SelectItem value="5">5+ rum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Från adress</Label>
                <Input
                  value={formData.step1.fromAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, fromAddress: e.target.value },
                    }))
                  }
                  placeholder="Gatuadress, postnummer och ort"
                />
              </div>

              <div className="space-y-4">
                <Label>Till adress</Label>
                <Input
                  value={formData.step1.toAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, toAddress: e.target.value },
                    }))
                  }
                  placeholder="Gatuadress, postnummer och ort"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>När vill du flytta?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.step2.moveDate ? (
                        format(formData.step2.moveDate, 'PPP', { locale: sv })
                      ) : (
                        <span>Välj datum</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.step2.moveDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          step2: { ...prev.step2, moveDate: date },
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-4">
                <Label>Är datumet flexibelt?</Label>
                <RadioGroup
                  value={formData.step2.isFlexible ? 'yes' : 'no'}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      step2: { ...prev.step2, isFlexible: val === 'yes' },
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="flexible-yes" />
                    <Label htmlFor="flexible-yes">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="flexible-no" />
                    <Label htmlFor="flexible-no">Nej</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Behöver du hjälp med packning?</Label>
                <RadioGroup
                  value={formData.step2.packingHelp ? 'yes' : 'no'}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      step2: { ...prev.step2, packingHelp: val === 'yes' },
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="packing-yes" />
                    <Label htmlFor="packing-yes">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="packing-no" />
                    <Label htmlFor="packing-no">Nej</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Behöver du flyttstädning?</Label>
                <RadioGroup
                  value={formData.step2.cleaningHelp ? 'yes' : 'no'}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      step2: { ...prev.step2, cleaningHelp: val === 'yes' },
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cleaning-yes" />
                    <Label htmlFor="cleaning-yes">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cleaning-no" />
                    <Label htmlFor="cleaning-no">Nej</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Vilken våning bor du på?</Label>
                <Select
                  value={formData.step3.floor}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      step3: { ...prev.step3, floor: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj våning" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ground">Bottenvåning</SelectItem>
                    <SelectItem value="1">1:a våningen</SelectItem>
                    <SelectItem value="2">2:a våningen</SelectItem>
                    <SelectItem value="3">3:e våningen</SelectItem>
                    <SelectItem value="4">4:e våningen</SelectItem>
                    <SelectItem value="5+">5:e våningen eller högre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Finns det hiss?</Label>
                <RadioGroup
                  value={formData.step3.hasElevator ? 'yes' : 'no'}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      step3: { ...prev.step3, hasElevator: val === 'yes' },
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="elevator-yes" />
                    <Label htmlFor="elevator-yes">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="elevator-no" />
                    <Label htmlFor="elevator-no">Nej</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Avstånd till parkering</Label>
                <Select
                  value={formData.step3.parkingDistance}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      step3: { ...prev.step3, parkingDistance: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj avstånd" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10">0-10 meter</SelectItem>
                    <SelectItem value="10-25">10-25 meter</SelectItem>
                    <SelectItem value="25-50">25-50 meter</SelectItem>
                    <SelectItem value="50+">Mer än 50 meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Ska några tunga föremål flyttas?</Label>
                <p className="text-sm text-text-light">
                  Flyttfirman behöver få veta om tunga och otympliga föremål, som pianon eller kassaskåp, i förväg för att planera flytten.
                </p>
                <RadioGroup
                  value={formData.step4.heavyItems.hasHeavyItems ? 'yes' : 'no'}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      step4: {
                        ...prev.step4,
                        heavyItems: {
                          ...prev.step4.heavyItems,
                          hasHeavyItems: val === 'yes',
                        },
                      },
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="heavy-yes" />
                    <Label htmlFor="heavy-yes">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="heavy-no" />
                    <Label htmlFor="heavy-no">Nej</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.step4.heavyItems.hasHeavyItems && (
                <div className="space-y-4">
                  <Label>Vilka tunga föremål ska flyttas?</Label>
                  <Input
                    value={formData.step4.heavyItems.items}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        step4: {
                          ...prev.step4,
                          heavyItems: {
                            ...prev.step4.heavyItems,
                            items: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="T.ex. piano, kassaskåp, etc."
                  />
                </div>
              )}

              <div className="space-y-4">
                <Label>Ska några särskilt ömtåliga föremål flyttas?</Label>
                <p className="text-sm text-text-light">
                  Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål, som antikviteter, i förväg för att planera flytten.
                </p>
                <RadioGroup
                  value={formData.step4.fragileItems.hasFragileItems ? 'yes' : 'no'}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      step4: {
                        ...prev.step4,
                        fragileItems: {
                          ...prev.step4.fragileItems,
                          hasFragileItems: val === 'yes',
                        },
                      },
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="fragile-yes" />
                    <Label htmlFor="fragile-yes">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fragile-no" />
                    <Label htmlFor="fragile-no">Nej</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.step4.fragileItems.hasFragileItems && (
                <div className="space-y-4">
                  <Label>Vilka ömtåliga föremål ska flyttas?</Label>
                  <Input
                    value={formData.step4.fragileItems.items}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        step4: {
                          ...prev.step4,
                          fragileItems: {
                            ...prev.step4.fragileItems,
                            items: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="T.ex. antikviteter, konst, etc."
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Ditt namn</Label>
                <Input
                  value={formData.step5.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step5: { ...prev.step5, name: e.target.value },
                    }))
                  }
                  placeholder="För- och efternamn"
                />
              </div>

              <div className="space-y-4">
                <Label>E-post</Label>
                <Input
                  type="email"
                  value={formData.step5.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step5: { ...prev.step5, email: e.target.value },
                    }))
                  }
                  placeholder="namn@epost.se"
                />
              </div>

              <div className="space-y-4">
                <Label>Telefon</Label>
                <Input
                  type="tel"
                  value={formData.step5.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step5: { ...prev.step5, phone: e.target.value },
                    }))
                  }
                  placeholder="070XXXXXXX"
                />
              </div>

              <div className="space-y-4">
                <Label>Övriga önskemål (frivilligt)</Label>
                <textarea
                  value={formData.step5.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step5: { ...prev.step5, notes: e.target.value },
                    }))
                  }
                  placeholder="Ställ frågor till flyttfirman eller meddela om eventuella önskemål och behov."
                  className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-background"
                />
              </div>
            </div>
          </div>
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