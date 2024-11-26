import { cities } from './cities';

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
}

export const pageSEO: Record<string, SEOContent> = {
  home: {
    title: 'Flytti.se - Jämför flyttfirmor och få offerter | Hitta bästa flytthjälpen',
    description: 'Hitta och jämför flyttfirmor i hela Sverige. Få kostnadsfria offerter från kvalitetssäkrade flyttföretag. Spara tid och pengar på din flytt.',
    keywords: 'flyttfirma, flytthjälp, flyttfirmor, flytt, flyttservice, flyttstädning, magasinering, dödsbo',
  },
  flytthjalp: {
    title: 'Flytthjälp - Jämför priser på flyttfirmor | Flytti.se',
    description: 'Få hjälp med din flytt från professionella flyttfirmor. Jämför priser och få upp till 3 kostnadsfria offerter från kvalitetssäkrade företag.',
    keywords: 'flytthjälp, flyttfirma, flyttservice, packning, transport, flyttlådor, möbeltransport',
  },
  kontorsflytt: {
    title: 'Kontorsflytt - Specialister på företagsflytt | Flytti.se',
    description: 'Planerar ni kontorsflytt? Få offerter från flyttfirmor specialiserade på företagsflytt. Minimera avbrottstiden med professionell hjälp.',
    keywords: 'kontorsflytt, företagsflytt, kontorsflyttning, företagsflyttning, företagsflyttfirma',
  },
  utlandsflytt: {
    title: 'Utlandsflytt - Experter på internationella flyttar | Flytti.se',
    description: 'Ska du flytta utomlands? Jämför priser från flyttfirmor med erfarenhet av internationella flyttar. Få trygg och säker hjälp med din utlandsflytt.',
    keywords: 'utlandsflytt, internationell flytt, flytta utomlands, internationell flyttfirma',
  },
  flyttstadning: {
    title: 'Flyttstädning - Professionell städhjälp med garanti | Flytti.se',
    description: 'Boka professionell flyttstädning med garanti. Jämför priser och få offerter från kvalitetssäkrade städfirmor i hela Sverige.',
    keywords: 'flyttstädning, flyttstäd, städfirma, städhjälp, slutstädning, städgaranti',
  },
  magasinering: {
    title: 'Magasinering - Säker förvaring av bohag | Flytti.se',
    description: 'Hitta säker och prisvärd magasinering nära dig. Jämför priser och få offerter på förvaring från pålitliga företag.',
    keywords: 'magasinering, förvaring, förråd, lagerlokal, möbelförvaring, bohag',
  },
  dodsbo: {
    title: 'Dödsbo - Professionell hantering och bortforsling | Flytti.se',
    description: 'Få hjälp med dödsbo från erfarna företag. Jämför priser på värdering, tömning och bortforsling av dödsbo.',
    keywords: 'dödsbo, bouppteckning, dödsbohantering, dödsboförsäljning, bohagsflytt',
  },
  sokforetag: {
    title: 'Sök flyttfirmor - Hitta företag nära dig | Flytti.se',
    description: 'Hitta kvalitetssäkrade flyttfirmor i din närhet. Jämför företag, läs omdömen och få offerter direkt.',
    keywords: 'flyttfirmor, flyttföretag, flytthjälp, jämför flyttfirmor, hitta flyttfirma',
  },
  anslutforetag: {
    title: 'Anslut ditt företag - Bli partner med Flytti.se',
    description: 'Vill du få fler kunder till din flyttfirma? Bli partner med Flytti.se och få kvalificerade leads direkt till din verksamhet.',
    keywords: 'flyttfirma partner, anslut företag, flyttföretag samarbete, bli partner',
  },
  kundtjanst: {
    title: 'Kundtjänst - Kontakta oss | Flytti.se',
    description: 'Har du frågor om våra tjänster? Kontakta vår kundtjänst för snabb och personlig hjälp med dina funderingar.',
    keywords: 'kundtjänst, kundservice, kontakt, support, hjälp',
  },
  artiklar: {
    title: 'Flyttguider & Tips - Artiklar om flytt | Flytti.se',
    description: 'Praktiska guider och tips för en smidig flytt. Läs våra expertartiklar om allt från packning till flyttstädning.',
    keywords: 'flyttguide, flyttips, packningstips, flyttråd, flytthjälp guide',
  },
};

export function generateCitySEO(cityName: string) {
  return {
    title: `Flyttfirma ${cityName} - Jämför priser på flytthjälp | Flytti.se`,
    description: `Hitta bästa flyttfirman i ${cityName}. Jämför priser och få offerter från kvalitetssäkrade flyttföretag. ✓ Gratis ✓ Tryggt ✓ Enkelt`,
    keywords: `flyttfirma ${cityName}, flytthjälp ${cityName}, flyttfirmor ${cityName}, flytta ${cityName}, flyttservice ${cityName}`,
  };
}

// Generera dynamiska sitemaps för städer
export function generateCitySitemaps() {
  const cityUrls = Object.values(cities).flatMap(region => 
    region.cities.map(city => ({
      loc: `https://flytti.se/${city.toLowerCase().replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-')}`,
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: new Date().toISOString().split('T')[0]
    }))
  );

  return cityUrls;
}