import { EstateFormData } from '@/types/estate-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step2Props {
  data: EstateFormData['step2'];
  updateData: (data: Partial<EstateFormData['step2']>) => void;
}

const propertyTypes = [
  { value: 'apartment', label: 'Lägenhet' },
  { value: 'house', label: 'Villa' },
  { value: 'townhouse', label: 'Radhus' },
  { value: 'cottage', label: 'Fritidshus' },
];

const roomOptions = Array.from({ length: 8 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} rum`,
}));

const floorOptions = Array.from({ length: 4 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i === 0 ? 'våning' : 'våningar'}`,
}));

const parkingDistanceOptions = [
  { value: '0-10', label: '0-10 meter' },
  { value: '10-25', label: '10-25 meter' },
  { value: '25-50', label: '25-50 meter' },
  { value: '50+', label: 'Mer än 50 meter' },
];

export function Step2({ data, updateData }: Step2Props) {
  const updateAddress = (field: keyof EstateFormData['step2']['address'], value: string) => {
    updateData({
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Om dödsboet</h3>

        <div className="space-y-4">
          <Label>Adress</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gatuadress</Label>
              <Input
                value={data.address.street}
                onChange={(e) => updateAddress('street', e.target.value)}
                placeholder="Gatuadress"
              />
            </div>

            <div className="space-y-2">
              <Label>Gatunr.</Label>
              <Input
                value={data.address.streetNumber}
                onChange={(e) => updateAddress('streetNumber', e.target.value)}
                placeholder="1A"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Postnummer</Label>
            <Input
              value={data.address.postalCode}
              onChange={(e) => updateAddress('postalCode', e.target.value)}
              placeholder="12345"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Bostadstyp</Label>
          <Select
            value={data.propertyType}
            onValueChange={(value) => updateData({ propertyType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Välj --" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Bostadens storlek (kvm)</Label>
          <Input
            type="number"
            value={data.size || ''}
            onChange={(e) => updateData({ size: Number(e.target.value) })}
            placeholder="70"
          />
        </div>

        <div className="space-y-4">
          <Label>Antal rum</Label>
          <Select
            value={data.rooms}
            onValueChange={(value) => updateData({ rooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Välj --" />
            </SelectTrigger>
            <SelectContent>
              {roomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Antal våningar</Label>
          <Select
            value={data.floors}
            onValueChange={(value) => updateData({ floors: value })}
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
          <Label>Avstånd till parkering</Label>
          <p className="text-sm text-text-light">
            Den närmaste punkt en flyttbil kan stå under lastning
          </p>
          <Select
            value={data.parkingDistance}
            onValueChange={(value) => updateData({ parkingDistance: value })}
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