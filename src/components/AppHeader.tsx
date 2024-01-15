import ThemeModeToggle from './ThemeModeToggle'

interface AppHeaderProps {
  compact?: boolean
}

export default function AppHeader({ compact = false }: AppHeaderProps) {
  return (
    <header className={`px-4 ${compact ? 'py-2' : 'py-4'} flex`}>
      <div className="ml-auto">
        <ThemeModeToggle />
      </div>
    </header>
  )
}
