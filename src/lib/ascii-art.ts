/**
 * ASCII art utilities for console easter eggs
 */

export const ASCII_ART = {
  FAIL: `
 ███████╗ █████╗ ██╗██╗     
 ██╔════╝██╔══██╗██║██║     
 █████╗  ███████║██║██║     
 ██╔══╝  ██╔══██║██║██║     
 ██║     ██║  ██║██║███████╗
 ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝`,

  SLEEPING: `
 ███████╗██╗     ███████╗███████╗██████╗ ██╗███╗   ██╗ ██████╗ 
 ██╔════╝██║     ██╔════╝██╔════╝██╔══██╗██║████╗  ██║██╔════╝ 
 ███████╗██║     █████╗  █████╗  ██████╔╝██║██╔██╗ ██║██║  ███╗
 ╚════██║██║     ██╔══╝  ██╔══╝  ██╔═══╝ ██║██║╚██╗██║██║   ██║
 ███████║███████╗███████╗███████╗██║     ██║██║ ╚████║╚██████╔╝
 ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝`,

  WAKE: `
 ██╗    ██╗ █████╗ ██╗  ██╗███████╗
 ██║    ██║██╔══██╗██║ ██╔╝██╔════╝
 ██║ █╗ ██║███████║█████╔╝ █████╗  
 ██║███╗██║██╔══██║██╔═██╗ ██╔══╝  
 ╚███╔███╔╝██║  ██║██║  ██╗███████╗
  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝`,

  LOADING: `
 ██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
 ██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
 ██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
 ██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
 ███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝`
};

/**
 * Display ASCII art in console with styling
 */
export const displayAsciiArt = (artKey: keyof typeof ASCII_ART, color = '#ff6b6b') => {
  const art = ASCII_ART[artKey];
  if (art) {
    console.log(`%c${art}`, `color: ${color}; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.2;`);
  }
};

/**
 * Display a random ASCII art piece
 */
export const displayRandomAsciiArt = () => {
  const keys = Object.keys(ASCII_ART) as Array<keyof typeof ASCII_ART>;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  displayAsciiArt(randomKey, randomColor);
};
