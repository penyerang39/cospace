import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes input by trimming whitespace and removing potentially dangerous HTML/script content
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input) return ''
  return DOMPurify.sanitize(input.trim())
}

/**
 * Sanitizes FormDataEntryValue by converting to string first
 */
export function sanitizeFormData(input: FormDataEntryValue | null): string {
  if (!input) return ''
  if (typeof input === 'string') return sanitizeInput(input)
  return '' // File objects are not supported for text input
}

/**
 * Sanitizes input for email headers to prevent injection attacks
 * Removes newlines, carriage returns, and other header injection characters
 */
export function sanitizeEmailHeader(input: string): string {
  if (!input) return ''
  return sanitizeInput(input)
    .replace(/[\r\n]/g, '') // Remove newlines and carriage returns
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/[;:]/g, '') // Remove semicolons and colons that could be used in headers
    .trim()
}

/**
 * Sanitizes input for email body content to prevent injection attacks
 * Removes newlines that could be used for header injection
 */
export function sanitizeEmailContent(input: string): string {
  if (!input) return ''
  return sanitizeInput(input)
    .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
    .trim()
}

/**
 * Validates if an email is a business email (not from free providers)
 */
export function isBusinessEmail(email: string): boolean {
  const lower = email.toLowerCase().trim()
  const atIndex = lower.lastIndexOf('@')
  if (atIndex <= 0) return false
  const domain = lower.slice(atIndex + 1)
  const freeDomains = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'icloud.com',
    'me.com',
    'proton.me',
    'protonmail.com',
    'aol.com',
    'yandex.com',
    'yandex.ru',
    'mail.ru',
    'gmx.com',
    'gmx.net',
    'zoho.com',
    'pm.me'
  ])
  if (freeDomains.has(domain)) return false
  if (domain.endsWith('.edu')) return false
  return /.+@.+\..+/.test(lower)
}

/**
 * Validates phone number format
 * Requires: + or brackets around 1-4 digit country code, max 17 total digits
 * Examples: +1234567890, (+1) 234-567-890, +44 20 7946 0958
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true // Phone is optional
  
  // Remove all whitespace and common separators
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  // Check if it starts with + or has brackets pattern
  const hasCountryCode = /^\+/.test(phone) || /^\(\+\d{1,4}\)/.test(phone)
  
  // Check total length (max 17 digits including country code)
  const digitCount = cleaned.replace(/^\+/, '').length
  if (digitCount > 17) return false
  
  // Check if it's all digits after cleaning (except + at start)
  const digitsOnly = cleaned.replace(/^\+/, '')
  if (!/^\d+$/.test(digitsOnly)) return false
  
  // Must have country code indicator
  return hasCountryCode
}

/**
 * Validates that a string is not empty after sanitization
 */
export function isRequired(value: string | null | undefined): boolean {
  return sanitizeInput(value).length > 0
}

/**
 * Validates that an array has at least one element
 */
export function hasMinimumSelections(arr: any[] | null | undefined, minimum: number = 1): boolean {
  return Array.isArray(arr) && arr.length >= minimum
}

/**
 * Validates email format and business email requirement
 */
export function validateEmail(email: string | null | undefined): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(email)
  if (!sanitized) return { isValid: false, error: 'Email is required.' }
  if (!isBusinessEmail(sanitized)) return { isValid: false, error: 'Please use a business email address.' }
  return { isValid: true }
}

/**
 * Validates phone number format
 */
export function validatePhone(phone: string | null | undefined): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(phone)
  if (!sanitized) return { isValid: true } // Phone is optional
  if (!isValidPhone(sanitized)) return { isValid: false, error: 'Please enter a valid phone number with country code (e.g., +1234567890 or (+1) 234-567-890).' }
  return { isValid: true }
}

/**
 * Sanitizes and validates a form field
 */
export function sanitizeAndValidateField(value: string | null | undefined, isRequired: boolean = true): { value: string; isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(value)
  
  if (isRequired && !sanitized) {
    return { value: sanitized, isValid: false, error: 'This field is required.' }
  }
  
  return { value: sanitized, isValid: true }
}
