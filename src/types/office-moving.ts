export interface OfficeMovingFormData {
  step1: {
    moveDate: Date | undefined;
    isFlexible: boolean;
    flexibilityRange?: '1-week' | '2-weeks' | '3-weeks' | '4-weeks' | '';
    needsPacking: boolean;
    needsStorage: boolean;
    needsCleaning: boolean;
  };
  step2: {
    currentAddress: {
      street: string;
      streetNumber: string;
      postalCode: string;
      size: number;
      floors: string;
      employeeCount: number;
      entranceFloor: string;
      hasElevator: boolean;
      hasLoadingDock: boolean;
      parkingDistance: string;
    };
  };
  step3: {
    newAddress: {
      street: string;
      streetNumber: string;
      postalCode: string;
      city: string;
      size: number;
      floors: string;
      entranceFloor: string;
      hasElevator: boolean;
      hasLoadingDock: boolean;
      parkingDistance: string;
    };
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
  };
  step5: {
    comments: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
}

export const initialOfficeMovingFormData: OfficeMovingFormData = {
  step1: {
    moveDate: undefined,
    isFlexible: false,
    flexibilityRange: '',
    needsPacking: false,
    needsStorage: false,
    needsCleaning: false,
  },
  step2: {
    currentAddress: {
      street: '',
      streetNumber: '',
      postalCode: '',
      size: 0,
      floors: '',
      employeeCount: 0,
      entranceFloor: '',
      hasElevator: false,
      hasLoadingDock: false,
      parkingDistance: '',
    },
  },
  step3: {
    newAddress: {
      street: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      size: 0,
      floors: '',
      entranceFloor: '',
      hasElevator: false,
      hasLoadingDock: false,
      parkingDistance: '',
    },
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
  },
  step5: {
    comments: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
  },
};