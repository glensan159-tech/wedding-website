import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Info,
  Palette,
  Shirt,
  User,
  ShieldAlert,
  X,
  Sparkles,
} from 'lucide-react';
import {
  FemaleModestGownGraphic,
  FemaleTernoGraphic,
  MalePoloShirtGraphic,
  MaleBarongGraphic,
  MaleSuitGraphic,
} from './AttireGraphics';
import { useTheme } from '../context/ThemeContext';

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  textDark?: boolean;
  category: 'pink' | 'purple' | 'sponsor';
  description: string;
  samplePairing?: string;
}

export const GUEST_PALETTE: ColorSwatch[] = [
  // Pink Spectrum
  {
    id: 'blush-pink',
    name: 'Blush Pink',
    hex: '#F7C5CC',
    textDark: true,
    category: 'pink',
    description: 'Soft romantic blush with warm rose undertones',
    samplePairing: 'Lace-sleeved gown or pastel polo / dress shirt',
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose',
    hex: '#D68C96',
    textDark: false,
    category: 'pink',
    description: 'Sophisticated vintage rose with subtle depth',
    samplePairing: 'Modern Terno or Barong Tagalog / Suit with rose tie',
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz',
    hex: '#EAA2B8',
    textDark: true,
    category: 'pink',
    description: 'Luminous pastel rose, gentle and graceful',
    samplePairing: 'Floor-length sleeved gown or neat button-down polo',
  },
  {
    id: 'soft-mauve',
    name: 'Soft Mauve',
    hex: '#B784A7',
    textDark: false,
    category: 'pink',
    description: 'Elegant dusty blend of rose and soft violet',
    samplePairing: 'Sleeved midi/maxi gown or mauve polo / suit tie',
  },
  // Purple Spectrum
  {
    id: 'pastel-lilac',
    name: 'Pastel Lilac',
    hex: '#C8A2C8',
    textDark: true,
    category: 'purple',
    description: 'Fresh floral lilac, light and reverent',
    samplePairing: 'Lilac modern terno or lilac polo shirt',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    hex: '#A78BFA',
    textDark: false,
    category: 'purple',
    description: 'Airy serene lavender with modern luxury appeal',
    samplePairing: 'Flowing sleeved gown or lavender accent suit / polo',
  },
  {
    id: 'royal-orchid',
    name: 'Royal Orchid',
    hex: '#9D4EDD',
    textDark: false,
    category: 'purple',
    description: 'Radiant vibrant orchid for statement gowns & ties',
    samplePairing: 'Statement evening terno or tailored suit / orchid polo',
  },
  {
    id: 'deep-amethyst',
    name: 'Deep Amethyst',
    hex: '#6A1B9A',
    textDark: false,
    category: 'purple',
    description: 'Regal jewel-tone purple, dramatic and classic',
    samplePairing: 'Floor-length rich purple gown or amethyst dress shirt',
  },
  {
    id: 'mulberry-plum',
    name: 'Mulberry Plum',
    hex: '#4A154B',
    textDark: false,
    category: 'purple',
    description: 'Luxurious deep plum for formal evening wear',
    samplePairing: 'Velvet/silk sleeved gown or dark plum tie & slacks',
  },
];

export const SPONSOR_PALETTE: ColorSwatch[] = [
  {
    id: 'champagne',
    name: 'Champagne',
    hex: '#F7E7CE',
    textDark: true,
    category: 'sponsor',
    description: 'Warm luminous champagne silk',
    samplePairing: 'Ninang silk gown & Ninong Piña Barong or Suit',
  },
  {
    id: 'classic-cream',
    name: 'Classic Cream',
    hex: '#FFFDD0',
    textDark: true,
    category: 'sponsor',
    description: 'Timeless soft ivory-cream',
    samplePairing: 'Ninang sleeved gown & traditional embroidered Barong',
  },
  {
    id: 'soft-beige',
    name: 'Soft Beige',
    hex: '#F5F5DC',
    textDark: true,
    category: 'sponsor',
    description: 'Subtle neutral elegance',
    samplePairing: 'Ninang terno or formal beige suit with silk tie / polo',
  },
  {
    id: 'warm-nude',
    name: 'Warm Nude',
    hex: '#E3BC9A',
    textDark: true,
    category: 'sponsor',
    description: 'Warm sandy nude undertones',
    samplePairing: 'Ninang drape gown & Jusi Barong, Suit, or Polo',
  },
];

