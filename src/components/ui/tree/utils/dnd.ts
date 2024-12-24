import { Key } from 'react'
import { Active, Over } from '@dnd-kit/core'
import { Coordinates } from '@dnd-kit/utilities'
import { clamp, isUndefined } from 'lodash'
import { DropPosition } from '../types/projection'
import { TreeNode } from '../types/ui'

export function getDropPosition(active: Active, over: Over): DropPosition {
  const activeRect = active.rect.current.translated!
  const overRect = over.rect
  const activeCenterY = activeRect.top + activeRect.height / 2
  const overCenterY = overRect.top + overRect.height / 2
  if (activeCenterY > overCenterY) return 'after'
  else return 'before'
}

interface GetProjectedDropOptions {
  /**
   * Level order representation of the tree.
   */
  flatItems: TreeNode[]
  activeId: Key
  overId: Key
  offset: number
  indentationWidth: number
  dropPosition: DropPosition
  getDepth: (item: TreeNode) => number
  getParent: (item: TreeNode) => TreeNode | undefined
  getChildren: (item: TreeNode) => TreeNode[] | undefined
  /**
   * Whether to apply relative depth to offset. Dragging just vertically will
   * default to the active item's depth first with the offset applied after.
   */
  useRelativeDepth?: boolean
}

/**
 * Calculates projected drop depth & target parent for the drop operation.
 * @param options Calculation dependencies and options.
 * @returns A representation of the projected drop operation or null if the drop is not valid.
 */
export function getProjectedDrop({
  flatItems,
  activeId,
  overId,
  offset,
  indentationWidth,
  dropPosition = 'after',
  getDepth,
  getParent,
  getChildren,
}: GetProjectedDropOptions) {
  function isAncestor(
    item: TreeNode | undefined,
    ancestor: TreeNode | undefined
  ) {
    if (isUndefined(item)) return false
    let parent = getParent(item)
    while (!isUndefined(parent)) {
      if (parent === ancestor) return true
      parent = getParent(parent)
    }
    return false
  }

  const activeIndex = flatItems.findIndex((item) => item.id === activeId)
  const overIndex = flatItems.findIndex((item) => item.id === overId)
  // index at which  we'll push all other item from this position forward
  // acts as our marker for depth compute & divider
  const insertIndex = dropPosition === 'after' ? overIndex + 1 : overIndex
  const activeItem = flatItems[activeIndex]

  const prevItem = flatItems[insertIndex - 1]
  const nextItem = flatItems[insertIndex]

  const dragDepth = Math.floor(offset / indentationWidth)
  // we use a projected depth so that we can carry on the current depth
  // as we drag the item around, makes for more intuitive vertical dragging
  const projectedDepth = getDepth(activeItem) + dragDepth

  // compute possible depth by comparing the simulated previous and next items
  // if we're allowed to nest, add 1 more to the possible previous depth
  const canPrevHaveChildren = Boolean(prevItem && getChildren(prevItem))
  const addPossPrevDepth = canPrevHaveChildren ? 1 : 0
  const prevDepth = prevItem ? getDepth(prevItem) + addPossPrevDepth : 0
  const nextDepth = nextItem ? getDepth(nextItem) : 0

  const minDepth = nextDepth
  const maxDepth = prevDepth
  let depth = clamp(projectedDepth, minDepth, maxDepth)

  // special case to make the indicator more intuitive
  if (isAncestor(prevItem, activeItem) && !isAncestor(nextItem, activeItem)) {
    depth = getDepth(activeItem)
  }

  function getProjectedParent() {
    if (depth === 0 || !prevItem) return undefined
    if (depth === getDepth(prevItem)) return getParent(prevItem)
    if (depth > getDepth(prevItem)) return prevItem
    // find the parent of our active item in the new position by looking behind
    // array using the active item as the divider
    const newParent = flatItems
      .slice(0, insertIndex)
      .reverse()
      .find((item) => getDepth(item) === depth - 1)
    return newParent
  }

  const parentItem = getProjectedParent()
  const parentId = parentItem ? parentItem.id : undefined
  const parentIndex = flatItems.findIndex((item) => item.id === parentId)

  // invalid drop: projected parent can't be descendant of the active item
  // undefined to indicate tree root, null to indicate invalid drop
  if (parentId === activeId || isAncestor(parentItem, activeItem)) return null

  // need to include drop id under the parentId
  // also need to include parent id of the activeId
  // calculate drop position and drop position inside the drop parent
  let relativeDropId: Key | undefined
  let relativeDropPosition: DropPosition = 'before'
  // between the parent id and the over index
  // find the potential direct child to report the relative drop id
  const relSearchStartIndex = parentIndex + 1
  // handle hover over active by expanding search index by 1
  const relSearchEndIndex =
    (dropPosition === 'before' ? insertIndex + 1 : insertIndex) +
    (activeId === overId ? 1 : 0)

  const relativeDropItemCandidates = flatItems
    .slice(relSearchStartIndex, relSearchEndIndex)
    .filter((item) => item.id !== activeId)
    .filter((item) => getParent(item) === parentItem)
    .reverse()
  const relativeDropItem = relativeDropItemCandidates[0]

  if (relativeDropItem) {
    relativeDropId = relativeDropItem.id
    const relativeDropItemIndex = flatItems.indexOf(relativeDropItem)
    if (relativeDropItemIndex >= insertIndex) relativeDropPosition = 'before'
    else relativeDropPosition = 'after'
  }

  return {
    depth,
    parentId,
    // relative drop id and position are DIRECTLY WITHIN the parent id
    relativeDropId,
    relativeDropPosition,
  }
}

/**
 * Computes the difference beteween the overlay initial position and transform position
 * Note: DOES NOT care about the active box of the draggable trigger.
 */
export function getActiveDelta(active: Active): Coordinates {
  if (active.rect.current.initial && active.rect.current.translated) {
    const diff = {
      x: active.rect.current.translated.left - active.rect.current.initial.left,
      y: active.rect.current.translated.top - active.rect.current.initial.top,
    }
    return diff
  }
  return {
    x: 0,
    y: 0,
  }
}
