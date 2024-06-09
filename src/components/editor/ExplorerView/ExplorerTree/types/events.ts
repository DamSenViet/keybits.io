import { Key } from 'react'
import { DropPosition } from '../utils'

export interface DropEvent {
  activeId: Key
  parentId: Key | undefined
  overId: Key
  position: DropPosition
}
