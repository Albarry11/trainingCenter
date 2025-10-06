import React, { useEffect, useState, lazy, Suspense, memo } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Trainers } from './components/Trainers';
import { Clients } from './components/Clients';
import { Articles } from './components/Articles';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

// Lazy load admin components for better performance
const AdminApp = lazy(() => import('./components/AdminApp'));

// Memoized main website components for better performance
const MainWebsite = memo(() => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Hero />
      <About />
      <Services />
      <Trainers />
      <Clients />
      <Articles />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
    <Toaster />
  </div>
));

MainWebsite.displayName = 'MainWebsite';

// Loading component for admin lazy loading
const AdminLoadingFallback = memo(() => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
));

AdminLoadingFallback.displayName = 'AdminLoadingFallback';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // Optimized route checking with debouncing
    let timeoutId: NodeJS.Timeout;
    
    const checkRoute = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const hash = window.location.hash;
        const shouldShowAdmin = hash === '#admin' || hash.startsWith('#admin/');
        
        // Only update state if it actually changed
        if (shouldShowAdmin !== isAdminRoute) {
          setIsAdminRoute(shouldShowAdmin);
        }
      }, 10); // Small debounce to prevent rapid state updates
    };

    checkRoute();
    
    // Optimized event listener with passive option
    const handleHashChange = () => {
      checkRoute();
      // Force re-render when navigating back from admin
      if (!window.location.hash && isAdminRoute) {
        setIsAdminRoute(false);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isAdminRoute]);

  // Memoized callback to prevent unnecessary re-renders
  const handleBackToWebsite = React.useCallback(() => {
    localStorage.removeItem('adminToken');
    setIsAdminRoute(false);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  // Admin route - render admin dashboard with fixed light theme (no theme switching)
  if (isAdminRoute) {
    return (
      <div className="light min-h-screen bg-background">
        <Suspense fallback={<AdminLoadingFallback />}>
          <AdminApp onBackToWebsite={handleBackToWebsite} />
        </Suspense>
        <Toaster />
      </div>
    );
  }

  // Main website with optimized theme provider
  return (
    <ThemeProvider defaultTheme="light" storageKey="swaragama-theme">
      <MainWebsite />
    </ThemeProvider>
  );
}