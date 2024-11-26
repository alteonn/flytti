import { supabase } from './supabase';
import { sendEmail, generateAdminNotification, generateCustomerConfirmation } from './email';
import type { Service } from '@/types/admin';

interface CreateLeadParams {
  type: Service;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  formData: any;
}

interface CreateLeadResponse {
  success: boolean;
  error?: Error | null;
  leadId?: string;
}

// System user ID for automated actions
const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function createLead({
  type,
  customerName,
  customerEmail,
  customerPhone,
  formData
}: CreateLeadParams): Promise<CreateLeadResponse> {
  try {
    // Input validation
    if (!type || !customerName || !customerEmail || !customerPhone) {
      throw new Error('Alla obligatoriska fält måste fyllas i');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      throw new Error('Ogiltig e-postadress');
    }

    // Phone validation
    const phoneRegex = /^[0-9+() -]{8,}$/;
    if (!phoneRegex.test(customerPhone)) {
      throw new Error('Ogiltigt telefonnummer');
    }

    // Prepare lead data
    const leadData = {
      type,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      status: 'new',
      form_data: formData,
      notes: formData.step5?.notes || formData.step4?.notes || formData.step3?.notes || '',
      created_at: new Date().toISOString()
    };

    // Create lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (leadError) {
      console.error('Lead creation error:', leadError);
      throw new Error(leadError.message);
    }

    if (!lead) {
      throw new Error('Ingen data returnerades vid skapande av lead');
    }

    // Create activity log
    const { error: activityError } = await supabase
      .from('lead_activities')
      .insert([
        {
          lead_id: lead.id,
          created_by: SYSTEM_USER_ID,
          activity_type: 'created',
          description: 'Lead skapad via webbformulär',
          metadata: { 
            form_type: type,
            submission_timestamp: new Date().toISOString()
          }
        }
      ]);

    if (activityError) {
      console.error('Activity log error:', activityError);
    }

    // Send email notifications
    try {
      // Send admin notification
      const adminEmail = generateAdminNotification(formData, type);
      await sendEmail({
        to: 'info@flytti.se',
        subject: adminEmail.subject,
        html: adminEmail.html
      });

      // Send customer confirmation
      const customerEmail = generateCustomerConfirmation(customerName, type);
      await sendEmail({
        to: customerEmail,
        subject: customerEmail.subject,
        html: customerEmail.html
      });
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Don't throw here as the lead was created successfully
    }

    return { 
      success: true, 
      leadId: lead.id 
    };
  } catch (error) {
    console.error('Lead creation failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Ett oväntat fel uppstod') 
    };
  }
}