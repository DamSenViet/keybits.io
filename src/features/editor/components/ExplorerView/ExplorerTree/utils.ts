import { Key } from 'react'
import { Active, Over } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Coordinates } from '@dnd-kit/utilities'
import { clamp } from 'lodash'
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
  const activeIndex = flatItems.findIndex((item) => getId(item) === activeId)
  const overIndex = flatItems.findIndex((item) => getId(item) === overId)
  const insertIndex =
    activeIndex === overIndex
      ? overIndex
      : dropPosition === 'before'
        ? overIndex - Number(activeIndex < overIndex)
        : overIndex + Number(activeIndex > overIndex)

  const newItems = arrayMove(flatItems, activeIndex, insertIndex)
  const newActiveIndex = newItems.findIndex((item) => getId(item) === activeId)
  const activeItem = newItems[newActiveIndex]
  const prevItem = newItems[newActiveIndex - 1]
  const nextItem = newItems[newActiveIndex + 1]
  const dragDepth = Math.floor(offset / indentationWidth)
  // we use a projected depth so that we can carry on the current depth
  // as we drag the item around, makes for more intuitive vertical dragging
  const projectedDepth = getDepth(activeItem) + dragDepth

  // compute possible depth by comparing the simulated previous and next items
  // if we're allowed to nest, add 1 more to the possible previous depth
  const canHaveChildren = Boolean(prevItem && getChildren(prevItem))
  const addPossPrevDepth = canHaveChildren ? 1 : 0
  const prevDepth = prevItem ? getDepth(prevItem) + addPossPrevDepth : 0
  const nextDepth = nextItem ? getDepth(nextItem) : 0
  const depth = clamp(
    projectedDepth,
    Math.min(prevDepth, nextDepth),
    Math.max(prevDepth, nextDepth)
  )

  function getParentId() {
    if (depth === 0 || !prevItem) return undefined
    if (depth === getDepth(prevItem)) return getId(getParent(prevItem)!)
    if (depth > getDepth(prevItem)) return getId(prevItem)
    // find the parent of our active item in the new position by looking behind
    // array using the active item as the divider
    const newParent = newItems
      .slice(0, newActiveIndex)
      .reverse()
      .find((item) => getDepth(item) === depth - 1)
    return newParent ? getId(newParent) : undefined
  }

  return {
    depth,
    parentId: getParentId(),
  }
}

/** Computes the difference beteween the draggable initial and transform (overlay) */
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
