import { OfficeMovingFormData } from '@/types/office-moving';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step4Props {
  data: OfficeMovingFormData['step4'];
  updateData: (data: Partial<OfficeMovingFormData['step4']>) => void;
}

export function Step4({ data, updateData }: Step4Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Ska några tunga föremål flyttas?</Label>
          <p className="text-sm text-text-light">
            Flyttfirman behöver få veta om tunga och otympliga föremål, som kassaskåp eller tung kontorsutrustning, i förväg för att planera flytten.
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
              placeholder="T.ex. kassaskåp, tung kontorsutrustning, etc."
            />
          </div>
        )}

        <div className="space-y-4">
          <Label>Ska några särskilt ömtåliga föremål flyttas?</Label>
          <p className="text-sm text-text-light">
            Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål, som känslig elektronik eller konst, i förväg för att planera flytten.
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
              placeholder="T.ex. känslig elektronik, konst, etc."
            />
          </div>
        )}
      </div>
    </div>
  );
}