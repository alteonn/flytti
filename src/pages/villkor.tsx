import { motion } from 'framer-motion';
import { MetaTags } from '@/components/seo/meta-tags';
import { Shield, Scale, FileText } from 'lucide-react';

export function TermsPage() {
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <MetaTags 
        title="Användarvillkor | Flytti.se"
        description="Läs våra användarvillkor för att förstå dina rättigheter och skyldigheter när du använder Flytti.se:s tjänster."
        canonicalUrl="https://flytti.se/villkor"
      />
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Användarvillkor
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
            <h3 className="text-lg font-semibold mb-2">Trygg användning</h3>
            <p className="text-text-light">Vi värnar om din integritet och säkerhet när du använder våra tjänster.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Rättvisa villkor</h3>
            <p className="text-text-light">Tydliga och transparenta villkor för alla parter.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tydliga riktlinjer</h3>
            <p className="text-text-light">Klara regler för användning av våra tjänster.</p>
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
              <h2>1. Acceptans av villkor</h2>
              <p>1.1 Genom att nyttja Flytti.se accepterar du de aktuella villkoren för användande.</p>

              <h2>2. Så fungerar Flytti.se</h2>
              <p>2.1 Flytti.se är en kostnadsfri tjänst som ger dess användare kontakt med utvalda flyttfirmor.</p>
              <p>2.2 Genom att fylla i formuläret på Flytti.se, ger du företaget information om dina behov. Därefter blir du kontaktad av upp till tre flyttfirmor och mottar deras erbjudanden.</p>
              <p>2.3 Strax efter att du har skickat in din förfrågan via formuläret, får du en bekräftelse via e-post från Flytti.se. Denna innehåller bland annat namn på de utvalda leverantörer som kommer att kontakta dig. Om inget annat har avtalats blir du sedan kontaktad via telefon, e-post eller sms. Kontakten sker direkt mellan dig och flyttföretaget.</p>
              <p>2.4 Om du vill att din förfrågan ska raderas från tjänsten kontaktar du info@flytti.se.</p>
              <p>2.5 I det fall det inte är möjligt att få erbjudanden från tre leverantörer, kommer det att framgå tydligt i bekräftelsen du får. Är det till exempel endast en leverantör som kan tillgodose dina behov, kommer detta att preciseras.</p>

              <h2>3. Användning av Flytti.se</h2>
              <p>3.1 Det är inte tillåtet att grundlöst utge sig för att ha någon anknytning till Flytti.se eller våra samarbetspartners.</p>
              <p>3.2 Det är inte tillåtet att tillgodogöra sig, eller försöka tillgodogöra sig, icke offentliga delar av Flytti.se:s hemsida.</p>
              <p>3.3 Det är inte tillåtet att använda Flytti.se för att sprida skadlig kod.</p>
              <p>3.4 Det är inte tillåtet att negativt påverka andra användares möjlighet att nyttja Flytti.se.</p>
              <p>3.5 Det är inte tillåtet att utge sig för att vara en annan person.</p>
              <p>3.6 Vid misstanke om användning som strider mot villkoren kan Flytti.se spärra tjänsten för aktuell användare.</p>

              <h2>4. Ansvar och förhållande till leverantörer</h2>
              <p>4.1 Flytti.se är endast involverad i upprättandet av kontakt mellan användaren och leverantören.</p>
              <p>4.2 De anslutna flyttfirmorna verkar oberoende av Flytti.se.</p>
              <p>4.3 Användandet av Flytti.se sker på eget ansvar.</p>
              <p>4.4 Flytti.se samarbetar med utvalda, oberoende flyttfirmor.</p>
              <p>4.5 Flytti.se ansvarar inte för force majeure.</p>
              <p>4.6 Flytti.se har inte något ansvar för skatte- eller avgiftsmässiga effekter.</p>

              <h2>5. Immateriella rättigheter</h2>
              <p>5.1 Samtliga immateriella rättigheter relaterade till Flytti.se omfattar namn, varumärken och upphovsrätt.</p>
              <p>5.2 Användandet av Flytti.se ger inte tillstånd att använda tredje parts immateriella rättigheter.</p>

              <h2>6. Kommunikation</h2>
              <p>6.1 All kommunikation med Flytti.se sker elektroniskt.</p>
              <p>6.2 Vid nyttjande av Flytti.se blir användaren inte uppsatt på något nyhetsbrev.</p>
              <p>6.3 Vid felaktig kontaktinformation har Flytti.se rätt att korrigera denna baserat på offentlig information.</p>

              <h2>7. Integritetsskydd och personuppgifter</h2>
              <p>7.1 Användande av Flytti.se är underställt GDPR.</p>
              <p>7.2 Information som uppges används endast för att generera relevanta erbjudanden.</p>

              <h2>8. Förändringar</h2>
              <p>8.1 Vi förbehåller oss rätten att när som helst göra ändringar av användarvillkoren.</p>
              <p>8.2 Fortsatt användning efter ändringar utgör acceptans av de nya villkoren.</p>

              <h2>9. Lagföring och tvister</h2>
              <p>9.1 Användandet av Flytti.se är underställt svensk lag.</p>
              <p>9.2 Tvister ska i första hand lösas genom direkt överenskommelse mellan parterna.</p>

              <div className="mt-12 p-6 bg-primary-light/20 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Har du frågor om våra villkor?</h3>
                <p className="mb-0">
                  Kontakta oss på{' '}
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
}</content>