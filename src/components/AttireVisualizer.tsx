import React, { useState } from 'react';
import { Sparkles, Check, Info, Palette, Shirt, User } from 'lucide-react';

export interface ColorSwatch {
  name: string;
  hex: string;
  textDark?: boolean;
  description: string;
  category: 'pink' | 'purple' | 'sponsor';
}

export const GUEST_PALETTE: ColorSwatch[] = [
  // Pink spectrum
  {
    name: 'Blush Pink',
    hex: '#F7C5CC',
    textDark: true,
    description: 'Soft, delicate romantic blush with warm undertones',
    category: 'pink',
  },
  {
    name: 'Dusty Rose',
    hex: '#D68C96',
    textDark: false,
    description: 'Sophisticated vintage rose with subtle muted depth',
    category: 'pink',
  },
  {
    name: 'Rose Quartz',
    hex: '#EAA2B8',
    textDark: true,
    description: 'Gentle pastel rose with luminous glow',
    category: 'pink',
  },
  {
    name: 'Soft Mauve',
    hex: '#B784A7',
    textDark: false,
    description: 'Graceful blend of dusty pink and lilac undertones',
    category: 'pink',
  },
  // Purple spectrum
  {
    name: 'Pastel Lilac',
    hex: '#C8A2C8',
    textDark: true,
    description: 'Light floral lilac, fresh and romantic',
    category: 'purple',
  },
  {
    name: 'Lavender Mist',
    hex: '#A78BFA',
    textDark: false,
    description: 'Airy serene lavender with modern elegance',
    category: 'purple',
  },
  {
    name: 'Royal Orchid',
    hex: '#9D4EDD',
    textDark: false,
    description: 'Rich radiant orchid for statement dresses & ties',
    category: 'purple',
  },
  {
    name: 'Deep Amethyst',
    hex: '#6A1B9A',
    textDark: false,
    description: 'Regal jewel-tone purple, dramatic and classic',
    category: 'purple',
  },
  {
    name: 'Mulberry Plum',
    hex: '#4A154B',
    textDark: false,
    description: 'Luxurious deep plum for formal evening wear',
    category: 'purple',
  },
];

export const SPONSOR_PALETTE: ColorSwatch[] = [
  {
    name: 'Warm Champagne',
    hex: '#F7E7CE',
    textDark: true,
    description: 'Luminous champagne silk',
    category: 'sponsor',
  },
  {
    name: 'Classic Cream',
    hex: '#FFFDD0',
    textDark: true,
    description: 'Timeless soft ivory-cream',
    category: 'sponsor',
  },
  {
    name: 'Soft Beige',
    hex: '#F5F5DC',
    textDark: true,
    description: 'Subtle neutral elegance',
    category: 'sponsor',
  },
  {
    name: 'Warm Nude',
    hex: '#E3BC9A',
    textDark: true,
    description: 'Warm sandy nude undertones',
    category: 'sponsor',
  },
];

export const SAMPLE_COMBINATIONS = [
  {
    title: 'Romantic Blush & Lavender',
    femaleColor: '#F7C5CC',
    maleTieColor: '#A78BFA',
    suitColor: '#2B2D42',
    description: 'Flowing Blush Pink gown paired with a Charcoal suit and Lavender tie.',
  },
  {
    title: 'Dusty Rose & Modern Barong',
    femaleColor: '#D68C96',
    maleTieColor: '#D68C96',
    suitColor: '#FAF7F0',
    isBarong: true,
    description: 'Vintage Dusty Rose evening dress paired with a Barong Tagalog with Rose accents.',
  },
  {
    title: 'Royal Orchid & Deep Amethyst',
    femaleColor: '#9D4EDD',
    maleTieColor: '#6A1B9A',
    suitColor: '#1F2937',
    description: 'Radiant Royal Orchid gown complemented by a midnight suit with Amethyst tie.',
  },
  {
    title: 'Lilac & Mulberry Plum',
    femaleColor: '#C8A2C8',
    maleTieColor: '#4A154B',
    suitColor: '#475569',
    description: 'Soft Lilac cocktail dress with a Slate Grey suit and deep Mulberry Plum accents.',
  },
];

