import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;

    if (hostname.includes('youtube.com')) {
      if (pathname.startsWith('/watch')) {
        return searchParams.get('v');
      }
      if (pathname.startsWith('/embed/') || pathname.startsWith('/live/')) {
        return pathname.split('/')[2];
      }
      if (pathname.startsWith('/shorts/')) {
        return pathname.split('/')[2];
      }
    } else if (hostname.includes('youtu.be')) {
      return pathname.substring(1);
    }
  } catch (error) {
    // Fallback to regex for non-standard or partial URLs
  }

  // Regex as a fallback for cases where URL parsing isn't enough or for malformed URLs
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(regex);
  
  return match ? match[1] : null;
}
