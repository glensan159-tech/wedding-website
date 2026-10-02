import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparkleCanvas } from './SparkleCanvas';
import { FloatingSparkles } from './FloatingSparkles';
import { Sparkles, Heart, Moon, Sun, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface EnvelopeIntroProps {
  onOpenComplete: () => void;
  isOpened: boolean;
  onAudioTrigger?: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  onOpenComplete,
  isOpened,
  onAudioTrigger,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Animation stages:
  // 'idle' -> Parallax active, card 100% hidden, seal glowing
  // 'unsealing' -> Parallax centers, wax seal pops with golden sparkles
  // 'flap-opening' -> Top flap unfolds 180° backwards
  // 'card-revealed' -> Card slides straight UP out of pocket, envelope lowers as pedestal
  // 'done' -> Fade into main celebration
  const [stage, setStage] = useState<
    'idle' | 'unsealing' | 'flap-opening' | 'card-revealed' | 'done'
  >('idle');

  const [burstTrigger, setBurstTrigger] = useState(0);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(4);
  const [tilt, setTilt] = useState<{ x: number; y: number; lightX: number; lightY: number }>({
    x: 0,
    y: 0,
    lightX: 45,
    lightY: 35,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const sealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 640 || window.innerHeight < 740);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset when replay intro is triggered
  useEffect(() => {
    if (!isOpened) {
      setStage('idle');
      setCountdownSeconds(4);
      setTilt({ x: 0, y: 0, lightX: 45, lightY: 35 });
      setIsHovered(false);
    }
  }, [isOpened]);

  // 3D Parallax Mouse Physics on Envelope when Idle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stage !== 'idle') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    const tiltX = -normY * 12; // -12 to 12 deg
    const tiltY = normX * 14;  // -14 to 14 deg
    const lightX = Math.round(45 + normX * 25);
    const lightY = Math.round(35 + normY * 25);

    setTilt({ x: tiltX, y: tiltY, lightX, lightY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, lightX: 45, lightY: 35 });
    setIsHovered(false);
  };

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // Trigger audio immediately on user click gesture
    onAudioTrigger?.();

    // Lock parallax to center
    setTilt({ x: 0, y: 0, lightX: 50, lightY: 40 });

    // Capture exact position of the wax seal for particle burst
    if (sealRef.current) {
      const rect = sealRef.current.getBoundingClientRect();
      setBurstOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      setBurstOrigin({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }

    // Step 1: Wax seal breaks with gold sparkles
    setStage('unsealing');
    setBurstTrigger((prev) => prev + 1);

    // Step 2: Flap rotates 180° open backwards (260ms)
    setTimeout(() => {
      setStage('flap-opening');
    }, 260);

    // Step 3: Card emerges straight UP out of the pocket while envelope lowers (680ms)
    setTimeout(() => {
      setStage('card-revealed');
      setBurstTrigger((prev) => prev + 1);
    }, 680);

    // Step 4: After 4 seconds of presentation, gracefully transition to the wedding celebration
    const totalDisplayDuration = 5200;
    setTimeout(() => {
      setStage('done');
      onOpenComplete();
    }, totalDisplayDuration);
  };

  // Immediate jump to celebration without waiting for timer
  const handleImmediateEnter = () => {
    setStage('done');
    onOpenComplete();
  };

  // 4-Second countdown timer effect
  useEffect(() => {
    if (stage !== 'card-revealed') return;

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => Math.max(1, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [stage]);

  if (isOpened && stage === 'done') {
    return null;
  }

  const isFlapOpen = stage === 'flap-opening' || stage === 'card-revealed' || stage === 'done';
  const isCardRevealed = stage === 'card-revealed' || stage === 'done';

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          id="welcome-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -70, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none ${
            isDarkMode ? 'bg-[#0E0D14]' : 'bg-[#FDFBF7]'
          }`}
          style={{
            backgroundImage: isDarkMode
              ? 'radial-gradient(#2A2535 1px, transparent 1px)'
              : 'radial-gradient(#F3EBDD 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Dynamic Golden Particle Canvas */}
          <SparkleCanvas
            burstTrigger={burstTrigger}
            burstOrigin={burstOrigin}
            isActive={stage !== 'done'}
          />

          {/* Floating Sparkle Elements across Viewport */}
          <FloatingSparkles
            count={24}
            isRevealing={stage !== 'idle'}
            stage={stage}
          />

          {/* Top Left Dark Mode Toggle Button (leaving Top Right for floating audio player) */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-4 z-40">
            <button
              onClick={toggleDarkMode}
              type="button"
              aria-label="Toggle Dark Mode"
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer shadow-xs ${
                isDarkMode
                  ? 'bg-[#1C1A27] border-[#3D354E] text-[#D4AF37] hover:bg-[#252233]'
                  : 'bg-white/80 border-[#EAE0D2] text-[#8C827A] hover:text-[#3A3530]'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>

          {/* Ambient Twinkling Floating Sparkles in Background */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            <div className="sparkle-twinkle absolute top-[12%] left-[16%] text-[#C2A379]">
              <Sparkles className="h-5 w-5 opacity-70" />
            </div>
            <div className="sparkle-twinkle absolute top-[18%] right-[18%] text-[#9D4EDD] [animation-delay:0.8s]">
              <Sparkles className="h-6 w-6 opacity-60" />
            </div>
            <div className="sparkle-twinkle absolute bottom-[22%] left-[14%] text-[#EAA2B8] [animation-delay:1.4s]">
              <Sparkles className="h-4 w-4 opacity-50" />
            </div>
            <div className="sparkle-twinkle absolute bottom-[18%] right-[15%] text-[#D4AF37] [animation-delay:0.5s]">
              <Sparkles className="h-5 w-5 opacity-70" />
            </div>
          </div>

          {/* Header Titles */}
          <motion.div
            animate={{
              y: 0,
              scale: isCardRevealed ? 0.95 : 1,
              opacity: isCardRevealed ? 0.85 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mb-1 sm:mb-3 text-center px-4"
          >
            <p
              className={`font-sans-body text-xs sm:text-sm uppercase tracking-[4px] sm:tracking-[5px] mb-1 sm:mb-1.5 ${
                isDarkMode ? 'text-[#9A90A2]' : 'text-[#8C827A]'
              }`}
            >
              The Wedding Celebration Of
            </p>
            <h1 className="font-script-romantic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#C2A379] drop-shadow-sm tracking-wide my-0.5 sm:my-1">
              Glensan & Junah Joy
            </h1>
            <p
              className={`font-sans-body text-[11px] sm:text-xs uppercase tracking-[3px] sm:tracking-[4px] ${
                isDarkMode ? 'text-[#A09388]' : 'text-[#A6998E]'
              }`}
            >
              November 18, 2026 · Cebu City
            </p>
          </motion.div>

          {/* =========================================================================
              THE INVITATION STAGE: 3D PARALLAX ENVELOPE & ELEVATED CARD
              - Parallax 3D tilt is fully active during hover when idle!
              - Card is 100% hidden inside before click
              - Flap unfolds backward & fades out, envelope glides down as pedestal
              - Card rises into foreground (z-40) gracefully placed without overlapping display!
              ========================================================================= */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="envelope-perspective relative z-30 mx-auto px-4 w-full max-w-lg min-h-[360px] sm:min-h-[410px] flex items-center justify-center"
          >

            {/* -------------------------------------------------------------------
                1. THE 3D ENVELOPE (With Interactive Parallax Tilt)
                ------------------------------------------------------------------- */}
            <motion.div
              id="wedding-envelope-box"
              onClick={handleOpen}
              animate={{
                y: isCardRevealed ? (isMobileScreen ? 70 : 85) : 0,
                scale: isCardRevealed ? 0.88 : 1,
                opacity: isCardRevealed ? 0.65 : 1,
                rotateX: stage === 'idle' ? tilt.x : 0,
                rotateY: stage === 'idle' ? tilt.y : 0,
              }}
              transition={{
                rotateX: { duration: 0.12, ease: 'easeOut' },
                rotateY: { duration: 0.12, ease: 'easeOut' },
                y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.7 },
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="envelope-3d-box relative mx-auto h-[195px] w-[86vw] max-w-[295px] sm:h-[225px] sm:max-w-[365px] md:h-[240px] md:max-w-[395px] cursor-pointer group"
              title={stage === 'idle' ? 'Click envelope or seal to open' : undefined}
            >
              {/* ENVELOPE BACK LINING */}
              <div
                className="absolute inset-0 rounded-xl shadow-xl z-0 overflow-hidden"
                style={{
                  backgroundColor: isDarkMode ? '#231F30' : '#EFE5D5',
                  boxShadow: isHovered && stage === 'idle'
                    ? '0 25px 45px rgba(168, 139, 100, 0.28), 0 10px 20px rgba(0,0,0,0.08)'
                    : '0 20px 40px rgba(168, 139, 100, 0.2), 0 8px 16px rgba(0,0,0,0.06)',
                  border: isDarkMode
                    ? '1px solid rgba(194, 163, 121, 0.3)'
                    : '1px solid rgba(194, 163, 121, 0.4)',
                }}
              >
                {/* Monogram watermark */}
                <div className="absolute inset-2 border border-dashed border-[#D8C7B0]/30 rounded-lg flex items-center justify-center pointer-events-none">
                  <span className="font-script-romantic text-4xl sm:text-5xl text-[#C2A379]/30">
                    G & J
                  </span>
                </div>
              </div>

              {/* ENVELOPE TOP FLAP (THE COVER)
                  - Closed: Folds down over the front at rotateX: 0
                  - Opening: Smoothly rotates 180° backwards
                  - When card elevates: Fades out completely (opacity: 0) to guarantee ZERO overlap! */}
              <motion.div
                initial={{ rotateX: 0, opacity: 1 }}
                animate={{
                  rotateX: isFlapOpen ? -180 : 0,
                  opacity: isCardRevealed ? 0 : 1,
                }}
                transition={{
                  rotateX: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.4, delay: isCardRevealed ? 0.1 : 0 },
                }}
                style={{
                  transformOrigin: 'top center',
                  zIndex: isFlapOpen ? 0 : 30,
                  backgroundColor: isDarkMode ? '#282337' : '#F4ECE0',
                  clipPath: 'polygon(0 0, 100% 0, 50% 56%)',
                }}
                className="flap-top absolute top-0 left-0 right-0 h-full rounded-t-xl"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 56%)',
                    boxShadow: isDarkMode
                      ? 'inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(194, 163, 121, 0.3)'
                      : 'inset 0 2px 0 rgba(255,255,255,0.7), inset 0 -2px 0 rgba(194, 163, 121, 0.3)',
                  }}
                />
              </motion.div>

              {/* ENVELOPE FRONT POCKET TRIANGLE FLAPS (Left, Right, Bottom)
                  These stay at z-15 & z-20 so the card emerges authentically from behind them! */}
              {/* Left Pocket */}
              <div
                className="absolute inset-0 z-15 pointer-events-none rounded-xl"
                style={{
                  backgroundColor: isDarkMode ? '#1E1A29' : '#F9F5EE',
                  clipPath: 'polygon(0 0, 0 100%, 52% 50%)',
                  filter: 'drop-shadow(2px 0 3px rgba(0, 0, 0, 0.15))',
                  borderLeft: '1px solid rgba(194, 163, 121, 0.3)',
                }}
              />

              {/* Right Pocket */}
              <div
                className="absolute inset-0 z-15 pointer-events-none rounded-xl"
                style={{
                  backgroundColor: isDarkMode ? '#1E1A29' : '#F9F5EE',
                  clipPath: 'polygon(100% 0, 100% 100%, 48% 50%)',
                  filter: 'drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.15))',
                  borderRight: '1px solid rgba(194, 163, 121, 0.3)',
                }}
              />

              {/* Bottom Pocket */}
              <div
                className="absolute inset-0 z-20 pointer-events-none rounded-b-xl"
                style={{
                  backgroundColor: isDarkMode ? '#191524' : '#F3EDE2',
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 42%)',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.25)',
                  borderBottom: '1px solid rgba(194, 163, 121, 0.35)',
                }}
              />

              {/* INTERACTIVE PARALLAX WAX SEAL (G&J)
                  Mounted at 3D depth. Tilts and shifts light glint based on mouse position! */}
              {!isFlapOpen && (
                <motion.div
                  ref={sealRef}
                  id="envelope-wax-seal"
                  animate={{
                    scale: stage === 'unsealing' ? [1, 1.25, 0] : isHovered ? 1.08 : 1,
                    opacity: stage === 'unsealing' ? [1, 1, 0] : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className="wax-seal-interactive absolute top-[48%] sm:top-[50%] left-1/2 z-35 flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full seal-glow -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translateZ(24px) rotateX(${tilt.x * 0.7}deg) rotateY(${tilt.y * 0.7}deg)`,
                    background: `radial-gradient(circle at ${tilt.lightX}% ${tilt.lightY}%, #FFF3DA 0%, #DFBF8B 32%, #A88B64 70%, #755935 100%)`,
                    boxShadow: isHovered
                      ? `${-tilt.y * 1.4}px ${12 + tilt.x * 1.4}px 28px rgba(122, 95, 58, 0.6), inset 0 2px 5px rgba(255, 255, 255, 0.7), inset 0 -2px 5px rgba(0, 0, 0, 0.45)`
                      : '0 8px 22px rgba(122, 95, 58, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 -2px 4px rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(255, 246, 222, 0.8)',
                  }}
                >
                  <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#FAF0DE]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),_0_1px_2px_rgba(255,255,255,0.4)] bg-gradient-to-br from-[#BA9C72]/30 to-[#694E2B]/40">
                    <span className="font-script-romantic text-lg sm:text-xl font-bold text-[#3E2D17] drop-shadow-[0_1px_1px_rgba(255,245,225,0.7)] select-none">
                      G&J
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* -------------------------------------------------------------------
                2. THE ROYAL WEDDING INVITATION CARD
                * COMPLETELY HIDDEN before clicking (opacity: 0, y: 0)
                * As flap opens, slides smoothly out of the pocket
                * Reaches elevated center stage (z-40) placed lower to prevent display overlap
                * Graceful pedestal framing atop the open envelope below!
                ------------------------------------------------------------------- */}
            <motion.div
              id="pop-up-invitation-card"
              initial={{ y: 0, scale: 0.9, opacity: 0 }}
              animate={{
                y: isCardRevealed ? (isMobileScreen ? -30 : -45) : stage === 'flap-opening' ? -10 : 0,
                scale: isCardRevealed ? 1.0 : 0.92,
                opacity: isCardRevealed ? 1 : stage === 'flap-opening' ? 0.9 : 0,
                zIndex: isCardRevealed ? 40 : 5,
              }}
              transition={{
                duration: isCardRevealed ? 0.9 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                if (isCardRevealed) {
                  handleImmediateEnter();
                }
              }}
              className={`absolute mx-auto w-[86vw] max-w-[285px] sm:max-w-[350px] md:max-w-[380px] h-[285px] sm:h-[325px] md:h-[340px] rounded-2xl border-2 p-3 sm:p-4 flex flex-col justify-between items-center text-center ${
                isCardRevealed ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
              } ${
                isDarkMode
                  ? 'bg-[#181523] border-[#C2A379] text-[#F3EBE6]'
                  : 'bg-[#FFFDF9] border-[#C2A379] text-[#3A3530]'
              }`}
              style={{
                boxShadow: isCardRevealed
                  ? isDarkMode
                    ? '0 25px 65px -10px rgba(0, 0, 0, 0.9), 0 0 35px rgba(194, 163, 121, 0.45)'
                    : '0 25px 60px -10px rgba(142, 69, 133, 0.35), 0 0 30px rgba(194, 163, 121, 0.4), 0 0 0 1px rgba(194, 163, 121, 0.6)'
                  : 'none',
              }}
            >
              {/* Ornate Gold Inner Border Accent */}
              <div className="absolute inset-1.5 sm:inset-2 border border-[#C2A379]/40 rounded-xl pointer-events-none" />

              {/* Card Header Crest */}
              <div className="w-full">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Sparkles className="w-3 h-3 text-[#C2A379]" />
                  <p className="font-sans-body text-[9px] sm:text-[10px] tracking-[4px] text-[#C2A379] uppercase font-semibold">
                    Official Invitation
                  </p>
                  <Sparkles className="w-3 h-3 text-[#C2A379]" />
                </div>
                <h2 className="font-serif-title text-xl sm:text-2xl font-normal tracking-wide text-[#C2A379]">
                  Glensan & Junah Joy
                </h2>
              </div>

              {/* Romantic Invitation Calligraphy */}
              <div className="py-1">
                <p className="font-script-romantic text-2xl sm:text-3xl text-[#C879B5] leading-tight">
                  Together with their families
                </p>
                <p
                  className={`font-sans-body text-[9px] sm:text-[10px] tracking-[2px] uppercase mt-0.5 max-w-xs mx-auto ${
                    isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
                  }`}
                >
                  Cordially invite you to celebrate their holy union
                </p>
              </div>

              {/* Ceremony & Reception Venue Info */}
              <div className="w-full pt-2 border-t border-[#C2A379]/30">
                <p
                  className={`font-serif-title text-xs sm:text-sm font-semibold tracking-wider ${
                    isDarkMode ? 'text-[#EFE7DE]' : 'text-[#4A4540]'
                  }`}
                >
                  WEDNESDAY · NOVEMBER 18, 2026 · 2:00 PM
                </p>
                <p
                  className={`font-sans-body text-[8px] sm:text-[9px] tracking-wider uppercase mt-0.5 ${
                    isDarkMode ? 'text-[#AFA498]' : 'text-[#8C827A]'
                  }`}
                >
                  Iglesia Ni Cristo · Lokal ng Tisa, Cebu City
                </p>
                <p
                  className={`font-sans-body text-[8px] sm:text-[9px] tracking-wider uppercase opacity-80 ${
                    isDarkMode ? 'text-[#9A90A2]' : 'text-[#9A8D84]'
                  }`}
                >
                  Reception: The Uncle Tom's Cabin Capitol Cebu
                </p>
              </div>

              {/* 4-Second Animated Progress Bar & Quick Enter Link */}
              {isCardRevealed && (
                <div className="w-full mt-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#EAE0D2]/40 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#C2A379] via-[#EAA2B8] to-[#8E4585] h-full rounded-full"
                      style={{
                        animation: 'progressFill 4.0s linear forwards',
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between w-full px-1">
                    <span
                      className={`text-[9px] font-sans-body tracking-wider uppercase flex items-center gap-1.5 ${
                        isDarkMode ? 'text-[#C2A379]' : 'text-[#8E4585]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-[#C2A379] animate-spin" />
                      <span>Entering Celebration ({countdownSeconds}s)...</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImmediateEnter();
                      }}
                      type="button"
                      className="cursor-pointer text-[9px] font-sans-body tracking-wider uppercase font-semibold text-[#C2A379] hover:underline flex items-center gap-1 group"
                    >
                      <span>Enter Now</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Action Button & Click Hint (Visible before unsealing, smoothly fades away once card emerges) */}
          <motion.div
            animate={{
              opacity: isCardRevealed ? 0 : 1,
              y: isCardRevealed ? 20 : 0,
              pointerEvents: isCardRevealed ? 'none' : 'auto',
            }}
            transition={{ duration: 0.6 }}
            className="relative z-20 mt-4 sm:mt-6 flex flex-col items-center gap-2.5"
          >
            <button
              id="btn-open-invitation"
              onClick={handleOpen}
              disabled={stage !== 'idle'}
              className={`group relative px-8 sm:px-12 py-3 sm:py-3.5 font-sans-body text-xs uppercase tracking-[4px] border transition-all duration-500 shadow-sm hover:shadow-md active:scale-95 cursor-pointer disabled:opacity-75 ${
                isDarkMode
                  ? 'border-[#C2A379] text-[#EFE7DE] hover:bg-[#C2A379] hover:text-[#181523]'
                  : 'border-[#C2A379] text-[#4A4A4A] hover:bg-[#C2A379] hover:text-white'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Heart className="h-3.5 w-3.5 text-[#C2A379] group-hover:text-current group-hover:fill-current transition-colors" />
                {stage === 'idle'
                  ? 'Open Invitation'
                  : stage === 'done'
                  ? 'Welcome!'
                  : 'Opening Invitation...'}
              </span>
            </button>

            <p
              className={`font-sans-body text-[10px] sm:text-xs tracking-[2px] uppercase flex items-center gap-1.5 opacity-80 ${
                isDarkMode ? 'text-[#9E94A8]' : 'text-[#A6998E]'
              }`}
            >
              <Sparkles className="h-3 w-3 text-[#C2A379]" />
              {stage === 'idle' ? 'Click envelope or seal to open' : 'Revealing Wedding Invitation...'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
