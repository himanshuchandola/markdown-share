import { useState } from 'react'

import { SEO } from '@ui/SEO'
import { Layout } from '@ui/Layout'
import { MarkdownEditor } from '@ui/MarkdownEditor'
import { ShareModal } from '@ui/ShareModal'
import { Spinner } from '@ui/Spinner'

import styles from './home.module.css'

import type { NextPage } from 'next'
import type { ShareOptions } from '@ui/ShareModal'
import type { IPostPageResponse, IErrorResponse } from '@types'

const Home: NextPage = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [isShareModalActive, setShareModalActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shareResult, setShareResult] = useState<IPostPageResponse | IErrorResponse | null>(null)

  const handleShare = async (options: ShareOptions) => {
    if (!markdownContent.trim()) {
      alert('Please add some content before sharing')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/v1/pages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: markdownContent,
          fileName: fileName || 'untitled',
          expireAt: options.expireAt,
          password: options.password,
        }),
      })

      const result = await response.json()
      setShareResult(result)

      if (result.success) {
        setShareModalActive(false)
        // Show success modal with share options
        setTimeout(() => {
          setShareResult(result)
          setShareModalActive(true)
        }, 100)
      } else {
        alert(result.message || 'Failed to share page')
      }
    } catch (error: any) {
      setShareResult({ success: false, message: error.message })
      alert(error.message || 'Failed to share page')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileLoad = (name: string) => {
    const nameWithoutExt = name.replace(/\.(md|txt)$/i, '')
    setFileName(nameWithoutExt)
  }

  return (
    <>
      <SEO />
      <Layout>
        <div className={styles.hero}>
          <h1 className={styles.hero__title}>Markdown Editor & Share</h1>
          <p className={styles.hero__subtitle}>
            Edit markdown with live preview and share instantly
          </p>
        </div>

        <div className={styles.editor_section}>
          <MarkdownEditor
            initialContent={markdownContent}
            onContentChange={setMarkdownContent}
            onFileLoad={handleFileLoad}
          />
        </div>

        <div className={styles.share_section}>
          <button
            className={styles.share_button}
            onClick={() => setShareModalActive(true)}
            disabled={!markdownContent.trim() || isLoading}
          >
            {isLoading ? 'Sharing...' : 'Share'}
          </button>
        </div>

        {isLoading ? <Spinner /> : <></>}

        <ShareModal
          isActive={isShareModalActive}
          setActive={setShareModalActive}
          onShare={handleShare}
          slug={shareResult?.success ? (shareResult as IPostPageResponse).slug : undefined}
        />
      </Layout>
    </>
  )
}

export default Home
