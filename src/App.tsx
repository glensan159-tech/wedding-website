import { useState, useEffect } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { VideoBackground } from './components/VideoBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { WeddingSections } from './components/WeddingSections';
import { TouchSparkleCanvas } from './components/TouchSparkleCanvas';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [isOpened, setIsOpened] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add('locked');
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('locked');
    }
    return () => {
      document.body.classList.remove('locked');
    };
  }, [isOpened]);

  // Triggered immediately when envelope or button is clicked by user
  const handleAudioTrigger = () => {
    setPlayRequested(true);
  };

  // Triggered when 4-second pop-up animation completes
  const handleOpenComplete = () => {
    setIsOpened(true);
    setPlayRequested(true);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsOpened(false);
    }, 300);
  };

  return (
    <div
      className={`min-h-screen relative selection:bg-[#EAA2B8] selection:text-[#3A3530] transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#0E0D14] text-[#EAE5DF]'
          : 'bg-[#FDFBF7] text-[#3A3530]'
      }`}
    >
      {/* Interactive Touch & Swipe Sparkles (Smooth sparkles on every touch, swipe, and pointer move) */}
      <TouchSparkleCanvas />

      {/* 3D Envelope Welcome Overlay with 4-second Pop-up Display and Sparkles */}
      <EnvelopeIntro
        isOpened={isOpened}
        onOpenComplete={handleOpenComplete}
        onAudioTrigger={handleAudioTrigger}
      />

      {/* Floating Audio Controller playing "Dulo Ng Pahina" by Wilbert Ross */}
      <AudioPlayer
        playRequested={playRequested}
        onUserInteractionUnlock={() => setPlayRequested(true)}
      />

      {/* Fullscreen Fixed Prenup Video Background */}
      <VideoBackground isOpened={isOpened} />

      {/* Main Wedding Invitation Content (Editorial layout, Attire graphics guide, and Google Form RSVP) */}
      <WeddingSections onReplayIntro={handleReplayIntro} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
