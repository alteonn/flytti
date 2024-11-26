import { supabase } from './supabase';
import { formatFormData } from './format-form-data';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

interface SendEmailResponse {
  success: boolean;
  error?: Error | null;
  data?: any;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<SendEmailResponse> {
  try {
    console.log('Attempting to send email:', { to, subject });

    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (error) {
      console.error('Supabase Function Error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', {
      error,
      message: error.message,
      stack: error.stack
    });
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Failed to send email')
    };
  }
}