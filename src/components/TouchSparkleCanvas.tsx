import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: 'star' | 'circle' | 'diamond';
}

const SPARKLE_COLORS = [
  '#C2A379', // Elegant Gold
  '#DFBF8B', // Light Champagne
  '#F9ECCB', // Bright Gold Highlight
  '#EAA2B8', // Soft Rose Pink
  '#F7C5CC', // Blush Pink
  '#C8A2C8', // Pastel Lilac
  '#A78BFA', // Lavender
  '#FFFFFF', // Pure Sparkle
];

export const TouchSparkleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop - ONLY active when there are particles to draw!
    const render = () => {
      const particles = particlesRef.current;
      if (particles.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isRunningRef.current = false;
        animFrameRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // slight gravity
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        // Optimized rendering without expensive canvas shadowBlur
        if (p.type === 'star') {
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'diamond') {
          const s = p.size * 0.75;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    const startLoopIfNeeded = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const spawnSparkles = (x: number, y: number, count: number = 2) => {
      const now = performance.now();
      // Throttle spawn rate to maintain ultra-smooth 60fps on slow devices
      if (now - lastSpawnRef.current < 45 && count <= 2) return;
      lastSpawnRef.current = now;

      // Keep particles lightweight on low-end hardware (max 40 particles)
      const adjustedCount = Math.min(count, 4);

      for (let i = 0; i < adjustedCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.5;
        const types: Array<'star' | 'circle' | 'diamond'> = ['star', 'circle', 'diamond'];
        const pType = types[Math.floor(Math.random() * types.length)];
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          size: Math.random() * 3.5 + 2,
          color,
          alpha: 0.9,
          decay: Math.random() * 0.025 + 0.02,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
          type: pType,
        });
      }

      // Limit particle pool to 40 max to avoid CPU overhead
      if (particlesRef.current.length > 40) {
        particlesRef.current.splice(0, particlesRef.current.length - 40);
      }

      startLoopIfNeeded();
    };

    const handlePointerMove = (e: PointerEvent) => {
      // For mice, only spawn sparingly
      if (e.pointerType === 'mouse') {
        spawnSparkles(e.clientX, e.clientY, 1);
      } else {
        spawnSparkles(e.clientX, e.clientY, 2);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnSparkles(e.clientX, e.clientY, 4);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        spawnSparkles(t.clientX, t.clientY, 2);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        spawnSparkles(t.clientX, t.clientY, 3);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full select-none"
      style={{ touchAction: 'none' }}
    />
  );
};
