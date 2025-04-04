/**
 * Utility functions for the Silk Road Visualization application
 */

// Date formatting
export function formatDate(dateStr, locale = 'zh-CN') {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format historical dates (possibly BC/AD)
export function formatHistoricalDate(year, era = 'AD') {
  if (year === null || year === undefined) return 'Unknown'
  
  const absYear = Math.abs(year)
  
  if (year < 0) {
    return `${absYear} BC`
  } else {
    return `${year} AD`
  }
}

// Parse a year string that might be in various formats
export function parseHistoricalYear(yearStr) {
  if (!yearStr) return null
  
  // Remove any non-numeric characters except minus sign
  const cleaned = yearStr.replace(/[^\d-]/g, '')
  return parseInt(cleaned, 10)
}

// Geographic coordinates utility functions
export function calculateDistance(lat1, lon1, lat2, lon2) {
  // Haversine formula to calculate distance between two points on Earth
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function toRad(degrees) {
  return degrees * Math.PI / 180
}

// Debounce function for performance optimization
export function debounce(func, wait = 300) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Truncate text with ellipsis
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
} 