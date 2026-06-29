import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOptimizedImageUrl(url: string, width: number = 800) {
  return url;
}

export function supabaseImageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  return src;
}
