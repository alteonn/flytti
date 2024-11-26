export interface StorageFormData {
  step1: {
    customerType: 'private' | 'company';
    duration: 'short-term' | 'long-term' | 'unsure';
    needsMovingHelp: boolean;
    isStudent: boolean;
  };
  step2: {
    storageSize: string;
    municipalities: string[];
    comments: string;
  };
  step3: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
}

export const initialStorageFormData: StorageFormData = {
  step1: {
    customerType: 'private',
    duration: 'unsure',
    needsMovingHelp: false,
    isStudent: false,
  },
  step2: {
    storageSize: '',
    municipalities: [''],
    comments: '',
  },
  step3: {
    name: '',
    email: '',
    phone: '',
    company: '',
  },
};