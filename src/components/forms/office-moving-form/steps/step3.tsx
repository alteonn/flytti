import { OfficeMovingFormData } from '@/types/office-moving';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step3Props {
  data: OfficeMovingFormData['step3'];
  updateData: (data: Partial<OfficeMovingFormData['step3']>) => void;
}

const floorOptions = Array.from({ length: 20 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i === 0 ? 'våning' : 'våningar'}`,
}));

const entranceFloorOptions = Array.from({ length: 20 }, (_, i) => ({
  value: String(i),
  label: i === 0 ? 'Bottenvåning' : `${i}:a våningen`,
}));

const parkingDistanceOptions = [
  { value: '0-10', label: '0-10 meter' },
  { value: '10-25', label: '10-25 meter' },
  { value: '25-50', label: '25-50 meter' },
  { value: '50+', label: 'Mer än 50 meter' },
];

export function Step3({ data, updateData }: Step3Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Ny adress</h3>
        <p className="text-sm text-text-light">Information om er nya lokal.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label>Gatuadress</Label>
            <Input
              value={data.newAddress.street}
              onChange={(e) =>
                updateData({
                  newAddress: { ...data.newAddress, street: e.target.value },
                })
              }
              placeholder="Gatuadress"
            />
          </div>

          <div className="space-y-4">
            <Label>Gatunr.</Label>
            <Input
              value={data.newAddress.streetNumber}
              onChange={(e) =>
                updateData({
                  newAddress: { ...data.newAddress, streetNumber: e.target.value },
                })
              }
              placeholder="1A"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Postnummer</Label>
          <Input
            value={data.newAddress.postalCode}
            onChange={(e) =>
              updateData({
                newAddress: { ...data.newAddress, postalCode: e.target.value },
              })
            }
            placeholder="12345"
          />
        </div>

        <div className="space-y-4">
          <Label>Ort</Label>
          <Input
            value={data.newAddress.city}
            onChange={(e) =>
              updateData({
                newAddress: { ...data.newAddress, city: e.target.value },
              })
            }
            placeholder="Stockholm"
          />
        </div>

        <div className="space-y-4">
          <Label>Nya lokalens storlek (kvm)</Label>
          <Input
            type="number"
            value={data.newAddress.size || ''}
            onChange={(e) =>
              updateData({
                newAddress: { ...data.newAddress, size: Number(e.target.value) },
              })
            }
            placeholder="120"
          />
        </div>

        <div className="space-y-4">
          <Label>Hur många våningar inrymmer den nya lokalen?</Label>
          <Select
            value={data.newAddress.floors}
            onValueChange={(value) =>
              updateData({
                newAddress: { ...data.newAddress, floors: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Välj --" />
            </SelectTrigger>
            <SelectContent>
              {floorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Vilken våning ligger den nya lokalens ingång på?</Label>
          <Select
            value={data.newAddress.entranceFloor}
            onValueChange={(value) =>
              updateData({
                newAddress: { ...data.newAddress, entranceFloor: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Välj --" />
            </SelectTrigger>
            <SelectContent>
              {entranceFloorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Finns hiss i den nya byggnaden?</Label>
          <RadioGroup
            value={data.newAddress.hasElevator ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                newAddress: {
                  ...data.newAddress,
                  hasElevator: val === 'yes',
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="new-elevator-yes" />
              <Label htmlFor="new-elevator-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="new-elevator-no" />
              <Label htmlFor="new-elevator-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Finns lastkaj i den nya byggnaden?</Label>
          <RadioGroup
            value={data.newAddress.hasLoadingDock ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                newAddress: {
                  ...data.newAddress,
                  hasLoadingDock: val === 'yes',
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="new-loading-dock-yes" />
              <Label htmlFor="new-loading-dock-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="new-loading-dock-no" />
              <Label htmlFor="new-loading-dock-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Avstånd till parkering vid den nya lokalen</Label>
          <p className="text-sm text-text-light">
            Den närmaste punkt en flyttbil kan stå under lastning
          </p>
          <Select
            value={data.newAddress.parkingDistance}
            onValueChange={(value) =>
              updateData({
                newAddress: { ...data.newAddress, parkingDistance: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Välj --" />
            </SelectTrigger>
            <SelectContent>
              {parkingDistanceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}