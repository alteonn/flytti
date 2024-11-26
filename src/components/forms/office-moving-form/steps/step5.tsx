import { OfficeMovingFormData } from '@/types/office-moving';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Step5Props {
  data: OfficeMovingFormData['step5'];
  updateData: (data: Partial<OfficeMovingFormData['step5']>) => void;
}

export function Step5({ data, updateData }: Step5Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Kommentarer</Label>
          <p className="text-sm text-text-light">
            Beskriv gärna uppdraget. Vilken verksamhet bedriver ni? Vilken sorts utrustning ska flyttas?
          </p>
          <Textarea
            value={data.comments}
            onChange={(e) => updateData({ comments: e.target.value })}
            className="min-h-[120px]"
            placeholder="Beskriv er verksamhet och specifika behov..."
          />
        </div>

        <div className="space-y-4">
          <Label>Företagets namn</Label>
          <Input
            value={data.companyName}
            onChange={(e) => updateData({ companyName: e.target.value })}
            placeholder="Företag AB"
          />
        </div>

        <div className="space-y-4">
          <Label>Kontaktperson</Label>
          <Input
            value={data.contactPerson}
            onChange={(e) => updateData({ contactPerson: e.target.value })}
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
      </div>
    </div>
  );
}