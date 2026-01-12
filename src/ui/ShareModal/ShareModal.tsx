import { useState, FormEvent } from 'react'

import { Modal } from '@ui/Modal'
import { ShareContent } from '@ui/ShareContent'
import { Select } from '@ui/Select'
import { Checkbox } from '@ui/Checkbox'

import styles from './styles.module.css'

import type { ShareModalProps } from './types'

const expiresOptions: { label: string; value: string }[] = [
  {
    label: 'No expiration',
    value: '',
  },
  {
    label: 'Remove after 1 day',
    value: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    label: 'Remove after 7 days',
    value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    label: 'Remove after 31 days',
    value: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const ShareModal = ({ isActive, setActive, onShare, slug }: ShareModalProps) => {
  const [expireAt, setExpireAt] = useState<Date | null>(null)
  const [password, setPassword] = useState<string>('')
  const [hasPassword, setHasPassword] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleExpireAtChange = (value: string) => {
    const parsedDate = new Date(value)
    if (!isNaN(parsedDate.getTime())) {
      setExpireAt(parsedDate)
    } else {
      setExpireAt(null)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onShare({
        expireAt: expireAt || undefined,
        password: hasPassword && password ? password : undefined,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setActive(false)
    setPassword('')
    setHasPassword(false)
    setExpireAt(null)
  }

  return (
    <Modal isActive={isActive} setActive={handleClose}>
      <div className={styles.share_modal}>
        <div className={styles.share_modal_header}>
          <h2 className={styles.share_modal_title}>Share Your Page</h2>
          <p className={styles.share_modal_subtitle}>Configure sharing options</p>
        </div>

        {slug ? (
          <ShareContent slug={slug} />
        ) : (
          <form className={styles.share_form} onSubmit={handleSubmit}>
            <div className={styles.form_section}>
              <label className={styles.form_label}>Expiration Date</label>
              <Select
                id="expiration-date"
                name="page_expiration_date"
                options={expiresOptions}
                onChange={handleExpireAtChange}
                value={expireAt ? expireAt.toISOString() : ''}
                defaultValue={undefined}
                label=""
                className={styles.form_select}
              />
            </div>

            <div className={styles.form_section}>
              <div className={styles.password_section}>
                <Checkbox
                  id="password-protect"
                  name="password_protect"
                  value={hasPassword}
                  onChange={() => setHasPassword(!hasPassword)}
                  label="Password protect for editing"
                  className={styles.form_checkbox}
                />
                <p className={styles.password_description}>
                  Enable password protection to restrict edit access. Anyone with the password can
                  edit this page at <code className={styles.code}>/[slug]/edit</code>
                </p>
              </div>
              {hasPassword && (
                <input
                  type="password"
                  className={styles.password_input}
                  placeholder="Enter password for editing"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={hasPassword}
                />
              )}
            </div>

            <div className={styles.form_actions}>
              <button
                type="button"
                onClick={handleClose}
                className={styles.cancel_button}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.share_button}
                disabled={isSubmitting || (hasPassword && !password)}
              >
                {isSubmitting ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}
