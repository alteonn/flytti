import { InternationalMovingFormData } from '@/types/international-moving';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Step3Props {
  data: InternationalMovingFormData['step3'];
  updateData: (data: Partial<InternationalMovingFormData['step3']>) => void;
}

export function Step3({ data, updateData }: Step3Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Vilken våning bor du på?</Label>
          <Select
            value={data.floor}
            onValueChange={(value: InternationalMovingFormData['step3']['floor']) => updateData({ floor: value })}
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
            value={data.hasElevator ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ hasElevator: val === 'yes' })}
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
          <p className="text-sm text-text-light">
            Den närmaste punkt en flyttbil kan stå under lastning
          </p>
          <Select
            value={data.parkingDistance}
            onValueChange={(value: InternationalMovingFormData['step3']['parkingDistance']) => updateData({ parkingDistance: value })}
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

        <div className="space-y-4">
          <Label>Uppskattad volym (kubikmeter)</Label>
          <p className="text-sm text-text-light">
            Om du är osäker kan du lämna detta fält tomt så hjälper flyttfirman dig med beräkningen
          </p>
          <Input
            type="number"
            value={data.estimatedVolume}
            onChange={(e) => updateData({ estimatedVolume: e.target.value })}
            placeholder="t.ex. 30"
          />
        </div>
      </div>
    </div>
  );
}