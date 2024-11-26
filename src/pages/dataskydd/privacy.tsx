import { motion } from 'framer-motion';
import { MetaTags } from '@/components/seo/meta-tags';
import { Shield, Lock, FileText, Mail } from 'lucide-react';

export function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <MetaTags 
        title="Dataskyddspolicy | Flytti.se"
        description="Läs om hur vi hanterar och skyddar dina personuppgifter på Flytti.se. Vi värnar om din integritet och följer GDPR."
        canonicalUrl="https://flytti.se/dataskydd"
      />
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Dataskyddspolicy
          </h1>
          <p className="text-lg text-text-light">
            Senast uppdaterad: {currentDate}
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">GDPR-kompatibel</h3>
            <p className="text-text-light">Vi följer EU:s dataskyddsförordning för att skydda din integritet.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Säker hantering</h3>
            <p className="text-text-light">Din information skyddas med moderna säkerhetslösningar.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Transparens</h3>
            <p className="text-text-light">Full insyn i hur vi hanterar dina personuppgifter.</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-serif mb-6">Personuppgiftshantering</h2>
              <p>Här kan du läsa mer om hur företaget Redokollen AB, som äger och driver Flytti.se, behandlar dina personuppgifter.</p>
              
              <h3 className="text-xl font-serif mb-4 mt-8">Vilka personuppgifter behandlas?</h3>
              <p>Personuppgifterna vi efterfrågar är endast det minimum som flyttfirmorna behöver för att kunna ge dig ett relevant och konkret erbjudande. Uppgifterna används inte till något annat än att ge dig erbjudanden, och till det administrativa arbete som är knutet till detta.</p>

              <h3 className="text-xl font-serif mb-4 mt-8">Cookies och spårning</h3>
              <p>Vi använder cookies för att förbättra din upplevelse på vår webbplats. Du kan när som helst ändra dina cookie-inställningar eller återkalla ditt samtycke.</p>

              <h3 className="text-xl font-serif mb-4 mt-8">E-postkommunikation</h3>
              <p>Du kommer endast att få ett bekräftelsemail från oss efter att du skickat in din förfrågan. Detta mail innehåller information om vilka flyttfirmor som kommer att kontakta dig.</p>

              <h3 className="text-xl font-serif mb-4 mt-8">Dina rättigheter</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rätt till insyn i vilka uppgifter vi har om dig</li>
                <li>Rätt att få felaktiga uppgifter rättade</li>
                <li>Rätt att bli raderad ("rätten att bli bortglömd")</li>
                <li>Rätt att begränsa behandlingen av dina uppgifter</li>
                <li>Rätt att få ut dina uppgifter i ett maskinläsbart format</li>
              </ul>

              <h3 className="text-xl font-serif mb-4 mt-8">Säkerhet</h3>
              <p>Vi använder moderna säkerhetslösningar för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller manipulation.</p>

              <h3 className="text-xl font-serif mb-4 mt-8">Lagringstid</h3>
              <p>Vi sparar dina uppgifter så länge det är relevant för att kunna leverera tjänsten, men maximalt i fem år. Normalt raderas alla uppgifter inom sex månader.</p>

              {/* Contact Section */}
              <div className="mt-12 p-8 bg-primary-light/20 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Kontakta oss</h3>
                    <p className="mb-4">Om du har frågor om vår dataskyddspolicy eller vill utöva dina rättigheter, kontakta oss på:</p>
                    <div className="space-y-2">
                      <p className="mb-1"><strong>Redokollen AB</strong></p>
                      <p className="mb-1">Stjärntorget 2</p>
                      <p className="mb-1">169 79 Solna</p>
                      <p className="mb-1">Org.nr.: 559336-7526</p>
                      <p>
                        <a 
                          href="mailto:info@flytti.se" 
                          className="text-primary hover:text-primary-dark underline"
                        >
                          info@flytti.se
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}