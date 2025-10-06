// Resource optimization utilities

/**
 * Add DNS prefetch hints for external resources
 */
export const addDNSPrefetch = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
};

/**
 * Add preconnect hints for critical external resources
 */
export const addPreconnect = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `//${domain}`;
    link.crossOrigin = '';
    document.head.appendChild(link);
  });
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

/**
 * Lazy load non-critical CSS
 */
export const loadCSS = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Initialize performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // DNS prefetch for common domains
  addDNSPrefetch([
    'images.unsplash.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ]);

  // Preconnect to critical resources
  addPreconnect([
    'images.unsplash.com',
    'fonts.googleapis.com'
  ]);

  // Add viewport meta for better mobile performance
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(viewport);
  }
};

/**
 * Image optimization utilities
 */
export const getOptimizedImageSrc = (src: string, width: number, quality = 80): string => {
  // For Unsplash images, add optimization parameters
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('auto', 'format,compress');
    return url.toString();
  }
  
  return src;
};

/**
 * Critical resource loading
 */
export const loadCriticalResources = () => {
  // Preload hero images or critical assets
  const heroImages = [
    // Add your critical images here
  ];
  
  heroImages.forEach(src => {
    preloadResource(src, 'image');
  });
};