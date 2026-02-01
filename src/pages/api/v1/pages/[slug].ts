import bcrypt from 'bcryptjs'

import { connectDB } from '@core/db'
import Page from '@models/pageModel'
import { validateRequest } from '@helpers/validateRequest'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { IPage, IPageDocument } from '@types'

// Route: /api/v1/pages/{slug}
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
  res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')

  // Method: GET
  if (req.method === 'GET') {
    try {
      const { slug } = req.query
      const page: IPage = await Page.findById(slug).exec()

      if (page) {
        res.status(200).json({ success: true, page: page })
      } else {
        throw new Error('Page does not exist')
      }
    } catch (error) {
      res.status(404).json({ success: false, message: error.message })
    }
  }

  // Method: POST - Verify password
  else if (req.method === 'POST') {
    try {
      const { slug } = req.query
      const { password } = req.body

      if (!password) {
        return res.status(400).json({
          success: false,
          message: 'Password is required',
        })
      }

      const page = await Page.findById(slug).exec()

      if (!page) {
        return res.status(404).json({
          success: false,
          message: 'Page not found',
        })
      }

      if (!page.password) {
        return res.status(400).json({
          success: false,
          message: 'This page does not require a password',
        })
      }

      const isValid = await bcrypt.compare(password, page.password)

      if (isValid) {
        return res.status(200).json({
          success: true,
          message: 'Password verified',
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'Incorrect password',
        })
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to verify password',
      })
    }
  }

  // Method: PUT - Update page
  else if (req.method === 'PUT') {
    try {
      const { slug } = req.query
      const { text, password } = req.body

      const page: IPageDocument | null = await Page.findById(slug).exec()

      if (!page) {
        return res.status(404).json({
          success: false,
          message: 'Page not found',
        })
      }

      // Verify password if page is password protected
      if (page.password) {
        if (!password) {
          return res.status(401).json({
            success: false,
            message: 'Password is required to edit this page',
          })
        }

        const isValid = await bcrypt.compare(password, page.password)
        if (!isValid) {
          return res.status(401).json({
            success: false,
            message: 'Incorrect password',
          })
        }
      }

      // Update page content
      page.text = text || page.text
      await page.save()

      res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')
      return res.status(200).json({
        success: true,
        message: 'Page updated successfully',
        slug: page._id,
      })
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to update page',
      })
    }
  }

  // Method: HEAD
  else if (req.method === 'HEAD') {
    res.status(200).end()
  }

  // Method: *
  else {
    res.setHeader('Allow', ['HEAD', 'GET', 'POST', 'PUT'])
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
