import Link from 'next/link'
import { Hammer } from 'lucide-react'
import ThemeModeToggle from '@/components/ThemeModeToggle'
import MainNavigation from './MainNavigation'
import MobileNavigation from './MobileNavigation'

interface AppHeaderProps {}

export default function AppHeader(_props: AppHeaderProps) {
  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border/40`}>
      <div
        className={`container h-14 max-w-screen-2xl flex content-center items-center px-4 sm:px-6`}
      >
        <Link href="/" className="mr-4 flex space-x-2">
          <Hammer className="stroke-1" />
          <span className="sm:inline-block font-bold">keybits</span>
        </Link>
        <div className="hidden sm:block">
          <MainNavigation />
        </div>
        <div className="block ml-auto sm:hidden">
          <MobileNavigation />
        </div>
        <div className="flex self-center sm:ml-auto">
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  )
}
