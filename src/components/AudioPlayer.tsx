import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Youtube,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  SkipForward,
  Music,
  Disc3,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AudioPlayerProps {
  playRequested: boolean;
  onUserInteractionUnlock?: () => void;
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  subtitle: string;
}

// Romantic Wedding Playlist playing back-to-back:
// 1. Wilbert Ross - Dulo Ng Pahina: https://youtu.be/abD4HognTFs
// 2. INC Original Music - Ikaw Ang Hiling: https://www.youtube.com/watch?v=yX8q2jIdm_0
export const WEDDING_PLAYLIST: TrackItem[] = [
  {
    id: 'abD4HognTFs',
    title: 'Dulo Ng Pahina',
    artist: 'Wilbert Ross',
    subtitle: 'Official Wedding Theme',
  },
  {
    id: 'yX8q2jIdm_0',
    title: 'Ikaw Ang Hiling',
    artist: 'INC Original Music',
    subtitle: 'Iglesia Ni Cristo Wedding Song',
  },
];

// Romantic wedding acoustic audio fallback
const RELIABLE_ROMANTIC_AUDIO =
  'https://upload.wikimedia.org/wikipedia/commons/e/e0/Canon_in_D_Major.ogg';

declare global {
  interface Window {
    YT?: {
      Player: any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  playRequested,
  onUserInteractionUnlock,
}) => {
  const { isDarkMode } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMiniPanel, setShowMiniPanel] = useState(false);
  const [isYtReady, setIsYtReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [, setActiveSource] = useState<'youtube' | 'audio'>('youtube');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const currentTrackIndexRef = useRef(0);
  const ytPlayerRef = useRef<any>(null);
  const audioFallbackRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef(false);

  const currentTrack = WEDDING_PLAYLIST[currentTrackIndex];

  // Switch Track manually
  const switchTrack = useCallback(
    (index: number) => {
      currentTrackIndexRef.current = index;
      setCurrentTrackIndex(index);
      setAutoplayBlocked(false);
      onUserInteractionUnlock?.();

      if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
        try {
          ytPlayerRef.current.loadVideoById(WEDDING_PLAYLIST[index].id);
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
          setActiveSource('youtube');
        } catch {
          // fallback
        }
      }
    },
    [onUserInteractionUnlock]
  );

  // Skip to Next Track in the back-to-back playlist
  const nextTrack = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const nextIndex = (currentTrackIndexRef.current + 1) % WEDDING_PLAYLIST.length;
      switchTrack(nextIndex);
    },
    [switchTrack]
  );

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (ytPlayerRef.current) return;

      try {
        ytPlayerRef.current = new window.YT.Player('yt-player-embed', {
          height: '100%',
          width: '100%',
          videoId: WEDDING_PLAYLIST[0].id,
          playerVars: {
            autoplay: 0,
            controls: 1,
            disablekb: 0,
            fs: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsYtReady(true);
              try {
                event.target.setVolume(75);
              } catch {
                // ignore
              }

              if (playRequested) {
                try {
                  event.target.playVideo();
                  setIsPlaying(true);
                } catch {
                  setAutoplayBlocked(true);
                }
              }
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                // PLAYING
                setIsPlaying(true);
                setAutoplayBlocked(false);
                setActiveSource('youtube');
                if (audioFallbackRef.current) {
                  audioFallbackRef.current.pause();
                }
              } else if (event.data === 2) {
                // PAUSED
                setIsPlaying(false);
              } else if (event.data === 0) {
                // ENDED - play next track back-to-back in the playlist!
                const nextIdx = (currentTrackIndexRef.current + 1) % WEDDING_PLAYLIST.length;
                currentTrackIndexRef.current = nextIdx;
                setCurrentTrackIndex(nextIdx);

                try {
                  event.target.loadVideoById(WEDDING_PLAYLIST[nextIdx].id);
                  event.target.playVideo();
                  setIsPlaying(true);
                } catch {
                  event.target.seekTo(0);
                  event.target.playVideo();
                }
              }
            },
            onError: () => {
              setActiveSource('audio');
              if (playRequested && audioFallbackRef.current) {
                audioFallbackRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
              }
            },
          },
        });
      } catch {
        setActiveSource('audio');
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }
  }, []);

  // When playRequested changes (envelope opens)
  useEffect(() => {
    if (!playRequested) return;

    if (ytPlayerRef.current && isYtReady) {
      try {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        setAutoplayBlocked(true);
        if (audioFallbackRef.current) {
          audioFallbackRef.current.play().then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          }).catch(() => {
            setAutoplayBlocked(true);
          });
        }
      }
    } else {
      if (audioFallbackRef.current) {
        audioFallbackRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setActiveSource('audio');
          })
          .catch(() => {
            setAutoplayBlocked(true);
          });
      }
    }
  }, [playRequested, isYtReady]);

  // Master Play/Pause toggle
  const togglePlay = useCallback(() => {
    userInteractedRef.current = true;
    setAutoplayBlocked(false);
    onUserInteractionUnlock?.();

    if (isPlaying) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {}
      }
      if (audioFallbackRef.current) {
        audioFallbackRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      let ytSuccess = false;
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
          setActiveSource('youtube');
          ytSuccess = true;
        } catch {}
      }

      if (!ytSuccess && audioFallbackRef.current) {
        audioFallbackRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setActiveSource('audio');
          })
          .catch(() => {});
      }
    }
  }, [isPlaying, onUserInteractionUnlock]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    if (audioFallbackRef.current) {
      audioFallbackRef.current.muted = !isMuted;
    }

    if (ytPlayerRef.current && typeof ytPlayerRef.current.mute === 'function') {
      try {
        if (isMuted) {
          ytPlayerRef.current.unMute();
        } else {
          ytPlayerRef.current.mute();
        }
      } catch {}
    }

    setIsMuted(!isMuted);
  }, [isMuted]);

  return (
    <>
      {/* HTML5 Audio Tag Fallback */}
      <audio
        ref={audioFallbackRef}
        id="wedding-acoustic-audio"
        src={RELIABLE_ROMANTIC_AUDIO}
        loop
        preload="metadata"
      />

      {/* Floating Video Player Modal for Back-to-Back Wedding Tracks */}
      <div
        className={`fixed transition-all duration-300 z-50 ${
          showVideoModal
            ? 'top-14 right-3 sm:top-16 sm:right-4 w-[calc(100vw-1.5rem)] max-w-[340px] sm:max-w-[400px] h-[220px] sm:h-[250px] rounded-xl shadow-2xl border-2 border-[#C2A379] bg-black overflow-hidden scale-100 opacity-100 pointer-events-auto'
            : 'top-14 right-3 w-[180px] h-[100px] opacity-0 pointer-events-none scale-90'
        }`}
      >
        <div className="absolute top-0 inset-x-0 bg-black/90 backdrop-blur-md px-3 py-1.5 z-10 flex items-center justify-between text-white text-xs border-b border-white/10">
          <div className="flex items-center gap-1.5 truncate">
            <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="font-semibold text-amber-200 text-xs truncate">{currentTrack.title}</span>
            <span className="text-[10px] text-stone-400 hidden sm:inline truncate">
              · {currentTrack.artist}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={nextTrack}
              className="p-1 hover:bg-white/20 rounded text-amber-200 hover:text-white cursor-pointer"
              title="Skip to next track"
            >
              <SkipForward className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setShowVideoModal(false)}
              className="p-1 hover:bg-white/20 rounded text-stone-300 hover:text-white cursor-pointer"
              title="Close video"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Back-to-back Track Switcher Strip inside modal */}
        <div className="absolute top-8 inset-x-0 bg-black/80 backdrop-blur-xs px-2 py-0.5 z-10 flex items-center justify-center gap-1.5 border-b border-white/10 text-[9px]">
          {WEDDING_PLAYLIST.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => switchTrack(idx)}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer truncate max-w-[150px] ${
                currentTrackIndex === idx
                  ? 'bg-[#C2A379] text-white font-semibold shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/15'
              }`}
            >
              {idx + 1}. {t.title}
            </button>
          ))}
        </div>

        {/* The YouTube embed container is kept persistent in the DOM */}
        <div className="w-full h-full pt-14">
          <div id="yt-player-embed" className="w-full h-full" />
        </div>
      </div>

      {/* FLOATING AUDIO PLAYER ICON IN THE TOP RIGHT CORNER */}
      <div className="fixed top-2.5 right-2.5 sm:top-3 sm:right-4 z-50 flex flex-col items-end pointer-events-auto">
        {/* Main Row: Autoplay Hint + Floating Icon Button */}
        <div className="flex items-center gap-1.5">
          {/* Autoplay blocked gentle prompt */}
          {autoplayBlocked && (
            <button
              type="button"
              onClick={togglePlay}
              className="animate-pulse flex items-center gap-1 rounded-full bg-[#C2A379] text-white px-2 sm:px-2.5 py-1 text-[10px] font-sans-body shadow-md hover:bg-[#A88B64] transition-colors cursor-pointer border border-white/30"
              title="Click to play music"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Play Music</span>
            </button>
          )}

          {/* Compact Floating Audio Player Icon */}
          <div className="relative">
            <button
              id="top-right-audio-icon"
              type="button"
              onClick={togglePlay}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowMiniPanel((prev) => !prev);
              }}
              className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
                isPlaying
                  ? isDarkMode
                    ? 'bg-[#1D1929]/95 border-[#C2A379] text-[#F3EBE6] ring-2 ring-[#C2A379]/40 shadow-[#C2A379]/20'
                    : 'bg-white/95 border-[#C2A379] text-[#3A3530] ring-2 ring-[#C2A379]/40 shadow-[#C2A379]/20'
                  : isDarkMode
                  ? 'bg-[#151221]/85 border-[#372E49] text-[#AFA498] hover:border-[#C2A379]'
                  : 'bg-[#FAF7F0]/90 border-[#D8C7B0] text-[#7A7067] hover:border-[#C2A379]'
              }`}
              title={isPlaying ? `Pause music (${currentTrack.title})` : `Play music (${currentTrack.title})`}
              aria-label="Toggle Wedding Music"
            >
              {/* Spinning Vinyl Effect when Playing */}
              {isPlaying ? (
                <Disc3 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C2A379] animate-[spin_4s_linear_infinite]" />
              ) : (
                <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A88B64]" />
              )}

              {/* Status Ping when Active */}
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </button>

            {/* Micro Toggle for Track Switcher Panel */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMiniPanel((prev) => !prev);
              }}
              className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] transition-colors cursor-pointer shadow-xs ${
                isDarkMode
                  ? 'bg-[#221B2F] border-[#3D354E] text-[#C2A379] hover:bg-[#2C243C]'
                  : 'bg-white border-[#D8C7B0] text-[#C2A379] hover:bg-[#FAF7F0]'
              }`}
              title={showMiniPanel ? 'Hide music options' : 'More music options'}
              aria-label="More music options"
            >
              {showMiniPanel ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>

        {/* Sleek Mobile-Friendly Dropdown Card (Appears under the top right icon) */}
        {showMiniPanel && (
          <div
            className={`mt-2 w-[220px] sm:w-[240px] rounded-xl border p-2.5 shadow-xl backdrop-blur-md text-xs font-sans-body transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
              isDarkMode
                ? 'bg-[#181524]/95 border-[#C2A379]/50 text-[#F3EBE6]'
                : 'bg-white/95 border-[#C2A379]/50 text-[#3A3530]'
            }`}
          >
            {/* Header: Track title & close */}
            <div className="flex items-center justify-between gap-1 mb-1.5 pb-1 border-b border-inherit">
              <div className="truncate pr-1">
                <p className="font-serif-title font-semibold text-xs truncate text-[#C2A379]">
                  {currentTrack.title}
                </p>
                <p className="text-[9px] text-stone-400 truncate">
                  {currentTrack.artist}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMiniPanel(false)}
                className="p-0.5 rounded text-stone-400 hover:text-stone-200 cursor-pointer shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Playlist Selectors: Track 1 & Track 2 */}
            <div className="space-y-1 mb-2">
              {WEDDING_PLAYLIST.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => switchTrack(idx)}
                  className={`w-full text-left px-2 py-1 rounded-md text-[10px] flex items-center justify-between transition-colors cursor-pointer ${
                    currentTrackIndex === idx
                      ? 'bg-[#C2A379]/20 text-[#C2A379] font-medium border border-[#C2A379]/40'
                      : isDarkMode
                      ? 'text-stone-300 hover:bg-white/5'
                      : 'text-stone-600 hover:bg-black/5'
                  }`}
                >
                  <span className="truncate">{idx + 1}. {t.title}</span>
                  {currentTrackIndex === idx && isPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center justify-between pt-1 border-t border-inherit text-xs">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-[#C2A379] text-white hover:bg-[#A88B64] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                onClick={nextTrack}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-white/10 text-stone-300' : 'hover:bg-black/5 text-stone-600'
                }`}
                title="Skip to next song"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-white/10 text-stone-300' : 'hover:bg-black/5 text-stone-600'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowVideoModal((prev) => !prev);
                  setShowMiniPanel(false);
                }}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  showVideoModal
                    ? 'text-red-500'
                    : isDarkMode
                    ? 'hover:bg-white/10 text-stone-300'
                    : 'hover:bg-black/5 text-stone-600'
                }`}
                title="Watch Video"
              >
                <Youtube className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
