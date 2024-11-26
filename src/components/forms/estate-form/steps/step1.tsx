import { EstateFormData } from '@/types/estate-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Step1Props {
  data: EstateFormData['step1'];
  updateData: (data: Partial<EstateFormData['step1']>) => void;
}

const flexibilityOptions = [
  { value: '1-week', label: '1 vecka' },
  { value: '2-weeks', label: '2 veckor' },
  { value: '3-weeks', label: '3 veckor' },
  { value: '4-weeks', label: '4 veckor' },
];

export function Step1({ data, updateData }: Step1Props) {
  const updateService = (service: keyof EstateFormData['step1']['services'], checked: boolean) => {
    updateData({
      services: {
        ...data.services,
        [service]: checked,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Vilka uppgifter vill du ha hjälp med?</Label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sorting"
                checked={data.services.sorting}
                onCheckedChange={(checked) => updateService('sorting', checked as boolean)}
              />
              <Label htmlFor="sorting">Sortering och packning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cleaning"
                checked={data.services.cleaning}
                onCheckedChange={(checked) => updateService('cleaning', checked as boolean)}
              />
              <Label htmlFor="cleaning">Städning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="purchase"
                checked={data.services.purchase}
                onCheckedChange={(checked) => updateService('purchase', checked as boolean)}
              />
              <Label htmlFor="purchase">Köp av hela eller delar av dödsboet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removal"
                checked={data.services.removal}
                onCheckedChange={(checked) => updateService('removal', checked as boolean)}
              />
              <Label htmlFor="removal">Bortforsling av dödsbo</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>När vill du att arbetet ska börja?</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.startDate ? (
                  format(data.startDate, 'PPP', { locale: sv })
                ) : (
                  <span>Välj datum</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.startDate}
                onSelect={(date) => updateData({ startDate: date })}
                initialFocus
                locale={sv}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <Label>Är datumet flexibelt?</Label>
          <RadioGroup
            value={data.isFlexible ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ isFlexible: val === 'yes' })}
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

        {data.isFlexible && (
          <div className="space-y-4">
            <Label>Flexibilitet</Label>
            <Select
              value={data.flexibilityRange}
              onValueChange={(value) => updateData({ flexibilityRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="-- Välj --" />
              </SelectTrigger>
              <SelectContent>
                {flexibilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}