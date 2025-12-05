import { SEO } from '@ui/SEO'
import { Layout } from '@ui/Layout'
import { UploadForm } from '@ui/UploadForm'

import styles from './home.module.css'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <div className={styles.hero}>
          <h1 className={styles.hero__title}>Share Your Markdown Files</h1>
          <p className={styles.hero__subtitle}>
            Upload, share, and collaborate on your markdown files effortlessly
          </p>
        </div>
        <UploadForm />
      </Layout>
    </>
  )
}

export default Home
