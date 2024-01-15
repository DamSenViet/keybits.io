'use client'

import Navigation from './Navigation'
import ThemeModeToggle from '@/components/ThemeModeToggle'

interface AppHeaderProps {
  compact?: boolean
}

export default function AppHeader({ compact = false }: AppHeaderProps) {
  return (
    <header
      className={`px-4 ${compact ? 'h-14' : 'h-16'} flex border border-input bg-background content-center`}
    >
      {compact ? null : <Navigation />}
      <div className="ml-auto flex self-center">
        <ThemeModeToggle />
      </div>
    </header>
  )
}
