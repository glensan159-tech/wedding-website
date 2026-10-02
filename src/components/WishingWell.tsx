import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  QrCode,
  Copy,
  Check,
  Maximize2,
  X,
  Heart,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Building,
  Info,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface TransferOption {
  id: string;
  name: string;
  type: 'maribank' | 'gcash' | 'unionbank';
  badge: string;
  badgeColor: string;
  accountName: string;
  accountNumber: string;
  qrImageSrc?: string;
  instructions: string;
  brandColor: string;
  note?: string;
}

export const DIGITAL_TRANSFER_OPTIONS: TransferOption[] = [
  {
    id: 'maribank',
    name: 'MariBank',
    type: 'maribank',
    badge: 'InstaPay · QR Ph',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    accountName: 'GLENSAN DESALAGO',
    accountNumber: 'MariBank(****3478)',
    qrImageSrc: 'https://i.imgur.com/0rfCzuS.png',
    instructions: 'Scan using your MariBank app, GCash, Maya, or any InstaPay / QR Ph-compatible Philippine banking app.',
    brandColor: '#FF5722',
    note: 'Zero transfer fee when transferring from MariBank or partner digital banks.',
  },
  {
    id: 'gcash',
    name: 'GCash',
    type: 'gcash',
    badge: 'InstaPay · QR Ph',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    accountName: 'GL****N D. (Glensan D.)',
    accountNumber: '0995 368 ••••',
    qrImageSrc: 'https://i.imgur.com/Nl9TyhG.jpeg',
    instructions: 'Open your GCash app, tap "QR" (Scan QR) or upload this code from your photo gallery. Transfer fees may apply depending on your provider.',
    brandColor: '#007DFE',
    note: 'User ID: ••••••••••YRKHOU',
  },
  {
    id: 'unionbank',
    name: 'UnionBank',
    type: 'unionbank',
    badge: 'InstaPay · QR Ph',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    accountName: 'GLENSAN DESALAGO',
    accountNumber: '**** **** 0494',
    qrImageSrc: 'https://i.imgur.com/9ThPkrX.jpeg',
    instructions: 'Scan using UnionBank Online app or any Philippine InstaPay / QR Ph banking app to transfer your gift.',
    brandColor: '#FF6200',
    note: 'Instant bank-to-bank transfer via national InstaPay QR Ph.',
  },
];