export const AttireVisualizer: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(GUEST_PALETTE[1]); // Dusty Rose default
  const [secondaryColor, setSecondaryColor] = useState<ColorSwatch>(GUEST_PALETTE[5]); // Lavender default
  const [viewMode, setViewMode] = useState<'both' | 'female' | 'male'>('both');
  const [maleAttireType, setMaleAttireType] = useState<'suit' | 'barong'>('suit');
  const [femaleStyle, setFemaleStyle] = useState<'gown' | 'terno'>('gown');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleApplyPreset = (combo: typeof SAMPLE_COMBINATIONS[0]) => {
    const fColor = GUEST_PALETTE.find((c) => c.hex === combo.femaleColor) || {
      name: 'Custom Pink',
      hex: combo.femaleColor,
      description: 'Preset color',
      category: 'pink',
    };
    const mColor = GUEST_PALETTE.find((c) => c.hex === combo.maleTieColor) || {
      name: 'Custom Purple',
      hex: combo.maleTieColor,
      description: 'Preset color',
      category: 'purple',
    };
    setSelectedColor(fColor);
    setSecondaryColor(mColor);
    if (combo.isBarong) {
      setMaleAttireType('barong');
    } else {
      setMaleAttireType('suit');
    }
  };

  return (
    <div className="w-full">
      {/* Header & Concept */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F5] border border-[#E9D5E5] text-[#8E4585] text-xs uppercase tracking-widest font-sans-body mb-3">
          <Palette className="w-3.5 h-3.5" />
          Guest Dress Code & Motif
        </div>
        <h3 className="font-serif-title text-3xl sm:text-4xl text-[#3A3530] font-normal mb-3">
          Pink & Purple Harmony
        </h3>
        <p className="font-sans-body text-sm text-[#6E645D] leading-relaxed">
          We invite our cherished guests to celebrate with us in tones of{' '}
          <strong className="text-[#B75B82] font-semibold">Romantic Pinks</strong> and{' '}
          <strong className="text-[#7A3E9D] font-semibold">Royal Purples</strong>.
          Explore the interactive palette and animated outfit previews below.
        </p>
      </div>

      {/* Interactive Color Palette Swatches */}
      <div className="bg-[#FFFDFB] rounded-2xl border border-[#C2A379]/30 p-5 sm:p-7 shadow-xs mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#F0E6D8] pb-4">
          <div>
            <h4 className="font-serif-title text-xl text-[#3A3530] font-medium flex items-center gap-2">
              <span>Curated Guest Color Palette</span>
              <span className="text-xs font-sans-body text-[#8C827A] font-normal">
                (Click any swatch to preview)
              </span>
            </h4>
            <p className="text-xs text-[#8C827A] font-sans-body mt-0.5">
              Click to preview on outfit graphics or click copy for hex code.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans-body">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F7C5CC] border border-[#D68C96]" />
            <span className="text-[#6E645D]">Blush & Rose</span>
            <span className="mx-1 text-[#D8C7B0]">·</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#9D4EDD]" />
            <span className="text-[#6E645D]">Lilac & Amethyst</span>
          </div>
        </div>

        {/* Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {GUEST_PALETTE.map((swatch, idx) => {
            const isSelectedAsFemale = selectedColor.hex === swatch.hex;
            const isSelectedAsMale = secondaryColor.hex === swatch.hex;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (swatch.category === 'pink') {
                    setSelectedColor(swatch);
                  } else {
                    setSecondaryColor(swatch);
                  }
                }}
                className={`relative group rounded-xl p-3 border transition-all duration-300 cursor-pointer text-left ${
                  isSelectedAsFemale || isSelectedAsMale
                    ? 'border-[#C2A379] ring-2 ring-[#C2A379]/40 bg-[#FAF7F2] shadow-md scale-[1.02]'
                    : 'border-[#EAE0D2] bg-white hover:border-[#C2A379]/60 hover:shadow-sm'
                }`}
              >
                {/* Color Disc with animated shimmer */}
                <div className="relative w-full h-14 rounded-lg overflow-hidden mb-2.5 shadow-inner transition-transform group-hover:scale-[1.02]">
                  <div
                    className="w-full h-full transition-colors duration-500"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  {/* Subtle fabric texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />

                  {(isSelectedAsFemale || isSelectedAsMale) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="h-6 w-6 rounded-full bg-white/95 text-[#3A3530] flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 text-[#8E4585]" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between gap-1">
                  <div>
                    <p className="font-serif-title text-sm text-[#3A3530] font-semibold leading-tight">
                      {swatch.name}
                    </p>
                    <p className="font-mono text-[10px] text-[#8C827A] mt-0.5 tracking-wider">
                      {swatch.hex}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyColor(swatch.hex);
                    }}
                    title="Copy hex code"
                    className="text-[9px] text-[#A88B64] hover:text-[#3A3530] p-1 rounded bg-[#F8F4EE] hover:bg-[#EDE3D4] transition-colors"
                  >
                    {copiedHex === swatch.hex ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(swatch);
                    }}
                    className={`text-[9px] px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                      isSelectedAsFemale
                        ? 'bg-[#EAA2B8] text-white font-medium'
                        : 'bg-stone-100 text-stone-600 hover:bg-[#F7C5CC]'
                    }`}
                    title="Set as Women's Dress color"
                  >
                    Dress
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSecondaryColor(swatch);
                    }}
                    className={`text-[9px] px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                      isSelectedAsMale
                        ? 'bg-[#8E4585] text-white font-medium'
                        : 'bg-stone-100 text-stone-600 hover:bg-[#E9D5E5]'
                    }`}
                    title="Set as Men's Tie / Accent color"
                  >
                    Tie / Accent
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preset Sample Combinations */}
        <div className="mt-6 pt-5 border-t border-[#F0E6D8]">
          <p className="font-sans-body text-xs uppercase tracking-wider text-[#8C827A] mb-3 font-medium">
            Sample Outfit Harmony Combinations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SAMPLE_COMBINATIONS.map((combo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(combo)}
                className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E8DCCF] bg-[#FAF8F5] hover:bg-white hover:border-[#C2A379] transition-all text-left group cursor-pointer"
              >
                <div className="flex -space-x-1.5 shrink-0">
                  <div
                    className="w-5 h-5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: combo.femaleColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: combo.maleTieColor }}
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="font-serif-title text-xs font-semibold text-[#3A3530] group-hover:text-[#C2A379] truncate">
                    {combo.title}
                  </p>
                  <p className="text-[10px] text-[#8C827A] truncate font-sans-body">
                    {combo.isBarong ? 'Barong Tagalog' : 'Formal Suit'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ANIMATED VISUAL GRAPHICS: OUTFIT VISUALIZER */}
      <div className="rounded-2xl bg-gradient-to-b from-[#FAF7F2] to-[#F5EFE6] border border-[#C2A379]/40 p-6 sm:p-9 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-[#E6D9C8] pb-6">
          <div>
            <span className="font-sans-body text-[10px] uppercase tracking-[3px] text-[#C2A379] font-medium">
              Interactive Fitting Room
            </span>
            <h4 className="font-serif-title text-2xl sm:text-3xl text-[#3A3530] font-normal">
              Outfit Color & Style Visualizer
            </h4>
            <p className="font-sans-body text-xs text-[#7A7067] mt-1">
              Visualizing Women's gown in{' '}
              <strong style={{ color: selectedColor.hex }}>{selectedColor.name}</strong> & Men's attire
              accent in{' '}
              <strong style={{ color: secondaryColor.hex }}>{secondaryColor.name}</strong>
            </p>
          </div>

          {/* View Mode Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-white rounded-lg p-1 border border-[#DDCFBE] shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('both')}
                className={`px-3 py-1.5 text-xs font-sans-body rounded-md transition-all cursor-pointer ${
                  viewMode === 'both'
                    ? 'bg-[#C2A379] text-white shadow-xs font-medium'
                    : 'text-[#6E645D] hover:text-[#3A3530]'
                }`}
              >
                Side by Side
              </button>
              <button
                type="button"
                onClick={() => setViewMode('female')}
                className={`px-3 py-1.5 text-xs font-sans-body rounded-md transition-all cursor-pointer ${
                  viewMode === 'female'
                    ? 'bg-[#C2A379] text-white shadow-xs font-medium'
                    : 'text-[#6E645D] hover:text-[#3A3530]'
                }`}
              >
                Women's Attire
              </button>
              <button
                type="button"
                onClick={() => setViewMode('male')}
                className={`px-3 py-1.5 text-xs font-sans-body rounded-md transition-all cursor-pointer ${
                  viewMode === 'male'
                    ? 'bg-[#C2A379] text-white shadow-xs font-medium'
                    : 'text-[#6E645D] hover:text-[#3A3530]'
                }`}
              >
                Men's Attire
              </button>
            </div>
          </div>
        </div>

        {/* Outfits Showcase Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* FEMALE OUTFIT GRAPHIC */}
          {(viewMode === 'both' || viewMode === 'female') && (
            <div className="relative flex flex-col items-center bg-white/80 backdrop-blur-xs rounded-xl border border-[#E8DCCF] p-6 text-center shadow-xs transition-all hover:shadow-md">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8E4585]">
                  <User className="w-3.5 h-3.5" />
                  Women's Attire (Guest)
                </span>
                <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-md border border-[#E5D7C5] text-[10px]">
                  <button
                    type="button"
                    onClick={() => setFemaleStyle('gown')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      femaleStyle === 'gown'
                        ? 'bg-white font-medium text-[#3A3530] shadow-xs'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Evening Gown
                  </button>
                  <button
                    type="button"
                    onClick={() => setFemaleStyle('terno')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      femaleStyle === 'terno'
                        ? 'bg-white font-medium text-[#3A3530] shadow-xs'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Modern Terno
                  </button>
                </div>
              </div>

              {/* Animated SVG Illustration of Female Dress / Gown */}
              <div className="relative w-full max-w-[240px] h-[340px] flex items-center justify-center my-2 select-none">
                {/* Floating ambient shimmer particle */}
                <div className="absolute -top-2 right-4 text-[#C2A379] animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>

                <svg
                  viewBox="0 0 200 320"
                  className="w-full h-full drop-shadow-md transition-all duration-700"
                  style={{
                    filter: 'drop-shadow(0 10px 15px rgba(142, 69, 133, 0.15))',
                  }}
                >
                  <defs>
                    <linearGradient id="femaleFabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={selectedColor.hex} stopOpacity="0.9" />
                      <stop offset="50%" stopColor={selectedColor.hex} />
                      <stop offset="100%" stopColor="#3A1D34" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="femaleShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Mannequin / Hanger Stand */}
                  <path
                    d="M100 20 L100 305 M80 305 L120 305"
                    stroke="#D8C7B0"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Hanger / Shoulders */}
                  <path
                    d="M75 55 Q100 45 125 55"
                    stroke="#C2A379"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Bodice / Top */}
                  <path
                    d="M80 60 C80 50, 120 50, 120 60 L115 110 C108 115, 92 115, 85 110 Z"
                    fill="url(#femaleFabricGrad)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    className="transition-all duration-700"
                  />

                  {/* Sweetheart neckline contour */}
                  <path
                    d="M84 62 Q92 70 100 64 Q108 70 116 62"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Modern Terno Butterfly Sleeves if selected */}
                  {femaleStyle === 'terno' && (
                    <g className="transition-all duration-500">
                      {/* Left Butterfly Sleeve */}
                      <path
                        d="M80 60 C65 40, 50 65, 76 80 Z"
                        fill={selectedColor.hex}
                        stroke="#C2A379"
                        strokeWidth="1.2"
                        opacity="0.95"
                      />
                      {/* Right Butterfly Sleeve */}
                      <path
                        d="M120 60 C135 40, 150 65, 124 80 Z"
                        fill={selectedColor.hex}
                        stroke="#C2A379"
                        strokeWidth="1.2"
                        opacity="0.95"
                      />
                    </g>
                  )}

                  {/* Waistband / Gold Accent Ribbon */}
                  <rect
                    x="86"
                    y="108"
                    width="28"
                    height="5"
                    rx="2"
                    fill="#C2A379"
                    opacity="0.9"
                  />

                  {/* Flowing Skirt / Hemline */}
                  <path
                    d="M85 113 Q100 115 115 113 L142 270 C120 280, 80 280, 58 270 Z"
                    fill="url(#femaleFabricGrad)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    className="transition-all duration-700"
                  />

                  {/* Skirt Drapes / Folds */}
                  <path
                    d="M92 115 Q95 200 80 273"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M108 115 Q105 200 120 273"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M100 115 L100 275"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Sparkle or Brooch */}
                  <circle cx="100" cy="110" r="3" fill="#FFF" />
                  <circle cx="100" cy="110" r="1.5" fill="#C2A379" />
                </svg>
              </div>

              {/* Details & Fabrics */}
              <div className="w-full mt-3 pt-3 border-t border-[#EFE5D8] text-left">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#3A3530]">Selected Color:</span>
                  <span
                    className="font-medium px-2 py-0.5 rounded text-[11px]"
                    style={{
                      backgroundColor: selectedColor.hex,
                      color: selectedColor.textDark ? '#2D1B28' : '#FFF',
                    }}
                  >
                    {selectedColor.name}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7067] font-sans-body">
                  <strong>Recommended:</strong> Floor-length gown, cocktail dress, or chic terno.
                  Fabrics: Satin, Chiffon, Organza, or Silk.
                </p>
              </div>
            </div>
          )}

          {/* MALE OUTFIT GRAPHIC */}
          {(viewMode === 'both' || viewMode === 'male') && (
            <div className="relative flex flex-col items-center bg-white/80 backdrop-blur-xs rounded-xl border border-[#E8DCCF] p-6 text-center shadow-xs transition-all hover:shadow-md">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#3A3530]">
                  <Shirt className="w-3.5 h-3.5 text-[#C2A379]" />
                  Men's Attire (Guest)
                </span>
                <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-md border border-[#E5D7C5] text-[10px]">
                  <button
                    type="button"
                    onClick={() => setMaleAttireType('suit')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      maleAttireType === 'suit'
                        ? 'bg-white font-medium text-[#3A3530] shadow-xs'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Suit & Tie
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaleAttireType('barong')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      maleAttireType === 'barong'
                        ? 'bg-white font-medium text-[#3A3530] shadow-xs'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Barong Tagalog
                  </button>
                </div>
              </div>

              {/* Animated SVG Illustration of Male Suit / Barong */}
              <div className="relative w-full max-w-[240px] h-[340px] flex items-center justify-center my-2 select-none">
                <svg
                  viewBox="0 0 200 320"
                  className="w-full h-full drop-shadow-md transition-all duration-700"
                  style={{
                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))',
                  }}
                >
                  <defs>
                    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="100%" stopColor="#1F2937" />
                    </linearGradient>
                    <linearGradient id="barongGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FAF7F0" />
                      <stop offset="100%" stopColor="#EFE8DA" />
                    </linearGradient>
                  </defs>

                  {/* Mannequin Stand */}
                  <path
                    d="M100 20 L100 305 M80 305 L120 305"
                    stroke="#D8C7B0"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Hanger / Shoulder Line */}
                  <path
                    d="M60 55 Q100 45 140 55"
                    stroke="#C2A379"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {maleAttireType === 'suit' ? (
                    // FORMAL SUIT GRAPHIC
                    <g className="transition-all duration-500">
                      {/* Inner Crisp White Shirt */}
                      <polygon points="85,55 115,55 100,105" fill="#FFFFFF" stroke="#E5E7EB" />

                      {/* Accent Necktie (Changes color with secondaryColor: Pink/Purple!) */}
                      <path
                        d="M97 62 L103 62 L105 108 L100 120 L95 108 Z"
                        fill={secondaryColor.hex}
                        stroke="rgba(0,0,0,0.15)"
                        strokeWidth="1"
                        className="transition-colors duration-700"
                      />
                      {/* Tie Knot */}
                      <polygon
                        points="96,56 104,56 102,64 98,64"
                        fill={secondaryColor.hex}
                        stroke="rgba(0,0,0,0.2)"
                      />

                      {/* Suit Jacket Body */}
                      <path
                        d="M65 58 L85 58 L100 135 L115 58 L135 58 L138 185 L100 195 L62 185 Z"
                        fill="url(#suitGrad)"
                        stroke="#111827"
                        strokeWidth="1.5"
                      />

                      {/* Lapels */}
                      <path
                        d="M85 58 L72 105 L98 135 L85 58 Z"
                        fill="#1F2937"
                        stroke="#4B5563"
                        strokeWidth="1"
                      />
                      <path
                        d="M115 58 L128 105 L102 135 L115 58 Z"
                        fill="#1F2937"
                        stroke="#4B5563"
                        strokeWidth="1"
                      />

                      {/* Pocket Square in Breast Pocket (Matches secondaryColor!) */}
                      <rect x="74" y="98" width="16" height="3" fill="#1F2937" />
                      <polygon
                        points="78,98 82,90 86,98"
                        fill={secondaryColor.hex}
                        className="transition-colors duration-700"
                      />

                      {/* Suit Buttons */}
                      <circle cx="100" cy="148" r="2.5" fill="#C2A379" />
                      <circle cx="100" cy="165" r="2.5" fill="#C2A379" />

                      {/* Tailored Slacks / Trousers */}
                      <path
                        d="M72 185 L84 290 L98 290 L100 205 L102 205 L116 290 L128 290 L128 185 Z"
                        fill="#1F2937"
                        stroke="#111827"
                        strokeWidth="1.2"
                      />
                    </g>
                  ) : (
                    // BARONG TAGALOG GRAPHIC
                    <g className="transition-all duration-500">
                      {/* Inner Camisa de Chino (Subtle Pink/Purple or White) */}
                      <path
                        d="M80 55 L120 55 L120 180 L80 180 Z"
                        fill="#FFFFFF"
                        stroke="#E5E7EB"
                      />

                      {/* Barong Tagalog Piña Body */}
                      <path
                        d="M62 56 L138 56 L134 185 L100 188 L66 185 Z"
                        fill="url(#barongGrad)"
                        stroke="#D6C7B2"
                        strokeWidth="1.5"
                      />

                      {/* Mandarin / Nehru Collar */}
                      <path
                        d="M85 54 Q100 58 115 54 L115 62 Q100 66 85 62 Z"
                        fill="#EDE3D2"
                        stroke="#C2A379"
                        strokeWidth="1"
                      />

                      {/* Barong Placket & Embroidery (Accented with secondaryColor!) */}
                      <rect
                        x="93"
                        y="62"
                        width="14"
                        height="85"
                        fill="#F3EBDD"
                        stroke={secondaryColor.hex}
                        strokeWidth="1.2"
                        strokeDasharray="2,2"
                        className="transition-colors duration-700"
                      />

                      {/* U-Shape Collar Embroidery */}
                      <path
                        d="M82 62 Q100 85 118 62"
                        stroke={secondaryColor.hex}
                        strokeWidth="1.5"
                        fill="none"
                        className="transition-colors duration-700"
                      />

                      {/* Placket Pearl Buttons */}
                      <circle cx="100" cy="74" r="1.8" fill="#FFF" stroke="#D8C7B0" />
                      <circle cx="100" cy="90" r="1.8" fill="#FFF" stroke="#D8C7B0" />
                      <circle cx="100" cy="106" r="1.8" fill="#FFF" stroke="#D8C7B0" />
                      <circle cx="100" cy="122" r="1.8" fill="#FFF" stroke="#D8C7B0" />

                      {/* Barong Side Slits */}
                      <line x1="68" y1="165" x2="68" y2="185" stroke="#C2A379" strokeWidth="1.5" />
                      <line x1="132" y1="165" x2="132" y2="185" stroke="#C2A379" strokeWidth="1.5" />

                      {/* Dark Tailored Slacks */}
                      <path
                        d="M72 185 L84 290 L98 290 L100 205 L102 205 L116 290 L128 290 L128 185 Z"
                        fill="#1F2937"
                        stroke="#111827"
                        strokeWidth="1.2"
                      />
                    </g>
                  )}
                </svg>
              </div>

              {/* Details & Fabrics */}
              <div className="w-full mt-3 pt-3 border-t border-[#EFE5D8] text-left">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#3A3530]">Accent Tone:</span>
                  <span
                    className="font-medium px-2 py-0.5 rounded text-[11px]"
                    style={{
                      backgroundColor: secondaryColor.hex,
                      color: secondaryColor.textDark ? '#2D1B28' : '#FFF',
                    }}
                  >
                    {secondaryColor.name}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7067] font-sans-body">
                  <strong>Recommended:</strong> Barong Tagalog (Piña/Jusi) with black slacks OR
                  formal suit (Charcoal, Navy, or Grey) with pink/purple necktie & pocket square.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Style Dos & Don'ts */}
        <div className="mt-8 pt-6 border-t border-[#E6D9C8] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans-body text-left">
          <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
            <p className="font-semibold text-emerald-900 mb-1 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Encouraged Attire
            </p>
            <ul className="text-emerald-800 space-y-1 list-disc list-inside text-[11px]">
              <li>Long gowns or elegant midi dresses in any shade of pink or purple</li>
              <li>Barong Tagalog with dark slacks or formal tailored suits</li>
              <li>Coordinating pink/purple accessories (neckties, scarves, pocket squares)</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80">
            <p className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              Kindly Avoid
            </p>
            <ul className="text-amber-800 space-y-1 list-disc list-inside text-[11px]">
              <li>All-white or pure ivory gowns (exclusively reserved for the bride)</li>
              <li>All-black casual wear or overly informal denim / sneakers</li>
              <li>Sponsor colors (Beige/Cream/Nude reserved for Principal Sponsors)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Principal Sponsors Palette Section */}
      <div className="mt-10 pt-8 border-t border-[#EAE0D2] text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E3BC9A]/60 text-[#A88B64] text-xs uppercase tracking-widest font-sans-body mb-2">
          Principal Sponsors Attire
        </div>
        <h4 className="font-serif-title text-2xl text-[#3A3530] font-normal mb-1">
          Beige, Cream & Nude
        </h4>
        <p className="font-sans-body text-xs text-[#8C827A] mb-5 max-w-md mx-auto">
          Our beloved Principal Sponsors are warmly requested to wear elegant neutrals in Champagne,
          Cream, Soft Beige, or Nude.
        </p>

        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6">
          {SPONSOR_PALETTE.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110"
                style={{ backgroundColor: c.hex }}
                title={`${c.name} (${c.hex})`}
              />
              <span className="font-serif-title text-xs font-semibold text-[#3A3530]">
                {c.name}
              </span>
              <span className="font-mono text-[9px] text-[#8C827A]">{c.hex}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
