import Link from 'next/link'

import { CopyLink } from '@components/CopyLink'

import styles from './styles.module.css'

import type { ShareContentProps } from './types'

const APP_URL = process.env.APP_URL

export const ShareContent = ({ slug }: ShareContentProps) => {
  const fullLink = `${APP_URL}/${slug}`

  return (
    <div className={styles.share_container}>
      <div className={styles.share_header}>
        <p className={styles.share_subtitle}>Share this link with others</p>
      </div>

      <div className={styles.copy_section}>
        <p className={styles.section_label}>Copy link</p>
        <CopyLink link={fullLink} />
      </div>

      <Link
        className={styles.open_button}
        title="Open Link in New Tab"
        href={fullLink}
        target="_blank"
        rel="noopener noreferrer"
        prefetch
      >
        <span>Open Page</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.open_arrow}
        >
          <path
            d="M6 3.5L10.5 8L6 12.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}
