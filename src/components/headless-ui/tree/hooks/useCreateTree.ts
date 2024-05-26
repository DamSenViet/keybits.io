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
  // filters
  filtered?: TItem[]
}

export default function useCreateTree<TItem>(
  items: TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  options: Partial<Options<TItem>> = {
    selected: [],
    expanded: [],
    filtered: [],
    multiSelectable: false,
  }
) {
  // need to keep track of last focused
  // by default we should focus the first element
  const focused = useUncontrolled({ finalValue: undefined })

  const [resolvedExpanded, setResolvedExpanded] = useUncontrolled({
    value: options.expanded ?? [],
    onChange: options.onExpandedChange,
  })

  const uniqExpanded = useMemo(
    () => new Set<TItem>(resolvedExpanded),
    [resolvedExpanded]
  )

  const [resolvedSelected, setResolvedSelected] = useUncontrolled({
    value: options.selected ?? [],
    onChange: options.onSelectedChange,
  })

  const uniqSelected = useMemo(
    () => new Set<TItem>(resolvedSelected),
    [resolvedSelected]
  )

  const [nodeToParent, nodeToChildren, nodeToDepth] = useMemo(() => {
    const nodeToParent = new Map<TItem, TItem | undefined>()
    const nodeToChildren = new Map<TItem, TItem[] | undefined>()
    const nodeToDepth = new Map<TItem, number>()

    each(items, getChildren, (node, parent, { depth }) => {
      nodeToParent.set(node, parent)
      nodeToChildren.set(node, getChildren(node))
      nodeToDepth.set(node, depth)
    })

    return [nodeToParent, nodeToChildren, nodeToDepth]
  }, [items, getChildren])

  const nodeToA11y = useMemo(() => {
    const nodeToA11y = new Map<TItem, TreeItemA11yAttributes>()
    for (const node of nodeToChildren.keys()) {
      const a11y: TreeItemA11yAttributes = {
        'aria-expanded': uniqExpanded.has(node),
        'aria-selected': uniqSelected.has(node),
        tabIndex: node === focused ? -1 : 0,
        'aria-setsize': nodeToChildren.get(node)!.length,
        'aria-posinset':
          nodeToChildren.get(nodeToParent.get(node)!)!.indexOf(node) + 1,
        'aria-level': nodeToDepth.get(node)!,
      }
      nodeToA11y.set(node, a11y)
    }
    return nodeToA11y
  }, [nodeToParent, nodeToChildren, nodeToDepth, uniqExpanded])

  const contextValue: TreeContextValue<TItem> = {
    nodeToChildren,
    nodeToParent,
    nodeToDepth,
    nodeToA11y,
  }

  // produce aria for root list
  const rootA11y: HTMLAttributes<HTMLUListElement> = {
    role: 'tree',
    'aria-multiselectable': options.multiSelectable,
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