export const ALL_PALETTES: ColorSwatch[] = [...GUEST_PALETTE, ...SPONSOR_PALETTE];

export const Attire: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Colors for live interactive graphic guides (direct control under each guide)
  const [femaleColor, setFemaleColor] = useState<ColorSwatch>(GUEST_PALETTE[1]); // Dusty Rose
  const [maleColor, setMaleColor] = useState<ColorSwatch>(GUEST_PALETTE[3]); // Soft Mauve

  // Palette category filters below each graphic
  const [femaleFilter, setFemaleFilter] = useState<'all' | 'pink' | 'purple' | 'sponsor'>('all');
  const [maleFilter, setMaleFilter] = useState<'all' | 'pink' | 'purple' | 'sponsor'>('all');

  // Style switchers
  const [femaleStyle, setFemaleStyle] = useState<'gown' | 'terno'>('gown');
  const [maleStyle, setMaleStyle] = useState<'polo' | 'barong' | 'suit'>('polo');

  // Interactive Popup Modal State for Disclaimer & Sacred Ceremony Reverence
  const [activeInfoModal, setActiveInfoModal] = useState<'disclaimer' | 'reverence' | null>(null);

  const getFilteredSwatches = (filter: 'all' | 'pink' | 'purple' | 'sponsor') => {
    return filter === 'all' ? ALL_PALETTES : ALL_PALETTES.filter((s) => s.category === filter);
  };

  return (
    <div className="w-full">
      {/* SECTION HEADER (SCALED SLIGHTLY SMALLER & CLEAN) */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-5 px-2">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[2px] font-sans-body mb-2 shadow-2xs border ${
            isDarkMode
              ? 'bg-[#1D1929] border-[#3F3652] text-[#D8B4FE]'
              : 'bg-[#FAF0F5] border-[#E9D5E5] text-[#8E4585]'
          }`}
        >
          <Palette className="w-3 h-3 text-[#C2A379]" />
          <span>Dress Code & Visual Guide</span>
        </div>
        <h2
          className={`font-serif-title text-xl sm:text-2xl md:text-3xl font-normal tracking-tight mb-1 ${
            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
          }`}
        >
          Attire & Motif Guide
        </h2>
        <p
          className={`font-sans-body text-xs sm:text-[13px] leading-relaxed max-w-lg mx-auto ${
            isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
          }`}
        >
          Guests are invited to celebrate in tones of{' '}
          <strong className="text-[#EAA2B8] font-semibold">Romantic Pink</strong> and{' '}
          <strong className="text-[#B784A7] font-semibold">Royal Purple</strong>, and Sponsors in{' '}
          <strong className="text-[#C2A379] font-semibold">Champagne & Neutrals</strong>.
        </p>
      </div>

      {/* COMPACT MODAL TRIGGER BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 px-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveInfoModal('disclaimer')}
          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] sm:text-[11px] font-sans-body transition-all cursor-pointer shadow-2xs hover:scale-[1.01] active:scale-[0.99] ${
            isDarkMode
              ? 'bg-[#181523] border-[#C2A379]/40 text-[#FAF0DE] hover:border-[#C2A379]'
              : 'bg-white border-[#C2A379]/50 text-[#3A3530] hover:border-[#C2A379]'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-[#C2A379] shrink-0" />
          <span className="font-medium">Attire Guidelines & Disclaimer</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveInfoModal('reverence')}
          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] sm:text-[11px] font-sans-body transition-all cursor-pointer shadow-2xs hover:scale-[1.01] active:scale-[0.99] ${
            isDarkMode
              ? 'bg-[#181523] border-[#EAA2B8]/40 text-[#FAF0DE] hover:border-[#EAA2B8]'
              : 'bg-white border-[#EAA2B8]/60 text-[#3A3530] hover:border-[#EAA2B8]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-[#EAA2B8] shrink-0" />
          <span className="font-medium">Sacred Ceremony Reverence</span>
        </button>
      </div>

      {/* POP-UP MODAL (DISCLAIMER & REVERENCE) */}
      <AnimatePresence>
        {activeInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInfoModal(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative z-10 w-full max-w-md rounded-2xl border-2 p-4 sm:p-5 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col ${
                isDarkMode
                  ? 'bg-[#161322] border-[#C2A379]/50 text-[#F3EBE6]'
                  : 'bg-white border-[#C2A379]/60 text-[#3A3530]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      activeInfoModal === 'disclaimer'
                        ? isDarkMode
                          ? 'bg-[#242031] text-[#D4AF37]'
                          : 'bg-[#FAF6EE] text-[#C2A379]'
                        : isDarkMode
                        ? 'bg-[#251F33] text-[#D8B4FE]'
                        : 'bg-[#FAF0F5] text-[#8E4585]'
                    }`}
                  >
                    {activeInfoModal === 'disclaimer' ? (
                      <Info className="w-4 h-4" />
                    ) : (
                      <ShieldAlert className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif-title text-base font-semibold leading-tight">
                      {activeInfoModal === 'disclaimer'
                        ? 'Attire Guide & Disclaimer'
                        : 'Sacred Ceremony Reverence'}
                    </h3>
                    <p className="text-[10px] font-sans-body text-[#A6998E]">
                      {activeInfoModal === 'disclaimer'
                        ? 'Visual inspirations & guidelines'
                        : 'Iglesia Ni Cristo · Lokal ng Tisa'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveInfoModal(null)}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'text-stone-400 hover:text-white hover:bg-white/10'
                      : 'text-stone-500 hover:text-black hover:bg-black/5'
                  }`}
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Switcher inside Modal */}
              <div className="flex items-center gap-1 mt-2.5 p-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 text-[11px] font-sans-body">
                <button
                  type="button"
                  onClick={() => setActiveInfoModal('disclaimer')}
                  className={`flex-1 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    activeInfoModal === 'disclaimer'
                      ? 'bg-[#C2A379] text-white shadow-xs'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Guidelines & Disclaimer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInfoModal('reverence')}
                  className={`flex-1 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    activeInfoModal === 'reverence'
                      ? 'bg-[#C2A379] text-white shadow-xs'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Church Reverence
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="overflow-y-auto py-3 space-y-2 text-xs font-sans-body leading-relaxed pr-1 scrollbar-thin">
                {activeInfoModal === 'disclaimer' ? (
                  <>
                    <p>
                      <strong>All illustrations shown are visual inspirations and guidelines only.</strong> You do not need to purchase an identical outfit—any neat, dignified attire fitting our motif is warmly welcome!
                    </p>

                    <div
                      className={`p-2.5 rounded-lg border text-[11px] leading-relaxed ${
                        isDarkMode
                          ? 'bg-[#1F1B2B] border-[#383147] text-[#DCD4CA]'
                          : 'bg-[#FAF7F2] border-[#E8DCCF] text-[#4A4540]'
                      }`}
                    >
                      <strong className={isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A3530]'}>
                        Gentlemen & Male Guests:
                      </strong>{' '}
                      A formal Barong Tagalog or suit is wonderful, but it is{' '}
                      <strong className="text-[#C2A379]">
                        also completely welcome to wear a neat polo or formal button-down shirt
                      </strong>{' '}
                      paired with formal slacks and closed shoes.
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border text-[11px] leading-relaxed ${
                        isDarkMode
                          ? 'bg-[#1F1B2B] border-[#383147] text-[#DCD4CA]'
                          : 'bg-[#FAF7F2] border-[#E8DCCF] text-[#4A4540]'
                      }`}
                    >
                      <strong className={isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A3530]'}>
                        Color Motif:
                      </strong>{' '}
                      Guests wear shades of{' '}
                      <strong className="text-[#EAA2B8]">Romantic Pink</strong> and{' '}
                      <strong className="text-[#B784A7]">Royal Purple</strong>. Principal Sponsors (Ninongs & Ninangs) wear{' '}
                      <strong className="text-[#C2A379]">Champagne, Cream, Beige, or Nude</strong>.
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs">
                      Out of reverence for the sacred worship sanctuary at <strong>Iglesia Ni Cristo (Lokal ng Tisa)</strong>, please observe the following solemn protocols:
                    </p>

                    <div className="space-y-2">
                      <div
                        className={`p-2.5 rounded-lg border flex items-start gap-2 text-[11px] ${
                          isDarkMode
                            ? 'bg-[#1F1B2B] border-[#383147]'
                            : 'bg-[#FAF7F2] border-[#E8DCCF]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className={isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A3530]'}>
                            Sleeved & Closed Back:
                          </strong>{' '}
                          Dresses must have sleeves (no sleeveless) and a closed modest back. Floor-length or elegant midi.
                        </div>
                      </div>

                      <div
                        className={`p-2.5 rounded-lg border flex items-start gap-2 text-[11px] ${
                          isDarkMode
                            ? 'bg-[#1F1B2B] border-[#383147]'
                            : 'bg-[#FAF7F2] border-[#E8DCCF]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className={isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A3530]'}>
                            Colors to Avoid:
                          </strong>{' '}
                          Please avoid pure white (exclusively for bride), all-black, and casual denim or shorts.
                        </div>
                      </div>

                      <div
                        className={`p-2.5 rounded-lg border flex items-start gap-2 text-[11px] ${
                          isDarkMode
                            ? 'bg-[#1F1B2B] border-[#383147]'
                            : 'bg-[#FAF7F2] border-[#E8DCCF]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className={isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A3530]'}>
                            Ceremony Phones:
                          </strong>{' '}
                          Phones must be surrendered upon church entry and will be safely returned after the sacred ceremony.
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Button */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveInfoModal(null)}
                  className="px-3.5 py-1 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white text-xs font-sans-body font-semibold cursor-pointer transition-colors shadow-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          GUEST ATTIRE VISUAL GRAPHIC GUIDES (COMPACT WITH DIRECT PALETTE BUTTONS BELOW)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch max-w-4xl mx-auto">
        {/* =========================================
            WOMEN'S GUEST GRAPHIC GUIDE
            ========================================= */}
        <div
          className={`rounded-2xl border p-2.5 sm:p-3 shadow-xs flex flex-col justify-between transition-colors ${
            isDarkMode
              ? 'bg-[#151320] border-[#312940]'
              : 'bg-white border-[#E9D5E5]'
          }`}
        >
          <div>
            {/* Card Header & Style Toggle */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider font-sans-body ${
                  isDarkMode
                    ? 'bg-[#221A2F] text-[#D8B4FE]'
                    : 'bg-[#FAF0F5] text-[#8E4585]'
                }`}
              >
                <User className="w-3 h-3" />
                Women's Attire
              </span>

              {/* Compact Segmented Switcher */}
              <div
                className={`inline-flex p-0.5 rounded-lg border text-[10px] font-sans-body ${
                  isDarkMode
                    ? 'bg-[#1E1A2B] border-[#382E4D]'
                    : 'bg-[#FAF6EE] border-[#E8DCCF]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setFemaleStyle('gown')}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                    femaleStyle === 'gown'
                      ? 'bg-[#C2A379] text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-[#AFA498] hover:text-white'
                      : 'text-[#6E645D] hover:text-[#3A3530]'
                  }`}
                >
                  Modest Gown
                </button>
                <button
                  type="button"
                  onClick={() => setFemaleStyle('terno')}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                    femaleStyle === 'terno'
                      ? 'bg-[#C2A379] text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-[#AFA498] hover:text-white'
                      : 'text-[#6E645D] hover:text-[#3A3530]'
                  }`}
                >
                  Modern Terno
                </button>
              </div>
            </div>

            {/* Graphic Display Area (Compact & Proportional) */}
            <div
              className={`relative w-full h-[135px] sm:h-[150px] md:h-[160px] rounded-xl flex items-center justify-center p-1 border transition-colors ${
                isDarkMode
                  ? 'bg-[#191624] border-[#2E283D]'
                  : 'bg-[#FDFBF7] border-[#F0E6D8]'
              }`}
            >
              {femaleStyle === 'gown' ? (
                <FemaleModestGownGraphic
                  primaryColor={femaleColor.hex}
                  className="h-full w-auto max-w-full drop-shadow-xs"
                />
              ) : (
                <FemaleTernoGraphic
                  primaryColor={femaleColor.hex}
                  className="h-full w-auto max-w-full drop-shadow-xs"
                />
              )}

              {/* Active Color Tag on Graphic */}
              <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[9px] font-sans-body flex items-center gap-1 shadow-xs">
                <span
                  className="w-2 h-2 rounded-full border border-white/50 shrink-0"
                  style={{ backgroundColor: femaleColor.hex }}
                />
                <span className="font-medium">{femaleColor.name}</span>
              </div>
            </div>

            {/* DIRECT COLOR HARMONY PALETTE BUTTONS (BELOW GRAPHIC GUIDE) */}
            <div className="mt-2 pt-1.5 border-t border-stone-200/60 dark:border-stone-800">
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className="text-[10px] font-sans-body uppercase tracking-wider font-semibold text-[#C2A379] flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  Color Harmony Palette
                </span>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-0.5 text-[9px] font-sans-body">
                  {(
                    [
                      { id: 'all', label: 'All' },
                      { id: 'pink', label: 'Pinks' },
                      { id: 'purple', label: 'Purples' },
                      { id: 'sponsor', label: 'Sponsors' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFemaleFilter(cat.id)}
                      className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                        femaleFilter === cat.id
                          ? 'bg-[#C2A379] text-white font-semibold shadow-2xs'
                          : isDarkMode
                          ? 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swatch Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-[120px] overflow-y-auto pr-0.5 scrollbar-thin">
                {getFilteredSwatches(femaleFilter).map((swatch) => {
                  const isSelected = femaleColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setFemaleColor(swatch)}
                      className={`group flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all cursor-pointer text-left text-[10px] font-sans-body ${
                        isSelected
                          ? isDarkMode
                            ? 'border-[#C2A379] bg-[#2A2338] text-[#FAF0DE] ring-1 ring-[#C2A379]/70 shadow-2xs font-semibold'
                            : 'border-[#C2A379] bg-[#FAF3EA] text-[#3A3530] ring-1 ring-[#C2A379]/70 shadow-2xs font-semibold'
                          : isDarkMode
                          ? 'border-[#2C2538] bg-[#1A1625] text-[#D8CFDC] hover:border-[#4A3E60]'
                          : 'border-[#EAE0D2] bg-white text-[#5C524A] hover:border-[#C2A379]'
                      }`}
                      title={`${swatch.name}: ${swatch.description}`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-inner shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="truncate flex-1 leading-tight">{swatch.name}</span>
                      {isSelected && <Check className="w-2.5 h-2.5 text-[#C2A379] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Active Color Info Tag */}
              <div className="mt-1.5 flex items-center justify-between text-[9px] font-sans-body text-stone-500 dark:text-stone-400">
                <span className="truncate">
                  Selected:{' '}
                  <strong className={isDarkMode ? 'text-[#FAF0DE]' : 'text-[#3A3530]'}>
                    {femaleColor.name}
                  </strong>{' '}
                  ({femaleColor.description})
                </span>
              </div>
            </div>
          </div>

          {/* Micro Church Guidelines Tags */}
          <div className="mt-2 pt-1.5 border-t border-stone-200/50 dark:border-stone-800/80 flex items-center gap-1.5 flex-wrap text-[9px] font-sans-body">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <Check className="w-2.5 h-2.5" /> Sleeved (No Sleeveless)
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <Check className="w-2.5 h-2.5" /> Modest Closed Back
            </span>
          </div>
        </div>

        {/* =========================================
            MEN'S GUEST GRAPHIC GUIDE
            ========================================= */}
        <div
          className={`rounded-2xl border p-2.5 sm:p-3 shadow-xs flex flex-col justify-between transition-colors ${
            isDarkMode
              ? 'bg-[#151320] border-[#312940]'
              : 'bg-white border-[#DDCFBE]'
          }`}
        >
          <div>
            {/* Card Header & Style Toggle */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider font-sans-body border ${
                  isDarkMode
                    ? 'bg-[#221C2B] text-[#F3EBE6] border-[#3E324D]'
                    : 'bg-[#FAF7F0] text-[#3A3530] border-[#E3BC9A]/50'
                }`}
              >
                <Shirt className="w-3 h-3 text-[#C2A379]" />
                Men's Attire
              </span>

              {/* Compact Segmented Switcher */}
              <div
                className={`inline-flex p-0.5 rounded-lg border text-[10px] font-sans-body ${
                  isDarkMode
                    ? 'bg-[#1E1A2B] border-[#382E4D]'
                    : 'bg-[#FAF6EE] border-[#E8DCCF]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setMaleStyle('polo')}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                    maleStyle === 'polo'
                      ? 'bg-[#C2A379] text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-[#AFA498] hover:text-white'
                      : 'text-[#6E645D] hover:text-[#3A3530]'
                  }`}
                >
                  Polo
                </button>
                <button
                  type="button"
                  onClick={() => setMaleStyle('barong')}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                    maleStyle === 'barong'
                      ? 'bg-[#C2A379] text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-[#AFA498] hover:text-white'
                      : 'text-[#6E645D] hover:text-[#3A3530]'
                  }`}
                >
                  Barong
                </button>
                <button
                  type="button"
                  onClick={() => setMaleStyle('suit')}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                    maleStyle === 'suit'
                      ? 'bg-[#C2A379] text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-[#AFA498] hover:text-white'
                      : 'text-[#6E645D] hover:text-[#3A3530]'
                  }`}
                >
                  Suit
                </button>
              </div>
            </div>

            {/* Graphic Display Area (Compact & Proportional) */}
            <div
              className={`relative w-full h-[135px] sm:h-[150px] md:h-[160px] rounded-xl flex items-center justify-center p-1 border transition-colors ${
                isDarkMode
                  ? 'bg-[#191624] border-[#2E283D]'
                  : 'bg-[#FDFBF7] border-[#F0E6D8]'
              }`}
            >
              {maleStyle === 'polo' ? (
                <MalePoloShirtGraphic
                  primaryColor={maleColor.hex}
                  className="h-full w-auto max-w-full drop-shadow-xs"
                />
              ) : maleStyle === 'barong' ? (
                <MaleBarongGraphic
                  primaryColor="#FAF5EB"
                  accentColor={maleColor.hex}
                  className="h-full w-auto max-w-full drop-shadow-xs"
                />
              ) : (
                <MaleSuitGraphic
                  primaryColor={maleColor.hex}
                  className="h-full w-auto max-w-full drop-shadow-xs"
                />
              )}

              {/* Active Color Tag on Graphic */}
              <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[9px] font-sans-body flex items-center gap-1 shadow-xs">
                <span
                  className="w-2 h-2 rounded-full border border-white/50 shrink-0"
                  style={{
                    backgroundColor: maleStyle === 'barong' ? '#FAF5EB' : maleColor.hex,
                  }}
                />
                <span className="font-medium">
                  {maleStyle === 'barong'
                    ? 'Piña Barong Tagalog'
                    : maleStyle === 'polo'
                    ? `Polo in ${maleColor.name}`
                    : `Suit in ${maleColor.name}`}
                </span>
              </div>
            </div>

            {/* DIRECT COLOR HARMONY PALETTE BUTTONS (BELOW GRAPHIC GUIDE) */}
            <div className="mt-2 pt-1.5 border-t border-stone-200/60 dark:border-stone-800">
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className="text-[10px] font-sans-body uppercase tracking-wider font-semibold text-[#C2A379] flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  Color Harmony Palette
                </span>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-0.5 text-[9px] font-sans-body">
                  {(
                    [
                      { id: 'all', label: 'All' },
                      { id: 'pink', label: 'Pinks' },
                      { id: 'purple', label: 'Purples' },
                      { id: 'sponsor', label: 'Sponsors' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setMaleFilter(cat.id)}
                      className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                        maleFilter === cat.id
                          ? 'bg-[#C2A379] text-white font-semibold shadow-2xs'
                          : isDarkMode
                          ? 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swatch Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-[120px] overflow-y-auto pr-0.5 scrollbar-thin">
                {getFilteredSwatches(maleFilter).map((swatch) => {
                  const isSelected = maleColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => {
                        setMaleColor(swatch);
                        // If they were on Barong and select a colorful shade, optionally keep barong or let them preview
                      }}
                      className={`group flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all cursor-pointer text-left text-[10px] font-sans-body ${
                        isSelected
                          ? isDarkMode
                            ? 'border-[#C2A379] bg-[#2A2338] text-[#FAF0DE] ring-1 ring-[#C2A379]/70 shadow-2xs font-semibold'
                            : 'border-[#C2A379] bg-[#FAF3EA] text-[#3A3530] ring-1 ring-[#C2A379]/70 shadow-2xs font-semibold'
                          : isDarkMode
                          ? 'border-[#2C2538] bg-[#1A1625] text-[#D8CFDC] hover:border-[#4A3E60]'
                          : 'border-[#EAE0D2] bg-white text-[#5C524A] hover:border-[#C2A379]'
                      }`}
                      title={`${swatch.name}: ${swatch.description}`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-inner shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="truncate flex-1 leading-tight">{swatch.name}</span>
                      {isSelected && <Check className="w-2.5 h-2.5 text-[#C2A379] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Active Color Info Tag */}
              <div className="mt-1.5 flex items-center justify-between text-[9px] font-sans-body text-stone-500 dark:text-stone-400">
                <span className="truncate">
                  {maleStyle === 'barong' ? (
                    <span>
                      Piña Barong is embroidered ivory; motif accent is{' '}
                      <strong className={isDarkMode ? 'text-[#FAF0DE]' : 'text-[#3A3530]'}>
                        {maleColor.name}
                      </strong>
                    </span>
                  ) : (
                    <span>
                      Selected:{' '}
                      <strong className={isDarkMode ? 'text-[#FAF0DE]' : 'text-[#3A3530]'}>
                        {maleColor.name}
                      </strong>{' '}
                      ({maleColor.description})
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Micro Church Guidelines Tags */}
          <div className="mt-2 pt-1.5 border-t border-stone-200/50 dark:border-stone-800/80 flex items-center gap-1.5 flex-wrap text-[9px] font-sans-body">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <Check className="w-2.5 h-2.5" /> Polo, Barong, or Suit
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <Check className="w-2.5 h-2.5" /> Dark Slacks & Leather Shoes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
