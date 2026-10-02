import React, { useMemo } from 'react';

interface FloatingSparklesProps {
  count?: number;
  isRevealing?: boolean;
  stage?: string;
}

interface SparkleData {
  id: number;
  top: number; // percentage
  left: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  color: string;
  type: 'diamond' | 'four-point' | 'eight-point' | 'glow-dot';
  rotation: number; // initial deg
}

const GOLD_PALETTE = [
  '#C2A379', // Warm gold
  '#DFBF8B', // Soft champagne gold
  '#F7E7CE', // Pale ivory gold
  '#E8C88A', // Radiant bright gold
  '#B89758', // Deep antique gold
  '#FFE9BA', // Sunlit gold
];

export const FloatingSparkles: React.FC<FloatingSparklesProps> = ({
  count = 22,
  isRevealing = false,
}) => {
  // Efficiently randomize sparkles once across the viewport
  const sparkles = useMemo<SparkleData[]>(() => {
    return Array.from({ length: count }, (_, index) => {
      const top = Math.random() * 90 + 5;
      const left = Math.random() * 90 + 5;
      const size = Math.floor(Math.random() * 10) + 6;
      const delay = parseFloat((Math.random() * 3).toFixed(2));
      const duration = parseFloat((2.5 + Math.random() * 2).toFixed(2));
      const color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
      const types: SparkleData['type'][] = ['diamond', 'four-point', 'eight-point', 'glow-dot'];
      const type = types[Math.floor(Math.random() * types.length)];
      const rotation = Math.floor(Math.random() * 90);

      return {
        id: index,
        top,
        left,
        size,
        delay,
        duration,
        color,
        type,
        rotation,
      };
    });
  }, [count]);

  const renderSparkleShape = (sparkle: SparkleData) => {
    switch (sparkle.type) {
      case 'four-point':
        return (
          <svg
            viewBox="0 0 24 24"
            width={sparkle.size}
            height={sparkle.size}
            fill={sparkle.color}
          >
            <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
          </svg>
        );

      case 'eight-point':
        return (
          <svg
            viewBox="0 0 24 24"
            width={sparkle.size}
            height={sparkle.size}
            fill={sparkle.color}
          >
            <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
            <circle cx="12" cy="12" r="1.5" fill="#FFF8E7" />
          </svg>
        );

      case 'diamond':
        return (
          <div
            style={{
              width: sparkle.size * 0.7,
              height: sparkle.size * 0.7,
              backgroundColor: sparkle.color,
              transform: 'rotate(45deg)',
            }}
          />
        );

      case 'glow-dot':
      default:
        return (
          <div
            className="rounded-full"
            style={{
              width: sparkle.size * 0.5,
              height: sparkle.size * 0.5,
              backgroundColor: sparkle.color,
            }}
          />
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-25 overflow-hidden select-none"
    >
      {sparkles.map((sparkle) => {
        const dynamicScale = isRevealing ? 1.15 : 1.0;

        return (
          <div
            key={sparkle.id}
            className="floating-sparkle-item absolute will-change-transform opacity-75"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
              transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg) scale(${dynamicScale})`,
              animation: `sparkleFloatingTwinkle ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            {renderSparkleShape(sparkle)}
          </div>
        );
      })}
    </div>
  );
};
