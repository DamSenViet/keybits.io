'use client'

import {
  useId,
  useMemo,
  useState,
  ComponentProps,
  useCallback,
  Key,
} from 'react'
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
  MeasuringStrategy,
} from '@dnd-kit/core'
import { useCreateTree } from '@/components/headless-ui/tree'
import { find } from '@/components/headless-ui/tree/utils/traversal'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import HoverDropContext, { HoverDropContextValue } from './HoverDropContext'
import TreeContext from './TreeContext'
import TreeItem from './TreeItem'
import { TREE_INDENT_PX } from './constants'
import { getActiveDelta, getInsertPosition, getProjectedDrop } from './utils'

const DraggableOverlay = dynamic(() => import('./DraggableOverlay'), {
  ssr: false,
})

interface TreeProps extends ComponentProps<'ul'> {
  items: ExplorerNode[]
  filteredItems?: ExplorerNode[]
  expandedIds?: Key[]
  onExpandedIdsChange?: (ids: Key[]) => void
  selectedIds?: Key[]
  onSelectedIdsChange?: (ids: Key[]) => void
}

export default function Tree({
  items,
  filteredItems = items,
  expandedIds: expandedIds = [],
  selectedIds: selectedIds = [],
  onExpandedIdsChange: onExpandedIdsChange,
  onSelectedIdsChange: onSelectedIdsChange,
  ...others
}: TreeProps) {
  const dndId = useId()

  const { contextValue } = useCreateTree(
    items,
    getExplorerNodeId,
    getExplorerNodeChildren,
    {
      filteredItems,
      expandedIds: expandedIds,
      onExpandedIdsChange,
      selectedIds: selectedIds,
      onSelectedIdsChange,
    }
  )

  const childItems = useMemo(
    () =>
      items
        .filter((item) => contextValue.idToVisible.get(getExplorerNodeId(item)))
        .map((item) => <TreeItem key={getExplorerNodeId(item)} item={item} />),
    [items, getExplorerNodeId]
  )

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

  // projected drop should be passed down
  const [hoverDrop, setHoverDrop] = useState<HoverDropContextValue | null>(null)

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveId(active.id)
    },
    [setActiveId]
  )

  const handleDragOverMove = useCallback(
    ({ active, over }: DragMoveEvent) => {
      if (over) {
        // todo: prevent drops into cannot drop into descendants or self
        // is insertPosition always stale on switch...
        const insertPosition = getInsertPosition(active, over)
        const projectedDrop = getProjectedDrop({
          flatItems: contextValue.visibleFlatItems,
          activeId: active.id,
          overId: over.id,
          offset: getActiveDelta(active).x,
          indentationWidth: TREE_INDENT_PX,
          insertPosition: insertPosition,
          getId: contextValue.getId,
          getDepth: (item) =>
            contextValue.idToDepth.get(contextValue.getId(item))!,
          getParent: (item) =>
            contextValue.idToParent.get(contextValue.getId(item)),
          getChildren: (item) =>
            contextValue.idToChildren.get(contextValue.getId(item)),
        })
        // note that we are one cycle behind the actual dnd context provided to child items
        // insert position is STALE
        setHoverDrop({
          insertPosition,
          projectedDrop,
        })
      } else {
        setHoverDrop(null)
      }
    },
    [
      contextValue.visibleFlatItems,
      contextValue.getId,
      contextValue.idToParent,
      contextValue.idToParent,
      contextValue.idToChildren,
    ]
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over) {
        if (active.id !== over.id) {
          const insertPosition = getInsertPosition(active, over)
        }
      }
      setActiveId(null)
      setHoverDrop(null)
    },
    [setActiveId]
  )

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      setActiveId(null)
      setHoverDrop(null)
    },
    [setActiveId]
  )

  return (
    <TreeContext.Provider value={contextValue}>
      <DndContext
        id={dndId}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOverMove}
        onDragMove={handleDragOverMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <HoverDropContext.Provider value={hoverDrop}>
          <ul role="tree" {...others}>
            {childItems}
          </ul>
          <DraggableOverlay item={activeItem} />
        </HoverDropContext.Provider>
      </DndContext>
    </TreeContext.Provider>
  )
}
