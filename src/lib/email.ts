import { supabase } from './supabase';
import { formatFormData } from './format-form-data';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
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

export function generateAdminNotification(formData: any, type: string) {
  const formattedData = formatFormData(formData);
  const formattedContent = formattedData.map(section => `
    <h3 style="margin-top: 20px; color: #333;">${section.title}</h3>
    ${section.fields.map(field => `
      <p style="margin: 5px 0;">
        <strong>${field.label}:</strong> ${field.value}
      </p>
    `).join('')}
  `).join('');

  return {
    subject: `Ny förfrågan: ${type}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #e5683d;
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .content {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Ny förfrågan via Flytti.se</h2>
          </div>
          <div class="content">
            <p>En ny förfrågan har kommit in för ${type}.</p>
            ${formattedContent}
          </div>
          <div class="footer">
            Detta är ett automatiskt meddelande från Flytti.se
          </div>
        </body>
      </html>
    `
  };
}

export function generateCustomerConfirmation(customerName: string, type: string) {
  return {
    subject: 'Tack för din förfrågan | Flytti.se',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #e5683d;
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .content {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Tack för din förfrågan!</h2>
          </div>
          <div class="content">
            <p>Hej ${customerName},</p>
            <p>Vi har tagit emot din förfrågan om ${type.toLowerCase()}.</p>
            <p>Inom kort kommer du att bli kontaktad av upp till tre kvalitetssäkrade företag som kan hjälpa dig.</p>
            <p>Om du har några frågor under tiden är du välkommen att kontakta oss på <a href="mailto:info@flytti.se" style="color: #e5683d;">info@flytti.se</a></p>
            <p style="margin-top: 20px;">Med vänliga hälsningar,<br>Teamet på Flytti.se</p>
          </div>
          <div class="footer">
            Detta är ett automatiskt meddelande. Du behöver inte svara på detta mail.
          </div>
        </body>
      </html>
    `
  };
}