'use client';

import { useEffect, useState } from 'react';

const FAVICON_STAGES = ['😊', '😐', '😒', '😴'] as const;
const STAGE_DURATION = 30000; // 30 seconds per stage for testing, could be longer in production

/**
 * Hook to manage evolving favicon that changes over time
 * Transitions: 😊 → 😐 → 😒 → 😴
 */
export const useFaviconEvolution = () => {
  const [currentStage, setCurrentStage] = useState(0);

  // Evolution effect
  useEffect(() => {
    // Create favicon data URL from emoji
    const createEmojiDataUrl = (emoji: string): string => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 16, 16);
      }
      
      return canvas.toDataURL();
    };

    // Update favicon in document head
    const updateFavicon = (emoji: string) => {
      if (typeof window === 'undefined') return;
      
      // Remove existing favicon
      const existingFavicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Create new favicon
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = createEmojiDataUrl(emoji);
      document.head.appendChild(link);
    };
    
    // Set initial favicon
    updateFavicon(FAVICON_STAGES[currentStage]);

    // Set up timer for evolution
    const timer = setInterval(() => {
      setCurrentStage(prevStage => {
        const nextStage = Math.min(prevStage + 1, FAVICON_STAGES.length - 1);
        updateFavicon(FAVICON_STAGES[nextStage]);
        return nextStage;
      });
    }, STAGE_DURATION);

    return () => clearInterval(timer);
  }, [currentStage]);

  return {
    currentStage,
    currentEmoji: FAVICON_STAGES[currentStage],
    totalStages: FAVICON_STAGES.length,
  };
};