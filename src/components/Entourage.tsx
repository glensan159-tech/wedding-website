import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Users,
  ChevronDown,
  ChevronUp,
  Heart,
  Crown,
  Search,
  Sparkles,
  Copy,
  Check,
  Award,
  Baby,
  UserCheck,
} from 'lucide-react';

export interface EntourageMember {
  name: string;
  role: string;
  category: 'parents' | 'sponsors' | 'honor' | 'adults' | 'juniors' | 'little-ones';
  note?: string;
}

export const ENTOURAGE_DATA = {
  couple: {
    groom: 'Glensan Desalago',
    bride: 'Junah Joy M. Arcilla',
  },
  event: {
    dateTime: 'November 18, 2026 · 2:00 PM',
    church: 'Iglesia Ni Cristo - Tisa Locale',
    reception: "The Uncle Tom's Cabin Capitol Cebu",
    hashtag: '#GLENfoundhisJOY∞',
  },
  parents: {
    groom: ['Glenn Boy S. Lusarito', 'Sandra L. Desalago'],
    bride: ['Godofredo V. Arcilla Jr.', 'Joelyza M. Arcilla'],
  },
  principalSponsors: {
    ninong: [
      'Jaime M. Ong',
      'Alex A. Lozano',
      'Louie P. Luague',
      'Eller B. Cataluña',
      'Haslilponi P. Aro',
    ],
    ninang: [
      'Marites N. Ong',
      'Gina T. Lozano',
      'Maricel C. Luague',
      'Hasmela A. Cataluña',
      'Esterlita B. Aro',
    ],
  },
  honorAttendants: {
    bestMan: 'Niño Gemilo Sergio Dumagsa',
    maidOfHonor: 'Junalyza M. Arcilla',
  },
  groomsmen: [
    'Jake R. Rosales',
    'Kristian Pondar',
    'Godofredo M. Arcilla III',
    'Lloyd Geofrey M. Arcilla',
    'Arniel E. Jarloc',
  ],
  bridesmaids: [
    'Nineveh Jeneana S. Acojedo',
    'Jennette Rose A. Pondar',
    'Leah Marie T. Embate',
    'Chrysteen Jean R. Sy',
    'Glyssa Mae Desalago',
    'Christine P. Arcilla',
  ],
  juniorGroomsmen: [
    'Jeian C. Patubo',
    'Ronnwil S. Trinidad',
    'Kemal Isak V. Hamzic',
    'Jeffrey B. Patubo',
    'Randy M. Espina Jr.',
    'Laurence M. Lauglaug',
    'Earl John Gaballo',
    'James Keberd M. Boco',
    'John Wexcent Frilles',
    'Lance Jedrek D. Bernido',
    'Neil John M. Calago',
  ],
  juniorBridesmaids: [
    'Mekcy N. Quijano',
    'Nicole S. Trinidad',
    'Andrei Nicole E. Bulat-ag',
    'Arnie Rose C. Cosenas',
  ],
  littleOnes: {
    ringBearer: 'Zayne D. Jarloc',
    flowerGirls: ['Zahara Scarlett D. Jarloc', 'Vonnalise D. Jarloc'],
  },
};

type CategoryFilter = 'all' | 'parents' | 'sponsors' | 'honor' | 'adults' | 'juniors' | 'little-ones';

