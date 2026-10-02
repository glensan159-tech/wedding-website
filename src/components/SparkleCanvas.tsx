import React, { useEffect, useRef } from 'react';

interface SparkleCanvasProps {
  burstTrigger?: number;
  burstOrigin?: { x: number; y: number } | null;
  isActive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'star' | 'circle' | 'diamond';
}

const GOLD_PALETTE = [
  '#FDE68A', // Pale gold
  '#F59E0B', // Warm gold
  '#D97706', // Deep amber
  '#FEF3C7', // Stardust champagne
  '#C2A379', // Theme gold
  '#FFFFFF', // Pure light reflection
];

export const SparkleCanvas: React.FC<SparkleCanvasProps> = ({
  burstTrigger = 0,
  burstOrigin = null,
  isActive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ambientCounterRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Function to create star burst
  const triggerBurst = (originX: number, originY: number, count = 35) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5.5;
      const shapeRand = Math.random();
      const shape: 'star' | 'circle' | 'diamond' =
        shapeRand > 0.4 ? 'star' : shapeRand > 0.2 ? 'diamond' : 'circle';

      newParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: 2.5 + Math.random() * 5,
        alpha: 1,
        maxAlpha: 1,
        decay: 0.012 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        shape,
      });
    }
    particlesRef.current.push(...newParticles);
  };

  // Listen to burst trigger changes
  useEffect(() => {
    if (burstTrigger > 0 && burstOrigin) {
      triggerBurst(burstOrigin.x, burstOrigin.y, 35);
    }
  }, [burstTrigger, burstOrigin]);

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

    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fill();
    };

    const render = () => {
      if (!isActive && particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, width, height);
        animFrameIdRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Add gentle ambient sparkles around screen center (throttled to every 6 frames)
      ambientCounterRef.current++;
      if (isActive && ambientCounterRef.current % 6 === 0 && particlesRef.current.length < 40) {
        const spreadX = width * 0.4;
        const spreadY = height * 0.4;
        const cx = width / 2 + (Math.random() - 0.5) * spreadX;
        const cy = height / 2 + (Math.random() - 0.5) * spreadY;

        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.2 - Math.random() * 0.5,
          size: 2 + Math.random() * 3,
          alpha: 0.1,
          maxAlpha: 0.4 + Math.random() * 0.4,
          decay: 0.01 + Math.random() * 0.015,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
          shape: Math.random() > 0.4 ? 'star' : 'circle',
        });
      }

      // Update & Draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.vx *= 0.985;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > height + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(p.alpha, 1));
        ctx.fillStyle = p.color;
        // High performance without heavy shadowBlur
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 4, p.size, p.size * 0.35);
        } else if (p.shape === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      id="sparkle-particle-canvas"
      className="pointer-events-none absolute inset-0 z-30 h-full w-full select-none"
    />
  );
};
