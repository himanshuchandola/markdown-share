import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import { Source_Code_Pro } from 'next/font/google'

import { SEO } from '@ui/SEO'
import { Layout } from '@ui/Layout'
import { MarkdownEditor } from '@ui/MarkdownEditor'
import { Spinner } from '@ui/Spinner'
import { Modal } from '@ui/Modal'

import styles from './edit.module.css'

import type { GetServerSideProps } from 'next'
import type { IPage } from '@types'

const sourceCodePro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-code',
})

export type EditPageProps = {
  page: IPage
  requiresPassword: boolean
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  if (!slug || typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const { connectDB } = await import('@core/db')
    const Page = (await import('@models/pageModel')).default

    await connectDB()
    const page: IPage | null = await Page.findById(slug).exec()

    if (!page) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        page: JSON.parse(JSON.stringify(page)),
        requiresPassword: !!page.password,
      } as EditPageProps,
    }
  } catch (error) {
    console.error('Error fetching page:', error)
    return {
      notFound: true,
    }
  }
}

export default function EditPage({ page, requiresPassword }: EditPageProps) {
  const router = useRouter()
  const [markdown, setMarkdown] = useState<string>(page.text)
  const [password, setPassword] = useState<string>('')
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(requiresPassword)
  const [passwordError, setPasswordError] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')

    try {
      const response = await fetch(`/api/v1/pages/${page._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const result = await response.json()

      if (result.success) {
        setShowPasswordModal(false)
      } else {
        setPasswordError(result.message || 'Incorrect password')
      }
    } catch (error: any) {
      setPasswordError(error.message || 'Failed to verify password')
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      const response = await fetch(`/api/v1/pages/${page._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: markdown,
          password: requiresPassword ? password : undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSaveStatus('success')
        setTimeout(() => {
          router.push(`/${page._id}`)
        }, 1500)
      } else {
        setSaveStatus('error')
        alert(result.message || 'Failed to save page')
      }
    } catch (error: any) {
      setSaveStatus('error')
      alert(error.message || 'Failed to save page')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <SEO title={`Edit: ${page.title || page._id}`} />
      <Layout>
        <div className={styles.edit_container}>
          <div className={styles.edit_header}>
            <h1 className={styles.edit_title}>Edit Page</h1>
            <div className={styles.edit_actions}>
              <button
                onClick={handleSave}
                disabled={isSaving || showPasswordModal}
                className={styles.save_button}
              >
                {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save'}
              </button>
              <button onClick={() => router.push(`/${page._id}`)} className={styles.cancel_button}>
                Cancel
              </button>
            </div>
          </div>

          <MarkdownEditor initialContent={markdown} onContentChange={setMarkdown} />

          {saveStatus === 'success' && (
            <div className={styles.save_success}>Page saved! Redirecting...</div>
          )}
        </div>

        {showPasswordModal ? (
          <Modal isActive={showPasswordModal} setActive={() => {}}>
            <div className={styles.password_modal}>
              <h2 className={styles.password_title}>Password Required</h2>
              <p className={styles.password_subtitle}>
                This page is password protected. Enter the password to edit.
              </p>
              <form onSubmit={handlePasswordSubmit} className={styles.password_form}>
                <input
                  type="password"
                  className={styles.password_input}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
                {passwordError && <div className={styles.password_error}>{passwordError}</div>}
                <div className={styles.password_actions}>
                  <button
                    type="button"
                    onClick={() => router.push(`/${page._id}`)}
                    className={styles.cancel_button}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submit_button}>
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        ) : (
          <></>
        )}

        {isSaving ? <Spinner /> : <></>}
      </Layout>
    </>
  )
}
