import { InternationalMovingFormData } from '@/types/international-moving';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step4Props {
  data: InternationalMovingFormData['step4'];
  updateData: (data: Partial<InternationalMovingFormData['step4']>) => void;
}

export function Step4({ data, updateData }: Step4Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Ska några tunga föremål flyttas?</Label>
          <p className="text-sm text-text-light">
            Flyttfirman behöver få veta om tunga och otympliga föremål, som pianon eller kassaskåp, i förväg för att planera flytten.
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
            Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål i förväg för att planera flytten.
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

        <div className="space-y-4">
          <Label>Ska något fordon flyttas?</Label>
          <RadioGroup
            value={data.vehicleShipment.hasVehicle ? 'yes' : 'no'}
            onValueChange={(val) =>
              updateData({
                vehicleShipment: {
                  ...data.vehicleShipment,
                  hasVehicle: val === 'yes',
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="vehicle-yes" />
              <Label htmlFor="vehicle-yes">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="vehicle-no" />
              <Label htmlFor="vehicle-no">Nej</Label>
            </div>
          </RadioGroup>
        </div>

        {data.vehicleShipment.hasVehicle && (
          <div className="space-y-4">
            <Label>Vilken typ av fordon?</Label>
            <Input
              value={data.vehicleShipment.vehicleType}
              onChange={(e) =>
                updateData({
                  vehicleShipment: {
                    ...data.vehicleShipment,
                    vehicleType: e.target.value,
                  },
                })
              }
              placeholder="T.ex. personbil, motorcykel, etc."
            />
          </div>
        )}
      </div>
    </div>
  );
}