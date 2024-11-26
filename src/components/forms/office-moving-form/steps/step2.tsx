import { OfficeMovingFormData } from '@/types/office-moving';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step2Props {
  data: OfficeMovingFormData['step2'];
  updateData: (data: Partial<OfficeMovingFormData['step2']>) => void;
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

export function Step2({ data, updateData }: Step2Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Nuvarande adress</h3>
        <p className="text-sm text-text-light">Information om er nuvarande lokal.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label>Gatuadress</Label>
            <Input
              value={data.currentAddress.street}
              onChange={(e) =>
                updateData({
                  currentAddress: { ...data.currentAddress, street: e.target.value },
                })
              }
              placeholder="Gatuadress"
            />
          </div>

          <div className="space-y-4">
            <Label>Gatunr.</Label>
            <Input
              value={data.currentAddress.streetNumber}
              onChange={(e) =>
                updateData({
                  currentAddress: { ...data.currentAddress, streetNumber: e.target.value },
                })
              }
              placeholder="1A"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Postnummer</Label>
          <Input
            value={data.currentAddress.postalCode}
            onChange={(e) =>
              updateData({
                currentAddress: { ...data.currentAddress, postalCode: e.target.value },
              })
            }
            placeholder="12345"
          />
        </div>

        <div className="space-y-4">
          <Label>Lokalens storlek (kvm)</Label>
          <Input
            type="number"
            value={data.currentAddress.size || ''}
            onChange={(e) =>
              updateData({
                currentAddress: { ...data.currentAddress, size: Number(e.target.value) },
              })
            }
            placeholder="120"
          />
        </div>

        <div className="space-y-4">
          <Label>Hur många våningar inrymmer lokalen?</Label>
          <Select
            value={data.currentAddress.floors}
            onValueChange={(value) =>
              updateData({
                currentAddress: { ...data.currentAddress, floors: value },
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
          <Label>Antal anställda/arbetsplatser</Label>
          <Input
            type="number"
            value={data.currentAddress.employeeCount || ''}
            onChange={(e) =>
              updateData({
                currentAddress: {
                  ...data.currentAddress,
                  employeeCount: Number(e.target.value),
                },
              })
            }
            placeholder="10"
          />
        </div>

        <div className="space-y-4">
          <Label>Vilken våning ligger lokalens ingång på?</Label>
          <Select
            value={data.currentAddress.entranceFloor}
            onValueChange={(value) =>
              updateData({
                currentAddress: { ...data.currentAddress, entranceFloor: value },
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
          <Label>Finns hiss i byggnaden?</Label>
          <RadioGroup
            value={data.currentAddress.hasElevator ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                currentAddress: {
                  ...data.currentAddress,
                  hasElevator: val === 'yes',
                },
              })
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
          <Label>Finns lastkaj i byggnaden?</Label>
          <RadioGroup
            value={data.currentAddress.hasLoadingDock ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                currentAddress: {
                  ...data.currentAddress,
                  hasLoadingDock: val === 'yes',
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="loading-dock-yes" />
              <Label htmlFor="loading-dock-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="loading-dock-no" />
              <Label htmlFor="loading-dock-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Avstånd till parkering</Label>
          <p className="text-sm text-text-light">
            Den närmaste punkt en flyttbil kan stå under lastning
          </p>
          <Select
            value={data.currentAddress.parkingDistance}
            onValueChange={(value) =>
              updateData({
                currentAddress: { ...data.currentAddress, parkingDistance: value },
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