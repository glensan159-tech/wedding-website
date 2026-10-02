import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  yOffset?: number;
  threshold?: number;
  as?: 'section' | 'div' | 'article';
}

/**
 * ScrollRevealSection utilizes Intersection Observer (powered by Framer Motion's whileInView)
 * to smoothly fade in and slide up wedding sections as the guest scrolls down the page,
 * delivering an editorial, cinematic visual storytelling experience.
 */
export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  yOffset = 36,
  threshold = 0.1,
  as = 'section',
}) => {
  const Component = as === 'div' ? motion.div : as === 'article' ? motion.article : motion.section;

  return (
    <Component
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: threshold,
        margin: '0px 0px -40px 0px',
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier curve for luxurious fluid entrance
      }}
      className={className}
    >
      {children}
    </Component>
  );
};
