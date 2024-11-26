import { StorageFormData } from '@/types/storage-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface Step2Props {
  data: StorageFormData['step2'];
  updateData: (data: Partial<StorageFormData['step2']>) => void;
}

const storageSizes = [
  { value: 'small', label: '1–4 m² (motsvarar small)' },
  { value: 'medium', label: '5–9 m² (motsvarar medium)' },
  { value: 'large', label: '10–15 m² (motsvarar large)' },
  { value: 'xl', label: '16–25 m² (motsvarar XL)' },
  { value: 'xxl', label: '26–40 m² (motsvarar XXL)' },
  { value: 'other', label: 'Annat / Vet ej' },
];

export function Step2({ data, updateData }: Step2Props) {
  const addMunicipality = () => {
    updateData({
      municipalities: [...data.municipalities, ''],
    });
  };

  const removeMunicipality = (index: number) => {
    const newMunicipalities = [...data.municipalities];
    newMunicipalities.splice(index, 1);
    updateData({ municipalities: newMunicipalities });
  };

  const updateMunicipality = (index: number, value: string) => {
    const newMunicipalities = [...data.municipalities];
    newMunicipalities[index] = value;
    updateData({ municipalities: newMunicipalities });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Ungefär hur mycket ska förvaras?</Label>
          <RadioGroup
            value={data.storageSize}
            onValueChange={(value) => updateData({ storageSize: value })}
          >
            {storageSizes.map((size) => (
              <div key={size.value} className="flex items-center space-x-2">
                <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                <Label htmlFor={`size-${size.value}`}>{size.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Kommun (där du vill ha magasinering)</Label>
          <div className="space-y-4">
            {data.municipalities.map((municipality, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={municipality}
                  onChange={(e) => updateMunicipality(index, e.target.value)}
                  placeholder={`Kommun ${index + 1}`}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeMunicipality(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <p className="text-sm text-text-light">
              Du kan lägga till flera kommuner om du har behov för magasinering i mer än en kommun.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={addMunicipality}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Lägg till kommun
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Är det något mer vi bör veta? (Frivilligt)</Label>
          <Textarea
            value={data.comments}
            onChange={(e) => updateData({ comments: e.target.value })}
            placeholder="Skriv dina kommentarer här..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}