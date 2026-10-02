import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ScrollProgressBarProps {
  /**
   * Whether the invitation has been unsealed/opened.
   * If false, the progress bar stays hidden until the intro ceremony is complete.
   */
  isOpened?: boolean;
}

/**
 * ScrollProgressBar
 * A thin, elegant golden progress bar at the top of the viewport.
 * Features a silky spring-smoothed scale, radiant gold gradient,
 * leading micro-glow tip, and subtle ambient shimmer that fills up as
 * guests scroll through Glensan & Junah Joy's wedding invitation.
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ isOpened = true }) => {
  const { isDarkMode } = useTheme();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track window scroll progress with Framer Motion
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth out progression for a silky, jitter-free luxury feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  // Track if user has scrolled at least 10px
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setHasScrolled(latest > 10);
    });
  }, [scrollY]);

  // If not opened yet, keep hidden so the envelope opening ceremony remains pristine
  if (!isOpened) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] sm:h-[3px] pointer-events-none select-none"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Delicate background track: soft, subtle hint of the progression lane */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hasScrolled ? 'opacity-100' : 'opacity-30'
        } ${
          isDarkMode
            ? 'bg-black/30 backdrop-blur-[1px]'
            : 'bg-stone-300/30 backdrop-blur-[1px]'
        }`}
      />

      {/* The Luxurious Golden Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="relative h-full w-full origin-left bg-gradient-to-r from-[#A88B52] via-[#D4AF37] via-[#F5E2B3] to-[#C2A379]"
      >
        {/* Ambient Golden Glow Aura */}
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? 'shadow-[0_0_10px_rgba(212,175,55,0.7),0_0_3px_rgba(255,235,175,0.9)]'
              : 'shadow-[0_0_8px_rgba(194,163,121,0.6),0_0_2px_rgba(232,207,140,0.8)]'
          }`}
        />

        {/* Luminous Micro-Star Tip at the leading right edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
          {/* Subtle halo bloom */}
          <div className="w-3 h-3 rounded-full bg-[#D4AF37]/40 blur-[2px] animate-pulse" />
          {/* Crisp golden core */}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFF,0_0_10px_#D4AF37]" />
        </div>
      </motion.div>
    </div>
  );
};
