import { CleaningFormData } from '@/types/cleaning-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step2Props {
  data: CleaningFormData['step2'];
  updateData: (data: Partial<CleaningFormData['step2']>) => void;
}

const propertyTypes = [
  { value: 'apartment', label: 'Lägenhet' },
  { value: 'house', label: 'Villa' },
  { value: 'townhouse', label: 'Radhus' },
  { value: 'cottage', label: 'Fritidshus' },
  { value: 'office', label: 'Kontor' },
];

const floorOptions = Array.from({ length: 4 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i === 0 ? 'våning' : 'våningar'}`,
}));

export function Step2({ data, updateData }: Step2Props) {
  const updateRoomCount = (type: keyof CleaningFormData['step2']['rooms'], value: number) => {
    updateData({
      rooms: {
        ...data.rooms,
        [type]: Math.max(0, value),
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Vilken sorts bostad ska städas?</Label>
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
          <Label>Hur många våningar ska städas?</Label>
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
          <Label>Ska hela bostaden städas?</Label>
          <RadioGroup
            value={data.cleanEntireProperty ? 'yes' : 'no'}
            onValueChange={(val) => updateData({ cleanEntireProperty: val === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="entire-yes" />
              <Label htmlFor="entire-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="entire-no" />
              <Label htmlFor="entire-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Ange antalet rum som ska städas</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sovrum</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('bedrooms', data.rooms.bedrooms - 1)}
                >
                  -
                </Button>
                <span className="w-12 text-center">{data.rooms.bedrooms}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('bedrooms', data.rooms.bedrooms + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Badrum</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('bathrooms', data.rooms.bathrooms - 1)}
                >
                  -
                </Button>
                <span className="w-12 text-center">{data.rooms.bathrooms}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('bathrooms', data.rooms.bathrooms + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kök</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('kitchens', data.rooms.kitchens - 1)}
                >
                  -
                </Button>
                <span className="w-12 text-center">{data.rooms.kitchens}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('kitchens', data.rooms.kitchens + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Vardagsrum</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('livingRooms', data.rooms.livingRooms - 1)}
                >
                  -
                </Button>
                <span className="w-12 text-center">{data.rooms.livingRooms}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('livingRooms', data.rooms.livingRooms + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Övriga rum</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('otherRooms', data.rooms.otherRooms - 1)}
                >
                  -
                </Button>
                <span className="w-12 text-center">{data.rooms.otherRooms}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomCount('otherRooms', data.rooms.otherRooms + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}