import { Source_Code_Pro } from 'next/font/google'

import { ScrollProgressBar } from '@ui/ScrollProgressBar'
import { Layout } from '@ui/Layout'
import { SEO } from '@ui/SEO'
import { convertPageToHTML } from '@helpers/convertPage'
import styles from '@theme/markdown.module.css'

import type { GetServerSideProps } from 'next'
import type { IErrorResponse, IGetPageResponse, IHTMLPage } from '@types'

const sourceCodePro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-code',
})

const APP_URL = process.env.APP_URL

export type PostPageProps = {
  page: IHTMLPage
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')

  const { slug } = context.query
  const res = await fetch(`${APP_URL}/api/v1/pages/${slug}`)
  const pageData: IGetPageResponse | IErrorResponse = await res.json()

  if (!res.ok || pageData.success === false) {
    return {
      notFound: true,
    }
  }

  const page = convertPageToHTML(pageData.page)

  return {
    props: {
      page,
    } as PostPageProps,
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
