import { Active, Over } from '@dnd-kit/core'

export type InsertPosition = 'before' | 'after'

export function getInsertPosition(active: Active, over: Over): InsertPosition {
  const activeRect = active.rect.current.translated!
  const overRect = over.rect
  const activeCenterY = activeRect.top + activeRect.height / 2
  const overCenterY = overRect.top + overRect.height / 2
  if (activeCenterY > overCenterY) return 'after'
  else return 'before'
}

export function getProjected(leftOffset: number, indentWidth: number) {
  // given the active

  const minDepth = 0
  const maxDepth = 0

  return {
    depth: 0,
  }
}
