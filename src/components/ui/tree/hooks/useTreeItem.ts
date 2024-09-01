import { useContext, Context, useMemo, useCallback, Key } from 'react'
import { isUndefined, without } from 'lodash'
import { TreeContextValue } from '../contexts/TreeContext'
import { TreeNode } from '../types/ui'

export default function useTreeItem(
  TreeContext: Context<TreeContextValue>,
  item: TreeNode
) {
  const {
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

  const toggleExpanded = useCallback(() => {
    const copy = new Set(uniqExpandedIds)
    if (copy.has(item.id)) copy.delete(item.id)
    else copy.add(item.id)
    setExpandedIds([...copy.values()])
  }, [item.id, uniqExpandedIds, setExpandedIds])

  const isSelected = useMemo(
    () => uniqSelectedIds.has(item.id),
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
    const id = item.id
    const children = idToChildren.get(item.id)
    const canHaveChildren = !isUndefined(children)
    const visibleChildren = children
      ? children.filter((item) => idToVisible.get(item.id))
      : undefined
    return {
      id,
      isExpanded: uniqExpandedIds.has(item.id),
      toggleExpanded,
      isSelected,
      deselect,
      select,
      parent: idToParent.get(item.id),
      canHaveChildren,
      children,
      visibleChildren,
      depth: idToDepth.get(item.id) ?? 0,
      attributes: idToA11y.get(item.id) ?? {},
    }
  }, [
    item.id,
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
