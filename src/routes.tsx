import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Lazy load pages
const HomePage = lazy(() => import('./pages/home').then(m => ({ default: m.HomePage })));
const FlytthjalpPage = lazy(() => import('./pages/flytthjalp').then(m => ({ default: m.FlytthjalpPage })));
const KontorsflyttPage = lazy(() => import('./pages/kontorsflytt').then(m => ({ default: m.KontorsflyttPage })));
const UtlandsflyttpPage = lazy(() => import('./pages/utlandsflytt').then(m => ({ default: m.UtlandsflyttpPage })));
const MovingCleaningPage = lazy(() => import('./pages/flyttstadning').then(m => ({ default: m.MovingCleaningPage })));
const StoragePage = lazy(() => import('./pages/magasinering').then(m => ({ default: m.StoragePage })));
const EstatePage = lazy(() => import('./pages/dodsbo').then(m => ({ default: m.EstatePage })));
const SearchCompaniesPage = lazy(() => import('./pages/sok-foretag').then(m => ({ default: m.SearchCompaniesPage })));
const CompanyProfilePage = lazy(() => import('./pages/sok-foretag/company-profile').then(m => ({ default: m.CompanyProfilePage })));
const JoinCompanyPage = lazy(() => import('./pages/anslut-foretag').then(m => ({ default: m.JoinCompanyPage })));
const CustomerServicePage = lazy(() => import('./pages/kundtjanst').then(m => ({ default: m.CustomerServicePage })));
const ArticlesPage = lazy(() => import('./pages/articles').then(m => ({ default: m.ArticlesPage })));
const ArticlePage = lazy(() => import('./pages/articles/article').then(m => ({ default: m.ArticlePage })));
const CitiesPage = lazy(() => import('./pages/cities').then(m => ({ default: m.CitiesPage })));
const CityPage = lazy(() => import('./pages/cities/city').then(m => ({ default: m.CityPage })));
const TermsPage = lazy(() => import('./pages/villkor/terms').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/dataskydd/privacy').then(m => ({ default: m.PrivacyPage })));
const CookiePage = lazy(() => import('./pages/cookies/cookie').then(m => ({ default: m.CookiePage })));

// Admin pages
const AdminLayout = lazy(() => import('./components/admin/layout').then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import('./pages/admin/dashboard').then(m => ({ default: m.AdminDashboard })));
const CompanyList = lazy(() => import('./pages/admin/companies/list').then(m => ({ default: m.CompanyList })));
const CompanyEdit = lazy(() => import('./pages/admin/companies/edit').then(m => ({ default: m.CompanyEdit })));
const CompanyCreate = lazy(() => import('./pages/admin/companies/create').then(m => ({ default: m.CompanyCreate })));
const ArticleList = lazy(() => import('./pages/admin/articles/list').then(m => ({ default: m.ArticleList })));
const ArticleEdit = lazy(() => import('./pages/admin/articles/edit').then(m => ({ default: m.ArticleEdit })));
const ArticleCreate = lazy(() => import('./pages/admin/articles/create').then(m => ({ default: m.ArticleCreate })));
const LeadList = lazy(() => import('./pages/admin/leads/list').then(m => ({ default: m.LeadList })));
const LeadEdit = lazy(() => import('./pages/admin/leads/edit').then(m => ({ default: m.LeadEdit })));
const AdminLogin = lazy(() => import('./pages/admin/login').then(m => ({ default: m.AdminLogin })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-light">Laddar...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        index: true, 
        element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> 
      },
      { 
        path: 'flytthjalp', 
        element: <Suspense fallback={<PageLoader />}><FlytthjalpPage /></Suspense> 
      },
      { 
        path: 'kontorsflytt', 
        element: <Suspense fallback={<PageLoader />}><KontorsflyttPage /></Suspense> 
      },
      { 
        path: 'utlandsflytt', 
        element: <Suspense fallback={<PageLoader />}><UtlandsflyttpPage /></Suspense> 
      },
      { 
        path: 'flyttstadning', 
        element: <Suspense fallback={<PageLoader />}><MovingCleaningPage /></Suspense> 
      },
      { 
        path: 'magasinering', 
        element: <Suspense fallback={<PageLoader />}><StoragePage /></Suspense> 
      },
      { 
        path: 'dodsbo', 
        element: <Suspense fallback={<PageLoader />}><EstatePage /></Suspense> 
      },
      { 
        path: 'sok-foretag', 
        element: <Suspense fallback={<PageLoader />}><SearchCompaniesPage /></Suspense> 
      },
      { 
        path: 'foretag/:slug', 
        element: <Suspense fallback={<PageLoader />}><CompanyProfilePage /></Suspense> 
      },
      { 
        path: 'anslut-foretag', 
        element: <Suspense fallback={<PageLoader />}><JoinCompanyPage /></Suspense> 
      },
      { 
        path: 'kundtjanst', 
        element: <Suspense fallback={<PageLoader />}><CustomerServicePage /></Suspense> 
      },
      { 
        path: 'artiklar', 
        element: <Suspense fallback={<PageLoader />}><ArticlesPage /></Suspense> 
      },
      { 
        path: 'artiklar/:slug', 
        element: <Suspense fallback={<PageLoader />}><ArticlePage /></Suspense> 
      },
      { 
        path: 'stader', 
        element: <Suspense fallback={<PageLoader />}><CitiesPage /></Suspense> 
      },
      { 
        path: ':city', 
        element: <Suspense fallback={<PageLoader />}><CityPage /></Suspense> 
      },
      { 
        path: 'villkor', 
        element: <Suspense fallback={<PageLoader />}><TermsPage /></Suspense> 
      },
      { 
        path: 'dataskydd', 
        element: <Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense> 
      },
      { 
        path: 'cookies', 
        element: <Suspense fallback={<PageLoader />}><CookiePage /></Suspense> 
      },
    ],
  },
  {
    path: '/admin/login',
    element: <Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>,
  },
  {
    path: '/admin',
    element: <Suspense fallback={<PageLoader />}><AdminLayout /></Suspense>,
    children: [
      { 
        index: true, 
        element: <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense> 
      },
      { 
        path: 'companies', 
        element: <Suspense fallback={<PageLoader />}><CompanyList /></Suspense> 
      },
      { 
        path: 'companies/create', 
        element: <Suspense fallback={<PageLoader />}><CompanyCreate /></Suspense> 
      },
      { 
        path: 'companies/:id', 
        element: <Suspense fallback={<PageLoader />}><CompanyEdit /></Suspense> 
      },
      { 
        path: 'articles', 
        element: <Suspense fallback={<PageLoader />}><ArticleList /></Suspense> 
      },
      { 
        path: 'articles/create', 
        element: <Suspense fallback={<PageLoader />}><ArticleCreate /></Suspense> 
      },
      { 
        path: 'articles/:id', 
        element: <Suspense fallback={<PageLoader />}><ArticleEdit /></Suspense> 
      },
      { 
        path: 'leads', 
        element: <Suspense fallback={<PageLoader />}><LeadList /></Suspense> 
      },
      { 
        path: 'leads/:id', 
        element: <Suspense fallback={<PageLoader />}><LeadEdit /></Suspense> 
      },
    ],
  },
]);