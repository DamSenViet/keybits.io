'use client'

import type { PropsWithChildren } from 'react'
import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import type { DropAnimation } from '@dnd-kit/core'

interface Props {}

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
  return <DragOverlay>{children}</DragOverlay>
}
