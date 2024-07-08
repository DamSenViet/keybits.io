'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'

export interface ThemeModeToggleProps {
  className?: string
}

function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const Icon = useMemo(
    () => (resolvedTheme === 'light' ? Sun : Moon),
    [resolvedTheme]
  )
  const icon = useMemo(
    () => (!mounted ? null : <Icon className="h-4 w-4" />),
    [mounted, Icon]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Change theme mode"
          variant={'outline'}
          className={cn('size-9 px-0', className)}
        >
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
