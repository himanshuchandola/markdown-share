import { Header } from '@ui/Header'
import { ScrollToTop } from '@ui/ScrollToTop'

import styles from './styles.module.css'

import type { LayoutProps } from './types'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <ScrollToTop />
    </div>
  )
}
