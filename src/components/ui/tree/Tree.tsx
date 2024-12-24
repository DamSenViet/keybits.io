import {
  useId,
  useMemo,
  useState,
  useCallback,
  Key,
  AriaAttributes,
  forwardRef,
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
  closestCenter,
} from '@dnd-kit/core'
import { isUndefined, negate, noop } from 'lodash'
import { cn } from '@/lib/utils'
import TreeItem from './TreeItem'
import { TREE_INDENT_PX } from './constants'
import HoverDropContext, {
  HoverDropContextValue,
} from './contexts/HoverDropContext'
import TreeContext from './contexts/TreeContext'
import useCreateTree from './hooks/useCreateTree'
import { DropEvent } from './types/events'
import { TreeNode } from './types/ui'
import { getActiveDelta, getDropPosition, getProjectedDrop } from './utils/dnd'
import { find } from './utils/traversal'

const DraggableOverlay = dynamic(() => import('./DraggableOverlay'), {
  ssr: false,
})

export interface TreeProps extends AriaAttributes {
  className?: string
  items: TreeNode[]
  filteredItems?: TreeNode[]
  expandedIds?: Key[]
  onExpandedIdsChange?: (ids: Key[]) => void
  selectedIds?: Key[]
  onSelectedIdsChange?: (ids: Key[]) => void
  onDrop?: (dropEvent: DropEvent) => void
}

const Tree = forwardRef<HTMLUListElement, TreeProps>(function (
  {
    className,
    items,
    filteredItems = items,
    expandedIds = [],
    selectedIds = [],
    onExpandedIdsChange,
    onSelectedIdsChange,
    onDrop = noop,
  },
  ref
) {
  const dndId = useId()

  const { rootAttributes, contextValue } = useCreateTree(items, {
    expandedIds: expandedIds,
    onExpandedIdsChange,
    multiSelectable: false,
    selectedIds: selectedIds,
    onSelectedIdsChange,
  })

  const childItems = useMemo(
    () =>
      items
        .filter((item) => contextValue.idToVisible.get(item.id))
        .map((item) => <TreeItem key={item.id} item={item} />),
    [items]
  )

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const draggedIds = useMemo(() => {
    if (activeId) {
      // we're only dragging the entire selection if drag occurs on the selection
      if (selectedIds.includes(activeId)) return selectedIds
      // if we attempt to drag one outsidie the selection, we're dragging just that one item
      else return [activeId]
    }
    return []
  }, [selectedIds, activeId])

  const draggedItems = useMemo(
    () =>
      draggedIds
        .map((id) => contextValue.idToItem.get(id)!)
        .filter(negate(isUndefined)),
    [draggedIds, contextValue.idToItem]
  )

  const activeItem = useMemo(
    () =>
      find(
        items,
        (item) => item.children,
        (item) => item.id === activeId
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
        const dropPosition = getDropPosition(active, over)
        const deltaX = getActiveDelta(active).x
        const projectedDrop = getProjectedDrop({
          flatItems: contextValue.visibleFlatItems,
          activeId: active.id,
          overId: over.id,
          offset: deltaX,
          indentationWidth: TREE_INDENT_PX,
          dropPosition,
          getDepth: (item) => contextValue.idToDepth.get(item.id)!,
          getParent: (item) => contextValue.idToParent.get(item.id),
          getChildren: (item) => contextValue.idToChildren.get(item.id),
        })
        if (projectedDrop)
          setHoverDrop({
            dropPosition,
            projectedDrop,
          })
        else setHoverDrop(null)
      } else {
        setHoverDrop(null)
      }
    },
    [
      contextValue.visibleFlatItems,
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
      if (hoverDrop && over) {
        const activeParentId = contextValue.idToParent.get(active.id)?.id
        const overParentId = contextValue.idToParent.get(over.id)?.id
        const dropEvent: DropEvent = {
          activeId: active.id,
          activeParentId,
          overId: over.id,
          overParentId,
          dropPosition: hoverDrop.dropPosition,
          dropParentId: hoverDrop.projectedDrop.parentId,
          relativeDropId: hoverDrop.projectedDrop.relativeDropId,
          relativeDropPosition: hoverDrop.projectedDrop.relativeDropPosition,
        }
        onDrop(dropEvent)
      }
      setActiveId(null)
      setHoverDrop(null)
    },
    [setActiveId, setHoverDrop, onDrop, hoverDrop]
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
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOverMove}
        onDragMove={handleDragOverMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <HoverDropContext.Provider value={hoverDrop}>
          <ul
            ref={ref}
            className={cn(
              'h-0 flex-grow overflow-auto pb-1 pt-1',
              isUndefined(hoverDrop && hoverDrop.projectedDrop.parentId)
                ? 'bg-muted'
                : null
            )}
            {...rootAttributes}
          >
            {childItems}
          </ul>
          <DraggableOverlay items={draggedItems} />
        </HoverDropContext.Provider>
      </DndContext>
    </TreeContext.Provider>
  )
})

export default Tree
