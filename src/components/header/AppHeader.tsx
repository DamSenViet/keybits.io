import Link from 'next/link'
import { Github, Hammer } from 'lucide-react'
import ThemeModeToggle from '@/components/ThemeModeToggle'
import MainNavigation from './MainNavigation'
import MobileNavigation from './MobileNavigation'

interface AppHeaderProps {
  compact?: boolean
}

export default function AppHeader({ compact = false }: AppHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 border-b border-border/40`}
    >
      <div
        className={`container ${compact ? 'h-14' : 'h-16'} max-w-screen-2xl flex content-center items-center`}
      >
        <Link href="/" className="mr-4 flex space-x-2">
          <Hammer className="stroke-1" />
          <span className="hidden sm:inline-block font-bold">keybits/ui</span>
        </Link>
        <MainNavigation />
        <MobileNavigation />
        <div className="ml-auto flex self-center">
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  )
}
