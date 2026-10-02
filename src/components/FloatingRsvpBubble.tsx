import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronRight, X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const FloatingRsvpBubble: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wedding_rsvp_submitted') === 'true';
    } catch {
      return false;
    }
  });
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('wedding_rsvp_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      try {
        const submitted = localStorage.getItem('wedding_rsvp_submitted') === 'true';
        setHasSubmitted(submitted);
        if (submitted) {
          setIsVisible(false);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('wedding_rsvp_updated', checkStatus);
    window.addEventListener('storage', checkStatus);

    // Only set the 1-minute timer if not already submitted or dismissed
    if (!hasSubmitted && !isDismissed) {
      // 1 minute (60,000ms) after opening the page
      timerRef.current = setTimeout(() => {
        try {
          const alreadyDone = localStorage.getItem('wedding_rsvp_submitted') === 'true';
          const alreadyDismissed = sessionStorage.getItem('wedding_rsvp_dismissed') === 'true';
          if (!alreadyDone && !alreadyDismissed) {
            setIsVisible(true);
          }
        } catch {
          setIsVisible(true);
        }
      }, 60000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('wedding_rsvp_updated', checkStatus);
      window.removeEventListener('storage', checkStatus);
    };
  }, [hasSubmitted, isDismissed]);

  const handleScrollToRsvp = () => {
    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('wedding_rsvp_dismissed', 'true');
    } catch {
      // ignore
    }
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleMarkSubmitted = () => {
    try {
      localStorage.setItem('wedding_rsvp_submitted', 'true');
      window.dispatchEvent(new Event('wedding_rsvp_updated'));
    } catch {
      // ignore
    }
    setHasSubmitted(true);
    setIsVisible(false);
  };

  // If already submitted or dismissed by user, do not render
  if (hasSubmitted || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 w-[255px] sm:w-[275px] max-w-[calc(100vw-1.5rem)] pointer-events-auto will-change-transform"
        >
          <div
            className={`relative rounded-xl p-3 sm:p-3.5 border shadow-xl backdrop-blur-md transition-colors ${
              isDarkMode
                ? 'bg-[#181524]/95 border-[#C2A379]/50 text-[#F3EBE6] shadow-black/70'
                : 'bg-white/95 border-[#C2A379]/60 text-[#3A3530] shadow-[#C2A379]/15'
            }`}
          >
            {/* Top row: Bell + Badge + Close Button */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-[#C2A379]/20 text-[#C2A379] flex items-center justify-center shrink-0">
                  <Bell className="w-3.5 h-3.5 animate-pulse text-[#C2A379]" />
                </div>
                <span className="text-[10px] font-sans-body uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-[#C2A379]/15 text-[#C2A379]">
                  RSVP Reminder
                </span>
                <span className="text-[10px] font-semibold text-rose-500 font-sans-body">
                  Due Oct 15
                </span>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss reminder"
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'text-[#AFA498] hover:text-white hover:bg-white/10'
                    : 'text-[#8C827A] hover:text-[#3A3530] hover:bg-black/5'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Concise Message */}
            <p className="font-serif-title text-sm font-semibold leading-snug">
              Kindly confirm your attendance
            </p>
            <p
              className={`text-[11px] font-sans-body leading-tight mt-0.5 ${
                isDarkMode ? 'text-[#C9BFD2]' : 'text-[#6E645D]'
              }`}
            >
              Reserve your seat with us on or before October 15, 2026.
            </p>

            {/* Compact CTA Row */}
            <div className="mt-2.5 pt-2 border-t border-inherit flex items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={handleMarkSubmitted}
                className={`text-[10px] font-sans-body underline cursor-pointer flex items-center gap-1 transition-colors ${
                  isDarkMode
                    ? 'text-[#AFA498] hover:text-[#F3EBE6]'
                    : 'text-[#8C827A] hover:text-[#3A3530]'
                }`}
              >
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                <span>Already sent</span>
              </button>

              <button
                type="button"
                onClick={handleScrollToRsvp}
                className="px-2.5 py-1 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white font-sans-body text-[11px] font-semibold tracking-wide flex items-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <span>RSVP Now</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
