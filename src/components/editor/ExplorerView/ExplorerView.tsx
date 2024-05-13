'use client'

import { FormEventHandler, useState, forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import Tree from '@/components/ui/richtree/Tree'
import { cn } from '@/lib/utils'

interface TreeNode {
  name: string
  children?: TreeNode[]
}

const tree: TreeNode = {
  name: 'Root',
  children: [
    {
      name: 'Folder A',
    },
    {
      name: 'Folder B',
      children: [
        {
          name: 'Nested In B',
        },
      ],
    },
  ],
}

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
        <Tree<TreeNode>
          node={tree}
          getNodeId={(node) => node.name}
          getNodeChildren={(node) => node.children ?? []}
          nodeHeaderComponent={(node) => <span>{node.node.name}</span>}
        />
      </div>
    )
  }
)

export default ExplorerView
