import { StorageFormData } from '@/types/storage-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step3Props {
  data: StorageFormData['step3'];
  updateData: (data: Partial<StorageFormData['step3']>) => void;
}

export function Step3({ data, updateData }: Step3Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Namn</Label>
          <Input
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="För- och efternamn"
          />
        </div>

        <div className="space-y-4">
          <Label>E-post</Label>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="namn@epost.se"
          />
        </div>

        <div className="space-y-4">
          <Label>Telefon</Label>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="070XXXXXXX"
          />
        </div>

        {data.company && (
          <div className="space-y-4">
            <Label>Företagsnamn</Label>
            <Input
              value={data.company}
              onChange={(e) => updateData({ company: e.target.value })}
              placeholder="Företag AB"
            />
          </div>
        )}
      </div>
    </div>
  );
}