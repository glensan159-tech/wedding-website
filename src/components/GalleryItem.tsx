import React, { useState, useRef, useCallback } from 'react';

interface GalleryItemProps {
  url: string;
  caption: string;
  index: number;
  onSelect: (url: string) => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  url,
  caption,
  index,
  onSelect,
}) => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized offset from container center: range [-1, 1]
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Subtle parallax translation: up to ~15px
    setOffset({
      x: normX * 15,
      y: normY * 15,
    });
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Smoothly return to center
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  // Subtle perspective card tilt
  const cardTiltX = isHovered ? -offset.y * 0.2 : 0;
  const cardTiltY = isHovered ? offset.x * 0.2 : 0;

  return (
    <div
      ref={containerRef}
      onClick={() => onSelect(url)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="gallery-item group relative h-[320px] sm:h-[380px] overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl border border-[#C2A379]/20 transition-shadow duration-500 bg-[#F5EFE6]"
      style={{
        transform: `perspective(1000px) rotateX(${cardTiltX}deg) rotateY(${cardTiltY}deg)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease'
          : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
      }}
      title={`Click to view: ${caption}`}
    >
      {/* Parallax Image Container - slightly oversized to allow shifting without edge bleed */}
      <div
        className="gallery-item-image absolute inset-[-18px]"
        style={{
          transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0) scale(${isHovered ? 1.08 : 1.02})`,
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
            : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={url}
          alt={`Glensan & Junah Joy Prenup ${index + 1}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center select-none"
          loading="lazy"
        />
      </div>

      {/* Dynamic Specular Sheen reacting to mouse position */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${50 + offset.x * 2}% ${50 + offset.y * 2}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`,
        }}
      />

      {/* Vignette & Gradient Overlay with Floating Caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5 sm:p-6">
        <div
          className="w-full"
          style={{
            transform: `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0)`,
            transition: isHovered
              ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
              : 'transform 0.5s ease-out',
          }}
        >
          <p className="font-sans-body text-[10px] uppercase tracking-[3px] text-[#E8C88A] mb-1 drop-shadow-sm font-semibold">
            Prenup 0{index + 1}
          </p>
          <p className="font-serif-title text-white text-base sm:text-lg tracking-wide italic drop-shadow-md leading-snug">
            "{caption}"
          </p>
        </div>
      </div>
    </div>
  );
};
