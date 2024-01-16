'use client'

import { FormEventHandler, useState } from 'react'
import { Input } from '@/components/ui/input'
import Explorer from './Explorer'

export default function ExplorerView() {
  const [search, setSearch] = useState('')

  const handleSearch: FormEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.currentTarget.value)

  return (
    <>
      <Input
        className="mb-6 text-xs"
        placeholder="Search"
        onInput={handleSearch}
        value={search}
      />
      <Explorer />
    </>
  )
}
