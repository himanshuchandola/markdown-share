import Link from 'next/link'
import { Source_Code_Pro } from 'next/font/google'

import { ScrollProgressBar } from '@components/ScrollProgressBar'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { connectDB } from '@lib/db'
import Page from '@models/pageModel'
import { convertPageToHTML } from '@utils/convertPage'
import styles from '@styles/markdown.module.css'

import pageStyles from './[slug]/slug.module.css'

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
    // Explicitly select password field to check if page has password protection
    const page: IPage | null = await Page.findById(slug).select('+password').exec()

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
  const { html, title, hasPassword, _id } = page

  return (
    <>
      <SEO title={title} />
      <Layout>
        <>
          <ScrollProgressBar />
          {hasPassword && _id && (
            <div className={pageStyles.edit_container}>
              <Link href={`/${_id}/edit`} className={pageStyles.edit_button}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={pageStyles.edit_icon}
                >
                  <path
                    d="M11.333 2.00001C11.5084 1.82445 11.7163 1.68505 11.9447 1.58927C12.1731 1.49349 12.4173 1.44336 12.6667 1.44336C12.916 1.44336 13.1602 1.49349 13.3886 1.58927C13.617 1.68505 13.8249 1.82445 14 2.00001C14.1756 2.17556 14.315 2.38345 14.4108 2.61187C14.5065 2.84029 14.5567 3.08452 14.5567 3.33384C14.5567 3.58316 14.5065 3.82739 14.4108 4.05581C14.315 4.28423 14.1756 4.49212 14 4.66767L5.00001 13.6677L1.33334 14.6677L2.33334 11.001L11.333 2.00001Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Edit</span>
              </Link>
            </div>
          )}
          <section
            className={`${styles.body} ${sourceCodePro.variable}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </>
      </Layout>
    </>
  )
}
