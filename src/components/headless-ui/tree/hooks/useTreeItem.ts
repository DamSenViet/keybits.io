import { useContext, Context, useMemo, useCallback, Key } from 'react'
import { isUndefined, without } from 'lodash'
import { TreeContextValue } from '../types'

export default function useTreeItem<TItem>(
  TreeContext: Context<TreeContextValue<TItem>>,
  item: TItem
) {
  const {
    getId,
    setExpandedIds,
    uniqExpandedIds,
    multiSelectable,
    selectedIds,
    setSelectedIds,
    uniqSelectedIds,
    idToParent,
    idToChildren,
    idToVisible,
    idToDepth,
    idToA11y,
  } = useContext(TreeContext)

  const itemId = getId(item)

  const toggleExpanded = useCallback(() => {
    const copy = new Set(uniqExpandedIds)
    if (copy.has(itemId)) copy.delete(itemId)
    else copy.add(itemId)
    setExpandedIds([...copy.values()])
  }, [itemId, uniqExpandedIds, setExpandedIds])

  const isSelected = useMemo(
    () => uniqSelectedIds.has(itemId),
    [uniqSelectedIds]
  )

  const select = useCallback(
    (id: Key) => {
      if (isSelected) return
      if (multiSelectable) setSelectedIds([...selectedIds, id])
      else setSelectedIds([id])
      console.log(`selected ${id}`)
    },
    [multiSelectable, selectedIds, isSelected]
  )

  const deselect = useCallback(
    (id: Key) => {
      if (!isSelected) return
      if (multiSelectable) setSelectedIds(without(selectedIds, id))
      else setSelectedIds([])
      console.log(`deselected ${id}`)
    },
    [multiSelectable, isSelected, selectedIds]
  )

  const shortcuts = useMemo(() => {
    const id = getId(item)
    const children = idToChildren.get(itemId)
    const canHaveChildren = !isUndefined(children)
    const visibleChildren = children
      ? children.filter((item) => idToVisible.get(getId(item)))
      : undefined
    return {
      id,
      isExpanded: uniqExpandedIds.has(itemId),
      toggleExpanded,
      isSelected,
      deselect,
      select,
      parent: idToParent.get(itemId),
      canHaveChildren,
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
