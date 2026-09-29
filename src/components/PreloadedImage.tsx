import React, { useState, useEffect } from 'react';
import { MachineryPartGraphic } from './MachineryPartGraphic';

// Global memory cache to prevent re-fetching and flickering
const imageMemoryCache = new Set<string>();

interface PreloadedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  partId?: string;
  className?: string;
  containerClassName?: string;
}

export const PreloadedImage: React.FC<PreloadedImageProps> = ({
  src,
  alt,
  partId,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const isCached = src ? imageMemoryCache.has(src) : false;
  const [loaded, setLoaded] = useState<boolean>(isCached);
  const [error, setError] = useState<boolean>(!src);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    if (imageMemoryCache.has(src)) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageMemoryCache.add(src);
      setLoaded(true);
      setError(false);
    };
    img.onerror = () => {
      setError(true);
      setLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-slate-950 ${containerClassName}`}>
      {/* If error or fallback graphic is requested */}
      {error && partId ? (
        <MachineryPartGraphic partId={partId} className={`w-full h-full object-cover ${className}`} />
      ) : error ? (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-2 text-center text-gray-400">
          <MachineryPartGraphic partId="p-101" className="w-full h-full" />
        </div>
      ) : (
        <>
          {/* Skeleton Shimmer */}
          {!loaded && (
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              {partId ? (
                <MachineryPartGraphic partId={partId} className="w-full h-full opacity-60 blur-xs" />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-yellow-500/40 border-t-yellow-400 animate-spin"></div>
              )}
            </div>
          )}

          {src && (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } ${className}`}
              onLoad={() => {
                imageMemoryCache.add(src);
                setLoaded(true);
              }}
              onError={() => setError(true)}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
};

// Global Website Image Preloader Hook
export const useGlobalImageCache = (imageUrls: string[]) => {
  const [progress, setProgress] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    let loadedCount = 0;
    const validUrls = imageUrls.filter(Boolean);
    const total = validUrls.length;

    if (total === 0) {
      setIsPreloading(false);
      return;
    }

    validUrls.forEach((url) => {
      if (imageMemoryCache.has(url)) {
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) setIsPreloading(false);
        return;
      }

      const img = new Image();
      img.src = url;
      img.onload = () => {
        imageMemoryCache.add(url);
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount >= total) setIsPreloading(false);
      };
      img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount >= total) setIsPreloading(false);
      };
    });

    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [imageUrls]);

  return { progress, isPreloading };
};
