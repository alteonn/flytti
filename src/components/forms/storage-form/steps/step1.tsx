import { StorageFormData } from '@/types/storage-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step1Props {
  data: StorageFormData['step1'];
  updateData: (data: Partial<StorageFormData['step1']>) => void;
}

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
          <Label>Hur länge behöver du magasinering?</Label>
          <RadioGroup
            value={data.duration}
            onValueChange={(value: 'short-term' | 'long-term' | 'unsure') => updateData({ duration: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short-term" id="duration-short" />
              <Label htmlFor="duration-short">Korttidshyra (kortare än 6 månader)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long-term" id="duration-long" />
              <Label htmlFor="duration-long">Långtidshyra</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsure" id="duration-unsure" />
              <Label htmlFor="duration-unsure">Osäker</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Ska du flytta och vill få offerter på flytthjälp?</Label>
          <RadioGroup
            value={data.needsMovingHelp ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ needsMovingHelp: val === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="moving-help-yes" />
              <Label htmlFor="moving-help-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="moving-help-no" />
              <Label htmlFor="moving-help-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Är du student?</Label>
          <p className="text-sm text-text-light">
            Vissa företag erbjuder studentrabatt.
          </p>
          <RadioGroup
            value={data.isStudent ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ isStudent: val === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="student-yes" />
              <Label htmlFor="student-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="student-no" />
              <Label htmlFor="student-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}