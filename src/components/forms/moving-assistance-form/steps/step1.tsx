import { MovingFormData } from '@/types/moving-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Step1Props {
  data: MovingFormData['step1'];
  updateData: (data: Partial<MovingFormData['step1']>) => void;
}

export function Step1({ data, updateData }: Step1Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Typ av flytt</Label>
          <Select
            value={data.moveType}
            onValueChange={(value: MovingFormData['step1']['moveType']) => updateData({ moveType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Välj typ av flytt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Lokalflytt</SelectItem>
              <SelectItem value="long-distance">Långdistansflytt</SelectItem>
              <SelectItem value="international">Utlandsflytt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Bostadstyp</Label>
          <Select
            value={data.homeType}
            onValueChange={(value: MovingFormData['step1']['homeType']) => updateData({ homeType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Välj bostadstyp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Lägenhet</SelectItem>
              <SelectItem value="house">Villa</SelectItem>
              <SelectItem value="townhouse">Radhus</SelectItem>
              <SelectItem value="storage">Förråd</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Antal rum</Label>
          <Select
            value={data.rooms}
            onValueChange={(value) => updateData({ rooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Välj antal rum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 rum</SelectItem>
              <SelectItem value="2">2 rum</SelectItem>
              <SelectItem value="3">3 rum</SelectItem>
              <SelectItem value="4">4 rum</SelectItem>
              <SelectItem value="5">5+ rum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Från adress</Label>
          <Input
            value={data.fromAddress}
            onChange={(e) => updateData({ fromAddress: e.target.value })}
            placeholder="Gatuadress, postnummer och ort"
          />
        </div>

        <div className="space-y-4">
          <Label>Till adress</Label>
          <Input
            value={data.toAddress}
            onChange={(e) => updateData({ toAddress: e.target.value })}
            placeholder="Gatuadress, postnummer och ort"
          />
        </div>
      </div>
    </div>
  );
}