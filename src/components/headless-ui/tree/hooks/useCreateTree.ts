import { useMemo, HTMLAttributes } from 'react'
import { useUncontrolled } from '@mantine/hooks'
import { TreeContextValue, TreeItemA11yAttributes } from '../types'
import { each } from '../utils/traversal'

export interface Options<TItem> {
  // expansion
  expanded?: TItem[]
  onExpandedChange?: (item: TItem[]) => void
  // selection
  multiSelectable?: boolean
  selected?: TItem[]
  onSelectedChange?: (item: TItem[]) => void
  filtered?: TItem[]
}

export default function useCreateTree<TItem>(
  items: TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  {
    selected,
    expanded,
    // filtered should be a flattened set of items
    filtered = items,
    multiSelectable = false,
  }: Partial<Options<TItem>>
) {
  // need to keep track of last focused
  // by default we should focus the first element
  const focused = useUncontrolled({ finalValue: undefined })

  const [resolvedExpanded, setResolvedExpanded] = useUncontrolled({
    value: expanded ?? [],
    // onChange: onExpandedChange,
  })

  const uniqExpanded = useMemo(
    () => new Set<TItem>(resolvedExpanded),
    [resolvedExpanded]
  )

  const [resolvedSelected, setResolvedSelected] = useUncontrolled({
    value: selected ?? [],
    // onChange: onSelectedChange,
  })

  const uniqSelected = useMemo(
    () => new Set<TItem>(resolvedSelected),
    [resolvedSelected]
  )

  const [nodeToParent, nodeToChildren, nodeToFilteredChildren, nodeToDepth] =
    useMemo(() => {
      const nodeToParent = new Map<TItem, TItem | undefined>()
      const nodeToChildren = new Map<TItem, TItem[] | undefined>()
      const nodeToFilteredChildren = new Map<TItem, TItem[] | undefined>()
      const nodeToDepth = new Map<TItem, number>()

      each(items, getChildren, (node, parent, { depth }) => {
        nodeToParent.set(node, parent)
        nodeToChildren.set(node, getChildren(node))
        // nodeToFilteredChildren.set(node)
        nodeToDepth.set(node, depth)
      })

      return [
        nodeToParent,
        nodeToChildren,
        nodeToFilteredChildren,
        nodeToDepth,
        filtered,
      ]
    }, [items, getChildren])

  const nodeToA11y = useMemo(() => {
    const nodeToA11y = new Map<TItem, TreeItemA11yAttributes>()
    for (const node of nodeToChildren.keys()) {
      const a11y: TreeItemA11yAttributes = {
        'aria-expanded': uniqExpanded.has(node),
        'aria-selected': uniqSelected.has(node),
        tabIndex: node === focused ? -1 : 0,
        'aria-setsize': nodeToChildren.get(node)!.length,
        'aria-posinset': 0,
        'aria-level': nodeToDepth.get(node)!,
      }
      nodeToA11y.set(node, a11y)
    }
    return nodeToA11y
  }, [nodeToParent, nodeToChildren, nodeToDepth, uniqExpanded])

  const contextValue: TreeContextValue<TItem> = {
    uniqExpanded,
    uniqSelected,
    nodeToParent,
    nodeToChildren,
    nodeToFilteredChildren,
    nodeToDepth,
    nodeToA11y,
  }

  // produce aria for root list
  const rootA11y: HTMLAttributes<HTMLUListElement> = {
    role: 'tree',
    'aria-multiselectable': multiSelectable,
  }

  return {
    resolvedExpanded,
    setResolvedExpanded,
    resolvedSelected,
    setResolvedSelected,
    contextValue,
    rootA11y,
  }
}
