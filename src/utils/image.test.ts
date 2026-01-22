import { describe, it, expect } from 'vitest'
import {
  getPosterUrl,
  getBackdropUrl,
  getYouTubeUrl,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
} from './image'

describe('image utils', () => {
  describe('getPosterUrl', () => {
    it('should build poster URL with default size', () => {
      const result = getPosterUrl('/abc123.jpg')
      expect(result).toBe('https://image.tmdb.org/t/p/w342/abc123.jpg')
    })

    it('should build poster URL with specified size', () => {
      const result = getPosterUrl('/abc123.jpg', 'LARGE')
      expect(result).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg')
    })

    it('should return null for null poster path', () => {
      expect(getPosterUrl(null)).toBeNull()
    })
  })

  describe('getBackdropUrl', () => {
    it('should build backdrop URL with default size', () => {
      const result = getBackdropUrl('/backdrop.jpg')
      expect(result).toBe('https://image.tmdb.org/t/p/w780/backdrop.jpg')
    })

    it('should build backdrop URL with specified size', () => {
      const result = getBackdropUrl('/backdrop.jpg', 'LARGE')
      expect(result).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg')
    })

    it('should return null for null backdrop path', () => {
      expect(getBackdropUrl(null)).toBeNull()
    })
  })

  describe('getYouTubeUrl', () => {
    it('should build YouTube watch URL', () => {
      const result = getYouTubeUrl('dQw4w9WgXcQ')
      expect(result).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    })
  })

  describe('getYouTubeEmbedUrl', () => {
    it('should build YouTube embed URL', () => {
      const result = getYouTubeEmbedUrl('dQw4w9WgXcQ')
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
    })
  })

  describe('getYouTubeThumbnailUrl', () => {
    it('should build YouTube thumbnail URL', () => {
      const result = getYouTubeThumbnailUrl('dQw4w9WgXcQ')
      expect(result).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg')
    })
  })
})
