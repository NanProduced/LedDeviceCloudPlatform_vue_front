declare module 'aos' {
  interface AosOptions {
    duration?: number
    easing?: string
    once?: boolean
    offset?: number
    delay?: number
    anchorPlacement?: string
    [key: string]: any
  }

  interface Aos {
    init(options?: AosOptions): void
    refresh(): void
    refreshHard(): void
  }

  const aos: Aos
  export default aos
}
