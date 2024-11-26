import { InternationalMovingFormData } from '@/types/international-moving';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Step1Props {
  data: InternationalMovingFormData['step1'];
  updateData: (data: Partial<InternationalMovingFormData['step1']>) => void;
}

export function Step1({ data, updateData }: Step1Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Typ av transport</Label>
          <Select
            value={data.moveType}
            onValueChange={(value: InternationalMovingFormData['step1']['moveType']) => updateData({ moveType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Välj transporttyp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="air">Flygfrakt</SelectItem>
              <SelectItem value="sea">Sjöfrakt</SelectItem>
              <SelectItem value="road">Vägfrakt (inom Europa)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Bostadstyp</Label>
          <Select
            value={data.homeType}
            onValueChange={(value: InternationalMovingFormData['step1']['homeType']) => updateData({ homeType: value })}
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
          <Label>Från land</Label>
          <Input
            value={data.fromCountry}
            onChange={(e) => updateData({ fromCountry: e.target.value })}
            placeholder="Sverige"
          />
        </div>

        <div className="space-y-4">
          <Label>Till land</Label>
          <Input
            value={data.toCountry}
            onChange={(e) => updateData({ toCountry: e.target.value })}
            placeholder="Destination"
          />
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