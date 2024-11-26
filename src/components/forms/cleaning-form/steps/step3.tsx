import { CleaningFormData } from '@/types/cleaning-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface Step3Props {
  data: CleaningFormData['step3'];
  updateData: (data: Partial<CleaningFormData['step3']>) => void;
}

export function Step3({ data, updateData }: Step3Props) {
  const updateAdditionalArea = (area: keyof CleaningFormData['step3']['additionalAreas'], checked: boolean) => {
    updateData({
      additionalAreas: {
        ...data.additionalAreas,
        [area]: checked,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Välj om du vill ha städning av följande</Label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="garage"
                checked={data.additionalAreas.garage}
                onCheckedChange={(checked) => updateAdditionalArea('garage', checked as boolean)}
              />
              <Label htmlFor="garage">Garage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="balcony"
                checked={data.additionalAreas.balcony}
                onCheckedChange={(checked) => updateAdditionalArea('balcony', checked as boolean)}
              />
              <Label htmlFor="balcony">Balkong/veranda/terrass</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="storage"
                checked={data.additionalAreas.storage}
                onCheckedChange={(checked) => updateAdditionalArea('storage', checked as boolean)}
              />
              <Label htmlFor="storage">Förråd/uthus</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Ungefär hur stor yta ska städas? (kvm)</Label>
          <Input
            type="number"
            value={data.totalArea || ''}
            onChange={(e) => updateData({ totalArea: Number(e.target.value) })}
            placeholder="70"
          />
        </div>

        <div className="space-y-4">
          <Label>Kommentarer (frivilligt)</Label>
          <p className="text-sm text-text-light">
            Här kan du nämna särskilda detaljer, t.ex. om du har stuckaturer som behöver rengöras varsamt.
          </p>
          <Textarea
            value={data.comments}
            onChange={(e) => updateData({ comments: e.target.value })}
            placeholder="Skriv dina kommentarer här..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-4">
          <Label>Vill du även få flytthjälp?</Label>
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
      </div>
    </div>
  );
}