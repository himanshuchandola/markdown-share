import { useState, useRef, useEffect, useCallback } from 'react'
import type { ChangeEvent, DragEvent } from 'react'

import { Source_Code_Pro } from 'next/font/google'

import { convertMarkdownToHTML } from '@utils/convertMarkdownClient'
import markdownStyles from '@styles/markdown.module.css'

import styles from './styles.module.css'

const sourceCodePro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-code',
})

export type MarkdownEditorProps = {
  initialContent?: string
  onContentChange?: (content: string) => void
  onFileLoad?: (fileName: string) => void
}

export const MarkdownEditor = ({
  initialContent = '',
  onContentChange,
  onFileLoad,
}: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState<string>(initialContent)
  const [preview, setPreview] = useState<string>('')
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Update preview when markdown changes
  useEffect(() => {
    const html = convertMarkdownToHTML(markdown)
    setPreview(html)
    onContentChange?.(markdown)
  }, [markdown, onContentChange])

  // Initialize with initialContent
  useEffect(() => {
    if (initialContent) {
      setMarkdown(initialContent)
    }
  }, [initialContent])

  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
        alert('Please select a .md or .txt file')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setMarkdown(content)
        onFileLoad?.(file.name)
      }
      reader.readAsText(file)
    },
    [onFileLoad],
  )

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      setMarkdown('')
      editorRef.current?.focus()
    }
  }

  return (
    <div className={styles.editor_container}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.txt"
        onChange={handleFileInputChange}
        className={styles.hidden_input}
        aria-label="Upload markdown file"
      />

      {/* Editor Panel */}
      <div className={styles.editor_panel}>
        <div className={styles.panel_header}>
          <h3 className={styles.panel_title}>Editor</h3>
          <div className={styles.panel_actions}>
            <button
              type="button"
              onClick={handleUploadClick}
              className={styles.toolbar_button}
              title="Upload markdown file"
            >
              📁 Upload
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={styles.toolbar_button}
              title="Clear editor"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
        <div
          className={`${styles.editor_wrapper} ${isDragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            ref={editorRef}
            className={`${styles.editor} ${sourceCodePro.variable}`}
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Type your markdown here...&#10;&#10;Or drag and drop a .md file to load it."
            spellCheck={false}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className={styles.preview_panel}>
        <div className={styles.panel_header}>
          <h3 className={styles.panel_title}>Preview</h3>
          <div className={styles.preview_info}>
            {markdown.length > 0 && (
              <span className={styles.char_count}>{markdown.length} characters</span>
            )}
          </div>
        </div>
        <div className={styles.preview_wrapper}>
          {preview ? (
            <div
              className={`${styles.preview} ${markdownStyles.body} ${sourceCodePro.variable}`}
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          ) : (
            <div className={styles.preview_empty}>
              <p>Preview will appear here as you type...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
