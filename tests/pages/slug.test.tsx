import { render } from '@testing-library/react'

import PostPage, { getServerSideProps } from '@pages/[slug]'

import type { IPage, IHTMLPage, IGetPageResponse, IErrorResponse } from '@interfaces'

const appUrl = process.env.APP_URL

const mockFindById = jest.fn()
const mockConnectDB = jest.fn()

// Helper to create a mock query chain
const createMockQuery = (execResult: any) => ({
  select: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(execResult),
})

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
  }
})

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/404' })),
}))

jest.mock('@components/ScrollProgressBar', () => ({
  ScrollProgressBar: () => (
    <div role="scrollbar" aria-controls="main-content" aria-valuenow={0}>
      Mock ScrollProgressBar
    </div>
  ),
}))

jest.mock('@lib/db', () => ({
  connectDB: () => mockConnectDB(),
}))

jest.mock('@models/pageModel', () => ({
  __esModule: true,
  default: {
    findById: (slug: string) => {
      const result = mockFindById(slug)
      if (result && typeof result === 'object' && 'exec' in result) {
        return {
          select: jest.fn().mockReturnThis(),
          exec: result.exec,
        }
      }
      return {
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(result),
      }
    },
  },
}))

describe('[slug] page', () => {
  const mockPage = {
    _id: 'uniq-a1b2c3',
    title: 'Test Page',
    author: 'John Doe',
    html: '<h2>Test Heading</h2>\n<p>This is a test page.</p>',
  } as IHTMLPage

  it('should render markdown text', () => {
    const { getByText } = render(<PostPage page={mockPage} />)
    expect(getByText('Test Heading')).toBeInTheDocument()
    expect(getByText('This is a test page.')).toBeInTheDocument()
  })

  it('should render the correct metadata', () => {
    render(<PostPage page={mockPage} />)

    const expectedTitle = `${mockPage.title} | md share`
    expect(document.title).toBe(expectedTitle)
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(
      expectedTitle,
    )
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      expectedTitle,
    )
  })

  it('should handle empty HTML gracefully', () => {
    const emptyPage = { ...mockPage, html: '' }
    const { container } = render(<PostPage page={emptyPage} />)
    expect(container.querySelector('section')).toBeEmptyDOMElement()
  })

  it('should render the correct markdown styles', () => {
    const { getByRole } = render(<PostPage page={mockPage} />)
    const markdownElement = getByRole('heading')
    const style = window.getComputedStyle(markdownElement)
    expect(style.fontSize).toEqual('1.5em')
    expect(style.fontWeight).toEqual('bold')
  })

  it('should render ScrollProgressBar component', () => {
    const { getByRole } = render(<PostPage page={mockPage} />)
    const progressBar = getByRole('scrollbar')
    expect(progressBar).toBeInTheDocument()
  })
})

describe('getServerSideProps', () => {
  const mockPageFromStore = {
    _id: 'uniq-a1b2c3',
    title: 'Test Page',
    author: 'John Doe',
    text: `# Should be first title
**Should be bold.**
\`\`\`python
import time

time.now()
\`\`\`

- Should be list element.
\`\`\`unknown language
import time

time.now()
\`\`\`
`,
  } as IPage
  const mockHTMLPage = {
    _id: 'uniq-a1b2c3',
    title: 'Test Page',
    author: 'John Doe',
    hasPassword: false,
    html: `<h1>Should be first title</h1>
<p><strong>Should be bold.</strong></p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> time

time.now()
</code></pre>
<ul>
<li>Should be list element.</li>
</ul>
<pre><code class="language-unknown">import time

time.now()
</code></pre>
`,
  } as IHTMLPage

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return notFound when page does not exist', async () => {
    mockConnectDB.mockResolvedValue(undefined)
    mockFindById.mockReturnValue(createMockQuery(null))

    const context = { query: { slug: 'test' }, res: { setHeader: jest.fn() } } as any
    const result = await getServerSideProps(context)

    expect(result).toEqual({ notFound: true })
    expect(mockConnectDB).toHaveBeenCalled()
  })

  it('should return page props when page exists', async () => {
    mockConnectDB.mockResolvedValue(undefined)
    mockFindById.mockReturnValue(createMockQuery(mockPageFromStore))

    const context = { query: { slug: 'test' }, res: { setHeader: jest.fn() } } as any
    const result = await getServerSideProps(context)

    expect(result).toEqual({ props: { page: mockHTMLPage } })
    expect(mockConnectDB).toHaveBeenCalled()
  })

  it('should return notFound for invalid slug', async () => {
    const context = { query: { slug: null }, res: { setHeader: jest.fn() } } as any
    const result = await getServerSideProps(context)

    expect(result).toEqual({ notFound: true })
  })
})
