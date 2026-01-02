
import { useMemo, useCallback } from 'react';

/**
 * A custom hook to manage and play sound effects.
 * @param clickUrl - The URL or data URL for the click sound.
 * @param winUrl - The URL or data URL for the win sound.
 * @param drawUrl - The URL or data URL for the draw sound.
 * @returns An object with functions to play each sound.
 */
export const useSound = (clickUrl: string, winUrl: string, drawUrl: string) => {
  // Memoize Audio objects to prevent re-creation on every render
  const clickAudio = useMemo(() => new Audio(clickUrl), [clickUrl]);
  const winAudio = useMemo(() => new Audio(winUrl), [winUrl]);
  const drawAudio = useMemo(() => new Audio(drawUrl), [drawUrl]);

  // Generic play function that handles potential browser errors and allows re-playing
  const playSound = useCallback((audio: HTMLAudioElement) => {
    // Resetting current time allows the sound to be played again before it finishes
    audio.currentTime = 0;
    audio.play().catch(error => {
      // Autoplay is often restricted by browsers, log error if it occurs.
      console.error("Error playing sound:", error);
    });
  }, []);

  const playClick = useCallback(() => playSound(clickAudio), [playSound, clickAudio]);
  const playWin = useCallback(() => playSound(winAudio), [playSound, winAudio]);
  const playDraw = useCallback(() => playSound(drawAudio), [playSound, drawAudio]);

  return { playClick, playWin, playDraw };
};
