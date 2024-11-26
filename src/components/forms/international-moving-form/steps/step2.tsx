import { InternationalMovingFormData } from '@/types/international-moving';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Step2Props {
  data: InternationalMovingFormData['step2'];
  updateData: (data: Partial<InternationalMovingFormData['step2']>) => void;
}

const flexibilityOptions = [
  { value: '1-week', label: '1 vecka' },
  { value: '2-weeks', label: '2 veckor' },
  { value: '3-weeks', label: '3 veckor' },
  { value: '4-weeks', label: '4 veckor' },
];

export function Step2({ data, updateData }: Step2Props) {
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
                {data.moveDate ? (
                  format(data.moveDate, 'PPP', { locale: sv })
                ) : (
                  <span>Välj datum</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.moveDate}
                onSelect={(date) => updateData({ moveDate: date })}
                initialFocus
                locale={sv}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <Label>Är flyttdatumet flexibelt?</Label>
          <p className="text-sm text-text-light">
            Om du väljer ett flexibelt flyttdatum sker flytten inom vald tidsperiod från det datum du har valt.
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
            <Select
              value={data.flexibilityRange}
              onValueChange={(value: InternationalMovingFormData['step2']['flexibilityRange']) => 
                updateData({ flexibilityRange: value })
              }
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

        <div className="space-y-4">
          <Label>Vill du ha hjälp med packning?</Label>
          <RadioGroup
            value={data.packingHelp ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ packingHelp: val === 'yes' })}
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
          <Label>Vill du ha hjälp med tulldeklaration?</Label>
          <RadioGroup
            value={data.customsClearance ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ customsClearance: val === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="customs-yes" />
              <Label htmlFor="customs-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="customs-no" />
              <Label htmlFor="customs-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Behöver du extra försäkring?</Label>
          <RadioGroup
            value={data.insuranceNeeded ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ insuranceNeeded: val === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="insurance-yes" />
              <Label htmlFor="insurance-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="insurance-no" />
              <Label htmlFor="insurance-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}