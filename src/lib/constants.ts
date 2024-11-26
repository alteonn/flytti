import { FileText, Building2, Globe, Sparkles, Box, Home, MapPin, HelpCircle, Phone } from 'lucide-react';

export const SITE_CONFIG = {
  name: 'Flytti.se',
  description: 'Jämför flyttfirmor och få offerter',
  url: 'https://flytti.se',
  links: {
    twitter: 'https://twitter.com/flyttise',
    github: 'https://github.com/flyttise',
  },
};

// Navigation items grouped by category
const NAVIGATION_ITEMS = [
  // Hem
  { title: 'Hem', href: '/', group: 'home', icon: Home },

  // Flyttjänster
  { title: 'Flytthjälp', href: '/flytthjalp', group: 'services', icon: Box },
  { title: 'Kontorsflytt', href: '/kontorsflytt', group: 'services', icon: Building2 },
  { title: 'Utlandsflytt', href: '/utlandsflytt', group: 'services', icon: Globe },
  { title: 'Flyttstädning', href: '/flyttstadning', group: 'services', icon: Sparkles },
  { title: 'Magasinering', href: '/magasinering', group: 'services', icon: Box },
  { title: 'Dödsbo', href: '/dodsbo', group: 'services', icon: Home },

  // Mer
  { title: 'Sök företag', href: '/sok-foretag', group: 'more', icon: Building2 },
  { title: 'Sök stad', href: '/stader', group: 'more', icon: MapPin },
  { title: 'Anslut företag', href: '/anslut-foretag', group: 'more', icon: Building2 },
  { title: 'Artiklar', href: '/artiklar', group: 'more', icon: FileText },
  { title: 'Kundtjänst', href: '/kundtjanst', group: 'more', icon: Phone },
];

// Helper function to get navigation items by group
export function getNavigationGroups() {
  return {
    home: NAVIGATION_ITEMS.filter(item => item.group === 'home'),
    services: NAVIGATION_ITEMS.filter(item => item.group === 'services'),
    more: NAVIGATION_ITEMS.filter(item => item.group === 'more'),
  };
}

export { NAVIGATION_ITEMS };