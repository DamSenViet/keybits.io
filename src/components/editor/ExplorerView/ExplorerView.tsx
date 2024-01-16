'use client'

import { FormEventHandler, useState, forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Explorer from './Explorer'

interface ExplorerViewProps {
  className?: string
}

const ExplorerView = forwardRef<HTMLDivElement, ExplorerViewProps>(
  ({ className }, ref) => {
    const [search, setSearch] = useState('')

    const handleSearch: FormEventHandler<HTMLInputElement> = (event) =>
      setSearch(event.currentTarget.value)

    return (
      <div ref={ref} className={cn('flex-1', className)}>
        <Input
          className="mb-6 text-xs"
          placeholder="Search"
          onInput={handleSearch}
          value={search}
        />
        <Explorer />
      </div>
    )
  }
)

export default ExplorerView
