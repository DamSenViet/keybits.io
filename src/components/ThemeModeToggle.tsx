'use client'

import { useState, useMemo } from 'react'
import { useMount } from 'react-use'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

function ThemeModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const Icon = useMemo(() => (theme === 'light' ? Sun : Moon), [theme])
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
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      {icon}
    </Button>
  )
}

export default ThemeModeToggle
