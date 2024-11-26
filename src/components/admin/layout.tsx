import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut, Home, FileText, Building2, MessageSquare, Menu, X, Truck, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { 
    title: 'Översikt', 
    href: '/admin', 
    icon: Home,
    description: 'Se statistik och aktivitet'
  },
  { 
    title: 'Företag', 
    href: '/admin/companies', 
    icon: Building2,
    description: 'Hantera anslutna företag'
  },
  { 
    title: 'Leads', 
    href: '/admin/leads', 
    icon: MessageSquare,
    description: 'Hantera inkomna förfrågningar'
  },
  { 
    title: 'Artiklar', 
    href: '/admin/articles', 
    icon: FileText,
    description: 'Hantera innehåll och guider'
  },
];

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const isCurrentPath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/10 to-bg-light">
      {/* Header */}
      <header className="bg-white border-b border-primary/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl blur-lg opacity-20" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary-light/90 to-white rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-5 h-5 text-primary" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-xl" />
              </div>
            </div>
            <div className="text-xl font-serif font-bold hidden sm:block">
              <span className="text-text">Flytti</span>
              <span className="text-primary">.se</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrentPath(item.href)
                      ? 'bg-primary-light/20 text-primary'
                      : 'text-text-light hover:bg-primary-light/10 hover:text-primary'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Common Actions */}
            <div className="flex items-center gap-2">
              <Link 
                to="/"
                className="bg-primary text-white hover:bg-primary-dark transition-colors flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Till plattformen</span>
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logga ut</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-md z-40 border-b border-primary/10"
          >
            <nav className="container mx-auto p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    isCurrentPath(item.href)
                      ? 'bg-primary-light/20 text-primary'
                      : 'text-text-light hover:bg-primary-light/10 hover:text-primary'
                  }`}
                >
                  <item.icon className="w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-text-light">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}

              {/* Platform Link in Mobile Menu */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-start gap-3 p-3 rounded-lg bg-primary text-white"
              >
                <ArrowLeft className="w-5 h-5 mt-0.5" />
                <div>
                  <div className="font-medium">Till plattformen</div>
                  <div className="text-sm text-white/80">
                    Återgå till Flytti.se
                  </div>
                </div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}