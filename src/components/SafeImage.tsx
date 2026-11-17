import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-amber-50 text-slate-500 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-6 h-6 mb-1.5 opacity-60" />
        <span className="text-xs font-medium leading-snug line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
