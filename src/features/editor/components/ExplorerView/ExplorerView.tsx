'use client'

import { useState, forwardRef, Key, useCallback } from 'react'
import { reduce, ListIterator, List } from 'lodash'
import { Ellipsis } from 'lucide-react'
import { useImmer } from 'use-immer'
import { Button } from '@/components/ui/button'
import { DropEvent, TreeNode } from '@/components/ui/tree'
import { Tree } from '@/components/ui/tree'
import { find } from '@/components/ui/tree/utils/traversal'
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
    const [root, setRoot] = useImmer(tree)
    const [expandedIds, setExpandedIds] = useState<Key[]>([])
    const [selectedIds, setSelectedIds] = useState<Key[]>([])

    const onDrop = useCallback((dropEvent: DropEvent) => {
      console.log(dropEvent)
      setRoot((root) => {
        // remove active item from its parent
        const activeItem = find(
          root,
          (item) => item.children,
          (item) => item.id === dropEvent.activeId
        )!

        const activeParentItem =
          find(
            root,
            (item) => item.children,
            (item) => item.id === dropEvent.activeParentId
          ) || root

        const activeItemIndex = activeParentItem.children?.indexOf(activeItem)!
        activeParentItem.children?.splice(activeItemIndex, 1)

        // find drop parent id & drop position
        const dropParentItem =
          find(
            root,
            (item) => item.children,
            (item) => item.id === dropEvent.dropParentId
          ) || root

        const dropIndex = dropParentItem.children?.findIndex(
          (item) => item.id === dropEvent.relativeDropId
        )!
        let adjustedDropIndex = dropIndex
        if (adjustedDropIndex >= 0)
          adjustedDropIndex +=
            dropEvent.relativeDropPosition === 'after' ? 1 : 0

        // perform the insert with the active item
        dropParentItem.children?.splice(adjustedDropIndex, 0, activeItem)
      })
    }, [])

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
          onDrop={onDrop}
        />
      </div>
    )
  }
)

export default ExplorerView
