import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructArtImageUrl(imageId?: string | null) {
  if (imageId) {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  }
}
