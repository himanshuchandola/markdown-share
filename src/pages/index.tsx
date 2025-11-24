import { SEO } from '@ui/SEO'
import { Layout } from '@ui/Layout'
import { UploadForm } from '@ui/UploadForm'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <h1 style={{ fontSize: '26px', marginTop: '0.5rem' }}>Upload Markdown File</h1>
        <UploadForm />
      </Layout>
    </>
  )
}

export default Home
