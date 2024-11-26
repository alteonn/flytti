import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if it's a new navigation (not back/forward)
    if (window.history.state?.type !== 'popstate') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}