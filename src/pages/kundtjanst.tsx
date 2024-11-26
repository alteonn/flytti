import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ServiceGrid } from '@/components/home/service-grid';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email';
import { MetaTags } from '@/components/seo/meta-tags';
import { pageSEO } from '@/lib/seo-content';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Ring oss',
    description: 'Vi finns tillgängliga vardagar 09:00-17:00',
    action: '020-123 456',
    href: 'tel:020123456',
  },
  {
    icon: Mail,
    title: 'Maila oss',
    description: 'Vi svarar normalt inom 24 timmar',
    action: 'info@flytti.se',
    href: 'mailto:info@flytti.se',
  },
  {
    icon: Building2,
    title: 'Företagspartner',
    description: 'Vill du ansluta ditt företag?',
    action: 'Bli partner',
    href: '/anslut-foretag',
    isLink: true,
  },
];

const faqItems = [
  {
    question: 'Hur fungerar er tjänst?',
    answer: 'Vi hjälper dig att hitta och jämföra flyttfirmor i hela Sverige. Du fyller i ett formulär med dina behov, och vi matchar dig med upp till tre lämpliga flyttfirmor som kontaktar dig med offerter.',
  },
  {
    question: 'Kostar det något att använda tjänsten?',
    answer: 'Nej, det är helt kostnadsfritt att använda vår tjänst för att få offerter. Du betalar endast om du väljer att anlita någon av flyttfirmorna.',
  },
  {
    question: 'Hur väljer ni ut flyttfirmorna?',
    answer: 'Vi samarbetar endast med kvalitetssäkrade och seriösa flyttfirmor. Alla företag granskas noggrant och måste uppfylla våra kvalitetskrav gällande försäkringar, tillstånd och kundnöjdhet.',
  },
];

export function CustomerServicePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Vänligen fyll i alla fält');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Vänligen ange en giltig e-postadress');
      }

      // Send confirmation email to customer
      await sendEmail({
        to: formData.email,
        subject: 'Tack för ditt meddelande | Flytti.se',
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
                <h2>Tack för ditt meddelande!</h2>
              </div>
              <div class="content">
                <p>Hej ${formData.name},</p>
                <p>Vi har mottagit ditt meddelande och återkommer så snart som möjligt med svar.</p>
                <p>Ditt ärende:</p>
                <ul>
                  <li><strong>Ämne:</strong> ${formData.subject}</li>
                  <li><strong>Meddelande:</strong> ${formData.message}</li>
                </ul>
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
        subject: 'Nytt meddelande via kundtjänstformuläret',
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
              </style>
            </head>
            <body>
              <div class="header">
                <h2>Nytt kundtjänstärende</h2>
              </div>
              <div class="content">
                <h3>Kontaktinformation</h3>
                <ul>
                  <li><strong>Namn:</strong> ${formData.name}</li>
                  <li><strong>E-post:</strong> ${formData.email}</li>
                </ul>
                <h3>Meddelande</h3>
                <p><strong>Ämne:</strong> ${formData.subject}</p>
                <p><strong>Meddelande:</strong></p>
                <p>${formData.message}</p>
              </div>
            </body>
          </html>
        `
      });

      // Show success message
      toast({
        title: "Tack för ditt meddelande!",
        description: "Vi har mottagit ditt meddelande och återkommer så snart som möjligt.",
      });

      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Ett fel uppstod",
        description: error instanceof Error ? error.message : "Kunde inte skicka meddelandet. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <MetaTags 
        title={pageSEO.kundtjanst.title}
        description={pageSEO.kundtjanst.description}
        canonicalUrl="https://flytti.se/kundtjanst"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-light/30 to-bg-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Hur kan vi{' '}
              <span className="text-primary">hjälpa dig?</span>
            </h1>
            <p className="text-lg md:text-xl text-text-light">
              Vi finns här för att hjälpa dig med alla frågor kring flyttjänster
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <a 
                  href={method.href}
                  className="block relative bg-white rounded-xl p-6 shadow-lg border border-primary/10"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-text-light mb-4">{method.description}</p>
                  <span className="font-medium text-primary">{method.action}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gradient-to-b from-primary-light/20 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-primary/10">
              <h2 className="text-3xl font-serif mb-8 text-center">
                Skicka ett meddelande
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Namn</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="subject">Ämne</Label>
                    <Input 
                      id="subject" 
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Meddelande</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Skriv ditt meddelande här..."
                      className="min-h-[150px]"
                      required
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
                      'Skicka meddelande'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-serif mb-6">
              Vanliga frågor
            </h2>
            <p className="text-lg text-text-light">
              Här hittar du svar på de vanligaste frågorna om våra tjänster
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-primary/10"
              >
                <h3 className="text-xl font-serif mb-3">{item.question}</h3>
                <p className="text-text-light">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}