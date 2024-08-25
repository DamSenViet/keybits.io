import { Key } from 'react'
import { Active, Over } from '@dnd-kit/core'
import { Coordinates } from '@dnd-kit/utilities'
import { clamp, isUndefined } from 'lodash'
import { DropPosition } from './types/projection'

export function getDropPosition(active: Active, over: Over): DropPosition {
  const activeRect = active.rect.current.translated!
  const overRect = over.rect
  const activeCenterY = activeRect.top + activeRect.height / 2
  const overCenterY = overRect.top + overRect.height / 2
  if (activeCenterY > overCenterY) return 'after'
  else return 'before'
}

/**
 * Calculates projected drop depth & target parent for the drop operation.
 * @param args
 * @param args.flatItems Level order representation of the tree
 * @returns A representation of the projected drop operation or null if the drop is not valid.
 */
export function getProjectedDrop<TItem>({
  flatItems,
  activeId,
  overId,
  offset,
  indentationWidth,
  dropPosition = 'after',
  getId,
  getDepth,
  getParent,
  getChildren,
}: {
  flatItems: TItem[]
  activeId: Key
  overId: Key
  offset: number
  indentationWidth: number
  dropPosition: DropPosition
  getId: (item: TItem) => Key
  getDepth: (item: TItem) => number
  getParent: (item: TItem) => TItem | undefined
  getChildren: (item: TItem) => TItem[] | undefined
}) {
  function isAncestor(item: TItem | undefined, ancestor: TItem | undefined) {
    if (isUndefined(item)) return false
    let parent = getParent(item)
    while (!isUndefined(parent)) {
      if (parent === ancestor) return true
      parent = getParent(parent)
    }
    return false
  }

  const activeIndex = flatItems.findIndex((item) => getId(item) === activeId)
  const overIndex = flatItems.findIndex((item) => getId(item) === overId)
  // index at which we'll push all other item from this position forward
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
  const parentId = parentItem ? getId(parentItem) : undefined

  // invalid drop: projected parent can't be descendant of the active item
  if (parentId === activeId || isAncestor(parentItem, activeItem)) return null

  return {
    depth,
    parentId,
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
