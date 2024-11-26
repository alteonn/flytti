import { CleaningFormData } from '@/types/cleaning-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Step1Props {
  data: CleaningFormData['step1'];
  updateData: (data: Partial<CleaningFormData['step1']>) => void;
}

const flexibilityOptions = [
  { value: '1-week', label: '1 vecka' },
  { value: '2-weeks', label: '2 veckor' },
  { value: '3-weeks', label: '3 veckor' },
  { value: '4-weeks', label: '4 veckor' },
];

export function Step1({ data, updateData }: Step1Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Typ av kund</Label>
          <RadioGroup
            value={data.customerType}
            onValueChange={(value: 'private' | 'company') => updateData({ customerType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="customer-private" />
              <Label htmlFor="customer-private">Privat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="customer-company" />
              <Label htmlFor="customer-company">Företag</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Städdatum</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.cleaningDate ? (
                  format(data.cleaningDate, 'PPP', { locale: sv })
                ) : (
                  <span>Välj datum</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.cleaningDate}
                onSelect={(date) => updateData({ cleaningDate: date })}
                initialFocus
                locale={sv}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <Label>Är städdatumet flexibelt?</Label>
          <p className="text-sm text-text-light">
            Kan städningen ske på andra datum än valt städdatum ovan?
          </p>
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
            <p className="text-sm text-text-light">
              Ange hur flexibel du är, med utgångspunkt i önskat städdatum.
            </p>
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