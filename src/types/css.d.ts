// CSS Custom Properties Type Declaration
import 'react'

declare module 'react' {
  interface CSSProperties {
    '--stagger-index'?: number
    '--delay'?: string
    '--duration'?: string
    '--color'?: string
    [key: `--${string}`]: string | number | undefined
  }
}