import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

// Uppdatera labelMap med svenska översättningar
const labelMap: Record<string, string> = {
  // Dödsbo-specifika fält
  removal: 'Bortforsling',
  sorting: 'Sortering',
  cleaning: 'Städning',
  purchase: 'Uppköp',
  startDate: 'Startdatum',
  destination: 'Destination',
  
  // Generella fält
  size: 'Storlek (kvm)',
  rooms: 'Antal rum',
  floors: 'Antal våningar',
  street: 'Gata',
  postalCode: 'Postnummer',
  streetNumber: 'Gatunummer',
  propertyType: 'Bostadstyp',
  parkingDistance: 'Avstånd till parkering',
  hasHeavyItems: 'Har tunga föremål',
  hasFragileItems: 'Har ömtåliga föremål',
  items: 'Specificerade föremål',
  
  // Kontaktinformation
  name: 'Namn',
  email: 'E-post',
  phone: 'Telefon',
  comments: 'Kommentarer',
  
  // Booleanska värden
  isFlexible: 'Flexibelt datum',
  flexibilityRange: 'Flexibilitet',
  
  // Adressinformation
  address: 'Adress',
  currentAddress: 'Nuvarande adress',
  newAddress: 'Ny adress',
  
  // Företagsinformation
  companyName: 'Företagsnamn',
  contactPerson: 'Kontaktperson',
  
  // Övriga fält
  customerType: 'Kundtyp',
  duration: 'Tidsperiod',
  needsMovingHelp: 'Önskar flytthjälp',
  isStudent: 'Är student',
  storageSize: 'Förvaringsstorlek',
  municipalities: 'Kommuner',
  
  // Rumstyper
  bedrooms: 'Sovrum',
  bathrooms: 'Badrum',
  kitchens: 'Kök',
  livingRooms: 'Vardagsrum',
  otherRooms: 'Övriga rum',
  
  // Tilläggsytor
  garage: 'Garage',
  balcony: 'Balkong/uteplats',
  storage: 'Förråd',
  
  // Tjänster
  packingHelp: 'Önskar packhjälp',
  cleaningHelp: 'Önskar flyttstädning',
  
  // Fastighetsegenskaper
  hasElevator: 'Har hiss',
  hasLoadingDock: 'Har lastkaj',
  cleanEntireProperty: 'Städa hela bostaden',
  totalArea: 'Total yta',
  
  // Flyttspecifika fält
  moveType: 'Typ av flytt',
  moveDate: 'Flyttdatum',
  fromAddress: 'Från adress',
  toAddress: 'Till adress',
  
  // Anteckningar
  notes: 'Anteckningar',
};

// Översättningar för enum-värden
const translations: Record<string, string> = {
  'private': 'Privat',
  'company': 'Företag',
  'apartment': 'Lägenhet',
  'house': 'Villa',
  'townhouse': 'Radhus',
  'cottage': 'Fritidshus',
  'storage': 'Förråd',
  'office': 'Kontor',
  'local': 'Lokalflytt',
  'long-distance': 'Långdistansflytt',
  'international': 'Utlandsflytt',
  'ground': 'Bottenvåning',
  'short-term': 'Korttid (kortare än 6 månader)',
  'long-term': 'Långtid',
  'unsure': 'Osäker',
  'recycling': 'Återvinningscentral',
  'family': 'Familj eller efterlevande',
  'yes': 'Ja',
  'no': 'Nej',
  'true': 'Ja',
  'false': 'Nej',
};

// Helper function to format values
const formatValue = (value: any): string => {
  if (value === undefined || value === null) return '-';
  
  if (value instanceof Date) {
    return format(value, 'PPP', { locale: sv });
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Ja' : 'Nej';
  }
  
  if (typeof value === 'string') {
    return translations[value] || value;
  }
  
  if (Array.isArray(value)) {
    return value.map(v => translations[v] || v).join(', ');
  }
  
  return String(value);
};

// Main formatting function
export function formatFormData(formData: any) {
  if (!formData) return [];

  return Object.entries(formData)
    .filter(([key]) => key.startsWith('step'))
    .map(([key, stepData]) => {
      const stepNumber = key.replace('step', '');
      
      const fields = Object.entries(stepData as Record<string, any>)
        .flatMap(([fieldKey, fieldValue]) => {
          // Handle nested objects
          if (fieldValue && typeof fieldValue === 'object' && !Array.isArray(fieldValue) && !(fieldValue instanceof Date)) {
            return Object.entries(fieldValue).map(([subKey, subValue]) => ({
              label: labelMap[subKey] || subKey,
              value: formatValue(subValue),
            }));
          }
          
          return [{
            label: labelMap[fieldKey] || fieldKey,
            value: formatValue(fieldValue),
          }];
        })
        .filter(field => field.value !== '-' && field.value !== '');

      return {
        title: `Steg ${stepNumber}`,
        fields,
      };
    })
    .filter(section => section.fields.length > 0);
}