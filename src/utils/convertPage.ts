import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'

import type { IPage, IHTMLPage } from '@interfaces'

function sanitizeHTML(html: string): string {
  const purify = DOMPurify(new JSDOM('<!DOCTYPE html>').window)
  return purify.sanitize(html)
}

export function convertPageToHTML(page: IPage): IHTMLPage {
  const { text, password, createdAt, expireAt, ...rest } = page

  const md = markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(str, { language: lang }).value || ''
      }

      return ''
    },
  })

  // Explicitly construct IHTMLPage to ensure no Date objects or undefined values
  // Next.js requires all props to be JSON-serializable (no undefined, no Date objects)
  const htmlPage: IHTMLPage = {
    _id: rest._id,
    isCommentable: rest.isCommentable,
    html: sanitizeHTML(md.render(text)),
    hasPassword: !!password,
  }

  // Only include optional fields if they have values (omit undefined)
  if (rest.title !== undefined && rest.title !== null) {
    htmlPage.title = rest.title
  }

  if (rest.author !== undefined && rest.author !== null) {
    htmlPage.author = rest.author
  }

  return htmlPage
}
