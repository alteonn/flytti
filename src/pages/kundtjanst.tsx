import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { ServiceGrid } from '@/components/home/service-grid';
import { useToast } from '@/hooks/use-toast';
import { useZapier } from '@/hooks/use-zapier';
import { ZAPIER_WEBHOOKS } from '@/lib/zapier-webhooks';
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
    icon: MapPin,
    title: 'Besöksadress',
    description: 'Vårt huvudkontor',
    action: 'Stjärntorget 2, Solna',
    href: 'https://maps.google.com',
  },
];

export function CustomerServicePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();
  const { submit, isSubmitting } = useZapier({ webhookUrl: ZAPIER_WEBHOOKS.CONTACT });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      const { success, error } = await submit(formData);

      if (success) {
        toast({
          title: "Tack för ditt meddelande!",
          description: "Vi återkommer så snart som möjligt med svar.",
        });

        // Reset form
        setFormData(initialFormData);
      } else {
        throw new Error(error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Ett fel uppstod",
        description: error instanceof Error ? error.message : "Kunde inte skicka meddelandet. Försök igen senare.",
        variant: "destructive",
      });
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

      {/* Services Grid */}
      <ServiceGrid title="Få offert för" className="bg-white" isFullWidth />
    </div>
  );
}