export const WishingWell: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedOption, setSelectedOption] = useState<TransferOption>(DIGITAL_TRANSFER_OPTIONS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [enlargedQr, setEnlargedQr] = useState<TransferOption | null>(null);
  const [imgLoadError, setImgLoadError] = useState<Record<string, boolean>>({});

  const handleCopy = (id: string, text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleImageError = (id: string) => {
    setImgLoadError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full">
      {/* SECTION HEADER (COMPACT, GRACIOUS & GENTLE) */}
      <div className="text-center max-w-xl mx-auto mb-3.5 sm:mb-5 px-2">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[2px] font-sans-body mb-2 shadow-2xs border ${
            isDarkMode
              ? 'bg-[#1E182A] border-[#382E4D] text-[#C2A379]'
              : 'bg-[#FAF3EA] border-[#E8DCB8] text-[#A88B64]'
          }`}
        >
          <Heart className="w-3 h-3 text-[#C2A379] fill-current" />
          <span>A Gentle & Humble Note on Gifts</span>
        </div>

        <h2
          className={`font-serif-title text-xl sm:text-2xl md:text-3xl font-normal tracking-tight mb-1.5 ${
            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
          }`}
        >
          Your Presence is Our Greatest Gift
        </h2>

        <p
          className={`font-sans-body text-xs sm:text-[13px] leading-relaxed max-w-lg mx-auto ${
            isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
          }`}
        >
          First and foremost, having you celebrate with us and sharing your prayers for our marriage
          are truly all that we ask for. <strong>Please do not feel any pressure or obligation whatsoever to give</strong>—your
          love, presence, and fellowship are what we treasure most.
        </p>

        {/* SOFT & REASSURING WISHING WELL POEM / NOTE */}
        <div
          className={`mt-2.5 p-2.5 sm:p-3 rounded-xl border max-w-lg mx-auto text-center shadow-2xs ${
            isDarkMode
              ? 'bg-[#181523]/80 border-[#312940] text-[#D8CFDC]'
              : 'bg-[#FDFBF7] border-[#EAE0D2] text-[#554D46]'
          }`}
        >
          <p className="font-serif-title italic text-xs sm:text-[13px] leading-relaxed text-[#C2A379] mb-1">
            “The greatest gift God has blessed us with is the love of family and friends.
            Your presence at our wedding is all that we desire.”
          </p>
          <p className="text-[10px] sm:text-[11px] font-sans-body text-stone-500 dark:text-stone-400">
            If, however, you wish to honor our new home and marriage with a token of love, our digital
            transfer details are provided below for your convenience. Any gift, great or small, is
            received with heartfelt humility.
          </p>
        </div>
      </div>

      {/* DIGITAL TRANSFERS & QR CODE INTERACTIVE CARDS */}
      <div className="max-w-4xl mx-auto">
        {/* Method Selector Tabs (MariBank, GCash, UnionBank) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3.5 flex-wrap px-2">
          {DIGITAL_TRANSFER_OPTIONS.map((opt) => {
            const isSelected = selectedOption.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] sm:text-xs font-sans-body transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-[#2E243E] border-[#C2A379] text-[#FAF0DE] ring-1 ring-[#C2A379]/50 font-semibold'
                      : 'bg-[#FAF3EA] border-[#C2A379] text-[#3A3530] ring-1 ring-[#C2A379]/50 font-semibold'
                    : isDarkMode
                    ? 'bg-[#171424] border-[#2E273D] text-[#AFA498] hover:border-[#4B3E60]'
                    : 'bg-white border-[#E8DCCF] text-[#6E645D] hover:border-[#C2A379]'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: opt.brandColor }}
                />
                <span>{opt.name}</span>
                {isSelected && <Check className="w-3 h-3 text-[#C2A379]" />}
              </button>
            );
          })}
        </div>

        {/* Selected Option Card (High-Fidelity QR Card & Details) */}
        <div
          className={`rounded-2xl border p-3.5 sm:p-5 shadow-xs max-w-2xl mx-auto transition-all ${
            isDarkMode
              ? 'bg-[#161322] border-[#312940]'
              : 'bg-white border-[#EAE0D2]'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* QR Code Graphic Frame (Authentic QR Container with InstaPay branding) */}
            <div className="sm:col-span-5 flex flex-col items-center text-center">
              <div
                className={`relative w-40 h-48 sm:w-44 sm:h-52 rounded-xl border-2 p-2 flex flex-col items-center justify-between overflow-hidden transition-all shadow-xs ${
                  selectedOption.id === 'gcash'
                    ? 'bg-[#007DFE] border-[#0066D6] text-white'
                    : isDarkMode
                    ? 'bg-[#1A1628] border-[#3E3452]'
                    : 'bg-[#FAF8F5] border-[#E2D5C3]'
                }`}
              >
                {/* Brand Header Inside QR Card */}
                <div className="w-full flex items-center justify-center gap-1.5 pt-0.5 pb-0.5">
                  {selectedOption.id === 'maribank' && (
                    <div className="flex items-center gap-1 text-[#FF5722] font-sans-body font-bold text-[11px]">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FF5722] text-white flex items-center justify-center text-[8px] font-black">
                        M
                      </span>
                      <span>MariBank</span>
                    </div>
                  )}

                  {selectedOption.id === 'gcash' && (
                    <div className="flex items-center gap-1 text-white font-sans-body font-bold text-[11px] tracking-wider">
                      <span className="w-3.5 h-3.5 rounded-full bg-white text-[#007DFE] flex items-center justify-center text-[8px] font-black">
                        G
                      </span>
                      <span>GCash</span>
                    </div>
                  )}

                  {selectedOption.id === 'unionbank' && (
                    <div className="flex items-center gap-1 font-sans-body font-bold text-[11px] text-[#FF6200]">
                      <span className="font-extrabold text-xs tracking-tight text-[#FF6200]">
                        UB
                      </span>
                      <span className={isDarkMode ? 'text-white' : 'text-stone-800'}>
                        UnionBank
                      </span>
                    </div>
                  )}
                </div>

                {/* QR Code Body with center InstaPay emblem */}
                <div className="relative w-30 h-30 sm:w-34 sm:h-34 rounded-lg bg-white p-1.5 shadow-inner border border-black/10 flex items-center justify-center">
                  {!imgLoadError[selectedOption.id] && selectedOption.qrImageSrc ? (
                    <img
                      src={selectedOption.qrImageSrc}
                      alt={`${selectedOption.name} QR Code`}
                      onError={() => handleImageError(selectedOption.id)}
                      className="w-full h-full object-contain rounded-sm"
                    />
                  ) : (
                    /* SVG Fallback with InstaPay center badge */
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-stone-900"
                        fill="currentColor"
                      >
                        {/* Finder Patterns */}
                        {/* Top-Left */}
                        <rect x="5" y="5" width="26" height="26" rx="3" fill="#111" />
                        <rect x="9" y="9" width="18" height="18" rx="2" fill="#fff" />
                        <rect x="13" y="13" width="10" height="10" rx="1" fill="#111" />

                        {/* Top-Right */}
                        <rect x="69" y="5" width="26" height="26" rx="3" fill="#111" />
                        <rect x="73" y="9" width="18" height="18" rx="2" fill="#fff" />
                        <rect x="77" y="13" width="10" height="10" rx="1" fill="#111" />

                        {/* Bottom-Left */}
                        <rect x="5" y="69" width="26" height="26" rx="3" fill="#111" />
                        <rect x="9" y="73" width="18" height="18" rx="2" fill="#fff" />
                        <rect x="13" y="77" width="10" height="10" rx="1" fill="#111" />

                        {/* Timing Patterns */}
                        <rect x="35" y="15" width="4" height="4" fill="#111" />
                        <rect x="43" y="15" width="4" height="4" fill="#111" />
                        <rect x="51" y="15" width="4" height="4" fill="#111" />
                        <rect x="59" y="15" width="4" height="4" fill="#111" />

                        <rect x="15" y="35" width="4" height="4" fill="#111" />
                        <rect x="15" y="43" width="4" height="4" fill="#111" />
                        <rect x="15" y="51" width="4" height="4" fill="#111" />
                        <rect x="15" y="59" width="4" height="4" fill="#111" />

                        {/* QR Data Noise Pattern */}
                        <rect x="35" y="25" width="4" height="4" fill="#111" />
                        <rect x="43" y="29" width="4" height="4" fill="#111" />
                        <rect x="51" y="25" width="4" height="4" fill="#111" />
                        <rect x="59" y="29" width="4" height="4" fill="#111" />
                        <rect x="25" y="35" width="4" height="4" fill="#111" />
                        <rect x="29" y="43" width="4" height="4" fill="#111" />
                        <rect x="25" y="51" width="4" height="4" fill="#111" />
                        <rect x="29" y="59" width="4" height="4" fill="#111" />
                        <rect x="69" y="35" width="4" height="4" fill="#111" />
                        <rect x="73" y="43" width="4" height="4" fill="#111" />
                        <rect x="85" y="51" width="4" height="4" fill="#111" />
                        <rect x="77" y="59" width="4" height="4" fill="#111" />
                        <rect x="35" y="69" width="4" height="4" fill="#111" />
                        <rect x="43" y="77" width="4" height="4" fill="#111" />
                        <rect x="51" y="85" width="4" height="4" fill="#111" />
                        <rect x="59" y="69" width="4" height="4" fill="#111" />
                        <rect x="69" y="69" width="4" height="4" fill="#111" />
                        <rect x="85" y="77" width="4" height="4" fill="#111" />
                        <rect x="77" y="85" width="4" height="4" fill="#111" />
                        <rect x="85" y="89" width="4" height="4" fill="#111" />
                      </svg>

                      {/* InstaPay Logo Badge in Center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="px-1.5 py-0.5 rounded-sm bg-white border border-stone-300 shadow-xs flex items-center gap-0.5">
                          <span className="text-[8px] font-sans-body font-bold text-[#003B70] leading-none">
                            insta
                          </span>
                          <span className="text-[8px] font-sans-body font-extrabold text-[#D32F2F] leading-none">
                            Pay
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enlarge preview trigger button */}
                  <button
                    type="button"
                    onClick={() => setEnlargedQr(selectedOption)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer shadow-xs"
                    title="Enlarge QR Code"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Subtext on Card */}
                <div
                  className={`text-[9px] font-sans-body font-medium truncate max-w-full px-1 py-0.5 ${
                    selectedOption.id === 'gcash'
                      ? 'text-white/90'
                      : isDarkMode
                      ? 'text-stone-300'
                      : 'text-stone-600'
                  }`}
                >
                  {selectedOption.accountName}
                </div>
              </div>

              <span className="text-[10px] font-sans-body text-[#A6998E] mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Verified InstaPay · QR Ph
              </span>
            </div>

            {/* Account Information & Instructions */}
            <div className="sm:col-span-7 space-y-3 text-left">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider font-sans-body border ${selectedOption.badgeColor}`}
                >
                  <Smartphone className="w-3 h-3" />
                  {selectedOption.badge}
                </span>

                <span className="text-xs font-serif-title font-semibold text-[#C2A379]">
                  {selectedOption.name}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-sans-body uppercase tracking-wider text-stone-400 font-medium block mb-0.5">
                  Account Name
                </span>
                <p
                  className={`font-serif-title text-base sm:text-lg font-semibold ${
                    isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                  }`}
                >
                  {selectedOption.accountName}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-sans-body uppercase tracking-wider text-stone-400 font-medium block mb-0.5">
                  Account / Mobile Reference
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-md border ${
                      isDarkMode
                        ? 'bg-[#1F1B2C] border-[#382F4B] text-[#D8CFDC]'
                        : 'bg-[#FAF7F2] border-[#E8DCCF] text-[#4A4540]'
                    }`}
                  >
                    {selectedOption.accountNumber}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(selectedOption.id, `${selectedOption.accountName} - ${selectedOption.accountNumber}`)
                    }
                    className="p-1.5 rounded-md border text-xs font-sans-body transition-all cursor-pointer hover:border-[#C2A379] flex items-center gap-1"
                    title="Copy details"
                  >
                    {copiedId === selectedOption.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] text-emerald-500 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                        <span className="text-[10px] text-stone-500">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div
                className={`p-2.5 rounded-xl border text-[11px] font-sans-body leading-relaxed ${
                  isDarkMode
                    ? 'bg-[#1D1929] border-[#352C47] text-[#B8ADC0]'
                    : 'bg-[#FAF7F2] border-[#EAE0D2] text-[#6E645D]'
                }`}
              >
                {selectedOption.instructions}
              </div>

              {selectedOption.note && (
                <div className="text-[10px] font-sans-body text-stone-400 flex items-center gap-1 italic">
                  <Info className="w-3 h-3 text-[#C2A379] shrink-0" />
                  <span>{selectedOption.note}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PHYSICAL WISHING WELL & RECEPTION BOX INFO */}
        <div
          className={`mt-4 rounded-2xl border p-3.5 sm:p-4 text-center max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs font-sans-body ${
            isDarkMode
              ? 'bg-[#171424] border-[#2E283D] text-[#AFA498]'
              : 'bg-[#FAF8F5] border-[#E8DCCF] text-[#6E645D]'
          }`}
        >
          <Gift className="w-4 h-4 text-[#C2A379] shrink-0" />
          <span>
            <strong>Traditional Wishing Well Box:</strong> For cards, handwritten letters, and personal
            blessings, a wishing well box will also be available at the reception entrance at{' '}
            <strong className={isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'}>
              The Uncle Tom’s Cabin
            </strong>
            .
          </span>
        </div>
      </div>

      {/* FULLSCREEN ENLARGE MODAL */}
      <AnimatePresence>
        {enlargedQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnlargedQr(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 bg-white p-5 rounded-2xl max-w-sm w-full text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setEnlargedQr(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div
                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans-body uppercase font-bold mb-1"
                style={{ backgroundColor: `${enlargedQr.brandColor}15`, color: enlargedQr.brandColor }}
              >
                {enlargedQr.name} · InstaPay QR Ph
              </div>
              <h3 className="font-serif-title text-lg font-semibold text-stone-900 mb-0.5">
                {enlargedQr.accountName}
              </h3>
              <p className="text-xs text-stone-500 mb-3 font-mono">
                {enlargedQr.accountNumber}
              </p>

              <div
                className={`p-4 rounded-xl border border-stone-200 flex flex-col items-center justify-center ${
                  enlargedQr.id === 'gcash' ? 'bg-[#007DFE]' : 'bg-stone-50'
                }`}
              >
                <div className="w-52 h-52 bg-white rounded-lg p-2 shadow-sm flex items-center justify-center">
                  {!imgLoadError[enlargedQr.id] && enlargedQr.qrImageSrc ? (
                    <img
                      src={enlargedQr.qrImageSrc}
                      alt={`${enlargedQr.name} QR Code`}
                      onError={() => handleImageError(enlargedQr.id)}
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <QrCode className="w-36 h-36 text-stone-900" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="px-1.5 py-0.5 rounded-sm bg-white border border-stone-300 shadow-xs flex items-center gap-0.5">
                          <span className="text-[9px] font-sans-body font-bold text-[#003B70]">
                            insta
                          </span>
                          <span className="text-[9px] font-sans-body font-extrabold text-[#D32F2F]">
                            Pay
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[11px] font-sans-body text-stone-500 mt-3 leading-relaxed">
                Scan with {enlargedQr.name}, Maya, or any InstaPay / QR Ph partner app.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
