'use client'

import {
  FormEventHandler,
  useState,
  forwardRef,
  useMemo,
  useCallback,
  Key,
} from 'react'
import { reduce, ListIterator, List } from 'lodash'
import { Input } from '@/components/ui/input'
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
    const [search, setSearch] = useState('')

    const searchPredicate = useCallback(
      (node: ExplorerNode) =>
        search === ''
          ? true
          : node.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
      [search]
    )

    const filteredTree = useMemo(
      () => filterTree([root] ?? [], searchPredicate),
      [root, searchPredicate]
    )

    const handleSearch: FormEventHandler<HTMLInputElement> = (event) =>
      setSearch(event.currentTarget.value)

    return (
      <div ref={ref} className={cn('flex-grow', className)}>
        <Input
          className="mb-6 text-xs mx-0"
          placeholder="Search"
          onInput={handleSearch}
          value={search}
        />
        <Tree
          className="relative"
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
