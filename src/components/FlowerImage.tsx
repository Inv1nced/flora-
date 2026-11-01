import { useState } from 'react';

interface FlowerImageProps {
  src: string;
  alt: string;
  className?: string;
  categoryTone?: string;
}

export function FlowerImage({ src, alt, className = '', categoryTone = 'Розово-пудровый' }: FlowerImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#f4ece6] ${className}`}>
      {/* Resilient Botanical Fallback Container */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#f8f3ef] via-[#eedfd5] to-[#e4cebf]">
          <svg
            className="w-12 h-12 text-[#9a7b6c] opacity-60 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0v-8m0 0l-3-3m3 3l3-3m-3 3l-3 3m3-3l3 3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6c-1.5-2-4-2-5 0s1 4 5 7c4-3 6-5 5-7s-3.5-2-5 0z"
            />
          </svg>
          <span className="text-xs font-serif-display italic text-[#7c6255] max-w-[80%] truncate">
            {alt}
          </span>
          <span className="text-[11px] text-[#9c8477] mt-0.5">
            {categoryTone}
          </span>
        </div>
      )}

      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
