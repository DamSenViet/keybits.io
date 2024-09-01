'use client'

import { useState, forwardRef, Key } from 'react'
import { reduce, ListIterator, List } from 'lodash'
import { Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TreeNode } from '@/components/ui/tree'
import { Tree } from '@/components/ui/tree'
import { cn } from '@/lib/utils'

const tree: TreeNode = {
  id: 'Root',
  label: 'Root',
  children: [
    {
      id: 'Item A',
      label: 'Item A',
      children: [],
    },
    {
      id: 'Item B',
      label: 'Item B',
      children: [
        {
          id: 'Item C',
          label: 'Item C',
        },
        {
          id: 'Item D',
          label: 'Item D',
          children: [
            {
              id: 'Item E',
              label: 'Item E',
            },
            {
              id: 'Item F',
              label: 'Item F',
              children: [
                {
                  id: 'Item G',
                  label: 'Item G',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'Item H',
      label: 'Item H',
      children: [],
    },
    {
      id: 'Item I',
      label: 'Item I',
    },
    {
      id: 'Item J',
      label: 'Item I',
      children: [],
    },
    {
      id: 'Item K',
      label: 'Item I',
    },
  ],
}

const filterTree = (
  nodes: TreeNode[],
  predicate: ListIterator<TreeNode, boolean>
) => {
  const getNodes = (
    prev: TreeNode[],
    curr: TreeNode,
    index: number,
    list: List<TreeNode>
  ) => {
    if (predicate(curr, index, list)) {
      prev.push(curr)
      return prev
    }
    if (curr.children) {
      const nodes = reduce(curr.children, getNodes, [])
      if (nodes.length) prev.push({ ...curr, children: nodes })
    }
    return prev
  }
  return reduce(nodes, getNodes, [])
}

interface ExplorerViewProps {
  className?: string
}

const ExplorerView = forwardRef<HTMLDivElement, ExplorerViewProps>(
  ({ className }, ref) => {
    const [root, setRoot] = useState(tree)
    const [expandedIds, setExpandedIds] = useState<Key[]>([])
    const [selectedIds, setSelectedIds] = useState<Key[]>([])

    return (
      <div ref={ref} className={cn('flex-grow flex flex-col', className)}>
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs">Explorer</div>
          <Button variant="ghost" className="h-6 w-6 p-0 rounded-full">
            <Ellipsis size={16} />
          </Button>
        </div>
        <Tree
          className="relative flex-grow"
          items={root.children!}
          expandedIds={expandedIds}
          onExpandedIdsChange={setExpandedIds}
          selectedIds={selectedIds}
          onSelectedIdsChange={setSelectedIds}
        />
      </div>
    )
  }
)

export default ExplorerView
