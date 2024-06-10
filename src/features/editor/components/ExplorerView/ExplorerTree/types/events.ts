import { Key } from 'react'
import { DropPosition } from './projection'

export interface DropEvent {
  activeId: Key
  parentId: Key | undefined
  overId: Key
  position: DropPosition
}
