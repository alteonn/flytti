import { CleaningFormData } from '@/types/cleaning-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step4Props {
  data: CleaningFormData['step4'];
  updateData: (data: Partial<CleaningFormData['step4']>) => void;
}

export function Step4({ data, updateData }: Step4Props) {
  const updateAddress = (field: keyof CleaningFormData['step4']['address'], value: string) => {
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
          <Label>Adress som ska städas</Label>
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
              <Label>Gatunummer</Label>
              <Input
                value={data.address.streetNumber}
                onChange={(e) => updateAddress('streetNumber', e.target.value)}
                placeholder="1A"
              />
            </div>

            <div className="space-y-2">
              <Label>Postnummer</Label>
              <Input
                value={data.address.postalCode}
                onChange={(e) => updateAddress('postalCode', e.target.value)}
                placeholder="12345"
              />
            </div>

            <div className="space-y-2">
              <Label>Ort</Label>
              <Input
                value={data.address.city}
                onChange={(e) => updateAddress('city', e.target.value)}
                placeholder="Stockholm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}