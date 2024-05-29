import { useContext, Context, useMemo, useCallback } from 'react'
import { TreeContextValue } from '../types'

export default function useTreeItem<TItem>(
  TreeContext: Context<TreeContextValue<TItem>>,
  item: TItem
) {
  const {
    getItemId,
    setExpandedIds,
    uniqExpandedIds,
    uniqSelectedIds,
    idToParent,
    idToChildren,
    idToVisible,
    idToDepth,
    idToA11y,
  } = useContext(TreeContext)

  const itemId = getItemId(item)

  const toggleExpanded = useCallback(() => {
    const copy = new Set(uniqExpandedIds)
    if (copy.has(itemId)) copy.delete(itemId)
    else copy.add(itemId)
    setExpandedIds([...copy.values()])
  }, [itemId, uniqExpandedIds, setExpandedIds])

  const shortcuts = useMemo(() => {
    const children = idToChildren.get(itemId)
    const visibleChildren = children
      ? children.filter((item) => idToVisible.get(getItemId(item)))
      : undefined
    return {
      isExpanded: uniqExpandedIds.has(itemId),
      toggleExpanded,
      isSelected: uniqSelectedIds.has(itemId),
      parent: idToParent.get(itemId),
      children,
      visibleChildren,
      depth: idToDepth.get(itemId) ?? 0,
      attributes: idToA11y.get(itemId) ?? {},
    }
  }, [
    itemId,
    uniqExpandedIds,
    uniqSelectedIds,
    idToParent,
    idToChildren,
    idToA11y,
    idToDepth,
    idToVisible,
    toggleExpanded,
  ])

  return shortcuts
}
