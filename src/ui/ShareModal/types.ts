export type ShareOptions = {
  expireAt?: Date
  password?: string
}

export type ShareModalProps = {
  isActive: boolean
  setActive: (active: boolean) => void
  onShare: (options: ShareOptions) => Promise<void>
  slug?: string
}
