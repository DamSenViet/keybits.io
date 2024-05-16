'use client'

import {
  FormEventHandler,
  useState,
  forwardRef,
  useMemo,
  useCallback,
} from 'react'
import { reduce, ListIterator, List } from 'lodash'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import ExplorerTree, {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerTree'

const tree: ExplorerNode = {
  name: 'Root',
  children: [
    {
      name: 'Folder A',
      children: [],
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
            { name: 'Super duper long name in a nested item' },
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
      (node: ExplorerNode) =>
        node.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
      [search]
    )

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

    const filteredTree = useMemo(
      () => filterTree(tree.children ?? [], searchPredicate),
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
        <ExplorerTree
          nodes={filteredTree}
          getNodeId={getExplorerNodeId}
          getNodeChildren={getExplorerNodeChildren}
        />
      </div>
    )
  }
)

export default ExplorerView
