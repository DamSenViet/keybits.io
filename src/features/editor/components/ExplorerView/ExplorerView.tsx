'use client'

import { useState, forwardRef, Key } from 'react'
import { reduce, ListIterator, List } from 'lodash'
import { Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ExplorerNode } from './ExplorerTree/ExplorerNode'
import Tree from './ExplorerTree/Tree'

const tree: ExplorerNode = {
  name: 'Root',
  children: [
    {
      name: 'Item A',
      children: [],
    },
    {
      name: 'Item B',
      children: [
        {
          name: 'Item C',
        },
        {
          name: 'Item D',
          children: [
            {
              name: 'Item E',
            },
            {
              name: 'Item F',
              children: [
                {
                  name: 'Item G',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Item H',
      children: [],
    },
    {
      name: 'Item I',
    },
    {
      name: 'Item J',
      children: [],
    },
    {
      name: 'Item K',
    },
  ],
}

const filterTree = (
  nodes: ExplorerNode[],
  predicate: ListIterator<ExplorerNode, boolean>
) => {
  const getNodes = (
    prev: ExplorerNode[],
    curr: ExplorerNode,
    index: number,
    list: List<ExplorerNode>
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
