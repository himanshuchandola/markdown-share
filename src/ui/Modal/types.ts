import type { ReactNode } from 'react'

export type ModalProps = {
  isActive: boolean
  setActive: (active: boolean) => void
  children?: ReactNode
}
