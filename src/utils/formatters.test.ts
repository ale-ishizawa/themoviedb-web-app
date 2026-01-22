import { describe, it, expect } from 'vitest'
import {
  formatRating,
  formatRuntime,
  getYearFromDate,
  formatReleaseDate,
  truncateText,
} from './formatters'

describe('formatters', () => {
  describe('formatRating', () => {
    it('should format rating with one decimal place', () => {
      expect(formatRating(8.123)).toBe('8.1/10')
      expect(formatRating(7.0)).toBe('7.0/10')
      expect(formatRating(10)).toBe('10.0/10')
    })

    it('should handle zero rating', () => {
      expect(formatRating(0)).toBe('0.0/10')
    })
  })

  describe('formatRuntime', () => {
    it('should format runtime with hours and minutes', () => {
      expect(formatRuntime(135)).toBe('2h 15min')
      expect(formatRuntime(90)).toBe('1h 30min')
    })

    it('should handle runtime less than an hour', () => {
      expect(formatRuntime(45)).toBe('45min')
    })

    it('should handle exact hours', () => {
      expect(formatRuntime(120)).toBe('2h')
    })

    it('should return N/A for null runtime', () => {
      expect(formatRuntime(null)).toBe('N/A')
    })
  })

  describe('getYearFromDate', () => {
    it('should extract year from date string', () => {
      expect(getYearFromDate('2024-07-15')).toBe('2024')
      expect(getYearFromDate('2015-03-04')).toBe('2015')
    })

    it('should return N/A for empty string', () => {
      expect(getYearFromDate('')).toBe('N/A')
    })
  })

  describe('formatReleaseDate', () => {
    it('should format date in default locale', () => {
      const result = formatReleaseDate('2024-07-15', 'en-US')
      // Check that it contains the expected parts (timezone-agnostic)
      expect(result).toContain('2024')
      expect(result).toContain('July')
    })

    it('should return N/A for empty string', () => {
      expect(formatReleaseDate('')).toBe('N/A')
    })
  })

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      const text = 'This is a very long text that should be truncated'
      expect(truncateText(text, 20)).toBe('This is a very long...')
    })

    it('should not truncate text shorter than maxLength', () => {
      const text = 'Short text'
      expect(truncateText(text, 20)).toBe('Short text')
    })

    it('should handle text equal to maxLength', () => {
      const text = 'Exactly twenty chars'
      expect(truncateText(text, 20)).toBe('Exactly twenty chars')
    })
  })
})
