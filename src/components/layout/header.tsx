import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { getNavigationGroups } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { home, services, more } = getNavigationGroups();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-primary/10" />
      
      <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="group relative z-10">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Logo Container */}
            <div className="relative">
              {/* Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary rounded-xl transform group-hover:scale-105 transition-transform" />
              
              {/* Main Logo Box */}
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-light/90 to-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                <motion.div
                  initial={false}
                  animate={{ rotate: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Truck className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
                
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent" />
                <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent animate-shine" />
              </div>
            </div>

            {/* Text */}
            <div className="text-xl md:text-2xl font-serif font-bold">
              <span className="text-text">Flytti</span>
              <span className="text-primary">.se</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Hem */}
              {home.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    to={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* Flyttjänster */}
              {services.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    to={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* Mer dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Mer</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] p-2">
                    {more.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-2 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-light/20 hover:text-primary"
                      >
                        <item.icon className="w-4 h-4" />
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login/Admin Button */}
          {isAuthenticated ? (
            <Link to="/admin">
              <Button variant="default" className="ml-4 bg-primary hover:bg-primary-dark text-white flex items-center gap-2">
                Admin
              </Button>
            </Link>
          ) : (
            <Link to="/admin/login">
              <Button variant="default" className="ml-4 bg-primary hover:bg-primary-dark text-white flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Logga in
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-50 p-2 text-text hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-16 md:top-20 bg-white/95 backdrop-blur-md z-40 overflow-y-auto"
            >
              <nav className="container mx-auto px-4 py-6">
                {[...home, ...services, ...more].map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.href}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-text-light hover:text-primary rounded-lg hover:bg-primary-light/20 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: services.length * 0.05 }}
                  className="px-4 pt-4"
                >
                  {isAuthenticated ? (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="default" 
                        className="w-full bg-primary hover:bg-primary-dark text-white flex items-center gap-2 justify-center py-6"
                      >
                        Admin
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="default" 
                        className="w-full bg-primary hover:bg-primary-dark text-white flex items-center gap-2 justify-center py-6"
                      >
                        <LogIn className="w-4 h-4" />
                        Logga in
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}