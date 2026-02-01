import styles from './styles.module.css'

import type { ErrorContentProps } from './types'

export const ErrorContent = ({ error }: ErrorContentProps) => {
  return (
    <>
      <h1 className={styles.content__title}>Ooops! Internal Server Error</h1>
      <h2 className={styles.content__subtitle}>Cannot complete your request.</h2>
      <h3 className={styles.content__subtitle}>
        Try to refresh this page. If the problem persists, please try again later.
      </h3>
      <p className={styles.content__description} role="alert">
        message error: {error}
      </p>
    </>
  )
}
