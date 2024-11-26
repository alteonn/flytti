export interface InternationalMovingFormData {
  step1: {
    moveType: 'air' | 'sea' | 'road' | '';
    homeType: 'apartment' | 'house' | 'townhouse' | 'storage' | '';
    rooms: string;
    fromCountry: string;
    toCountry: string;
    fromAddress: string;
    toAddress: string;
  };
  step2: {
    moveDate: Date | undefined;
    isFlexible: boolean;
    flexibilityRange?: '1-week' | '2-weeks' | '3-weeks' | '4-weeks' | '';
    packingHelp: boolean;
    customsClearance: boolean;
    insuranceNeeded: boolean;
  };
  step3: {
    floor: 'ground' | '1' | '2' | '3' | '4' | '5+' | '';
    hasElevator: boolean;
    parkingDistance: '0-10' | '10-25' | '25-50' | '50+' | '';
    estimatedVolume: string;
  };
  step4: {
    heavyItems: {
      hasHeavyItems: boolean;
      items: string;
    };
    fragileItems: {
      hasFragileItems: boolean;
      items: string;
    };
    vehicleShipment: {
      hasVehicle: boolean;
      vehicleType: string;
    };
  };
  step5: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
}

export const initialInternationalMovingFormData: InternationalMovingFormData = {
  step1: {
    moveType: '',
    homeType: '',
    rooms: '',
    fromCountry: '',
    toCountry: '',
    fromAddress: '',
    toAddress: '',
  },
  step2: {
    moveDate: undefined,
    isFlexible: false,
    flexibilityRange: '',
    packingHelp: false,
    customsClearance: false,
    insuranceNeeded: false,
  },
  step3: {
    floor: '',
    hasElevator: false,
    parkingDistance: '',
    estimatedVolume: '',
  },
  step4: {
    heavyItems: {
      hasHeavyItems: false,
      items: '',
    },
    fragileItems: {
      hasFragileItems: false,
      items: '',
    },
    vehicleShipment: {
      hasVehicle: false,
      vehicleType: '',
    },
  },
  step5: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};