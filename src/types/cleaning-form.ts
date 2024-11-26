export interface CleaningFormData {
  step1: {
    customerType: 'private' | 'company';
    cleaningDate: Date | undefined;
    isFlexible: boolean;
    flexibilityRange: string;
  };
  step2: {
    propertyType: string;
    floors: string;
    cleanEntireProperty: boolean;
    rooms: {
      bedrooms: number;
      bathrooms: number;
      kitchens: number;
      livingRooms: number;
      otherRooms: number;
    };
  };
  step3: {
    additionalAreas: {
      garage: boolean;
      balcony: boolean;
      storage: boolean;
    };
    totalArea: number;
    comments: string;
    needsMovingHelp: boolean;
  };
  step4: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      streetNumber: string;
      postalCode: string;
      city: string;
    };
  };
}

export const initialCleaningFormData: CleaningFormData = {
  step1: {
    customerType: 'private',
    cleaningDate: undefined,
    isFlexible: false,
    flexibilityRange: '',
  },
  step2: {
    propertyType: '',
    floors: '',
    cleanEntireProperty: true,
    rooms: {
      bedrooms: 0,
      bathrooms: 0,
      kitchens: 0,
      livingRooms: 0,
      otherRooms: 0,
    },
  },
  step3: {
    additionalAreas: {
      garage: false,
      balcony: false,
      storage: false,
    },
    totalArea: 0,
    comments: '',
    needsMovingHelp: false,
  },
  step4: {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      streetNumber: '',
      postalCode: '',
      city: '',
    },
  },
};