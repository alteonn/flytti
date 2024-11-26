import { EstateFormData } from '@/types/estate-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step3Props {
  data: EstateFormData['step3'];
  updateData: (data: Partial<EstateFormData['step3']>) => void;
}

export function Step3({ data, updateData }: Step3Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Dödsboet ska transporteras till</Label>
          <RadioGroup
            value={data.destination}
            onValueChange={(value: 'recycling' | 'family' | 'storage') => updateData({ destination: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recycling" id="destination-recycling" />
              <Label htmlFor="destination-recycling">Avfalls- och återvinningscentral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="family" id="destination-family" />
              <Label htmlFor="destination-family">Familj eller efterlevande</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="storage" id="destination-storage" />
              <Label htmlFor="destination-storage">Magasinering / Förråd</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Ska några tunga föremål flyttas?</Label>
          <p className="text-sm text-text-light">
            Flyttfirman behöver få veta om tunga och otympliga föremål, som pianon eller kassaskåp, i förväg för att planera transporten.
          </p>
          <RadioGroup
            value={data.heavyItems.hasHeavyItems ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                heavyItems: {
                  ...data.heavyItems,
                  hasHeavyItems: val === 'yes',
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="heavy-yes" />
              <Label htmlFor="heavy-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="heavy-no" />
              <Label htmlFor="heavy-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        {data.heavyItems.hasHeavyItems && (
          <div className="space-y-4">
            <Label>Vilka tunga föremål ska flyttas?</Label>
            <Input
              value={data.heavyItems.items}
              onChange={(e) =>
                updateData({
                  heavyItems: {
                    ...data.heavyItems,
                    items: e.target.value,
                  },
                })
              }
              placeholder="T.ex. piano, kassaskåp, etc."
            />
          </div>
        )}

        <div className="space-y-4">
          <Label>Ska några särskilt ömtåliga föremål flyttas?</Label>
          <p className="text-sm text-text-light">
            Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål, som antikviteter, i förväg för att planera transporten.
          </p>
          <RadioGroup
            value={data.fragileItems.hasFragileItems ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                fragileItems: {
                  ...data.fragileItems,
                  hasFragileItems: val === 'yes',
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="fragile-yes" />
              <Label htmlFor="fragile-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="fragile-no" />
              <Label htmlFor="fragile-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        {data.fragileItems.hasFragileItems && (
          <div className="space-y-4">
            <Label>Vilka ömtåliga föremål ska flyttas?</Label>
            <Input
              value={data.fragileItems.items}
              onChange={(e) =>
                updateData({
                  fragileItems: {
                    ...data.fragileItems,
                    items: e.target.value,
                  },
                })
              }
              placeholder="T.ex. antikviteter, konst, etc."
            />
          </div>
        )}
      </div>
    </div>
  );
}