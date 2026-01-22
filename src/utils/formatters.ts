/**
 * Format movie rating to display format (e.g., 8.1/10)
 */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)}/10`
}

/**
 * Format movie runtime to hours and minutes (e.g., "2h 15min")
 */
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A'
  
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) return `${mins}min`
  if (mins === 0) return `${hours}h`
  
  return `${hours}h ${mins}min`
}

/**
 * Extract year from release date string
 */
export function getYearFromDate(dateString: string): string {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  return date.getFullYear().toString()
}

/**
 * Format full release date
 */
export function formatReleaseDate(dateString: string, locale = 'en-US'): string {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  return text.slice(0, maxLength).trim() + '...'
}
