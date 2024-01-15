import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AppMainProps {
  className?: string
  children?: ReactNode
}

export default function AppMain({ className, children }: AppMainProps) {
  return (
    <main className={cn('grow flex flex-row relative', className)}>
      {children}
    </main>
  )
}
