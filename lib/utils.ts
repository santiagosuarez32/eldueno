import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOptimizedImageUrl(url: string, width: number = 800) {
  if (!url) return '';
  if (url.includes('supabase.co/storage/v1/object/public/')) {
    const renderUrl = url.replace('/object/public/', '/render/image/public/');
    return `${renderUrl}?width=${width}&quality=80`;
  }
  return url;
}
