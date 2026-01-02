import DOMPurify from 'dompurify'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'

/**
 * Convert markdown to HTML on the client side
 * Only works in browser environment (not SSR)
 */
export function convertMarkdownToHTML(markdown: string): string {
  if (typeof window === 'undefined') {
    return ''
  }

  const md = markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value || ''
        } catch (err) {
          return ''
        }
      }
      return ''
    },
  })

  const html = md.render(markdown)
  return DOMPurify.sanitize(html)
}
