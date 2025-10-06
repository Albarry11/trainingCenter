import React, { memo, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = memo(({ src, alt, className = '', width, height }: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {!loaded && (
        <div className={`bg-muted animate-pulse absolute inset-0 ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        className={`gpu-accelerated ${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';