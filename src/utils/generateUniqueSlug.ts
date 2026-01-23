import { connectDB } from '@lib/db'
import Page from '@models/pageModel'

/**
 * Generate a clean slug from filename by sanitizing it
 */
function sanitizeSlug(filename: string): string {
  return filename
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters, keep only alphanumeric and hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate unique slug based on filename.
 * If filename already exists, appends a number (e.g., filename-2, filename-3).
 */
export async function generateUniqueSlug(pageName?: string): Promise<{
  created: boolean // true - is already exists, false - not yet
  slug: string
}> {
  // Ensure MongoDB connection
  await connectDB()

  if (!pageName || !pageName.trim()) {
    // Generate a random slug if no filename provided
    const randomSlug = `page-${Date.now()}`
    const existingPage = await Page.findById(randomSlug).exec()
    if (existingPage) {
      return { created: true, slug: randomSlug }
    }
    return { created: false, slug: randomSlug }
  }

  // Sanitize the filename to create a clean slug
  const baseSlug = sanitizeSlug(pageName)

  if (!baseSlug) {
    // If sanitization results in empty string, use timestamp
    const fallbackSlug = `page-${Date.now()}`
    const existingPage = await Page.findById(fallbackSlug).exec()
    if (existingPage) {
      return { created: true, slug: fallbackSlug }
    }
    return { created: false, slug: fallbackSlug }
  }

  // Check if base slug exists
  let slug = baseSlug
  let existingPage = await Page.findById(slug).exec()

  // If base slug exists, try appending numbers starting from 2 until we find an available one
  if (existingPage) {
    let counter = 2
    slug = `${baseSlug}-${counter}`
    existingPage = await Page.findById(slug).exec()

    // Keep incrementing until we find an available slug
    while (existingPage) {
      counter++
      slug = `${baseSlug}-${counter}`
      existingPage = await Page.findById(slug).exec()
    }

    // This is a duplicate since base slug existed
    return {
      created: true,
      slug: slug,
    }
  }

  // Base slug is available
  return {
    created: false,
    slug: slug,
  }
}
