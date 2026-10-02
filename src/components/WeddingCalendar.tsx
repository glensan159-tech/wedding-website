import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Heart,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  Download,
  Copy,
  Check,
  Bell,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

export const WeddingCalendar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [copiedDate, setCopiedDate] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [showHighlightEffect, setShowHighlightEffect] = useState(true);

  // November 2026 calendar structure:
  // Nov 1, 2026 is Sunday. Total 30 days.
  // Starting day of week: 0 (Sunday)
  const daysInNovember = 30;
  const startDayOfWeek = 0; // Sunday = 0, Mon = 1, ...
  const weddingDay = 18; // Wednesday, Nov 18, 2026

  const weekDays = [
    { short: 'S', full: 'Sun' },
    { short: 'M', full: 'Mon' },
    { short: 'T', full: 'Tue' },
    { short: 'W', full: 'Wed' },
    { short: 'T', full: 'Thu' },
    { short: 'F', full: 'Fri' },
    { short: 'S', full: 'Sat' },
  ];

  // Generate calendar grid (days 1 to 30)
  const calendarCells = [];
  // Empty offset days for start of month (none needed since Nov 1 is Sunday, but handled dynamically)
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInNovember; d++) {
    calendarCells.push(d);
  }

  // Google Calendar URL generator
  // 2:00 PM Cebu Time (UTC+8) = 06:00 UTC
  // 9:00 PM Cebu Time (UTC+8) = 13:00 UTC
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Glensan & Junah Joy's Wedding · Holy Matrimony"
  )}&dates=20261118T060000Z/20261118T130000Z&details=${encodeURIComponent(
    "Sacred Wedding Ceremony of Glensan & Junah Joy at Iglesia Ni Cristo - Lokal ng Tisa, followed by the Dinner Banquet & Celebration at The Uncle Tom's Cabin Capitol, Cebu City. #GLENfoundhisJOY"
  )}&location=${encodeURIComponent(
    "Iglesia Ni Cristo - Lokal ng Tisa, Cebu City / The Uncle Tom's Cabin Capitol, Cebu City"
  )}`;

  // Download .ics file for Apple Calendar, Outlook, and mobile devices
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Glensan and Junah Joy//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-glensan-junah-20261118@wedding.invitation',
      'DTSTAMP:20261118T000000Z',
      'DTSTART:20261118T060000Z',
      'DTEND:20261118T130000Z',
      'SUMMARY:Glensan & Junah Joy Wedding (Holy Matrimony)',
      "DESCRIPTION:We warmly celebrate the covenant of love and faith of Glensan and Junah Joy. Ceremony at INC Lokal ng Tisa (2:00 PM), Reception at The Uncle Tom's Cabin Capitol (4:30 PM).",
      "LOCATION:Iglesia Ni Cristo Lokal ng Tisa & Uncle Tom's Cabin, Cebu City",
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'DESCRIPTION:Reminder: Glensan & Junah Joy Wedding Tomorrow',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Glensan-JunahJoy-Wedding-Nov18-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Micro celebratory burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#EAA2B8', '#C2A379'],
    });
  };

  const copyDateToClipboard = () => {
    navigator.clipboard.writeText(
      'Glensan & Junah Joy Wedding: Wednesday, November 18, 2026 at 2:00 PM (INC Lokal ng Tisa, Cebu City)'
    );
    setCopiedDate(true);
    setTimeout(() => setCopiedDate(false), 2500);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    if (day === weddingDay) {
      setShowHighlightEffect(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#C2A379', '#EAA2B8'],
      });
    }
  };

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-6 md:p-8 transition-all shadow-sm ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#181424] to-[#12101C] border-[#342C44]'
          : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] border-[#E8DEC9]'
      }`}
    >
      {/* Header with Title & Save the Date Tag */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C2A379]/40 bg-[#C2A379]/10 text-[#C2A379] text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[2px] font-semibold mb-2">
          <CalendarIcon className="w-3 h-3" />
          <span>Save Our Date</span>
        </div>
        <h3
          className={`font-serif-title text-2xl sm:text-3xl md:text-4xl font-normal leading-tight ${
            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
          }`}
        >
          Official Wedding Calendar
        </h3>
        <p
          className={`mt-1 font-sans-body text-xs sm:text-[13px] leading-relaxed ${
            isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
          }`}
        >
          Join us in celebration as we exchange sacred vows. Save Wednesday, November 18, 2026 to
          your calendar and celebrate this blessed milestone with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
        {/* LEFT / CENTER: THE LUXURY CALENDAR GRID */}
        <div
          className={`lg:col-span-7 rounded-xl border p-3.5 sm:p-4.5 shadow-xs relative overflow-hidden ${
            isDarkMode
              ? 'bg-[#1D182B] border-[#382F4B]'
              : 'bg-white border-[#EADFCB]'
          }`}
        >
          {/* Subtle Ambient Background Glow around Nov 18 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#C2A379]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Calendar Month Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-200/60 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#C2A379]/15 text-[#C2A379]">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <h4
                  className={`font-serif-title text-lg sm:text-xl font-bold tracking-wide leading-none ${
                    isDarkMode ? 'text-[#F5EFEB]' : 'text-[#3A3530]'
                  }`}
                >
                  November 2026
                </h4>
                <span className="text-[10px] font-sans-body uppercase tracking-[1px] text-[#C2A379] font-medium block mt-0.5">
                  Autumn Matrimony
                </span>
              </div>
            </div>

            {/* Quick Badge */}
            <div className="flex items-center gap-1 text-[10px] font-sans-body text-[#C2A379] px-2 py-0.5 rounded-md bg-[#C2A379]/10 font-semibold border border-[#C2A379]/30">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Wed, Nov 18</span>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5 text-center">
            {weekDays.map((wd, i) => (
              <div
                key={i}
                className={`py-0.5 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-wider font-semibold ${
                  i === 0 || i === 6
                    ? 'text-[#C2A379]'
                    : isDarkMode
                    ? 'text-[#A094AB]'
                    : 'text-[#8C827A]'
                }`}
              >
                <span className="hidden sm:inline">{wd.full}</span>
                <span className="sm:hidden">{wd.short}</span>
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-7 sm:h-8" />;
              }

              const isWeddingDay = day === weddingDay;
              const isSelected = selectedDay === day;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => handleDayClick(day)}
                  className={`relative h-7 sm:h-8.5 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isWeddingDay
                      ? 'date-pulse-glow z-10'
                      : isSelected
                      ? isDarkMode
                        ? 'bg-[#2A233A] border border-[#C2A379]/50 text-white'
                        : 'bg-[#FAF3E8] border border-[#C2A379]/50 text-[#3A3530]'
                      : isDarkMode
                      ? 'hover:bg-[#252033] text-[#D8CFDC] border border-transparent'
                      : 'hover:bg-[#FAF7F0] text-[#4A4540] border border-transparent'
                  }`}
                >
                  {/* Wedding Day Highlight Treatment */}
                  {isWeddingDay ? (
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#E6C687] via-[#C2A379] to-[#997746] text-white flex flex-col items-center justify-center shadow-md border border-amber-200"
                    >
                      {/* Floating Mini Heart */}
                      <div className="absolute -top-1.5 -right-0.5 z-20">
                        <motion.div
                          animate={{ y: [0, -2, 0], scale: [1, 1.15, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          className="bg-rose-500 text-white p-0.5 rounded-full shadow-xs"
                        >
                          <Heart className="w-2 h-2 fill-current" />
                        </motion.div>
                      </div>

                      {/* Sparkle Icon */}
                      <Sparkles className="w-2 h-2 text-amber-100 absolute top-0.5 left-1 opacity-90 calendar-sparkle-spin" />

                      <span className="font-serif-title text-sm sm:text-base font-bold leading-none drop-shadow-xs">
                        18
                      </span>
                      <span className="text-[6px] sm:text-[7px] font-sans-body uppercase tracking-wider font-extrabold text-amber-950 leading-none">
                        Our Day
                      </span>
                    </motion.div>
                  ) : (
                    <>
                      <span className="font-serif-title text-xs sm:text-sm font-medium">
                        {day}
                      </span>
                      {/* Subtle dot for week of wedding */}
                      {day >= 15 && day <= 21 && day !== weddingDay && (
                        <span className="w-1 h-1 rounded-full bg-[#C2A379]/40 -mt-0.5" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Date Caption */}
          <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-[11px] font-sans-body">
            <div className="flex items-center gap-1.5 text-[#C2A379]">
              <Heart className="w-3 h-3 fill-current text-rose-500 animate-pulse" />
              <span className="font-medium">November 18, 2026 is highlighted</span>
            </div>
            <button
              onClick={() => handleDayClick(18)}
              className="text-stone-400 hover:text-[#C2A379] dark:hover:text-[#C2A379] transition-colors underline cursor-pointer text-[10px]"
            >
              Focus Wedding Day
            </button>
          </div>
        </div>

        {/* RIGHT: HIGHLIGHTED EVENT DETAILS & ADD TO CALENDAR ACTIONS */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Card: Ceremony & Reception Schedule for Nov 18 */}
          <div
            className={`rounded-xl border p-3.5 sm:p-4 shadow-xs relative overflow-hidden ${
              isDarkMode
                ? 'bg-[#1A1626] border-[#3A314D]'
                : 'bg-white border-[#EADFCB]'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-sans-body uppercase tracking-[1.5px] font-semibold bg-[#C2A379]/15 text-[#C2A379]">
                Wednesday Itinerary
              </span>
              <span
                className={`text-[11px] font-sans-body ${
                  isDarkMode ? 'text-[#A094AB]' : 'text-[#8C827A]'
                }`}
              >
                November 18, 2026
              </span>
            </div>

            <h4
              className={`font-serif-title text-xl sm:text-2xl font-bold mb-2.5 ${
                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
              }`}
            >
              Glensan & Junah Joy
            </h4>

            {/* Event 1: Ceremony */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#C2A379]/10 text-[#C2A379] shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-title text-sm sm:text-base font-bold text-[#C2A379]">
                      2:00 PM Sharp
                    </span>
                    <span className="text-[9px] uppercase font-sans-body tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.5 rounded">
                      Ceremony
                    </span>
                  </div>
                  <p
                    className={`font-sans-body text-xs font-semibold mt-0.5 ${
                      isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                    }`}
                  >
                    Holy Matrimony Nuptials
                  </p>
                  <p
                    className={`font-sans-body text-[11px] mt-0.5 ${
                      isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
                    }`}
                  >
                    Iglesia Ni Cristo · Lokal ng Tisa, Cebu City
                  </p>
                </div>
              </div>

              {/* Event 2: Reception */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-800">
                <div className="p-1.5 rounded-lg bg-[#C2A379]/10 text-[#C2A379] shrink-0 mt-0.5">
                  <PartyPopper className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-title text-sm sm:text-base font-bold text-[#C2A379]">
                      4:30 PM Onwards
                    </span>
                    <span className="text-[9px] uppercase font-sans-body tracking-wider text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-950/40 px-1 py-0.5 rounded">
                      Reception
                    </span>
                  </div>
                  <p
                    className={`font-sans-body text-xs font-semibold mt-0.5 ${
                      isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                    }`}
                  >
                    Dinner Banquet & Celebration
                  </p>
                  <p
                    className={`font-sans-body text-[11px] mt-0.5 ${
                      isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
                    }`}
                  >
                    The Uncle Tom's Cabin · Capitol, Cebu City
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Add to Calendar & Download .ics */}
          <div className="space-y-1.5">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3.5 rounded-xl bg-[#C2A379] hover:bg-[#A88B64] text-white text-xs font-sans-body font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={downloadIcsFile}
                className={`py-2.5 px-3 rounded-xl border text-xs font-sans-body font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-[#3D354E] bg-[#1A1626] text-[#E0D7E5] hover:bg-[#252033]'
                    : 'border-[#E2D6C3] bg-white text-[#4A4540] hover:bg-[#FAF7F2]'
                }`}
                title="Apple Calendar, Outlook & Mobile .ics"
              >
                <Download className="w-3.5 h-3.5 text-[#C2A379]" />
                <span>Apple / iCal</span>
              </button>

              <button
                type="button"
                onClick={copyDateToClipboard}
                className={`py-2.5 px-3 rounded-xl border text-xs font-sans-body font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-[#3D354E] bg-[#1A1626] text-[#E0D7E5] hover:bg-[#252033]'
                    : 'border-[#E2D6C3] bg-white text-[#4A4540] hover:bg-[#FAF7F2]'
                }`}
              >
                {copiedDate ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C2A379]" />
                    <span>Copy Date</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
