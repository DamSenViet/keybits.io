import { Key } from 'react'
import { Active, Over } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Coordinates } from '@dnd-kit/utilities'
import { clamp } from 'lodash'

export type InsertPosition = 'before' | 'after'

export function getInsertPosition(active: Active, over: Over): InsertPosition {
  const activeRect = active.rect.current.translated!
  const overRect = over.rect
  const activeCenterY = activeRect.top + activeRect.height / 2
  const overCenterY = overRect.top + overRect.height / 2
  if (activeCenterY > overCenterY) return 'after'
  else return 'before'
}

/**
 * Calculates projected insert depth & target parent for the insert operation.
 */
export function getProjected<TItem>({
  flatItems,
  activeId,
  overId,
  offset,
  indentationWidth,
  insertPosition = 'after',
  getId,
  getDepth,
  getParent,
}: {
  flatItems: TItem[]
  activeId: Key
  overId: Key
  offset: number
  indentationWidth: number
  insertPosition: InsertPosition
  getId: (item: TItem) => Key
  getDepth: (item: TItem) => number
  getParent: (item: TItem) => TItem | undefined
  getChildren: (item: TItem) => TItem[] | undefined
}) {
  const activeIndex = flatItems.findIndex((item) => getId(item) === activeId)
  const overIndex = flatItems.findIndex((item) => getId(item) === overId)
  const insertIndex =
    insertPosition === 'before'
      ? overIndex
      : activeIndex === overIndex
        ? overIndex
        : overIndex + 1

  const newItems = arrayMove(flatItems, activeIndex, insertIndex)
  const newActiveIndex = newItems.findIndex((item) => getId(item) === activeId)
  const activeItem = newItems[newActiveIndex]
  const prevItem = newItems[newActiveIndex - 1]
  const nextItem = newItems[newActiveIndex + 1]
  const dragDepth = Math.floor(offset / indentationWidth)
  const projectedDepth = getDepth(activeItem) + dragDepth

  // whether or on we add 1 here is based on whether or not the previous item can have children
  const prevDepth = prevItem ? getDepth(prevItem) + 1 : 0
  const nextDepth = nextItem ? getDepth(nextItem) : 0

  const depth = clamp(
    projectedDepth,
    Math.min(prevDepth, nextDepth),
    Math.max(prevDepth, nextDepth)
  )
  // TODO: CHECK IF THIS IS CORRECT
  function getParentId() {
    if (depth === 0 || !prevItem) {
      return null
    }

    if (depth === getDepth(prevItem)) {
      return getId(getParent(prevItem)!)
    }

    if (depth > getDepth(prevItem)) {
      return getId(prevItem)
    }

    // get the first matching depth backwards on the flat items
    const newParent = newItems
      .slice(0, newActiveIndex)
      .reverse()
      .find((item) => getDepth(item) === depth - 1)

    return newParent ? getId(newParent) : undefined
  }
  const parentId = getParentId()
  console.log({
    // toIndex: insertIndex,
    projectedDepth,
    depth,
    prevDepth,
    nextDepth,
    parentId,
  })

  return {
    // insert information
    depth,
    parentId,
    insertIndex: 0,
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
