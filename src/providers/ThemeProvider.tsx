'use client'

import { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

/**
 * Your app's theme provider component.
 * 'use client' is essential for next-themes to work with app-dir.
 */
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} attribute="class">
      {children}
    </NextThemesProvider>
  )
}
