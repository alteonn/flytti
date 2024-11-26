export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          city: string
          description: string
          phone: string
          email: string
          website: string
          services: string[]
          is_verified: boolean
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          city: string
          description: string
          phone: string
          email: string
          website: string
          services: string[]
          is_verified?: boolean
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          city?: string
          description?: string
          phone?: string
          email?: string
          website?: string
          services?: string[]
          is_verified?: boolean
          notes?: string | null
        }
      }
      lead_company_assignments: {
        Row: {
          id: string
          lead_id: string
          company_id: string
          assigned_at: string
          assigned_by: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          lead_id: string
          company_id: string
          assigned_at?: string
          assigned_by: string
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          lead_id?: string
          company_id?: string
          assigned_at?: string
          assigned_by?: string
          status?: string
          notes?: string | null
        }
      }
      leads: {
        Row: {
          id: string
          created_at: string
          type: string
          customer_name: string
          customer_email: string
          customer_phone: string
          status: string
          notes: string | null
          form_data: Json
        }
        Insert: {
          id?: string
          created_at?: string
          type: string
          customer_name: string
          customer_email: string
          customer_phone: string
          status?: string
          notes?: string | null
          form_data?: Json
        }
        Update: {
          id?: string
          created_at?: string
          type?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          status?: string
          notes?: string | null
          form_data?: Json
        }
      }
      articles: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          content: string
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          content: string
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          content?: string
          category?: string
        }
      }
    }
    Views: {
      active_leads: {
        Row: {
          id: string
          created_at: string
          type: string
          customer_name: string
          customer_email: string
          customer_phone: string
          status: string
          notes: string | null
          form_data: Json
          assigned_companies: Json | null
        }
      }
    }
    Functions: {
      get_lead_assigned_companies: {
        Args: { p_lead_id: string }
        Returns: {
          id: string
          name: string
          city: string
          assigned_at: string
          status: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}