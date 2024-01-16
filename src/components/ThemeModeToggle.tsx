'use client'

import { useState, useMemo } from 'react'
import { useMount } from 'react-use'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'

function ThemeModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme, theme } = useTheme()

  const Icon = useMemo(
    () => (resolvedTheme === 'light' ? Sun : Moon),
    [resolvedTheme]
  )
  const icon = useMemo(
    () => (!mounted ? null : <Icon className="h-4 w-4" />),
    [mounted, Icon]
  )

  useMount(() => {
    setMounted(true)
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Change theme mode" variant={'outline'}>
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2" align="end">
        <div className="grid">
          {['light', 'dark', 'system'].map((theme) => (
            <Button
              key={theme}
              variant="ghost"
              className="h-8 text-sm font-light justify-start capitalize"
              onClick={() => setTheme(theme)}
            >
              {theme}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeModeToggle
