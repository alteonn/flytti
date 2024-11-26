export const SERVICES = [
  'Flytthjälp',
  'Kontorsflytt',
  'Utlandsflytt',
  'Flyttstädning',
  'Magasinering',
  'Dödsbo',
  'Städning',
] as const;

export const ARTICLE_CATEGORIES = [
  'Flytthjälp',
  'Kontorsflytt',
  'Utlandsflytt',
  'Flyttstädning',
  'Magasinering',
  'Dödsbo',
  'Annat',
] as const;

export const CERTIFICATIONS = [
  'ISO 14001',
  'ISO 9001',
] as const;

export interface Company {
  id: string;
  name: string;
  city: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  services: Service[];
  certifications: Certification[];
  is_verified: boolean;
  notes: string;
  leads: Lead[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  slug: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  type: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'new' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
  notes: string;
  assigned_companies?: Array<{
    id: string;
    name: string;
    city: string;
    status: 'pending' | 'accepted' | 'declined' | 'completed';
    assigned_at?: string;
  }>;
  form_data: any;
}

export interface AdminUser {
  username: string;
  password: string;
}

export type Service = typeof SERVICES[number];
export type Certification = typeof CERTIFICATIONS[number];
export type ArticleCategory = typeof ARTICLE_CATEGORIES[number];