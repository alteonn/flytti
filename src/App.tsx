import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTop } from '@/components/scroll-to-top';
import { CookieBanner } from '@/components/cookie-consent/cookie-banner';

export default function App() {
  const { setUser } = useAuth();

  useEffect(() => {
    // Check for existing session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <div className="min-h-screen bg-bg-light relative">
      <ScrollToTop />
      <Header />
      <main className="pt-16 relative">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <CookieBanner />
    </div>
  );
}