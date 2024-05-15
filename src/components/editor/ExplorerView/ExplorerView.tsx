'use client'

import {
  FormEventHandler,
  useState,
  forwardRef,
  useMemo,
  useCallback,
} from 'react'
import { reduce, ListIterator, List } from 'lodash'
import Tree from '@/components/ui/data-tree/Tree'
import { Input } from '@/components/ui/input'
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
        {
          name: 'Sibling of Nested in  B',
          children: [
            {
              name: 'Deeply Nested',
            },
          ],
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

    const searchPredicate = useCallback(
      (node: TreeNode) => node.name.indexOf(search) > -1,
      [search]
    )

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

    const filteredTree = useMemo(
      () => filterTree([tree], searchPredicate),
      [tree, searchPredicate]
    )

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
        <Tree
          nodes={filteredTree}
          getNodeId={(node) => node.name}
          getNodeChildren={(node) => node.children ?? []}
          nodeTitleComponent={(node) => <div>{node.node.name}</div>}
          expanded={['Root', 'Folder B', 'Sibling of Nested in  B']}
        />
      </div>
    )
  }
)

export default ExplorerView
