import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOptimizedImageUrl(url: string, width: number = 800) {
  if (!url) return '';
  // Convert Supabase raw object URLs to optimized render URLs
  if (url.includes('/storage/v1/object/public/')) {
    const separator = url.includes('?') ? '&' : '?';
    return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + `${separator}width=${width}&quality=80`;
  }
  return url;
}

export function supabaseImageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  if (src.includes('/storage/v1/object/public/')) {
    const separator = src.includes('?') ? '&' : '?';
    return src.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + `${separator}width=${width}&quality=${quality || 80}`;
  }
  return src;
}