export const Entourage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(ENTOURAGE_DATA.event.hashtag);
    setCopiedHashtag(true);
    setTimeout(() => setCopiedHashtag(false), 2200);
  };

  // Flattened member list for search
  const allMembers = useMemo(() => {
    const list: EntourageMember[] = [];

    // Parents
    ENTOURAGE_DATA.parents.groom.forEach((name) =>
      list.push({ name, role: 'Parent of the Groom', category: 'parents' })
    );
    ENTOURAGE_DATA.parents.bride.forEach((name) =>
      list.push({ name, role: 'Parent of the Bride', category: 'parents' })
    );

    // Sponsors
    ENTOURAGE_DATA.principalSponsors.ninong.forEach((name) =>
      list.push({ name, role: 'Principal Sponsor (Ninong)', category: 'sponsors' })
    );
    ENTOURAGE_DATA.principalSponsors.ninang.forEach((name) =>
      list.push({ name, role: 'Principal Sponsor (Ninang)', category: 'sponsors' })
    );

    // Honor
    list.push({
      name: ENTOURAGE_DATA.honorAttendants.bestMan,
      role: 'Best Man',
      category: 'honor',
    });
    list.push({
      name: ENTOURAGE_DATA.honorAttendants.maidOfHonor,
      role: 'Maid of Honor',
      category: 'honor',
    });

    // Adults
    ENTOURAGE_DATA.groomsmen.forEach((name) =>
      list.push({ name, role: 'Groomsman', category: 'adults' })
    );
    ENTOURAGE_DATA.bridesmaids.forEach((name) =>
      list.push({ name, role: 'Bridesmaid', category: 'adults' })
    );

    // Juniors
    ENTOURAGE_DATA.juniorGroomsmen.forEach((name) =>
      list.push({ name, role: 'Junior Groomsman', category: 'juniors' })
    );
    ENTOURAGE_DATA.juniorBridesmaids.forEach((name) =>
      list.push({ name, role: 'Junior Bridesmaid', category: 'juniors' })
    );

    // Little Ones
    list.push({
      name: ENTOURAGE_DATA.littleOnes.ringBearer,
      role: 'Ring Bearer',
      category: 'little-ones',
    });
    ENTOURAGE_DATA.littleOnes.flowerGirls.forEach((name) =>
      list.push({ name, role: 'Flower Girl', category: 'little-ones' })
    );

    return list;
  }, []);

  // Filtered members based on category and search query
  const filteredMembers = useMemo(() => {
    return allMembers.filter((member) => {
      const matchesCategory = selectedCategory === 'all' || member.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allMembers, selectedCategory, searchQuery]);

  return (
    <section id="entourage-section" className="scroll-mt-20">
      {/* SECTION HEADER (COMPACT & CLEAN) */}
      <div className="text-center max-w-xl mx-auto mb-3.5 sm:mb-5">
        <span className="font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[2.5px] text-[#C2A379] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          The Wedding Party & Witnesses
          <Sparkles className="w-3 h-3" />
        </span>
        <h2
          className={`font-serif-title text-2xl sm:text-3xl md:text-4xl font-normal mt-0.5 mb-1.5 ${
            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
          }`}
        >
          Wedding Entourage
        </h2>
        <p
          className={`font-sans-body text-xs sm:text-[13px] leading-relaxed max-w-lg mx-auto ${
            isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
          }`}
        >
          Honoring the cherished family, mentors, and lifelong companions who stand with us as we
          unite in holy matrimony.
        </p>

        {/* OFFICIAL HASHTAG BADGE */}
        <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-2xs transition-all bg-gradient-to-r from-[#C2A379]/15 via-[#8E4585]/15 to-[#C2A379]/15 border-[#C2A379]/40">
          <span
            className={`font-mono text-xs sm:text-[13px] font-semibold tracking-wider ${
              isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
            }`}
          >
            {ENTOURAGE_DATA.event.hashtag}
          </span>
          <button
            type="button"
            onClick={handleCopyHashtag}
            title="Copy official wedding hashtag"
            className="p-0.5 rounded-md text-[#C2A379] hover:bg-[#C2A379]/20 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-sans-body uppercase tracking-wider font-semibold"
          >
            {copiedHashtag ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500 text-[10px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DROPDOWN & OPTIONAL COLLAPSE CARD */}
      <div
        className={`rounded-2xl border transition-all duration-300 shadow-xs ${
          isDarkMode
            ? 'bg-[#151220] border-[#312940]'
            : 'bg-white border-[#EAE0D2]'
        }`}
      >
        {/* INTERACTIVE ACCORDION / TOGGLE BAR */}
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer select-none rounded-2xl transition-colors ${
            isOpen
              ? isDarkMode
                ? 'bg-[#1D182A] border-b border-[#312940]'
                : 'bg-[#FAF7F2] border-b border-[#EAE0D2]'
              : isDarkMode
              ? 'hover:bg-[#1A1626]'
              : 'hover:bg-[#FAF8F5]'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isDarkMode
                  ? 'bg-[#261E33] border-[#3D324E] text-[#D8B4FE]'
                  : 'bg-[#FAF0F5] border-[#E8D0DF] text-[#8E4585]'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`font-serif-title text-base sm:text-lg font-normal ${
                    isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                  }`}
                >
                  Complete Wedding Roster & Entourage
                </h3>
                <span
                  className={`text-[9px] sm:text-[10px] font-sans-body uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                    isDarkMode
                      ? 'bg-[#C2A379]/20 text-[#D4AF37]'
                      : 'bg-[#C2A379]/20 text-[#8C6D3F]'
                  }`}
                >
                  {allMembers.length} Members
                </span>
              </div>
              <p
                className={`text-[11px] sm:text-xs font-sans-body mt-0.5 ${
                  isDarkMode ? 'text-[#B8ADC0]' : 'text-[#6E645D]'
                }`}
              >
                {isOpen
                  ? 'Click to collapse entourage view'
                  : 'Click or tap to view sponsors, wedding party, juniors & little ones'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <span
              className={`text-[11px] font-sans-body uppercase tracking-wider font-medium hidden sm:inline ${
                isDarkMode ? 'text-[#C2A379]' : 'text-[#8E4585]'
              }`}
            >
              {isOpen ? 'Collapse Details' : 'View Full Entourage'}
            </span>
            <div
              className={`p-1.5 rounded-lg border transition-transform duration-300 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              } ${
                isDarkMode
                  ? 'bg-[#241E33] border-[#3D354E] text-[#F3EBE6]'
                  : 'bg-white border-[#E0D4C3] text-[#3A3530]'
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* EXPANDABLE BODY CONTENT */}
        {isOpen && (
          <div className="p-3.5 sm:p-5 space-y-4 animate-fadeIn">
            {/* CONTROLS BAR: CATEGORY DROPDOWN + SEARCH BAR */}
            <div
              className={`p-2.5 sm:p-3 rounded-xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 ${
                isDarkMode
                  ? 'bg-[#181524] border-[#2C2438]'
                  : 'bg-[#FAF8F5] border-[#EFE5D8]'
              }`}
            >
              {/* Category Dropdown Selector */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
                <label
                  htmlFor="entourage-category-select"
                  className={`text-[10px] sm:text-[11px] font-sans-body uppercase tracking-wider font-semibold whitespace-nowrap ${
                    isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A5B2F]'
                  }`}
                >
                  Select Group:
                </label>
                <div className="relative flex-1 max-w-sm">
                  <select
                    id="entourage-category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as CategoryFilter)}
                    className={`w-full appearance-none px-3 py-1.5 pr-8 rounded-lg text-xs font-sans-body border transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C2A379] ${
                      isDarkMode
                        ? 'bg-[#221D30] border-[#3D344E] text-[#F3EBE6]'
                        : 'bg-white border-[#D8C7B0] text-[#3A3530]'
                    }`}
                  >
                    <option value="all">🌟 All Entourage & Witnesses ({allMembers.length})</option>
                    <option value="parents">👑 Parents of Bride & Groom (4)</option>
                    <option value="sponsors">✨ Principal Sponsors / Ninong & Ninang (10)</option>
                    <option value="honor">💎 Best Man & Maid of Honor (2)</option>
                    <option value="adults">💐 Groomsmen & Bridesmaids (11)</option>
                    <option value="juniors">🌸 Junior Groomsmen & Bridesmaids (15)</option>
                    <option value="little-ones">🕊️ Little Ones / Ring Bearer & Flower Girls (3)</option>
                  </select>
                  <ChevronDown
                    className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDarkMode ? 'text-[#AFA498]' : 'text-[#8C827A]'
                    }`}
                  />
                </div>
              </div>

              {/* Instant Name Search Filter */}
              <div className="relative w-full md:w-64">
                <Search
                  className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Find your name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs font-sans-body border transition-colors focus:outline-none focus:ring-1 focus:ring-[#C2A379] ${
                    isDarkMode
                      ? 'bg-[#221D30] border-[#3D344E] text-[#F3EBE6] placeholder-[#786E82]'
                      : 'bg-white border-[#D8C7B0] text-[#3A3530] placeholder-[#A09388]'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#C2A379] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* QUICK CATEGORY PILLS (Alternative to Dropdown for Faster Browsing) */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'parents', label: 'Parents' },
                { id: 'sponsors', label: 'Principal Sponsors' },
                { id: 'honor', label: 'Best Man & MOH' },
                { id: 'adults', label: 'Groomsmen & Bridesmaids' },
                { id: 'juniors', label: 'Juniors' },
                { id: 'little-ones', label: 'Little Ones' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-sans-body transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C2A379] text-white shadow-2xs font-semibold'
                        : isDarkMode
                        ? 'bg-[#1D1929] text-[#B8ADC0] hover:text-white border border-[#2E273D]'
                        : 'bg-[#FAF7F2] text-[#6E645D] hover:text-[#3A3530] border border-[#EAE0D2]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* SEARCH RESULTS VIEW (When query is active) */}
            {searchQuery.trim() !== '' ? (
              <div>
                <p
                  className={`text-xs font-sans-body uppercase tracking-wider mb-4 ${
                    isDarkMode ? 'text-[#AFA498]' : 'text-[#8C827A]'
                  }`}
                >
                  Found {filteredMembers.length} result{filteredMembers.length !== 1 ? 's' : ''} for "{searchQuery}":
                </p>
                {filteredMembers.length === 0 ? (
                  <div className="text-center py-10">
                    <p className={`text-sm ${isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'}`}>
                      No entourage members found matching "{searchQuery}".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {filteredMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border flex items-center justify-between ${
                          isDarkMode
                            ? 'bg-[#1C1828] border-[#312940]'
                            : 'bg-[#FAF8F5] border-[#EAE0D2]'
                        }`}
                      >
                        <div>
                          <p
                            className={`font-serif-title text-base font-medium ${
                              isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                            }`}
                          >
                            {member.name}
                          </p>
                          <p className="font-sans-body text-xs text-[#C2A379] font-medium mt-0.5">
                            {member.role}
                          </p>
                        </div>
                        <UserCheck className="w-4 h-4 text-[#C2A379] shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* CATEGORY DETAILED SECTIONS */
              <div className="space-y-10">
                {/* 1. PARENTS OF GROOM & BRIDE */}
                {(selectedCategory === 'all' || selectedCategory === 'parents') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#C2A379]/30">
                      <Crown className="w-4 h-4 text-[#C2A379]" />
                      <h4
                        className={`font-serif-title text-xl font-medium tracking-wide ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Parents of the Bride & Groom
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Parents of the Groom */}
                      <div
                        className={`p-5 rounded-2xl border text-center ${
                          isDarkMode
                            ? 'bg-[#1C1828] border-[#372E49]'
                            : 'bg-[#FAF8F5] border-[#EAE0D2]'
                        }`}
                      >
                        <span className="font-sans-body text-[11px] uppercase tracking-[2px] text-[#C2A379] font-semibold block mb-2">
                          Parents of the Groom
                        </span>
                        <div className="space-y-1">
                          {ENTOURAGE_DATA.parents.groom.map((parent, i) => (
                            <p
                              key={i}
                              className={`font-serif-title text-lg font-medium ${
                                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                              }`}
                            >
                              {parent}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Parents of the Bride */}
                      <div
                        className={`p-5 rounded-2xl border text-center ${
                          isDarkMode
                            ? 'bg-[#1C1828] border-[#372E49]'
                            : 'bg-[#FAF8F5] border-[#EAE0D2]'
                        }`}
                      >
                        <span className="font-sans-body text-[11px] uppercase tracking-[2px] text-[#C2A379] font-semibold block mb-2">
                          Parents of the Bride
                        </span>
                        <div className="space-y-1">
                          {ENTOURAGE_DATA.parents.bride.map((parent, i) => (
                            <p
                              key={i}
                              className={`font-serif-title text-lg font-medium ${
                                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                              }`}
                            >
                              {parent}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PRINCIPAL SPONSORS (NINONG & NINANG) */}
                {(selectedCategory === 'all' || selectedCategory === 'sponsors') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#C2A379]/30">
                      <Award className="w-4 h-4 text-[#C2A379]" />
                      <h4
                        className={`font-serif-title text-xl font-medium tracking-wide ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Principal Sponsors (Ninong & Ninang)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Ninong */}
                      <div
                        className={`p-6 rounded-2xl border ${
                          isDarkMode
                            ? 'bg-[#1B1728] border-[#352D47]'
                            : 'bg-white border-[#EAE0D2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C2A379]/20">
                          <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C2A379] font-semibold">
                            Male Sponsors · Ninong
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                            }`}
                          >
                            5 Ninongs
                          </span>
                        </div>
                        <ol className="space-y-2.5">
                          {ENTOURAGE_DATA.principalSponsors.ninong.map((name, i) => (
                            <li key={i} className="flex items-baseline gap-3 text-sm">
                              <span className="font-serif-title text-xs text-[#C2A379] font-semibold w-4 text-right shrink-0">
                                {i + 1}.
                              </span>
                              <span
                                className={`font-serif-title text-base font-medium ${
                                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                                }`}
                              >
                                {name}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Ninang */}
                      <div
                        className={`p-6 rounded-2xl border ${
                          isDarkMode
                            ? 'bg-[#1B1728] border-[#352D47]'
                            : 'bg-white border-[#EAE0D2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C2A379]/20">
                          <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C2A379] font-semibold">
                            Female Sponsors · Ninang
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                            }`}
                          >
                            5 Ninangs
                          </span>
                        </div>
                        <ol className="space-y-2.5">
                          {ENTOURAGE_DATA.principalSponsors.ninang.map((name, i) => (
                            <li key={i} className="flex items-baseline gap-3 text-sm">
                              <span className="font-serif-title text-xs text-[#C2A379] font-semibold w-4 text-right shrink-0">
                                {i + 1}.
                              </span>
                              <span
                                className={`font-serif-title text-base font-medium ${
                                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                                }`}
                              >
                                {name}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. PRIMARY ATTENDANTS: BEST MAN & MAID OF HONOR */}
                {(selectedCategory === 'all' || selectedCategory === 'honor') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#C2A379]/30">
                      <Heart className="w-4 h-4 text-[#C879B5] fill-current" />
                      <h4
                        className={`font-serif-title text-xl font-medium tracking-wide ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Primary Attendants
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Best Man */}
                      <div
                        className={`p-6 rounded-2xl border text-center shadow-2xs ${
                          isDarkMode
                            ? 'bg-gradient-to-b from-[#221C30] to-[#181424] border-[#C2A379]/40'
                            : 'bg-gradient-to-b from-[#FAF7F2] to-white border-[#C2A379]/40'
                        }`}
                      >
                        <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C2A379] font-semibold block mb-1">
                          Best Man
                        </span>
                        <p
                          className={`font-serif-title text-2xl font-semibold mb-1 ${
                            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                          }`}
                        >
                          {ENTOURAGE_DATA.honorAttendants.bestMan}
                        </p>
                        <p
                          className={`font-sans-body text-xs ${
                            isDarkMode ? 'text-[#B8ADC0]' : 'text-[#7A7067]'
                          }`}
                        >
                          Standing alongside Groom Glensan
                        </p>
                      </div>

                      {/* Maid of Honor */}
                      <div
                        className={`p-6 rounded-2xl border text-center shadow-2xs ${
                          isDarkMode
                            ? 'bg-gradient-to-b from-[#251A2E] to-[#181424] border-[#C879B5]/40'
                            : 'bg-gradient-to-b from-[#FAF2F8] to-white border-[#C879B5]/40'
                        }`}
                      >
                        <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C879B5] font-semibold block mb-1">
                          Maid of Honor
                        </span>
                        <p
                          className={`font-serif-title text-2xl font-semibold mb-1 ${
                            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                          }`}
                        >
                          {ENTOURAGE_DATA.honorAttendants.maidOfHonor}
                        </p>
                        <p
                          className={`font-sans-body text-xs ${
                            isDarkMode ? 'text-[#B8ADC0]' : 'text-[#7A7067]'
                          }`}
                        >
                          Standing alongside Bride Junah Joy
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. GROOMSMEN & BRIDESMAIDS */}
                {(selectedCategory === 'all' || selectedCategory === 'adults') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#C2A379]/30">
                      <Users className="w-4 h-4 text-[#C2A379]" />
                      <h4
                        className={`font-serif-title text-xl font-medium tracking-wide ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Groomsmen & Bridesmaids
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Groomsmen */}
                      <div
                        className={`p-6 rounded-2xl border ${
                          isDarkMode
                            ? 'bg-[#1B1728] border-[#352D47]'
                            : 'bg-white border-[#EAE0D2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C2A379]/20">
                          <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C2A379] font-semibold">
                            Groomsmen
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                            }`}
                          >
                            5 Gentlemen
                          </span>
                        </div>
                        <ol className="space-y-2.5">
                          {ENTOURAGE_DATA.groomsmen.map((name, i) => (
                            <li key={i} className="flex items-baseline gap-3 text-sm">
                              <span className="font-serif-title text-xs text-[#C2A379] font-semibold w-4 text-right shrink-0">
                                {i + 1}.
                              </span>
                              <span
                                className={`font-serif-title text-base font-medium ${
                                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                                }`}
                              >
                                {name}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Bridesmaids */}
                      <div
                        className={`p-6 rounded-2xl border ${
                          isDarkMode
                            ? 'bg-[#1B1728] border-[#352D47]'
                            : 'bg-white border-[#EAE0D2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C879B5]/20">
                          <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C879B5] font-semibold">
                            Bridesmaids
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                            }`}
                          >
                            6 Ladies
                          </span>
                        </div>
                        <ol className="space-y-2.5">
                          {ENTOURAGE_DATA.bridesmaids.map((name, i) => (
                            <li key={i} className="flex items-baseline gap-3 text-sm">
                              <span className="font-serif-title text-xs text-[#C879B5] font-semibold w-4 text-right shrink-0">
                                {i + 1}.
                              </span>
                              <span
                                className={`font-serif-title text-base font-medium ${
                                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                                }`}
                              >
                                {name}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. JUNIOR GROOMSMEN & JUNIOR BRIDESMAIDS */}
                {(selectedCategory === 'all' || selectedCategory === 'juniors') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#C2A379]/30">
                      <Sparkles className="w-4 h-4 text-[#C2A379]" />
                      <h4
                        className={`font-serif-title text-xl font-medium tracking-wide ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Junior Entourage
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      {/* Junior Groomsmen (11) */}
                      <div
                        className={`md:col-span-7 p-6 rounded-2xl border ${
                          isDarkMode
                            ? 'bg-[#1B1728] border-[#352D47]'
                            : 'bg-white border-[#EAE0D2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C2A379]/20">
                          <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C2A379] font-semibold">
                            Junior Groomsmen
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                            }`}
                          >
                            11 Members
                          </span>
                        </div>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                          {ENTOURAGE_DATA.juniorGroomsmen.map((name, i) => (
                            <li key={i} className="flex items-baseline gap-2.5 text-sm">
                              <span className="font-serif-title text-xs text-[#C2A379] font-semibold w-5 text-right shrink-0">
                                {i + 1}.
                              </span>
                              <span
                                className={`font-serif-title text-sm sm:text-base font-medium truncate ${
                                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                                }`}
                              >
                                {name}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Junior Bridesmaids (4) */}
                      <div
                        className={`md:col-span-5 p-6 rounded-2xl border ${
                          isDarkMode
                            ? 'bg-[#1B1728] border-[#352D47]'
                            : 'bg-white border-[#EAE0D2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C879B5]/20">
                          <span className="font-sans-body text-xs uppercase tracking-[2px] text-[#C879B5] font-semibold">
                            Junior Bridesmaids
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isDarkMode ? 'text-[#8A8095]' : 'text-[#9C8F84]'
                            }`}
                          >
                            4 Members
                          </span>
                        </div>
                        <ol className="space-y-2.5">
                          {ENTOURAGE_DATA.juniorBridesmaids.map((name, i) => (
                            <li key={i} className="flex items-baseline gap-2.5 text-sm">
                              <span className="font-serif-title text-xs text-[#C879B5] font-semibold w-4 text-right shrink-0">
                                {i + 1}.
                              </span>
                              <span
                                className={`font-serif-title text-base font-medium ${
                                  isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                                }`}
                              >
                                {name}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. LITTLE ONES (RING BEARER & FLOWER GIRLS) */}
                {(selectedCategory === 'all' || selectedCategory === 'little-ones') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#C2A379]/30">
                      <Baby className="w-4 h-4 text-[#C2A379]" />
                      <h4
                        className={`font-serif-title text-xl font-medium tracking-wide ${
                          isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                        }`}
                      >
                        Little Ones
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Ring Bearer */}
                      <div
                        className={`p-5 rounded-2xl border text-center ${
                          isDarkMode
                            ? 'bg-[#1C1828] border-[#372E49]'
                            : 'bg-[#FAF8F5] border-[#EAE0D2]'
                        }`}
                      >
                        <span className="font-sans-body text-[11px] uppercase tracking-[2px] text-[#C2A379] font-semibold block mb-1">
                          Ring Bearer
                        </span>
                        <p
                          className={`font-serif-title text-xl font-semibold ${
                            isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                          }`}
                        >
                          {ENTOURAGE_DATA.littleOnes.ringBearer}
                        </p>
                      </div>

                      {/* Flower Girls */}
                      <div
                        className={`p-5 rounded-2xl border text-center ${
                          isDarkMode
                            ? 'bg-[#1C1828] border-[#372E49]'
                            : 'bg-[#FAF8F5] border-[#EAE0D2]'
                        }`}
                      >
                        <span className="font-sans-body text-[11px] uppercase tracking-[2px] text-[#C879B5] font-semibold block mb-2">
                          Flower Girls
                        </span>
                        <div className="space-y-1">
                          {ENTOURAGE_DATA.littleOnes.flowerGirls.map((name, i) => (
                            <p
                              key={i}
                              className={`font-serif-title text-lg font-medium ${
                                isDarkMode ? 'text-[#F3EBE6]' : 'text-[#3A3530]'
                              }`}
                            >
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* QUICK COLLAPSE BUTTON AT BOTTOM */}
            <div className="text-center pt-6 border-t border-[#C2A379]/20">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById('entourage-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border text-xs font-sans-body uppercase tracking-wider transition-colors cursor-pointer font-medium ${
                  isDarkMode
                    ? 'border-[#3D344E] text-[#B8ADC0] hover:bg-[#1E1A29] hover:text-white'
                    : 'border-[#D8C7B0] text-[#6E645D] hover:bg-[#FAF7F0] hover:text-[#3A3530]'
                }`}
              >
                <ChevronUp className="w-4 h-4" />
                <span>Hide / Collapse Entourage Details</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
