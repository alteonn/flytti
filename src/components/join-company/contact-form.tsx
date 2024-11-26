import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email';

interface FormData {
  companyName: string;
  orgNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  companyName: '',
  orgNumber: '',
  contactPerson: '',
  phone: '',
  email: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.companyName || !formData.orgNumber || !formData.contactPerson || !formData.phone || !formData.email) {
        throw new Error('Vänligen fyll i alla obligatoriska fält');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Vänligen ange en giltig e-postadress');
      }

      // Validate phone format
      const phoneRegex = /^[0-9+() -]{8,}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Vänligen ange ett giltigt telefonnummer');
      }

      // Send confirmation email to company
      await sendEmail({
        to: formData.email,
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
                <p>Hej ${formData.contactPerson},</p>
                <p>Tack för att du är intresserad av att bli partner med Flytti.se. Vi har mottagit din förfrågan och kommer att kontakta dig inom kort för att diskutera ett eventuellt samarbete.</p>
                <p>Vi har registrerat följande uppgifter:</p>
                <ul>
                  <li>Företag: ${formData.companyName}</li>
                  <li>Organisationsnummer: ${formData.orgNumber}</li>
                  <li>Kontaktperson: ${formData.contactPerson}</li>
                  <li>Telefon: ${formData.phone}</li>
                  <li>E-post: ${formData.email}</li>
                </ul>
                <p>Om någon uppgift är felaktig, vänligen kontakta oss på <a href="mailto:info@flytti.se">info@flytti.se</a></p>
                <p>Med vänliga hälsningar,<br>Teamet på Flytti.se</p>
              </div>
              <div class="footer">
                Detta är ett automatiskt meddelande. Du behöver inte svara på detta mail.
              </div>
            </body>
          </html>
        `
      });

      // Send notification email to admin
      await sendEmail({
        to: 'info@flytti.se',
        subject: 'Ny företagsförfrågan via Flytti.se',
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
                <h2>Ny företagsförfrågan</h2>
              </div>
              <div class="content">
                <h3>Företagsinformation</h3>
                <ul>
                  <li><strong>Företag:</strong> ${formData.companyName}</li>
                  <li><strong>Organisationsnummer:</strong> ${formData.orgNumber}</li>
                  <li><strong>Kontaktperson:</strong> ${formData.contactPerson}</li>
                  <li><strong>Telefon:</strong> ${formData.phone}</li>
                  <li><strong>E-post:</strong> ${formData.email}</li>
                </ul>
                ${formData.message ? `
                  <h3>Meddelande</h3>
                  <p>${formData.message}</p>
                ` : ''}
              </div>
              <div class="footer">
                Detta är ett automatiskt meddelande från Flytti.se
              </div>
            </body>
          </html>
        `
      });

      // Show success message
      toast({
        title: "Tack för din förfrågan!",
        description: "Vi har mottagit din förfrågan och återkommer inom kort.",
      });

      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Ett fel uppstod",
        description: error instanceof Error ? error.message : "Kunde inte skicka förfrågan. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-gradient-to-b from-primary-light/20 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-primary/10">
            <h2 className="text-3xl font-serif mb-8 text-center">
              Bli partner med Flytti.se
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Företagsnamn *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgNumber">Organisationsnummer *</Label>
                  <Input
                    id="orgNumber"
                    value={formData.orgNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, orgNumber: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Kontaktperson *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">Meddelande</Label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Berätta gärna mer om er verksamhet och vilka tjänster ni erbjuder..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      Skicka förfrågan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}