import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Navigation,
  Gift,
  ExternalLink,
  Layers,
  Compass,
  Moon,
  Sun,
  Menu,
  X,
  Users,
  Baby,
  Smartphone,
  HelpCircle,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { Attire } from './Attire';
import { Entourage } from './Entourage';
import { GoogleRsvpForm } from './GoogleRsvpForm';
import { FloatingRsvpBubble } from './FloatingRsvpBubble';
import { ScrollRevealSection } from './ScrollRevealSection';
import { WeddingCalendar } from './WeddingCalendar';
import { WishingWell } from './WishingWell';
import { useTheme } from '../context/ThemeContext';

interface WeddingSectionsProps {
  onReplayIntro: () => void;
}

export const WeddingSections: React.FC<WeddingSectionsProps> = ({ onReplayIntro }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Countdown to November 18, 2026, 2:00 PM Cebu Time (UTC+8)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [activeVenueTab, setActiveVenueTab] = useState<'both' | 'ceremony' | 'reception'>('both');
  const [mapViewType, setMapViewType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Interactive FAQ Accordion State (defaulting key questions open for instant clarity)
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'plus-one': true,
    'kids': true,
    'phones': true,
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAllFaqs = () => {
    setOpenFaqIds({
      'plus-one': true,
      'kids': true,
      'phones': true,
      'schedule': true,
      'attire': true,
      'gifts': true,
      'rsvp': true,
    });
  };

  const handleCollapseAllFaqs = () => {
    setOpenFaqIds({});
  };

  useEffect(() => {
    const targetDate = new Date('2026-11-18T14:00:00+08:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative z-20 min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0E0D14] text-[#EAE5DF]' : 'bg-[#FDFBF7] text-[#3A3530]'
      }`}
    >
      {/* LUXURY TOP NAVIGATION BAR */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 shadow-2xs ${
          isDarkMode
            ? 'bg-[#12101C]/95 border-[#2E283D] text-[#EAE5DF]'
            : 'bg-[#FDFBF7]/95 border-[#EAE0D2] text-[#3A3530]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 pr-14 sm:pr-16 h-13 sm:h-14 flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left group cursor-pointer"
          >
            <span
              className={`font-serif-title text-base sm:text-xl font-normal tracking-wide transition-colors ${
                isDarkMode
                  ? 'text-[#F3EBE6] group-hover:text-[#D4AF37]'
                  : 'text-[#3A3530] group-hover:text-[#C2A379]'
              }`}
            >
              Glensan & Junah Joy
            </span>
          </button>

          {/* Clean Navigation Links (Desktop) */}
          <nav
            className={`hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-sans-body uppercase tracking-[1.5px] ${
              isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
            }`}
          >
            <button
              onClick={() => scrollToSection('schedule-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              When & Where
            </button>
            <button
              onClick={() => scrollToSection('calendar-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => scrollToSection('attire-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              Attire & Motif
            </button>
            <button
              onClick={() => scrollToSection('entourage-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              Entourage
            </button>
            <button
              onClick={() => scrollToSection('rsvp-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              RSVP
            </button>
            <button
              onClick={() => scrollToSection('wishing-well-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              Wishing Well
            </button>
            <button
              onClick={() => scrollToSection('guidelines-section')}
              className={`transition-colors cursor-pointer ${
                isDarkMode ? 'hover:text-[#F3EBE6]' : 'hover:text-[#3A3530]'
              }`}
            >
              FAQs
            </button>
          </nav>

          {/* Action Buttons: Dark Mode Toggle, Replay Envelope & RSVP CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              type="button"
              aria-label="Toggle Dark Mode"
              className={`px-2 sm:px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-[11px] font-sans-body ${
                isDarkMode
                  ? 'bg-[#1D1929] border-[#3D354E] text-[#D4AF37] hover:bg-[#252033]'
                  : 'bg-white border-[#EAE0D2] text-[#6E645D] hover:text-[#3A3530] hover:bg-[#FAF7F0]'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#8C827A]" />
              )}
              <span className="hidden sm:inline font-medium">
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
            </button>

            <button
              onClick={onReplayIntro}
              className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-sans-body px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'text-[#B8ADC0] border-[#372F47] hover:bg-[#1D1929] hover:text-white'
                  : 'text-[#8C827A] border-[#EAE0D2] hover:bg-[#FAF7F0] hover:text-[#3A3530]'
              }`}
              title="Re-open 3D Envelope Animation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Intro</span>
            </button>

            <button
              onClick={() => scrollToSection('rsvp-section')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white text-[11px] font-sans-body uppercase tracking-wider transition-all shadow-xs cursor-pointer font-medium"
            >
              RSVP
            </button>

            {/* Mobile / Tablet Menu Button (< lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className={`lg:hidden p-1 sm:p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-[#3D354E] text-[#F3EBE6] hover:bg-[#1E1A29]'
                  : 'border-[#EAE0D2] text-[#3A3530] hover:bg-[#FAF7F0]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-b px-5 py-4 space-y-3 transition-all ${
              isDarkMode
                ? 'bg-[#14121F] border-[#2E283D] text-[#F3EBE6]'
                : 'bg-[#FAF8F5] border-[#EAE0D2] text-[#3A3530]'
            }`}
          >
            <button
              onClick={() => {
                scrollToSection('schedule-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              1. When & Where (Venues & Maps)
            </button>
            <button
              onClick={() => {
                scrollToSection('calendar-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              2. Save Our Date (Wedding Calendar)
            </button>
            <button
              onClick={() => {
                scrollToSection('attire-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              3. Attire & Motif (Visual Guide)
            </button>
            <button
              onClick={() => {
                scrollToSection('entourage-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              4. Wedding Entourage (Roster)
            </button>
            <button
              onClick={() => {
                scrollToSection('rsvp-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              5. RSVP Attendance
            </button>
            <button
              onClick={() => {
                scrollToSection('wishing-well-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              6. Wishing Well & QR Transfers
            </button>
            <button
              onClick={() => {
                scrollToSection('guidelines-section');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-sans-body uppercase tracking-[2px] hover:text-[#C2A379] transition-colors"
            >
              7. FAQs & Reminders
            </button>
            <button
              onClick={() => {
                onReplayIntro();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-xs font-sans-body uppercase tracking-[2px] text-[#C2A379] font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay 3D Invitation Intro</span>
            </button>
            <div className="pt-2 border-t border-[#C2A379]/20 flex items-center justify-between">
              <span className="text-xs font-sans-body uppercase tracking-[2px] opacity-75">
                Theme: {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={toggleDarkMode}
                type="button"
                className={`px-3 py-1.5 rounded-lg border text-xs font-sans-body flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isDarkMode
                    ? 'bg-[#1D1929] border-[#3D354E] text-[#D4AF37]'
                    : 'bg-white border-[#EAE0D2] text-[#6E645D]'
                }`}
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-[#8C827A]" />}
                <span>{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO COVER SECTION WITH CINEMATIC PRENUP BACKGROUND (COMPACT VIEWPORT HEIGHT) */}
      <section className="relative min-h-[58vh] sm:min-h-[66vh] flex flex-col justify-center items-center text-center px-3 sm:px-6 py-6 sm:py-9 md:py-11 overflow-hidden">
        {/* Prenup Hero Background Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.imgur.com/8XnNg0U.jpeg"
            alt="Glensan and Junah Joy Wedding Prenup"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_35%] sm:object-center filter brightness-[0.92]"
          />
          {/* Warm Bridal Vignette & Scrim Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDarkMode
                ? 'from-[#0E0D14] via-black/45 to-black/65'
                : 'from-[#FDFBF7] via-black/35 to-black/55'
            }`}
          />
        </div>

        {/* Hero Text Content (Compact scaled typography so background and content are immediately visible) */}
        <div className="relative z-10 w-full max-w-3xl mx-auto text-white mt-0.5 sm:mt-1.5 mb-1 sm:mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/25 text-[#FAF0DE] text-[9px] sm:text-[11px] uppercase tracking-[2px] font-sans-body mb-1.5 sm:mb-2 shadow-lg">
            <Heart className="w-3 h-3 text-[#EAA2B8] fill-current" />
            <span>The Holy Matrimony</span>
          </div>

          <h1 className="font-script-romantic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg leading-tight mb-1 select-none">
            Glensan & Junah Joy
          </h1>

          <p className="font-serif-title text-xs sm:text-sm md:text-base text-[#FAF0DE] font-light tracking-wide max-w-lg mx-auto mb-1.5 sm:mb-2 drop-shadow-sm px-2">
            Together with their families, cordially invite you to celebrate their union
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[9px] sm:text-xs md:text-[13px] font-sans-body uppercase tracking-[1.5px] text-white/95 px-2">
            <span className="flex items-center gap-1 drop-shadow-xs">
              <Calendar className="w-3 h-3 text-[#C2A379]" />
              Wednesday, November 18, 2026
            </span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="flex items-center gap-1 drop-shadow-xs">
              <Clock className="w-3 h-3 text-[#C2A379]" />
              2:00 PM
            </span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="flex items-center gap-1 drop-shadow-xs">
              <MapPin className="w-3 h-3 text-[#C2A379]" />
              Iglesia Ni Cristo · Tisa Locale
            </span>
          </div>

          {/* Official Wedding Hashtag Pill */}
          <div className="mt-1.5 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-[#C2A379]/50 text-[#F3EBE6] text-[9px] sm:text-[10px] font-mono tracking-wider shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#C2A379]" />
              <span>#GLENfoundhisJOY∞</span>
              <Sparkles className="w-2.5 h-2.5 text-[#C2A379]" />
            </span>
          </div>
        </div>

        {/* COMPACT & ELEGANT COUNTDOWN SHOWCASE */}
        <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto mt-1 sm:mt-2 px-1">
          <div
            className={`relative rounded-xl sm:rounded-2xl backdrop-blur-md border p-2 sm:p-3 md:p-3.5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.35)] overflow-hidden ${
              isDarkMode
                ? 'bg-[#151221]/85 border-[#C2A379]/55'
                : 'bg-white/85 border-[#C2A379]/55'
            }`}
          >
            {/* Ambient luxury radial glow */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#EAA2B8]/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C2A379]/25 rounded-full blur-xl pointer-events-none" />

            {/* Monogram & Title Banner */}
            <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
              <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#C2A379]" />
              <div className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C2A379]" />
                <span
                  className={`font-sans-body text-[9px] sm:text-xs uppercase tracking-[2px] font-semibold ${
                    isDarkMode ? 'text-[#D8CFDC]' : 'text-[#8C827A]'
                  }`}
                >
                  Counting Down to Forever
                </span>
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C2A379]" />
              </div>
              <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#C2A379]" />
            </div>

            {/* Countdown Grid with Tabular Elegance */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-lg border p-1 sm:p-1.5 text-center shadow-xs transition-all duration-300 hover:border-[#C2A379] ${
                    isDarkMode
                      ? 'bg-gradient-to-b from-[#221C30]/90 to-[#1B1727]/90 border-[#362D47]'
                      : 'bg-gradient-to-b from-[#FFFDF9]/95 to-[#FAF7F0]/95 border-[#E8DCCF]'
                  }`}
                >
                  <div className="absolute top-0 inset-x-1.5 h-[2px] bg-gradient-to-r from-transparent via-[#C2A379]/70 to-transparent" />
                  <div
                    className={`font-serif-title text-base sm:text-xl md:text-2xl font-semibold tabular-nums leading-none my-0.5 tracking-tight drop-shadow-2xs ${
                      isDarkMode ? 'text-[#F5EFEB]' : 'text-[#3A3530]'
                    }`}
                  >
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="font-sans-body text-[8px] sm:text-[9px] uppercase tracking-[1px] text-[#C2A379] font-medium mt-0.5 truncate">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Target Date Banner */}
            <div
              className={`mt-1.5 sm:mt-2 pt-1.5 border-t flex items-center justify-between text-[10px] sm:text-[11px] font-sans-body ${
                isDarkMode
                  ? 'border-[#2C2438] text-[#B8ADC0]'
                  : 'border-[#F0E6D8] text-[#7A7067]'
              }`}
            >
              <span
                className={`hidden sm:inline text-[9px] sm:text-[10px] tracking-wider uppercase ${
                  isDarkMode ? 'text-[#AFA498]' : 'text-[#8C827A]'
                }`}
              >
                Holy Vows at Iglesia Ni Cristo
              </span>
              <span
                className={`font-serif-title text-xs sm:text-sm font-semibold mx-auto sm:mx-0 ${
                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                }`}
              >
                November 18, 2026 · 2:00 PM Sharp
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('rsvp-section')}
                className="hidden sm:inline-flex text-[#C2A379] text-xs font-semibold hover:underline cursor-pointer"
              >
                Confirm Attendance &rarr;
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('schedule-section')}
          className="relative z-10 mt-2 sm:mt-3 text-white/80 hover:text-white transition-colors animate-bounce cursor-pointer"
          title="Scroll down to ceremony & reception"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </section>

      {/* MAIN CONTAINER (COMPACT PADDING & SPACING FOR IMMEDIATE VISIBILITY & LESS SCROLLING) */}
      <main className="max-w-5xl mx-auto px-3 sm:px-5 py-6 sm:py-9 space-y-8 sm:space-y-12">

        {/* SECTION 1: SCHEDULE & VENUES (INC LOKAL NG TISA + UNCLE TOM'S CABIN) */}
        <ScrollRevealSection id="schedule-section" className="scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[2px] font-sans-body mb-1.5 shadow-2xs border ${
                isDarkMode
                  ? 'bg-[#1E182A] border-[#382E4D] text-[#C2A379]'
                  : 'bg-[#FAF3EA] border-[#E8DCB8] text-[#A88B64]'
              }`}
            >
              <MapPin className="w-3 h-3 text-[#C2A379]" />
              <span>Official Schedule & Two Venues</span>
            </div>

            <h2
              className={`font-serif-title text-2xl sm:text-3xl md:text-4xl font-normal mt-0.5 mb-1.5 ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              When & Where
            </h2>

            <p
              className={`font-sans-body text-xs sm:text-sm leading-relaxed max-w-lg mx-auto ${
                isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
              }`}
            >
              Our celebration takes place across two special locations in Cebu City. Review
              the ceremony church and reception banquet details below.
            </p>

            {/* HIGH-VISIBILITY DUAL VENUE SHOWCASE SELECTOR (COMPACT FLOATING GLASSMORPHISM) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-3.5 max-w-2xl mx-auto text-left">
              {/* Venue Card 1: Ceremony */}
              <button
                type="button"
                onClick={() => setActiveVenueTab('ceremony')}
                className={`glass-floating-btn p-3 sm:p-3.5 rounded-xl cursor-pointer relative overflow-hidden group ${
                  activeVenueTab === 'ceremony'
                    ? 'active-venue ring-2 ring-[#C2A379]'
                    : 'hover:border-[#C2A379]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[9px] font-sans-body uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#C2A379]/20 text-[#C2A379] border border-[#C2A379]/40 backdrop-blur-xs">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                    Part 1 · Ceremony
                  </span>
                  <div className="flex items-center gap-1">
                    {activeVenueTab === 'ceremony' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2A379] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2A379]"></span>
                      </span>
                    )}
                    <span className="text-[11px] font-mono font-bold text-[#C879B5]">
                      2:00 PM Sharp
                    </span>
                  </div>
                </div>
                <h3 className="font-serif-title text-base sm:text-lg font-semibold leading-tight mb-0.5">
                  Iglesia Ni Cristo
                </h3>
                <p className="text-[11px] font-sans-body text-stone-600 dark:text-stone-300">
                  Lokal ng Tisa (Arrival: 1:30 PM)
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-sans-body font-medium">
                  <span className={activeVenueTab === 'ceremony' ? 'text-[#C2A379] font-bold' : 'text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-200'}>
                    {activeVenueTab === 'ceremony' ? '● Currently Viewing' : 'Tap for Details & Map →'}
                  </span>
                </div>
              </button>

              {/* Venue Card 2: Reception */}
              <button
                type="button"
                onClick={() => setActiveVenueTab('reception')}
                className={`glass-floating-btn p-3 sm:p-3.5 rounded-xl cursor-pointer relative overflow-hidden group ${
                  activeVenueTab === 'reception'
                    ? 'active-venue ring-2 ring-[#C2A379]'
                    : 'hover:border-[#C2A379]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[9px] font-sans-body uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#C879B5]/20 text-[#C879B5] border border-[#C879B5]/40 backdrop-blur-xs">
                    <Clock className="w-2.5 h-2.5" />
                    Part 2 · Reception
                  </span>
                  <div className="flex items-center gap-1">
                    {activeVenueTab === 'reception' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C879B5] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C879B5]"></span>
                      </span>
                    )}
                    <span className="text-[11px] font-mono font-bold text-[#C2A379]">
                      4:00 PM / 6:00 PM
                    </span>
                  </div>
                </div>
                <h3 className="font-serif-title text-base sm:text-lg font-semibold leading-tight mb-0.5">
                  The Uncle Tom's Cabin
                </h3>
                <p className="text-[11px] font-sans-body text-stone-600 dark:text-stone-300">
                  Capitol Cebu (Dinner Banquet)
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-sans-body font-medium">
                  <span className={activeVenueTab === 'reception' ? 'text-[#C2A379] font-bold' : 'text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-200'}>
                    {activeVenueTab === 'reception' ? '● Currently Viewing' : 'Tap for Details & Map →'}
                  </span>
                </div>
              </button>
            </div>

            {/* Quick View All / Filter Pill */}
            <div className="flex items-center justify-center gap-2 mt-2.5 mb-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveVenueTab('both')}
                className={`glass-floating-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans-body transition-all cursor-pointer ${
                  activeVenueTab === 'both'
                    ? 'ring-2 ring-[#C2A379] bg-[#FAF3EA] dark:bg-[#251D33] text-[#3A3530] dark:text-[#FAF0DE] font-semibold'
                    : 'text-[#6E645D] dark:text-[#B8ADC0] hover:text-[#3A3530] dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#C2A379]" />
                <span>Show Both Venues Together (All Details & Maps)</span>
                {activeVenueTab === 'both' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A379] animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Helper Notice for Guests on Mobile */}
            <div
              className={`p-2 rounded-lg border text-[10px] sm:text-[11px] font-sans-body inline-flex items-center gap-1.5 max-w-xl mx-auto mt-1 ${
                isDarkMode
                  ? 'bg-[#1A1628] border-[#362E4A] text-[#D8CFDC]'
                  : 'bg-[#FAF5EC] border-[#EAE0D2] text-[#6E645D]'
              }`}
            >
              <Navigation className="w-3 h-3 text-[#C2A379] shrink-0" />
              <span>
                <strong>Travel Notice:</strong> Ceremony & Reception are held at separate venues (~15 mins drive). Details & Google Maps below.
              </span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* =========================================================================
                VENUE 1: CEREMONY AT IGLESIA NI CRISTO - LOKAL NG TISA
                ========================================================================= */}
            {(activeVenueTab === 'both' || activeVenueTab === 'ceremony') && (
              <div
                className={`rounded-2xl border p-3.5 sm:p-5 shadow-xs transition-all ${
                  isDarkMode
                    ? 'bg-[#151221] border-[#C2A379]/40'
                    : 'bg-white border-[#C2A379]/40'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[2px] text-[#C2A379] font-bold mb-2">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        Part 1 · Holy Matrimony Ceremony
                      </div>
                      <h3
                        className={`font-serif-title text-2xl sm:text-3xl lg:text-4xl font-normal mb-1 ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Iglesia Ni Cristo
                      </h3>
                      <p className="font-serif-title text-lg sm:text-xl text-[#C879B5] mb-2 font-semibold">
                        Lokal ng Tisa
                      </p>
                      <p
                        className={`font-sans-body text-xs sm:text-sm leading-relaxed mb-4 ${
                          isDarkMode ? 'text-[#B8ADC0]' : 'text-[#666]'
                        }`}
                      >
                        Cabarrubias St, Tisa, Cebu City, Cebu 6000, Philippines
                      </p>

                      <div
                        className={`space-y-3 border-t pt-4 ${
                          isDarkMode ? 'border-[#2D263C]' : 'border-[#F0E6D8]'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-3 text-xs sm:text-sm ${
                            isDarkMode ? 'text-[#EFE7DF]' : 'text-[#3A3530]'
                          }`}
                        >
                          <Clock className="w-4 h-4 text-[#C2A379] shrink-0" />
                          <span>
                            <strong className="text-[#C879B5]">Guest Arrival:</strong> 1:30 PM &nbsp;|&nbsp;{' '}
                            <strong>Ceremony:</strong> 2:00 PM Sharp
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-3 text-xs sm:text-sm ${
                            isDarkMode ? 'text-[#EFE7DF]' : 'text-[#3A3530]'
                          }`}
                        >
                          <Calendar className="w-4 h-4 text-[#C2A379] shrink-0" />
                          <span>Wednesday, November 18, 2026</span>
                        </div>
                        <div
                          className={`flex items-start gap-2.5 text-xs p-2.5 rounded-lg border ${
                            isDarkMode
                              ? 'bg-[#1E1A29] border-[#312940] text-[#B8ADC0]'
                              : 'bg-[#FAF7F2] border-[#EAE0D2] text-[#7A7067]'
                          }`}
                        >
                          <Compass className="w-4 h-4 text-[#C2A379] shrink-0 mt-0.5" />
                          <span>
                            <strong>Landmark & Route:</strong> Located along Cabarrubias Street in Tisa,
                            accessible via Katipunan St and F. Llamas St. Coordinates:{' '}
                            <code
                              className={`font-mono text-[10px] ${
                                isDarkMode ? 'text-[#D4AF37]' : 'text-[#3A3530]'
                              }`}
                            >
                              10°18'02.0"N 123°52'20.0"E
                            </code>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`pt-4 mt-5 border-t flex flex-wrap gap-2.5 ${
                        isDarkMode ? 'border-[#2D263C]' : 'border-[#F0E6D8]'
                      }`}
                    >
                      <a
                        href="https://maps.app.goo.gl/PJwLyobGnvPRbtS89"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white text-xs font-sans-body uppercase tracking-wider shadow-xs transition-all font-semibold"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          setMapViewType((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'))
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-sans-body transition-colors cursor-pointer ${
                          isDarkMode
                            ? 'border-[#3D344E] text-[#B8ADC0] hover:bg-[#1E1A29]'
                            : 'border-[#D8C7B0] text-[#6E645D] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{mapViewType === 'roadmap' ? 'Satellite View' : 'Roadmap View'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Compact Map Visualizer for INC Lokal ng Tisa */}
                  <div
                    className={`lg:col-span-7 relative h-[200px] sm:h-[240px] lg:h-[265px] rounded-xl overflow-hidden border shadow-inner flex flex-col ${
                      isDarkMode
                        ? 'border-[#C2A379]/40 bg-[#1A1626]'
                        : 'border-[#C2A379]/30 bg-stone-100'
                    }`}
                  >
                    <div
                      className={`absolute top-2 left-2 right-2 z-10 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border flex items-center justify-between text-xs ${
                        isDarkMode
                          ? 'bg-[#151221]/95 border-[#342D45] text-[#F3EBE6]'
                          : 'bg-white/95 border-[#E0D4C3] text-[#3A3530]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <span className="flex h-2 w-2 relative shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="font-semibold text-[10px] sm:text-[11px] truncate">
                          INC - Lokal ng Tisa
                        </span>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/PJwLyobGnvPRbtS89"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C2A379] font-bold hover:underline text-[10px] sm:text-[11px] shrink-0"
                      >
                        Directions &rarr;
                      </a>
                    </div>

                    <iframe
                      title="Exact Location Map - Iglesia Ni Cristo Lokal ng Tisa"
                      src={`https://maps.google.com/maps?q=Iglesia+Ni+Cristo+-+Lokal+ng+Tisa,+Cabarrubias+St,+Tisa,+Cebu+City,+Cebu,+Philippines&t=${
                        mapViewType === 'satellite' ? 'k' : ''
                      }&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* BOTTOM CALLOUT WHEN VIEWING ONLY CEREMONY */}
                {activeVenueTab === 'ceremony' && (
                  <div className="mt-3.5 pt-3 border-t border-[#C2A379]/30 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveVenueTab('reception')}
                      className="glass-floating-btn active-venue w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sans-body font-semibold cursor-pointer shadow-xs"
                    >
                      <span>👉 View Reception Details & Map at The Uncle Tom's Cabin (Dinner: 6:00 PM)</span>
                      <ExternalLink className="w-3 h-3 text-[#C2A379]" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                INTERACTIVE CONNECTOR TIMELINE BANNER (SHOWN WHEN BOTH ARE ACTIVE)
                ========================================================================= */}
            {activeVenueTab === 'both' && (
              <div className="relative py-1 text-center select-none">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-dashed border-[#C2A379]/40"></div>
                </div>
                <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-xs text-[11px] font-sans-body backdrop-blur-md bg-[#FAF3EA] dark:bg-[#201A2E] border-[#C2A379] text-[#3A3530] dark:text-[#FAF0DE]">
                  <Sparkles className="w-3 h-3 text-[#C2A379]" />
                  <span className="font-semibold">Next: Reception Banquet & Dinner</span>
                  <span className="text-[#C879B5] font-mono font-bold">4:00 PM onwards</span>
                  <span className="hidden sm:inline text-stone-400">·</span>
                  <span className="hidden sm:inline text-[10px] text-stone-500 dark:text-stone-400">~15 mins travel</span>
                </div>
              </div>
            )}

            {/* =========================================================================
                VENUE 2: RECEPTION AT THE UNCLE TOM'S CABIN
                ========================================================================= */}
            {(activeVenueTab === 'both' || activeVenueTab === 'reception') && (
              <div
                className={`rounded-2xl border p-3.5 sm:p-5 shadow-xs transition-all ${
                  isDarkMode
                    ? 'bg-[#151221] border-[#C2A379]/40'
                    : 'bg-white border-[#C2A379]/40'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[1.5px] text-[#C2A379] font-bold mb-1">
                        <Clock className="w-3 h-3" />
                        Part 2 · Reception Banquet & Celebration
                      </div>
                      <h3
                        className={`font-serif-title text-xl sm:text-2xl lg:text-3xl font-normal mb-0.5 ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        The Uncle Tom's Cabin
                      </h3>
                      <p className="font-serif-title text-base sm:text-lg text-[#C879B5] mb-1 font-semibold">
                        Capitol Cebu · Banquet & Dinner
                      </p>
                      <p
                        className={`font-sans-body text-[11px] sm:text-xs leading-relaxed mb-3 ${
                          isDarkMode ? 'text-[#B8ADC0]' : 'text-[#666]'
                        }`}
                      >
                        M.P. Yap St, Capitol Site, Cebu City, Cebu 6000, Philippines
                      </p>

                      <div
                        className={`space-y-2 border-t pt-2.5 ${
                          isDarkMode ? 'border-[#2D263C]' : 'border-[#F0E6D8]'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 text-xs ${
                            isDarkMode ? 'text-[#EFE7DF]' : 'text-[#3A3530]'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#C2A379] shrink-0" />
                          <span>
                            <strong className="text-[#C879B5]">Appetizers & Photobooth:</strong> 4:00 PM &nbsp;|&nbsp;{' '}
                            <strong>Dinner:</strong> 6:00 PM
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${
                            isDarkMode ? 'text-[#EFE7DF]' : 'text-[#3A3530]'
                          }`}
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#C2A379] shrink-0" />
                          <span>Wednesday, November 18, 2026 · 4:00 PM - 8:00 PM</span>
                        </div>
                        <div
                          className={`flex items-start gap-2 text-[11px] p-2 rounded-lg border ${
                            isDarkMode
                              ? 'bg-[#1E1A29] border-[#312940] text-[#B8ADC0]'
                              : 'bg-[#FAF7F2] border-[#EAE0D2] text-[#7A7067]'
                          }`}
                        >
                          <Compass className="w-3.5 h-3.5 text-[#C2A379] shrink-0 mt-0.5" />
                          <span>
                            <strong>Landmark & Route:</strong> Near Cebu Doctors Hospital / Capitol area. Accessible via Osmeña Blvd.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`pt-3 mt-3 border-t flex flex-wrap gap-2 ${
                        isDarkMode ? 'border-[#2D263C]' : 'border-[#F0E6D8]'
                      }`}
                    >
                      <a
                        href="https://maps.app.goo.gl/sJcntzUzUApGiECA8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white text-[11px] font-sans-body uppercase tracking-wider shadow-xs transition-all font-semibold"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* Compact Reception Map Embed */}
                  <div
                    className={`lg:col-span-7 relative h-[200px] sm:h-[240px] lg:h-[265px] rounded-xl overflow-hidden border shadow-inner flex flex-col ${
                      isDarkMode
                        ? 'border-[#C2A379]/40 bg-[#1A1626]'
                        : 'border-[#C2A379]/30 bg-stone-100'
                    }`}
                  >
                    <div
                      className={`absolute top-2 left-2 right-2 z-10 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border flex items-center justify-between text-xs ${
                        isDarkMode
                          ? 'bg-[#151221]/95 border-[#342D45] text-[#F3EBE6]'
                          : 'bg-white/95 border-[#E0D4C3] text-[#3A3530]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <span className="flex h-2 w-2 relative shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="font-semibold text-[10px] sm:text-[11px] truncate">
                          The Uncle Tom's Cabin (Reception)
                        </span>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/sJcntzUzUApGiECA8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C2A379] font-bold hover:underline text-[10px] sm:text-[11px] shrink-0"
                      >
                        Directions &rarr;
                      </a>
                    </div>

                    <iframe
                      title="Reception Location Map - Uncle Tom's Cabin"
                      src="https://maps.google.com/maps?q=Uncle+Tom's+Cabin+MP+Yap+St+Cebu+City&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* BOTTOM CALLOUT WHEN VIEWING ONLY RECEPTION */}
                {activeVenueTab === 'reception' && (
                  <div className="mt-3.5 pt-3 border-t border-[#C2A379]/30 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveVenueTab('ceremony')}
                      className="glass-floating-btn active-venue w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sans-body font-semibold cursor-pointer shadow-xs"
                    >
                      <span>👈 View Ceremony Details & Map at INC Lokal ng Tisa (Arrival: 1:30 PM)</span>
                      <ExternalLink className="w-3 h-3 text-[#C2A379]" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollRevealSection>

        {/* SECTION 2: OFFICIAL WEDDING CALENDAR WITH HIGHLIGHTED DATE ANIMATION */}
        <ScrollRevealSection id="calendar-section" className="scroll-mt-20">
          <WeddingCalendar />
        </ScrollRevealSection>

        {/* SECTION 3: EDITORIAL PRENUP PHOTO BREAK 1 (COMPACT HEIGHT) */}
        <ScrollRevealSection className="relative rounded-2xl overflow-hidden shadow-lg border border-[#C2A379]/40 min-h-[220px] sm:min-h-[280px] flex items-center justify-center text-center p-5 sm:p-7">
          <div className="absolute inset-0 z-0">
            <img
              src="https://i.imgur.com/MroFofm.jpeg"
              alt="Glensan and Junah Joy Beach Sunset Prenup"
              className="w-full h-full object-cover object-center filter brightness-[0.88]"
            />
            {/* Soft Warm Film Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/50" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto text-white">
            <span className="font-sans-body text-[9px] sm:text-[11px] uppercase tracking-[3px] text-amber-200 font-semibold mb-1 block">
              A Covenant of Faith & Love
            </span>
            <h3 className="font-script-romantic text-2xl sm:text-4xl text-white leading-tight mb-2">
              "Two are better than one, because they have a good return for their labor."
            </h3>
            <p className="font-serif-title text-xs sm:text-sm text-stone-200 font-light tracking-wider">
              Glensan & Junah Joy · November 18, 2026
            </p>
          </div>
        </ScrollRevealSection>

        {/* SECTION 3: ATTIRE & MOTIF */}
        <ScrollRevealSection id="attire-section" className="scroll-mt-20">
          <Attire />
        </ScrollRevealSection>

        {/* SECTION 4: WEDDING ENTOURAGE (ROSTER & WITNESSES) */}
        <ScrollRevealSection>
          <Entourage />
        </ScrollRevealSection>

        {/* SECTION 5: EDITORIAL PRENUP PHOTO BREAK 2 */}
        <ScrollRevealSection className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          <div className="md:col-span-7 relative rounded-2xl overflow-hidden shadow-md border border-white/20 aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3]">
            <img
              src="https://i.imgur.com/wPkO9oM.jpeg"
              alt="Romantic Prenup Garden Veil Embrace"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="font-script-romantic text-2xl sm:text-3xl text-amber-100">
                Together in His Grace
              </span>
            </div>
          </div>

          <div
            className={`md:col-span-5 p-4 sm:p-6 rounded-2xl border shadow-2xs space-y-2.5 text-left ${
              isDarkMode
                ? 'bg-[#171423] border-[#312940]'
                : 'bg-[#FAF7F2] border-[#EAE0D2]'
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center mb-0.5 ${
                isDarkMode ? 'bg-[#261E33] text-[#D8B4FE]' : 'bg-[#FAF0F5] text-[#8E4585]'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <h3
              className={`font-serif-title text-xl sm:text-2xl font-normal ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              A Celebration of Love & Fellowship
            </h3>
            <p
              className={`font-sans-body text-xs sm:text-[13px] leading-relaxed ${
                isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
              }`}
            >
              We are blessed to share this sacred milestone with our dearest families, beloved brethren,
              and lifelong friends. Your presence, prayers, and blessings mean the world to us.
            </p>
            <div
              className={`pt-1.5 border-t ${
                isDarkMode ? 'border-[#2C2438]' : 'border-[#E8DCCF]'
              }`}
            >
              <span className="font-sans-body text-[10px] uppercase tracking-wider text-[#C2A379] font-semibold">
                Iglesia Ni Cristo · Lokal ng Tisa
              </span>
            </div>
          </div>
        </ScrollRevealSection>

        {/* SECTION 6: RSVP SECTION (OFFICIAL GOOGLE FORM EMBED) */}
        <ScrollRevealSection id="rsvp-section" className="scroll-mt-20 text-center">
          <div className="max-w-xl mx-auto mb-4 sm:mb-6">
            <span className="font-sans-body text-[10px] sm:text-xs uppercase tracking-[2.5px] text-[#C2A379] font-medium">
              Your Presence Is Our Blessing
            </span>
            <h2
              className={`font-serif-title text-2xl sm:text-3xl md:text-4xl font-normal mt-0.5 mb-1.5 ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              RSVP
            </h2>
            <p
              className={`font-sans-body text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
              }`}
            >
              Kindly confirm your attendance through our official Google Form on or before{' '}
              <strong className={isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'}>
                October 15, 2026
              </strong>
              .
            </p>
          </div>

          {/* Primary Google Form Component */}
          <GoogleRsvpForm />
        </ScrollRevealSection>

        {/* SECTION 7: WISHING WELL & MONETARY DIGITAL TRANSFERS (SEPARATED FROM FAQS) */}
        <ScrollRevealSection
          id="wishing-well-section"
          className={`rounded-2xl border p-4 sm:p-6 md:p-8 scroll-mt-20 shadow-xs ${
            isDarkMode
              ? 'bg-[#151220] border-[#312940]'
              : 'bg-[#FAF7F2] border-[#EAE0D2]'
          }`}
        >
          <WishingWell />
        </ScrollRevealSection>

        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (FAQS) & GUEST REMINDERS */}
        <ScrollRevealSection
          id="guidelines-section"
          className={`rounded-2xl border p-4 sm:p-6 md:p-8 scroll-mt-20 shadow-xs ${
            isDarkMode
              ? 'bg-[#151220] border-[#312940]'
              : 'bg-[#FAF7F2] border-[#EAE0D2]'
          }`}
        >
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6 px-2">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[2px] font-sans-body mb-2 shadow-2xs border ${
                isDarkMode
                  ? 'bg-[#1E1929] border-[#383049] text-[#C2A379]'
                  : 'bg-white border-[#E8DCB8] text-[#A88B64]'
              }`}
            >
              <HelpCircle className="w-3 h-3" />
              <span>Helpful Guest Information</span>
            </div>
            <h3
              className={`font-serif-title text-2xl sm:text-3xl md:text-4xl font-normal mt-0.5 mb-1.5 ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              Frequently Asked Questions
            </h3>
            <p
              className={`font-sans-body text-xs sm:text-[13px] leading-relaxed ${
                isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
              }`}
            >
              To help you prepare and ensure a joyful, comfortable celebration for all, we’ve gathered answers to common questions below.
            </p>

            {/* Expand / Collapse All Toggles */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleExpandAllFaqs}
                className="text-xs font-sans-body font-medium text-[#C2A379] hover:underline cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-stone-400">·</span>
              <button
                type="button"
                onClick={handleCollapseAllFaqs}
                className="text-xs font-sans-body font-medium text-stone-500 hover:underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* FAQ Accordion List (COMPACT & CLEAN) */}
          <div className="max-w-2xl mx-auto space-y-2 sm:space-y-2.5">
            {[
              {
                id: 'plus-one',
                icon: Users,
                tag: 'Guest Attendance',
                badge: 'Intimate Gathering',
                question: 'Can I bring a Plus One or additional companion?',
                answer:
                  'Due to limited seating capacity at our venues, we can only accommodate guests who are formally named on our invitation list. We kindly ask that no extra companions be brought along. Thank you so much for your kind understanding and cooperation as we keep our celebration intimate with our closest family and friends!',
              },
              {
                id: 'kids',
                icon: Baby,
                tag: 'Children Policy',
                badge: 'Adults-Only',
                question: 'Are children or kids invited?',
                answer:
                  'While we love and cherish your children dearly, our wedding ceremony and reception are strictly an adults-only celebration (with the exception of children participating in the official wedding entourage). We hope you can take this opportunity to relax, enjoy the evening, and celebrate our special day with us!',
              },
              {
                id: 'phones',
                icon: Smartphone,
                tag: 'Church Protocol',
                badge: 'Sacred Reverence',
                question: 'What is the policy for mobile phones during the church ceremony?',
                answer:
                  'In accordance with the sacred reverence of Iglesia Ni Cristo (Lokal ng Tisa), all mobile phones and electronic devices must be surrendered to the assigned locale church officers upon entering the chapel. They will be safely secured and tagged, and returned to you immediately after the ceremony. We invite everyone to be fully present with us in heart and spirit during our sacred holy matrimony.',
              },
              {
                id: 'schedule',
                icon: Clock,
                tag: 'Time & Venues',
                badge: 'Punctuality',
                question: 'What time should I arrive for the ceremony and reception?',
                answer:
                  'The holy ceremony starts promptly at 2:00 PM at Iglesia Ni Cristo - Lokal ng Tisa. Please arrive by 1:30 PM for orderly entry and seating. At the reception (The Uncle Tom’s Cabin), appetizers and photobooth open at 4:00 PM, followed by dinner at 6:00 PM.',
              },
              {
                id: 'attire',
                icon: Sparkles,
                tag: 'Dress Code',
                badge: 'Motif Guide',
                question: 'What is the official dress code and color motif?',
                answer:
                  'Our wedding motif is Romantic Pink and Royal Purple for guests, and neutral tones (Champagne, Cream, Soft Beige, and Nude) for Principal Sponsors. In reverence to the church sanctuary, ladies’ dresses must have sleeves and closed backs (floor-length or midi). Gentlemen may wear Barong Tagalog, a tailored suit, or a neat polo/dress shirt with slacks. Pure white or ivory gowns are reserved exclusively for the bride.',
              },
              {
                id: 'gifts',
                icon: Gift,
                tag: 'Wishing Well',
                badge: 'Digital Transfers & Box',
                question: 'What is your preference for wedding gifts?',
                answer:
                  'Your love, presence, and prayers on our wedding day are our greatest gifts. Should you wish to honor us with a gift, a monetary blessing toward our new journey together as husband and wife is warmly and humbly appreciated. You can find our digital transfer QR codes (GCash, Maya, Bank Transfer) in the dedicated Wishing Well section right above!',
              },
              {
                id: 'rsvp',
                icon: Calendar,
                tag: 'Confirmation',
                badge: 'By Oct 15, 2026',
                question: 'When is the deadline to RSVP?',
                answer:
                  'Kindly confirm your attendance using our official RSVP Google Form on or before October 15, 2026. This allows us to finalize our headcount and catering with both venues in a timely manner.',
              },
            ].map((faq) => {
              const isOpen = !!openFaqIds[faq.id];
              const IconComp = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 shadow-2xs overflow-hidden ${
                    isOpen
                      ? isDarkMode
                        ? 'bg-[#1D182A] border-[#C2A379]/50 ring-1 ring-[#C2A379]/30'
                        : 'bg-white border-[#C2A379]/60 ring-1 ring-[#C2A379]/20'
                      : isDarkMode
                      ? 'bg-[#191524] border-[#2E273D] hover:border-[#4B3E60]'
                      : 'bg-white/80 border-[#EAE0D2] hover:border-[#D8CBB7]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-2.5 sm:p-3.5 text-left flex items-start justify-between gap-2.5 cursor-pointer focus:outline-hidden"
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                          isOpen
                            ? isDarkMode
                              ? 'bg-[#2E243E] text-[#D8B4FE]'
                              : 'bg-[#FAF0F5] text-[#8E4585]'
                            : isDarkMode
                            ? 'bg-[#221D30] text-[#AFA498]'
                            : 'bg-[#F5EFE6] text-[#7A7067]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className="text-[9px] sm:text-[10px] font-sans-body uppercase tracking-[1.5px] font-semibold text-[#C2A379]">
                            {faq.tag}
                          </span>
                          {faq.badge && (
                            <span
                              className={`text-[8px] sm:text-[9px] font-sans-body px-1.5 py-0.2 rounded-full font-medium ${
                                faq.badge === 'Adults-Only'
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                                  : faq.badge === 'Sacred Reverence'
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
                                  : isDarkMode
                                  ? 'bg-[#2A233A] text-[#D8CFDC]'
                                  : 'bg-[#FAF5EC] text-[#8C827A]'
                              }`}
                            >
                              {faq.badge}
                            </span>
                          )}
                        </div>

                        <h4
                          className={`font-serif-title text-sm sm:text-base font-semibold leading-snug ${
                            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                          }`}
                        >
                          {faq.question}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={`p-1 rounded-md shrink-0 transition-colors ${
                        isOpen
                          ? 'text-[#C2A379] bg-[#C2A379]/10'
                          : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div
                          className={`px-3.5 sm:px-4 pb-3 sm:pb-3.5 pt-1 text-xs font-sans-body leading-relaxed border-t ${
                            isDarkMode
                              ? 'border-[#2C253B] text-[#C9BFD2]'
                              : 'border-[#F2E8DC] text-[#554D46]'
                          }`}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollRevealSection>
      </main>

      {/* LUXURY FOOTER (COMPACT) */}
      <ScrollRevealSection as="div" delay={0.05}>
        <footer
          className={`mt-6 sm:mt-8 border-t py-6 sm:py-7 text-center px-4 transition-colors ${
            isDarkMode
              ? 'border-[#2C2438] bg-[#12101B]'
              : 'border-[#EAE0D2] bg-[#FAF8F5]'
          }`}
        >
          <div className="max-w-md mx-auto space-y-2">
            <div className="font-script-romantic text-3xl sm:text-4xl text-[#C2A379]">
              Glensan & Junah Joy
            </div>
            <p
              className={`font-serif-title text-xs sm:text-sm ${
                isDarkMode ? 'text-[#EFE7DE]' : 'text-[#4A4540]'
              }`}
            >
              Iglesia Ni Cristo · Tisa Locale &nbsp;·&nbsp; The Uncle Tom's Cabin Capitol Cebu
            </p>
            <p
              className={`font-mono text-xs tracking-wider font-semibold text-[#C2A379]`}
            >
              #GLENfoundhisJOY∞
            </p>
            <p
              className={`font-sans-body text-[11px] sm:text-xs max-w-sm mx-auto leading-relaxed ${
                isDarkMode ? 'text-[#AFA498]' : 'text-[#8C827A]'
              }`}
            >
              Thank you for being an irreplaceable part of our lives and celebrating God's covenant with
              us on November 18, 2026.
            </p>

            <div className="pt-1.5 flex items-center justify-center gap-4">
              <button
                onClick={onReplayIntro}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[11px] font-sans-body uppercase tracking-wider cursor-pointer font-medium ${
                  isDarkMode
                    ? 'border-[#C2A379] text-[#F3EBE6] hover:bg-[#C2A379] hover:text-[#12101B]'
                    : 'border-[#C2A379] text-[#3A3530] hover:bg-[#C2A379] hover:text-white'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay Intro Animation</span>
              </button>
            </div>
          </div>
        </footer>
      </ScrollRevealSection>

      {/* Floating RSVP Reminder Notification Bubble (Appears on scroll) */}
      <FloatingRsvpBubble />
    </div>
  );
};
