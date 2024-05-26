import { useMemo, HTMLAttributes, Key, useEffect } from 'react'
import { useUncontrolled } from '@mantine/hooks'
import { noop } from 'lodash'
import { TreeContextValue, TreeItemA11yAttributes } from '../types'
import { each } from '../utils/traversal'

export interface Options<TItem> {
  // not sure if we want to make this a subset or not...
  filteredItems?: TItem[]
  // expansion
  expandedItems?: TItem[]
  onExpandedItemsChange?: (item: TItem[]) => void
  // selection
  multiSelectable?: boolean
  selectedItems?: TItem[]
  onSelectedItemsChange?: (item: TItem[]) => void
}

export default function useCreateTree<TItem>(
  items: TItem[],
  getId: (item: TItem) => Key,
  getChildren: (item: TItem) => TItem[] | undefined,
  {
    filteredItems = items,
    expandedItems,
    onExpandedItemsChange,
    multiSelectable = false,
    selectedItems,
    onSelectedItemsChange,
  }: Partial<Options<TItem>>
) {
  // need to keep track of last focused
  // by default we should focus the first element
  const focused = useUncontrolled({ finalValue: undefined })

  const [resolvedExpanded, setResolvedExpanded] = useUncontrolled<TItem[]>({
    // value: expandedItems,
    finalValue: [],
    onChange: onExpandedItemsChange,
  })

  useEffect(() => {
    console.log(resolvedExpanded)
  }, [resolvedExpanded])

  const uniqExpandedItems = useMemo(
    () => new Set<TItem>(resolvedExpanded),
    [resolvedExpanded]
  )

  const [resolvedSelected, setResolvedSelected] = useUncontrolled({
    value: selectedItems,
    onChange: onSelectedItemsChange,
  })

  const uniqSelectedItems = useMemo(
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

      return [nodeToParent, nodeToChildren, nodeToFilteredChildren, nodeToDepth]
    }, [items, getChildren])

  const nodeToA11y = useMemo(() => {
    const nodeToA11y = new Map<TItem, TreeItemA11yAttributes>()
    for (const node of nodeToChildren.keys()) {
      const childNodes = nodeToChildren.get(node)
      const parent = nodeToParent.get(node)
      const parentChildNodes = parent ? nodeToChildren.get(parent) ?? [] : items
      const a11y: TreeItemA11yAttributes = {
        'aria-expanded': uniqExpandedItems.has(node),
        'aria-selected': uniqSelectedItems.has(node),
        tabIndex: node === focused ? -1 : 0,
        ...(childNodes ? { 'aria-setsize': childNodes.length } : {}),
        'aria-posinset': parentChildNodes.indexOf(node),
        'aria-level': nodeToDepth.get(node)!,
      }
      nodeToA11y.set(node, a11y)
    }
    return nodeToA11y
  }, [nodeToParent, nodeToChildren, nodeToDepth, uniqExpandedItems])

  const contextValue: TreeContextValue<TItem> = {
    getItemId: getId,
    getItemChildren: getChildren,
    setExpandedItems: setResolvedExpanded,
    uniqExpandedItems,
    uniqSelectedItems,
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
