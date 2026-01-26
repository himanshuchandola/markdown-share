import { Modal } from '@ui/Modal'
import { ShareContent } from '@ui/ShareContent'
import { ErrorContent } from '@ui/ErrorContent'

import type { ResultModalProps } from './types'

export const ResultModal = ({ isActive, setActive, result }: ResultModalProps) => {
  return (
    <Modal isActive={isActive} setActive={setActive}>
      {result ? (
        result.success ? (
          <ShareContent slug={result.slug} />
        ) : (
          <ErrorContent error={result.message} />
        )
      ) : (
        <></>
      )}
    </Modal>
  )
}
