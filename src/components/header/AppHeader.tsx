'use client'

import ThemeModeToggle from '@/components/ThemeModeToggle'
import Navigation from './Navigation'

interface AppHeaderProps {
  compact?: boolean
}

export default function AppHeader({ compact = false }: AppHeaderProps) {
  return (
    <header
      className={`px-4 ${compact ? 'h-14' : 'h-16'} flex border-b border-border/40 content-center`}
    >
      <Navigation />
      <div className="ml-auto flex self-center">
        <ThemeModeToggle />
      </div>
    </header>
  )
}
