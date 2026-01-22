import { API_CONFIG, IMAGE_SIZES } from './constants'
import type { ImageSize, BackdropSize } from '@/types'

/**
 * Build full URL for movie poster
 */
export function getPosterUrl(
  posterPath: string | null, 
  size: keyof typeof IMAGE_SIZES.POSTER = 'MEDIUM'
): string | null {
  if (!posterPath) return null
  
  const imageSize = IMAGE_SIZES.POSTER[size] as ImageSize
  return `${API_CONFIG.IMAGE_BASE_URL}/${imageSize}${posterPath}`
}

/**
 * Build full URL for movie backdrop
 */
export function getBackdropUrl(
  backdropPath: string | null, 
  size: keyof typeof IMAGE_SIZES.BACKDROP = 'MEDIUM'
): string | null {
  if (!backdropPath) return null
  
  const imageSize = IMAGE_SIZES.BACKDROP[size] as BackdropSize
  return `${API_CONFIG.IMAGE_BASE_URL}/${imageSize}${backdropPath}`
}

/**
 * Build YouTube video URL
 */
export function getYouTubeUrl(videoKey: string): string {
  return `https://www.youtube.com/watch?v=${videoKey}`
}

/**
 * Build YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoKey: string): string {
  return `https://www.youtube.com/embed/${videoKey}`
}

/**
 * Build YouTube thumbnail URL
 */
export function getYouTubeThumbnailUrl(videoKey: string): string {
  return `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`
}
