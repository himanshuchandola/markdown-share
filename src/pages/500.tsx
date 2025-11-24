import styles from '@theme/error.module.css'
import { SEO } from '@ui/SEO'
import { Layout } from '@ui/Layout'
import { BackHomeButton } from '@ui/BackHomeButton'

import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const ServerErrorPage: NextPage = () => {
  return (
    <>
      <SEO
        title="500: Server Error"
        description="Sorry, we had some technical problems during your last operation."
      />
      <Layout>
        <h1 className={styles.status_code} role="alert">
          500 | Internal Server Error.
        </h1>
        <BackHomeButton />
      </Layout>
    </>
  )
}

export default ServerErrorPage
