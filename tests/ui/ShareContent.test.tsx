import { render, screen, fireEvent } from '@testing-library/react'

import { ShareContent } from '@ui/ShareContent'

const appUrl = process.env.APP_URL

global.document.execCommand = jest.fn()

jest.mock('@public/svgs/facebook.svg', () => {
  const MockFacebookSvg = () => <svg />
  MockFacebookSvg.displayName = 'MockFacebookSvg'
  return MockFacebookSvg
})

jest.mock('@public/svgs/linkedin.svg', () => {
  const MockLinkedinSvg = () => <svg />
  MockLinkedinSvg.displayName = 'MockLinkedinSvg'
  return MockLinkedinSvg
})

jest.mock('@public/svgs/twitter.svg', () => {
  const MockTwitterSvg = () => <svg />
  MockTwitterSvg.displayName = 'MockTwitterSvg'
  return MockTwitterSvg
})

jest.mock('@public/svgs/instagram.svg', () => {
  const MockInstagramSvg = () => <svg />
  MockInstagramSvg.displayName = 'MockInstagramSvg'
  return MockInstagramSvg
})

jest.mock('@public/svgs/telegram.svg', () => {
  const MockTelegramSvg = () => <svg />
  MockTelegramSvg.displayName = 'MockTelegramSvg'
  return MockTelegramSvg
})

jest.mock('@public/svgs/whatsapp.svg', () => {
  const MockWhatsappSvg = () => <svg />
  MockWhatsappSvg.displayName = 'MockWhatsappSvg'
  return MockWhatsappSvg
})

jest.mock('@public/svgs/envelope-solid.svg', () => {
  const MockEnvelopeSolidSvg = () => <svg />
  MockEnvelopeSolidSvg.displayName = 'MockEnvelopeSolidSvg'
  return MockEnvelopeSolidSvg
})

describe('ShareContent component', () => {
  const slug = 'test-slug'
  const fullLink = `${appUrl}/${slug}`

  it('should render copy link section with label', () => {
    render(<ShareContent slug={slug} />)

    const copyLabel = screen.getByText('Copy link')
    expect(copyLabel).toBeInTheDocument()
  })

  it('should render CopyLink component with correct link', () => {
    render(<ShareContent slug={slug} />)

    const copyLinkInput = screen.getByRole('textbox')
    expect(copyLinkInput).toHaveValue(fullLink)
  })

  it('should render "Open Link in New Tab" button with correct link', () => {
    render(<ShareContent slug={slug} />)

    const openLinkButton = screen.getByTitle('Open Link in New Tab')
    expect(openLinkButton).toHaveAttribute('href', fullLink)
  })

  it('should render share header with subtitle', () => {
    render(<ShareContent slug={slug} />)

    const subtitle = screen.getByText('Share this link with others')
    expect(subtitle).toBeInTheDocument()
  })

  it('should call CopyLink component correctly when clicked', async () => {
    render(<ShareContent slug={slug} />)

    const copyButton = screen.getByRole('button')

    fireEvent.click(copyButton)

    const copyLinkComponent = screen.getByRole('textbox')
    expect(copyLinkComponent).toHaveValue(fullLink)
  })
})
