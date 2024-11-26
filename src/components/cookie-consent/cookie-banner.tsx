import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultConsent: CookieConsent = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
};

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
    setConsent(fullConsent);
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(defaultConsent));
    setConsent(defaultConsent);
    setIsOpen(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsOpen(false);
    setShowSettings(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-primary/10 p-6">
            {!showSettings ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-primary/5 transform translate-x-1 translate-y-1 -z-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Vi värnar om din integritet</h3>
                    <p className="text-text-light text-sm md:text-base">
                      Vi använder cookies för att förbättra din upplevelse på vår webbplats. 
                      Du kan välja vilka cookies du vill tillåta eller acceptera alla.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                    className="flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Hantera cookies
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                  >
                    Neka alla
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary-dark sm:ml-auto"
                  >
                    Acceptera alla
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Cookie-inställningar</h3>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Nödvändiga cookies</p>
                      <p className="text-sm text-text-light">Krävs för att webbplatsen ska fungera</p>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Analys-cookies</p>
                      <p className="text-sm text-text-light">Hjälper oss förstå hur webbplatsen används</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={consent.analytics ? 'bg-primary text-white hover:bg-primary-dark' : ''}
                    >
                      {consent.analytics ? 'På' : 'Av'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Marknadsföring</p>
                      <p className="text-sm text-text-light">Används för riktad marknadsföring</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={consent.marketing ? 'bg-primary text-white hover:bg-primary-dark' : ''}
                    >
                      {consent.marketing ? 'På' : 'Av'}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(false)}
                  >
                    Avbryt
                  </Button>
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    Spara inställningar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}