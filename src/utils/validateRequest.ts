import type { NextApiRequest, NextApiResponse } from 'next'

const APP_URL = process.env.APP_URL
const API_SECRET = process.env.API_SECRET

/**
 * Validates that the request comes from the allowed origin
 * Same-origin requests are allowed automatically
 * Cross-origin requests require API_SECRET if set
 */
export function validateRequest(
  req: NextApiRequest,
  res: NextApiResponse,
): { isValid: boolean; error?: string } {
  if (!APP_URL) {
    // If APP_URL is not set, allow all requests (development mode)
    return { isValid: true }
  }

  const allowedOrigin = new URL(APP_URL).origin
  const origin = req.headers.origin
  const referer = req.headers.referer

  // Check if request is from allowed origin
  let isSameOrigin = false

  if (origin) {
    try {
      const requestOrigin = new URL(origin).origin
      isSameOrigin = requestOrigin === allowedOrigin || requestOrigin === 'http://localhost:3000'
    } catch {
      // Invalid origin format
    }
  }

  // Also check referer for same-origin requests without origin header
  if (!isSameOrigin && referer) {
    try {
      const refererOrigin = new URL(referer).origin
      isSameOrigin = refererOrigin === allowedOrigin || refererOrigin === 'http://localhost:3000'
    } catch {
      // Invalid referer format
    }
  }

  // Allow same-origin requests
  if (isSameOrigin) {
    return { isValid: true }
  }

  // For cross-origin requests, require API secret if set
  if (API_SECRET) {
    const providedSecret = req.headers['x-api-secret'] || req.headers['api-secret']
    if (providedSecret === API_SECRET) {
      return { isValid: true }
    }
    return {
      isValid: false,
      error: 'Invalid API secret',
    }
  }

  // Reject cross-origin requests if no API secret is configured
  return {
    isValid: false,
    error: 'Request origin not allowed',
  }
}
