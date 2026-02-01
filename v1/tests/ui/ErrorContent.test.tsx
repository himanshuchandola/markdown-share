import { render } from '@testing-library/react'

import { Modal } from '@ui/Modal'
import { ErrorContent } from '@ui/ErrorContent'

describe('ErrorContent in Modal component', () => {
  it('should render error message', async () => {
    const { getByText } = render(
      <Modal isActive={true} setActive={jest.fn()}>
        <ErrorContent error="uniq test error" />
      </Modal>,
    )
    const message = getByText('message error: uniq test error')
    expect(message).toBeInTheDocument()
  })
})
