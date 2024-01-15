'use client'

import { FormEventHandler, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tree, TreeBranch, TreeLeaf } from '@/components/ui/tree'

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
      <Tree>
        <TreeBranch value={'0'} title="Folder">
          <TreeLeaf>Deep Inner File</TreeLeaf>
          <TreeBranch value={'5'} title="Folder">
            <TreeLeaf>Deep Inner File</TreeLeaf>
          </TreeBranch>
        </TreeBranch>
        <TreeLeaf>File in Root</TreeLeaf>
        <TreeBranch value={'1'} title="Folder">
          <TreeLeaf>File</TreeLeaf>
        </TreeBranch>
      </Tree>
    </>
  )
}
