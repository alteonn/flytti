import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Code } from 'lucide-react';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants';

const socialLinks = [
  { 
    icon: Facebook, 
    href: 'https://www.facebook.com/share/19JU4MNa3r/?mibextid=LQQJ4d', 
    label: 'Facebook' 
  },
  { 
    icon: Instagram, 
    href: 'https://www.instagram.com/flytti.se', 
    label: 'Instagram' 
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/company/flytti-se', 
    label: 'LinkedIn' 
  },
];

const contactInfo = [
  { icon: Phone, text: '020-123 456', href: 'tel:020123456' },
  { icon: Mail, text: 'info@flytti.se', href: 'mailto:info@flytti.se' },
  { icon: MapPin, text: 'Stockholm, Sverige', href: 'https://maps.google.com' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white relative">
      {/* Top Border Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                Flytti.se
              </h3>
            </Link>
            <p className="text-text-light leading-relaxed">
              Vi hjälper dig hitta rätt flyttfirma för dina behov. Jämför priser och få offerter från 
              kvalitetssäkrade flyttfirmor i hela Sverige.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-light/20 hover:bg-primary-light/30 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Tjänster</h4>
            <ul className="space-y-3">
              {NAVIGATION_ITEMS.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Företag</h4>
            <ul className="space-y-3">
              {NAVIGATION_ITEMS.slice(6).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Kontakt</h4>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.text}>
                  <a
                    href={info.href}
                    className="flex items-center gap-3 text-text-light hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-light/20 group-hover:bg-primary-light/30 flex items-center justify-center transition-colors">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span>{info.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-light">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span>© {currentYear} {SITE_CONFIG.name}</span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                <span>Utvecklad av{' '}</span>
                <a 
                  href="https://almfors.se" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Almfors
                </a>
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
              <Link to="/dataskydd" className="hover:text-primary transition-colors">
                Dataskyddspolicy
              </Link>
              <Link to="/villkor" className="hover:text-primary transition-colors">
                Användarvillkor
              </Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}