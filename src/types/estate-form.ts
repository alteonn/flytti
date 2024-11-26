export interface EstateFormData {
  step1: {
    services: {
      sorting: boolean;
      cleaning: boolean;
      purchase: boolean;
      removal: boolean;
    };
    startDate: Date | undefined;
    isFlexible: boolean;
    flexibilityRange: string;
  };
  step2: {
    address: {
      street: string;
      streetNumber: string;
      postalCode: string;
    };
    propertyType: string;
    size: number;
    rooms: string;
    floors: string;
    parkingDistance: string;
  };
  step3: {
    destination: 'recycling' | 'family' | 'storage';
    heavyItems: {
      hasHeavyItems: boolean;
      items: string;
    };
    fragileItems: {
      hasFragileItems: boolean;
      items: string;
    };
  };
  step4: {
    name: string;
    email: string;
    phone: string;
    comments: string;
  };
}

export const initialEstateFormData: EstateFormData = {
  step1: {
    services: {
      sorting: false,
      cleaning: false,
      purchase: false,
      removal: false,
    },
    startDate: undefined,
    isFlexible: false,
    flexibilityRange: '',
  },
  step2: {
    address: {
      street: '',
      streetNumber: '',
      postalCode: '',
    },
    propertyType: '',
    size: 0,
    rooms: '',
    floors: '',
    parkingDistance: '',
  },
  step3: {
    destination: 'recycling',
    heavyItems: {
      hasHeavyItems: false,
      items: '',
    },
    fragileItems: {
      hasFragileItems: false,
      items: '',
    },
  },
  step4: {
    name: '',
    email: '',
    phone: '',
    comments: '',
  },
};