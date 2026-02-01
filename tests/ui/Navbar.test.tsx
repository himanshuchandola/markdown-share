import { render } from '@testing-library/react'

import { Navbar } from '@ui/Navbar'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/' })),
}))

describe('Navbar component', () => {
  it('should render the logo', () => {
    const { getByText } = render(<Navbar />)
    const banner = getByText('Markdrop')
    expect(banner).toBeInTheDocument()
  })

  it('should render the correct number of navigation links', () => {
    const { getAllByRole } = render(<Navbar />)
    const navLinks = getAllByRole('link')
    expect(navLinks.length).toEqual(2)
  })

  it('should have the active class on the current page link', () => {
    const { getByText } = render(<Navbar />)
    const homeLink = getByText('Home')
    expect(homeLink).toHaveClass('active')
  })
})
