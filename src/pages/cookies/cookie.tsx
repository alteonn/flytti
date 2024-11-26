import { motion } from 'framer-motion';
import { MetaTags } from '@/components/seo/meta-tags';
import { Cookie, Lock, FileText } from 'lucide-react';

export function CookiePage() {
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <MetaTags 
        title="Cookie Policy | Flytti.se"
        description="Läs om hur vi använder cookies för att förbättra din upplevelse på Flytti.se. Information om vilka cookies vi använder och hur du kan hantera dem."
        canonicalUrl="https://flytti.se/cookies"
      />
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Cookie Policy
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
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Transparent användning</h3>
            <p className="text-text-light">Full insyn i hur vi använder cookies på vår webbplats.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Din integritet</h3>
            <p className="text-text-light">Du har full kontroll över vilka cookies du accepterar.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tydlig information</h3>
            <p className="text-text-light">Enkel och klar beskrivning av våra cookies.</p>
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
              <h2 className="text-2xl font-serif mb-6">Vad är cookies?</h2>
              <p className="text-lg leading-relaxed mb-8">
                Cookies är små textfiler som sparas på din enhet när du besöker vår webbplats. 
                De är utformade för att förbättra din upplevelse genom att komma ihåg dina 
                preferenser och anpassa innehållet efter dina behov.
              </p>

              <h2 className="text-2xl font-serif mb-6">Våra cookies och hur vi använder dem</h2>
              
              <div className="space-y-8">
                <div className="bg-primary-light/10 p-6 rounded-xl">
                  <h3 className="text-xl font-serif mb-4 text-primary">1. Nödvändiga cookies</h3>
                  <p className="text-text-light">
                    Dessa cookies är essentiella för webbplatsens grundläggande funktioner. 
                    De möjliggör säker inloggning, smidig navigering och tillgång till viktiga 
                    tjänster. Utan dessa cookies kan vi inte garantera en fullgod användarupplevelse.
                  </p>
                </div>

                <div className="bg-primary-light/10 p-6 rounded-xl">
                  <h3 className="text-xl font-serif mb-4 text-primary">2. Analys-cookies</h3>
                  <p className="text-text-light">
                    För att kontinuerligt förbättra vår tjänst använder vi analys-cookies. 
                    Dessa hjälper oss förstå hur besökare använder webbplatsen genom att samla 
                    in anonym statistik. Din integritet är viktig för oss – all data behandlas 
                    konfidentiellt.
                  </p>
                </div>

                <div className="bg-primary-light/10 p-6 rounded-xl">
                  <h3 className="text-xl font-serif mb-4 text-primary">3. Funktionella cookies</h3>
                  <p className="text-text-light">
                    För en mer personlig upplevelse använder vi funktionella cookies. De kommer 
                    ihåg dina preferenser och anpassar innehållet efter dina behov. Dessa kan 
                    komma från oss eller våra noggrant utvalda samarbetspartners.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-serif mt-12 mb-6">Lagringstid för cookies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
                  <h4 className="font-semibold mb-3">Sessionscookies</h4>
                  <p className="text-text-light">
                    Temporära cookies som raderas automatiskt när du stänger webbläsaren. 
                    De hjälper oss att ge dig en smidig upplevelse under ditt besök.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
                  <h4 className="font-semibold mb-3">Permanenta cookies</h4>
                  <p className="text-text-light">
                    Cookies som sparas på din enhet under en bestämd tidsperiod eller tills 
                    du aktivt tar bort dem. De hjälper oss komma ihåg dina preferenser mellan besök.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-serif mb-6">Hantera dina cookie-inställningar</h2>
              <p className="text-lg leading-relaxed mb-8">
                Du har full kontroll över vilka cookies du vill acceptera. Klicka på "Hantera cookies" 
                i sidfoten för att ändra dina inställningar. Du kan också hantera cookies direkt i 
                din webbläsares inställningar.
              </p>

              <h2 className="text-2xl font-serif mb-6">Tredjepartscookies</h2>
              <div className="bg-gray-50 p-6 rounded-xl mb-12">
                <p className="mb-4">
                  Vi samarbetar med utvalda partners för att ge dig bästa möjliga service. 
                  Dessa tredjepartstjänster kan använda cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-text-light">
                  <li>
                    <strong>Google Analytics:</strong> För anonym användarstatistik och 
                    webbplatsoptimering
                  </li>
                  <li>
                    <strong>Reco.se:</strong> För att visa verifierade omdömen och recensioner
                  </li>
                </ul>
              </div>

              <div className="mt-12 p-6 bg-primary-light/20 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Frågor om vår cookie-policy?</h3>
                <p className="mb-0">
                  Vi finns här för att hjälpa! Kontakta oss på{' '}
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
        </motion.div>
      </div>
    </div>
  );
}