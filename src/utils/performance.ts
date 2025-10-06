// Performance optimization utilities

/**
 * Debounce function for optimizing frequent function calls
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Throttle function for optimizing scroll and resize events
 */
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(null, args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Intersection Observer hook for lazy loading sections
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Preload critical resources
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch DOM reads to prevent layout thrashing
 */
export const batchDOMReads = (callback: () => void) => {
  requestAnimationFrame(callback);
};

/**
 * Batch DOM writes to prevent layout thrashing
 */
export const batchDOMWrites = (callback: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Optimize animation duration based on user preference
 */
export const getOptimizedDuration = (normalDuration: number): number => {
  return prefersReducedMotion() ? 0.01 : normalDuration;
};

/**
 * Memory-efficient array chunking
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Clean up function for removing event listeners
 */
export const createCleanup = () => {
  const cleanupFunctions: (() => void)[] = [];
  
  return {
    add: (cleanup: () => void) => {
      cleanupFunctions.push(cleanup);
    },
    execute: () => {
      cleanupFunctions.forEach(fn => fn());
      cleanupFunctions.length = 0;
    }
  };
};