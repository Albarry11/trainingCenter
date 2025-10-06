import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollState {
  isScrolled: boolean;
  isAtHeroTop: boolean;
  activeSection: string;
  scrollY: number;
}

interface UseScrollStateOptions {
  scrollThreshold?: number;
  heroThresholdPercent?: number;
  throttleMs?: number;
}

export function useScrollState(
  navItems: Array<{ id: string; name: string }>,
  options: UseScrollStateOptions = {}
) {
  const {
    scrollThreshold = 10,
    heroThresholdPercent = 0.3,
    throttleMs = typeof window !== 'undefined' && 'ontouchstart' in window ? 32 : 16, // Slower on mobile
  } = options;

  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    isAtHeroTop: true,
    activeSection: 'home',
    scrollY: 0,
  });

  const frameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  // Memoized update function to prevent recreation
  const updateScrollState = useCallback(() => {
    if (isUpdatingRef.current) return;
    
    const now = performance.now();
    
    // Throttle updates for better performance
    if (now - lastUpdateRef.current < throttleMs) {
      return;
    }
    
    isUpdatingRef.current = true;
    lastUpdateRef.current = now;

    try {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > scrollThreshold;

      // Calculate hero section threshold
      let isAtHeroTop = true;
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const threshold = Math.min(heroHeight * heroThresholdPercent, 300);
        isAtHeroTop = scrollY < threshold;
      } else {
        // Fallback when hero section not available
        isAtHeroTop = scrollY < 100;
      }

      // Optimized active section detection
      let activeSection = 'home';
      const scrollPosition = scrollY + 120; // Offset for fixed header

      // Use reverse iteration for better performance (sections are usually in order)
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (sectionTop <= scrollPosition) {
            activeSection = navItems[i].id;
            break;
          }
        }
      }

      // Batch state update
      setScrollState(prevState => {
        // Only update if values have actually changed
        if (
          prevState.isScrolled === isScrolled &&
          prevState.isAtHeroTop === isAtHeroTop &&
          prevState.activeSection === activeSection &&
          Math.abs(prevState.scrollY - scrollY) < 5 // Avoid micro-updates
        ) {
          return prevState;
        }

        return {
          isScrolled,
          isAtHeroTop,
          activeSection,
          scrollY,
        };
      });
    } catch (error) {
      console.warn('Scroll state update error:', error);
    } finally {
      isUpdatingRef.current = false;
    }
  }, [navItems, scrollThreshold, heroThresholdPercent, throttleMs]);

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    // Initialize state immediately
    updateScrollState();

    // Setup scroll listener with passive option for better performance
    const scrollOptions: AddEventListenerOptions = {
      passive: true,
      capture: false,
    };

    window.addEventListener('scroll', handleScroll, scrollOptions);

    // Handle resize/orientation changes on mobile
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce resize events more aggressively on mobile
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateScrollState, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // iOS Safari specific scroll fix
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Prevent scroll bounce issues on iOS
      document.body.style.overscrollBehavior = 'none';
    }

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [handleScroll, updateScrollState]);

  return scrollState;
}

// Alternative hook using Intersection Observer for even better performance
export function useIntersectionScrollState(
  navItems: Array<{ id: string; name: string }>
) {
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Create intersection observer for section detection
    const options: IntersectionObserverInit = {
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% visible from top
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (navItems.some(item => item.id === sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    }, options);

    // Observe all sections
    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navItems]);

  // Combine with regular scroll state for other properties
  const scrollState = useScrollState(navItems, { throttleMs: 32 }); // Slower for intersection observer

  return {
    ...scrollState,
    activeSection, // Use intersection observer for more accurate section detection
  };
}