import { Source_Code_Pro } from 'next/font/google'

import { ScrollProgressBar } from '@components/ScrollProgressBar'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { connectDB } from '@lib/db'
import Page from '@models/pageModel'
import { convertPageToHTML } from '@utils/convertPage'
import styles from '@styles/markdown.module.css'

import type { GetServerSideProps } from 'next'
import type { IHTMLPage, IPage } from '@interfaces'

const sourceCodePro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-code',
})

export type PostPageProps = {
  page: IHTMLPage
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')

  const { slug } = context.query

  if (!slug || typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    // Connect to database and fetch page directly
    await connectDB()
    const page: IPage | null = await Page.findById(slug).exec()

    if (!page) {
      return {
        notFound: true,
      }
    }

    const htmlPage = convertPageToHTML(page)

    return {
      props: {
        page: htmlPage,
      } as PostPageProps,
    }
  } catch (error) {
    console.error('Error fetching page:', error)
    return {
      notFound: true,
    }
  }
}

export default function PostPage({ page }: PostPageProps) {
  const { html, title } = page

  return (
    <>
      <SEO title={title} />
      <Layout>
        <ScrollProgressBar />
        <section
          className={`${styles.body} ${sourceCodePro.variable}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Layout>
    </>
  )
}
