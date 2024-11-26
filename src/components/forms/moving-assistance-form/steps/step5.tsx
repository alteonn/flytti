import { MovingFormData } from '@/types/moving-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Step5Props {
  data: MovingFormData['step5'];
  updateData: (data: Partial<MovingFormData['step5']>) => void;
}

export function Step5({ data, updateData }: Step5Props) {
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

        <div className="space-y-4">
          <Label>Övriga önskemål (frivilligt)</Label>
          <Textarea
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            placeholder="Skriv eventuella kommentarer eller frågor här..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}