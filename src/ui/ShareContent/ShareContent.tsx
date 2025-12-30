import Link from 'next/link'

import { CopyLink } from '@ui/CopyLink'
import Facebook from '@public/svgs/facebook.svg'
import Linkedin from '@public/svgs/linkedin.svg'
import Twitter from '@public/svgs/twitter.svg'
import Instagram from '@public/svgs/instagram.svg'
import Telegram from '@public/svgs/telegram.svg'
import Whatsapp from '@public/svgs/whatsapp.svg'
import Email from '@public/svgs/envelope-solid.svg'

import styles from './styles.module.css'

import type { ShareContentProps } from './types'

const APP_URL = process.env.APP_URL

const buttons = [
  { href: 'https://www.facebook.com/sharer/sharer.php?u=', title: 'Facebook', svg: Facebook },
  { href: 'https://twitter.com/intent/tweet?text=', title: 'Twitter', svg: Twitter },
  {
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=',
    title: 'LinkedIn',
    svg: Linkedin,
  },
  { href: 'https://www.instagram.com/?url=', title: 'Instagram', svg: Instagram },
  { href: 'https://t.me/share/url?url=', title: 'Telegram', svg: Telegram },
  { href: 'https://api.whatsapp.com/send?text=', title: 'WhatsApp', svg: Whatsapp },
  { href: 'mailto:?body=', title: 'Email', svg: Email },
]

export const ShareContent = ({ slug }: ShareContentProps) => {
  const fullLink = `${APP_URL}/${slug}`

  return (
    <div className={styles.share_container}>
      <div className={styles.share_header}>
        <h2 className={styles.share_title}>Share Your Page</h2>
        <p className={styles.share_subtitle}>Share this link with others</p>
      </div>

      <div className={styles.social_section}>
        <p className={styles.section_label}>Share via</p>
        <div className={styles.social_grid}>
          {buttons.map((button) => (
            <Link
              className={styles.social_button}
              title={`Share link via ${button.title}`}
              href={button.href + fullLink}
              key={button.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button.svg height={24} width={24} className={styles.social_icon} />
              <span className={styles.social_label}>{button.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.copy_section}>
        <p className={styles.section_label}>Or copy link</p>
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
