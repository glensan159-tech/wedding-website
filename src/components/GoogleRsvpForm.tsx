import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Loader2,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

const OFFICIAL_GOOGLE_FORM_VIEW_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdwZlR4wXu7oYUE4K1gg762Xxi7Swx9RgQHn5RlWenX70pcrg/viewform?usp=sharing&ouid=104135508331372237960';

const OFFICIAL_GOOGLE_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdwZlR4wXu7oYUE4K1gg762Xxi7Swx9RgQHn5RlWenX70pcrg/viewform?embedded=true';

interface GoogleRsvpFormProps {
  isModal?: boolean;
  onSuccessClose?: () => void;
}

export const GoogleRsvpForm: React.FC<GoogleRsvpFormProps> = () => {
  const { isDarkMode } = useTheme();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'official' | 'quick'>('official');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wedding_rsvp_submitted') === 'true';
    } catch {
      return false;
    }
  });

  // Track the number of times the iframe loads.
  // First load (count = 1) is the form itself.
  // Second load (count >= 2) is the Google Form submission confirmation page!
  const iframeLoadCountRef = useRef(0);

  // Multi-stage celebratory confetti explosion
  const triggerCelebratoryConfetti = () => {
    // 1. Center burst
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#EAA2B8', '#C2A379', '#8E4585', '#D4AF37', '#FAF0DE', '#B784A7'],
    });

    // 2. Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.65 },
        colors: ['#EAA2B8', '#C2A379', '#8E4585', '#D4AF37'],
      });
    }, 250);

    // 3. Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.65 },
        colors: ['#EAA2B8', '#C2A379', '#8E4585', '#D4AF37'],
      });
    }, 450);

    // 4. Golden stars and romantic shimmer shower
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.45 },
        shapes: ['star', 'circle'],
        colors: ['#D4AF37', '#C2A379', '#FAF0DE'],
      });
    }, 700);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    iframeLoadCountRef.current += 1;

    // Automatic trigger: when the guest submits the form, the iframe navigates to formResponse (load #2+)
    if (iframeLoadCountRef.current > 1) {
      setHasSubmitted(true);
      try {
        localStorage.setItem('wedding_rsvp_submitted', 'true');
        window.dispatchEvent(new Event('wedding_rsvp_updated'));
      } catch {
        // ignore
      }
      triggerCelebratoryConfetti();
    }
  };

  const weddingGoogleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Glensan & Junah Joy Wedding'
  )}&dates=20261118T060000Z/20261118T120000Z&details=${encodeURIComponent(
    'Wedding of Glensan & Junah Joy. Ceremony at Iglesia Ni Cristo - Lokal ng Tisa (2:00 PM), Reception at Uncle Toms Cabin (4:00 PM).'
  )}&location=${encodeURIComponent(
    'Iglesia Ni Cristo - Lokal ng Tisa, Cabarrubias St, Tisa, Cebu City'
  )}`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* RSVP Navigation / Mode Selector */}
      <div
        className={`flex items-center justify-between gap-2 p-1 rounded-xl border mb-3.5 ${
          isDarkMode
            ? 'bg-[#181523] border-[#342D45]'
            : 'bg-[#FAF7F2] border-[#E8DCCF]'
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('official')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans-body transition-all cursor-pointer ${
              activeTab === 'official'
                ? isDarkMode
                  ? 'bg-[#2E283F] text-white shadow-2xs font-semibold'
                  : 'bg-[#3A3530] text-white shadow-2xs font-medium'
                : isDarkMode
                ? 'text-[#B8ADC0] hover:text-[#F3EBE6]'
                : 'text-[#6E645D] hover:text-[#3A3530]'
            }`}
          >
            <span className="sm:hidden">Google Form</span>
            <span className="hidden sm:inline">Official Google Form</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans-body transition-all cursor-pointer ${
              activeTab === 'quick'
                ? isDarkMode
                  ? 'bg-[#2E283F] text-white shadow-2xs font-semibold'
                  : 'bg-[#3A3530] text-white shadow-2xs font-medium'
                : isDarkMode
                ? 'text-[#B8ADC0] hover:text-[#F3EBE6]'
                : 'text-[#6E645D] hover:text-[#3A3530]'
            }`}
          >
            <span className="sm:hidden">Calendar</span>
            <span className="hidden sm:inline">Calendar & Summary</span>
          </button>
        </div>

        {/* Direct Open Link */}
        <a
          href={OFFICIAL_GOOGLE_FORM_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#C2A379] hover:underline font-medium font-sans-body transition-colors"
        >
          <span>Open Full Screen</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {activeTab === 'official' ? (
        <>
          {/* OFFICIAL GOOGLE FORM CONTAINER */}
          <div
            className={`relative rounded-2xl border shadow-sm overflow-hidden ${
              isDarkMode
                ? 'bg-[#161322] border-[#C2A379]/40'
                : 'bg-white border-[#C2A379]/40'
            }`}
          >
          {/* Top Gold Header Strip */}
          <div className="bg-gradient-to-r from-[#C2A379] via-[#EAA2B8] to-[#8E4585] py-2 px-3.5 sm:px-4 text-white flex items-center justify-between text-xs">
            <span className="font-serif-title tracking-wider uppercase font-semibold text-white/95 text-[11px] sm:text-xs">
              Official Google Form · Glensan & Junah Joy Wedding
            </span>
            <span className="text-[10px] text-white/80 hidden sm:inline">
              Deadline: October 15, 2026
            </span>
          </div>

          {/* Iframe Loading State */}
          {!iframeLoaded && (
            <div
              className={`w-full h-80 flex flex-col items-center justify-center p-6 text-center ${
                isDarkMode ? 'bg-[#1A1626]' : 'bg-[#FAF7F2]'
              }`}
            >
              <Loader2 className="w-6 h-6 text-[#C2A379] animate-spin mb-2" />
              <p
                className={`font-serif-title text-base ${
                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                }`}
              >
                Loading Official Google Form...
              </p>
              <p
                className={`font-sans-body text-xs mt-0.5 max-w-sm ${
                  isDarkMode ? 'text-[#AFA498]' : 'text-[#8C827A]'
                }`}
              >
                If the form takes longer to load on your device, you can also open it directly in a new tab.
              </p>
              <a
                href={OFFICIAL_GOOGLE_FORM_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#C2A379] text-white text-xs font-sans-body uppercase tracking-wider hover:bg-[#A88B64] transition-colors"
              >
                <span>Open in Google Forms</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Embedded Google Form Iframe (Optimized Responsive Height: 580px - 640px) */}
          <iframe
            src={OFFICIAL_GOOGLE_FORM_EMBED_URL}
            title="Glensan & Junah Joy Wedding RSVP Google Form"
            width="100%"
            loading="lazy"
            className={`w-full border-0 transition-opacity duration-500 h-[540px] sm:h-[600px] md:h-[630px] ${
              iframeLoaded ? 'opacity-100 block' : 'opacity-0 h-0'
            }`}
            onLoad={handleIframeLoad}
          >
            Loading Google Form...
          </iframe>

          {/* Footer Assistance Bar */}
          <div
            className={`border-t py-2.5 px-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-sans-body ${
              isDarkMode
                ? 'bg-[#1A1626] border-[#2C263A] text-[#B8ADC0]'
                : 'bg-[#FAF7F2] border-[#EAE0D2] text-[#6E645D]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              Responses are securely recorded in the official Google spreadsheet.
            </span>
            <a
              href={OFFICIAL_GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#C2A379] font-semibold hover:underline shrink-0"
            >
              Open in new window <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* CELEBRATORY CONFETTI & SUBMISSION CONFIRMATION BANNER */}
        {hasSubmitted ? (
          <div
            className={`mt-5 p-5 rounded-2xl border text-center transition-all shadow-md animate-fade-in ${
              isDarkMode
                ? 'bg-[#1E1929] border-[#C2A379]/60'
                : 'bg-white border-[#C2A379]/70'
            }`}
          >
            <div className="inline-flex items-center gap-2 text-[#C2A379] font-serif-title text-xl font-normal mb-1.5">
              <PartyPopper className="w-5 h-5 text-[#EAA2B8]" />
              <span>RSVP Received with Joy!</span>
              <Sparkles className="w-5 h-5 text-[#C2A379]" />
            </div>
            <p
              className={`text-xs sm:text-sm font-sans-body max-w-lg mx-auto mb-4 leading-relaxed ${
                isDarkMode ? 'text-[#D8CFDC]' : 'text-[#5C524A]'
              }`}
            >
              Praise God! Thank you for confirming your attendance. We are deeply honored and cannot wait
              to celebrate our sacred covenant with you on <strong>November 18, 2026</strong>!
            </p>
            <button
              type="button"
              onClick={triggerCelebratoryConfetti}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C2A379] via-[#EAA2B8] to-[#8E4585] text-white text-xs font-sans-body font-semibold cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Celebrate Again with Confetti! 🎉</span>
            </button>
          </div>
        ) : (
          <div
            className={`mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl border border-dashed text-xs font-sans-body ${
              isDarkMode
                ? 'bg-[#181523]/80 border-[#C2A379]/40 text-[#B8ADC0]'
                : 'bg-[#FFFDF9] border-[#C2A379]/50 text-[#6E645D]'
            }`}
          >
            <span className="flex items-center gap-1.5 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-[#C2A379] shrink-0" />
              Done submitting above or filled the form in a new window?
            </span>
            <button
              type="button"
              onClick={() => {
                setHasSubmitted(true);
                triggerCelebratoryConfetti();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white font-semibold cursor-pointer shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 text-xs"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span>I've Submitted My RSVP! 🎉</span>
            </button>
          </div>
        )}
        </>
      ) : (
        /* QUICK SYNC & CALENDAR CARD */
        <div
          className={`rounded-2xl border p-6 sm:p-8 shadow-sm ${
            isDarkMode
              ? 'bg-[#161322] border-[#C2A379]/40'
              : 'bg-white border-[#C2A379]/40'
          }`}
        >
          <div className="text-center max-w-md mx-auto mb-6">
            <h4
              className={`font-serif-title text-2xl font-normal ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              Save To Your Google Calendar
            </h4>
            <p
              className={`font-sans-body text-xs mt-1 ${
                isDarkMode ? 'text-[#AFA498]' : 'text-[#7A7067]'
              }`}
            >
              Add our wedding directly to your schedule with ceremony and reception details pre-filled.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={weddingGoogleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border transition-all text-xs font-sans-body uppercase tracking-wider shadow-xs ${
                isDarkMode
                  ? 'bg-[#221C30] border-[#C2A379] text-[#F3EBE6] hover:bg-[#C2A379] hover:text-[#161322]'
                  : 'bg-[#FAF7F0] border-[#C2A379] text-[#3A3530] hover:bg-[#C2A379] hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#C2A379]" />
              <span>Add To Google Calendar</span>
            </a>

            <a
              href={OFFICIAL_GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8E4585] hover:bg-[#7A3E9D] text-white transition-all text-xs font-sans-body uppercase tracking-wider shadow-xs"
            >
              <span>Fill Official Google Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Confirmation Box */}
          <div
            className={`p-4 rounded-xl border ${
              isDarkMode
                ? 'bg-[#1D1929] border-[#312940]'
                : 'bg-[#FAF7F2] border-[#EAE0D2]'
            }`}
          >
            <p
              className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#C2A379]" />
              Event Summary Reminder
            </p>
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${
                isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border ${
                  isDarkMode
                    ? 'bg-[#15121F] border-[#2A2338]'
                    : 'bg-white border-[#EAE0D2]'
                }`}
              >
                <span className="text-[10px] uppercase text-[#A6998E] block">Date & Time</span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                  }`}
                >
                  Nov 18, 2026 · 2:00 PM
                </span>
              </div>
              <div
                className={`p-2.5 rounded-lg border ${
                  isDarkMode
                    ? 'bg-[#15121F] border-[#2A2338]'
                    : 'bg-white border-[#EAE0D2]'
                }`}
              >
                <span className="text-[10px] uppercase text-[#A6998E] block">Ceremony</span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                  }`}
                >
                  Iglesia Ni Cristo (Lokal ng Tisa)
                </span>
              </div>
              <div
                className={`p-2.5 rounded-lg border ${
                  isDarkMode
                    ? 'bg-[#15121F] border-[#2A2338]'
                    : 'bg-white border-[#EAE0D2]'
                }`}
              >
                <span className="text-[10px] uppercase text-[#A6998E] block">Reception</span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                  }`}
                >
                  Uncle Tom's Cabin
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
