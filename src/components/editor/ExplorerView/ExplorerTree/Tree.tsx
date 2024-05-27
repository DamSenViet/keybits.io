'use client'

import { useId, useMemo, useState, ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
  DragCancelEvent,
  MouseSensor,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useCreateTree } from '@/components/headless-ui/tree'
import { find } from '@/components/headless-ui/tree/utils/traversal'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import TreeContext from './TreeContext'
import TreeItem from './TreeItem'
import TreeItemTitle from './TreeItemTitle'

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

  const childNodes = items.map((item) => (
    <TreeItem key={getExplorerNodeId(item)} item={item} />
  ))

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

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over) {
      if (active.id !== over.id) {
        // update the tree of items
      }
    }
    setActiveId(null)
  }

  const handleDragCancel = (event: DragCancelEvent) => {
    setActiveId(null)
  }

  return (
    <TreeContext.Provider value={contextValue}>
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <ul role="tree" {...others}>
          {childNodes}
        </ul>
        {createPortal(
          <DragOverlay>
            {activeItem ? <TreeItemTitle item={activeItem} /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </TreeContext.Provider>
  )
}
