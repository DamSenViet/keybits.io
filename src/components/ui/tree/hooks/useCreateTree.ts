import { useMemo, HTMLAttributes, Key, useCallback } from 'react'
import { useUncontrolled } from '@mantine/hooks'
import { isUndefined, negate, pickBy } from 'lodash'
import { TreeContextValue } from '../contexts/TreeContext'
import { TreeItemA11yAttributes } from '../types/ui'
import { TreeNode } from '../types/ui'
import { each, flattenTree } from '../utils/traversal'

export interface Options {
  // not sure if we want to make this a subset or not...
  // filteredItems?: TItem[]
  // expansion
  expandedIds?: Key[]
  defaultExpandedIds?: Key[]
  onExpandedIdsChange?: (ids: Key[]) => void
  // selection
  multiSelectable?: boolean
  selectedIds?: Key[]
  defaultSelectedIds?: Key[]
  onSelectedIdsChange?: (ids: Key[]) => void
}

export default function useCreateTree(
  items: TreeNode[],
  {
    // filteredItems = items,
    expandedIds,
    defaultExpandedIds,
    onExpandedIdsChange,
    multiSelectable = false,
    selectedIds,
    defaultSelectedIds,
    onSelectedIdsChange,
  }: Partial<Options>
) {
  const getChildren = useCallback((item: TreeNode) => item.children, [])

  // need to keep track of last focused
  // by default we should focus the first element
  const [focusedId] = useUncontrolled<Key>({ finalValue: '' })

  const [resolvedExpandedIds, setResolvedExpandedIds] = useUncontrolled<Key[]>(
    pickBy(
      {
        value: expandedIds,
        defaultValue: defaultExpandedIds,
        finalValue: [] as Key[],
        onChange: onExpandedIdsChange,
      },
      negate(isUndefined)
    )
  )

  const uniqExpandedIds = useMemo(
    () => new Set(resolvedExpandedIds),
    [resolvedExpandedIds]
  )

  const [resolvedSelectedIds, setResolvedSelectedIds] = useUncontrolled<Key[]>(
    pickBy(
      {
        value: selectedIds,
        defaultValue: defaultSelectedIds,
        onChange: onSelectedIdsChange,
      },
      negate(isUndefined)
    )
  )

  const uniqSelectedIds = useMemo(
    () => new Set(resolvedSelectedIds),
    [resolvedSelectedIds]
  )

  const { idToItem, idToParent, idToChildren, idToDepth } = useMemo(() => {
    const idToItem: TreeContextValue['idToItem'] = new Map()
    const idToParent: TreeContextValue['idToParent'] = new Map()
    const idToChildren: TreeContextValue['idToChildren'] = new Map()
    const idToDepth = new Map<Key, number>()

    each(items, getChildren, (item, parent, { depth }) => {
      const itemId = item.id
      const children = item.children
      idToItem.set(itemId, item)
      idToParent.set(itemId, parent)
      idToChildren.set(itemId, children)
      idToDepth.set(itemId, depth)
    })

    return {
      idToItem,
      idToParent,
      idToChildren,
      idToDepth,
    }
  }, [items])

  const idToVisible = useMemo(() => {
    // don't care about visible children
    const idToVisible: TreeContextValue['idToVisible'] = new Map()
    // sort by ascending depth...
    const itemIds = [...idToItem.keys()].sort(
      (a, b) => idToDepth.get(a)! - idToDepth.get(b)!
    )

    for (const itemId of itemIds) {
      const parent = idToParent.get(itemId)
      const isPartOfFiltrate = true
      if (isUndefined(parent)) {
        // top level items
        idToVisible.set(itemId, isPartOfFiltrate)
      } else {
        // item is  visible when the item is part of the filtrate nad parent is visible & expanded
        const parentId = parent.id
        if (!idToVisible.get(parentId)) idToVisible.set(itemId, false)
        else
          idToVisible.set(
            itemId,
            uniqExpandedIds.has(parentId) && isPartOfFiltrate
          )
      }
    }

    return idToVisible
  }, [uniqExpandedIds, idToItem, idToParent, idToDepth])

  const idToA11y = useMemo(() => {
    const idToA11y: TreeContextValue['idToA11y'] = new Map()
    for (const id of idToChildren.keys()) {
      const childNodes = idToChildren.get(id)
      const parent = idToParent.get(id)
      const parentChildItems = parent
        ? idToChildren.get(parent.id) ?? []
        : items
      const a11y: TreeItemA11yAttributes = {
        'aria-expanded': uniqExpandedIds.has(id),
        'aria-selected': uniqSelectedIds.has(id),
        tabIndex: id === focusedId ? -1 : 0,
        ...(childNodes ? { 'aria-setsize': childNodes.length } : {}),
        'aria-posinset': parentChildItems.indexOf(idToItem.get(id)!),
        'aria-level': idToDepth.get(id)!,
      }
      idToA11y.set(id, a11y)
    }
    return idToA11y
  }, [
    focusedId,
    uniqExpandedIds,
    uniqSelectedIds,
    idToItem,
    idToParent,
    idToChildren,
    idToDepth,
  ])

  const flatItems = useMemo(
    () => flattenTree(items, getChildren, 'preorder'),
    items
  )

  // helpful for constructing variable depth insert projections
  const visibleFlatItems = useMemo(
    () => flatItems.filter((item) => idToVisible.get(item.id)),
    [flatItems, idToVisible]
  )

  const contextValue: TreeContextValue = {
    expandedIds: resolvedExpandedIds,
    setExpandedIds: setResolvedExpandedIds,
    uniqExpandedIds: uniqExpandedIds,
    multiSelectable,
    selectedIds: resolvedSelectedIds,
    setSelectedIds: setResolvedSelectedIds,
    uniqSelectedIds: uniqSelectedIds,
    idToItem,
    idToParent,
    idToChildren,
    idToVisible,
    idToDepth,
    idToA11y,
    flatItems,
    visibleFlatItems,
  }

  // produce aria for root list
  const rootAttributes: HTMLAttributes<HTMLUListElement> = {
    role: 'tree',
    'aria-multiselectable': multiSelectable,
  }

  return {
    contextValue,
    rootAttributes,
  }
}
