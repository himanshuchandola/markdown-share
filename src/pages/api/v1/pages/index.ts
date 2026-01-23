import bcrypt from 'bcryptjs'

import { connectDB } from '@lib/db'
import Page from '@models/pageModel'
import { generateUniqueSlug } from '@utils/generateUniqueSlug'
import { validateRequest } from '@utils/validateRequest'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { IPageDocument, IPostPageRequest } from '@interfaces'

// Route: /api/v1/pages
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate request origin and API secret
  const validation = validateRequest(req, res)
  if (!validation.isValid) {
    return res.status(403).json({
      success: false,
      message: validation.error || 'Access denied',
    })
  }

  // Ensure MongoDB connection before handling request
  try {
    await connectDB()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed. Please check your MongoDB configuration.',
    })
  }
  // Create Page
  // Method: POST
  if (req.method === 'POST') {
    console.log(`${new Date().toUTCString()} | Call endpoint: ${req.method} ${req.url}`)

    try {
      const { text, fileName, expireAt, isCommentable, password } = req.body as IPostPageRequest
      const { created, slug } = await generateUniqueSlug(fileName)

      // Hash password if provided
      let hashedPassword: string | undefined
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10)
      }

      if (!created) {
        const page: IPageDocument = new Page({
          _id: slug,
          title: fileName,
          text: text,
          expireAt: expireAt,
          isCommentable: isCommentable || false,
          password: hashedPassword,
        })
        await page.save()
        res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')
        res.status(201).json({ success: true, status: 'Created', slug: slug })
      } else {
        res.status(200).json({ success: true, status: 'Already exists', slug: slug })
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  // Method: HEAD
  else if (req.method === 'HEAD') {
    res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')
    res.status(200).end()
  }

  // Method: *
  else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')
    res.setHeader('Allow', ['HEAD', 'POST'])
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
