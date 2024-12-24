import { Key } from 'react'
import { DropPosition } from './projection'

export interface DropEvent {
  // active is the dragged item
  activeId: Key
  activeParentId: Key | undefined
  // can use the over id within the drop parent to determine location of the insert
  // note: over !== not where we actually drop, just which element we're positioned over
  overId: Key
  overParentId: Key | undefined
  // 'after' or 'before' the `overId`
  dropPosition: DropPosition
  // information about where to perform the drop
  dropParentId: Key | undefined
  // information about where to perform the drop WITHIN the `dropParentId`
  relativeDropId: Key | undefined
  relativeDropPosition: DropPosition
}
