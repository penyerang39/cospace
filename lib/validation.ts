/**
 * Validation utilities for form data
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Sanitizes form data by trimming whitespace and handling null/undefined values
 */
export function sanitizeFormData(value: FormDataEntryValue | null): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

/**
 * Validates if a field is required (not empty)
 */
export function isRequired(value: string): boolean {
  return value.length > 0
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' }
  }

  return { isValid: true }
}

/**
 * Validates phone number format (optional field)
 */
export function validatePhone(phone: string): ValidationResult {
  // Phone is optional, so empty string is valid
  if (!phone) {
    return { isValid: true }
  }

  // Basic phone validation - allows various formats
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number.' }
  }

  return { isValid: true }
}

/**
 * Validates minimum number of selections for checkboxes
 */
export function hasMinimumSelections(selections: string[], minimum: number = 1): boolean {
  return selections.length >= minimum
}

/**
 * Sanitizes input by trimming whitespace and handling null/undefined values
 */
export function sanitizeInput(value: string | undefined | null): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

/**
 * Sanitizes email header content to prevent injection attacks
 */
export function sanitizeEmailHeader(value: string): string {
  return String(value)
    .trim()
    .replace(/[\r\n]/g, ' ')
    .replace(/[<>]/g, '')
    .substring(0, 100) // Limit length for headers
}

/**
 * Sanitizes email content to prevent injection attacks
 */
export function sanitizeEmailContent(value: string): string {
  return String(value)
    .trim()
    .replace(/[\r\n]/g, ' ')
    .replace(/[<>]/g, '')
}

/**
 * Sanitizes email address for CC field, validates format
 */
export function sanitizeEmailForCC(email: string): string | null {
  const sanitized = String(email).trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (emailRegex.test(sanitized)) {
    return sanitized
  }
  
  return null
}