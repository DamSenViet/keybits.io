'use client'

import { useState, useMemo } from 'react'
import { useMount } from 'react-use'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

function ThemeModeToggle() {
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

  useMount(() => {
    setMounted(true)
  })

  return (
    <Button
      variant={'outline'}
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      {icon}
    </Button>
  )
}

export default ThemeModeToggle
