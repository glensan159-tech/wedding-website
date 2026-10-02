import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  isOpened: boolean;
  videoSrc?: string;
}

// Romantic cinematic wedding video fallback when local file is not yet uploaded
const DEFAULT_FALLBACK_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-forest-42861-large.mp4';

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  isOpened,
  videoSrc = 'IMG_5420.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(videoSrc);

  // Optimized scroll listener: only triggers state updates when crossing the 120px boundary
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY < 120;
          setShowScrollDown((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpened && videoRef.current) {
      const video = videoRef.current;
      video.style.opacity = '1';
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Video autoplay prevented or source not loaded:', err);
          if (currentSrc !== DEFAULT_FALLBACK_VIDEO) {
            setVideoError(true);
            setCurrentSrc(DEFAULT_FALLBACK_VIDEO);
          }
        });
      }
    }
  }, [isOpened, currentSrc]);

  const handleVideoError = () => {
    console.log('Local video file not found, switching to romantic prenup video fallback.');
    setVideoError(true);
    setCurrentSrc(DEFAULT_FALLBACK_VIDEO);
  };

  const isIndicatorVisible = isOpened && showScrollDown;

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black overflow-hidden pointer-events-none transform-gpu">
      <video
        ref={videoRef}
        id="bgVideo"
        key={currentSrc}
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out will-change-[opacity]"
        style={{ opacity: isOpened ? 1 : 0 }}
        loop
        muted
        playsInline
        preload="metadata"
        onError={handleVideoError}
      >
        <source src={currentSrc} type="video/mp4" />
      </video>

      {/* Cinematic Tint */}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-95" />

      {/* Scroll Down Indicator */}
      <div
        id="scrollIndicator"
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white text-center font-sans-body tracking-[3px] text-[10px] uppercase transition-opacity duration-500 select-none ${
          isIndicatorVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="animate-bounce flex flex-col items-center gap-1.5">
          <span>Scroll Down</span>
          <span className="text-sm">↓</span>
        </div>
      </div>
    </div>
  );
};
