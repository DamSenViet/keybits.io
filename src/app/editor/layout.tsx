import { ReactNode } from 'react'
import AppHeader from '@/components/AppHeader'

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader compact />
      {children}
    </>
  )
}
