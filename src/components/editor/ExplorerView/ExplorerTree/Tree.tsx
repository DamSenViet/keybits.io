'use client'

import { useId, useMemo, useState, ComponentProps, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  DndContext,
  UniqueIdentifier,
  DragStartEvent,
  DragEndEvent,
  DragCancelEvent,
  DragMoveEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
} from '@dnd-kit/core'
import { useCreateTree } from '@/components/headless-ui/tree'
import { find } from '@/components/headless-ui/tree/utils/traversal'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import TreeContext from './TreeContext'
import TreeItem from './TreeItem'
import { getInsertPosition } from './utils'

const DraggableOverlay = dynamic(() => import('./DraggableOverlay'), {
  ssr: false,
})

interface TreeProps extends ComponentProps<'ul'> {
  items: ExplorerNode[]
  filteredItems?: ExplorerNode[]
  expandedItems?: ExplorerNode[]
  onExpandedItemsChange?: (items: ExplorerNode[]) => void
  selectedItems?: ExplorerNode[]
  onSelectedItemsChange?: (items: ExplorerNode[]) => void
}

export default function Tree({
  items,
  filteredItems = items,
  expandedItems = [],
  selectedItems = [],
  onExpandedItemsChange,
  onSelectedItemsChange,
  ...others
}: TreeProps) {
  const dndId = useId()

  const { contextValue } = useCreateTree(
    items,
    getExplorerNodeId,
    getExplorerNodeChildren,
    {
      filteredItems,
      expandedItems,
      onExpandedItemsChange,
      selectedItems,
      onSelectedItemsChange,
    }
  )

  const childNodes = useMemo(
    () =>
      items.map((item) => (
        <TreeItem key={getExplorerNodeId(item)} item={item} />
      )),
    [items, getExplorerNodeId]
  )

  const [offsetLeft, setOffsetLeft] = useState(0)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const activeItem = useMemo(
    () =>
      find(
        items,
        getExplorerNodeChildren,
        (item) => getExplorerNodeId(item) === activeId
      ),
    [activeId]
  )

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveId(active.id)
    },
    [setActiveId]
  )

  const handleDragMove = useCallback(
    ({ delta }: DragMoveEvent) => {
      setOffsetLeft(delta.x)
    },
    [setOffsetLeft]
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor)
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over) {
        if (active.id !== over.id) {
          const insertPosition = getInsertPosition(active, over)
        }
      }
      setActiveId(null)
    },
    [setActiveId]
  )

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      setActiveId(null)
    },
    [setActiveId]
  )

  return (
    <TreeContext.Provider value={contextValue}>
      <DndContext
        id={dndId}
        sensors={sensors}
        // collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <ul role="tree" {...others}>
          {childNodes}
        </ul>
        <DraggableOverlay item={activeItem} />
      </DndContext>
    </TreeContext.Provider>
  )
}
