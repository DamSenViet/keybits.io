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
} from '@dnd-kit/core'
import { isUndefined, noop } from 'lodash'
import { useCreateTree } from '@/components/headless-ui/tree'
import { find } from '@/components/headless-ui/tree/utils/traversal'
import { cn } from '@/lib/utils'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import HoverDropContext, { HoverDropContextValue } from './HoverDropContext'
import TreeContext from './TreeContext'
import TreeItem from './TreeItem'
import { TREE_INDENT_PX } from './constants'
import { DropEvent } from './types/events'
import { getActiveDelta, getDropPosition, getProjectedDrop } from './utils'

const DraggableOverlay = dynamic(() => import('./DraggableOverlay'), {
  ssr: false,
})

export interface TreeProps extends AriaAttributes {
  className?: string
  items: ExplorerNode[]
  filteredItems?: ExplorerNode[]
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

  const { rootAttributes, contextValue } = useCreateTree(
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
        const dropPosition = getDropPosition(active, over)
        const projectedDrop = getProjectedDrop({
          flatItems: contextValue.visibleFlatItems,
          activeId: active.id,
          overId: over.id,
          offset: getActiveDelta(active).x,
          indentationWidth: TREE_INDENT_PX,
          dropPosition,
          getId: contextValue.getId,
          getDepth: (item) =>
            contextValue.idToDepth.get(contextValue.getId(item))!,
          getParent: (item) =>
            contextValue.idToParent.get(contextValue.getId(item)),
          getChildren: (item) =>
            contextValue.idToChildren.get(contextValue.getId(item)),
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
      if (over && hoverDrop) {
        onDrop({
          activeId: active.id,
          parentId: hoverDrop.projectedDrop.parentId,
          overId: over.id,
          position: hoverDrop.dropPosition,
        })
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
          <ul
            ref={ref}
            className={cn(
              'h-0 flex-grow rounded-md overflow-scroll pb-8',
              isUndefined(hoverDrop && hoverDrop.projectedDrop.parentId)
                ? 'bg-muted'
                : null
            )}
            {...rootAttributes}
          >
            {childItems}
          </ul>
          <DraggableOverlay item={activeItem} />
        </HoverDropContext.Provider>
      </DndContext>
    </TreeContext.Provider>
  )
})

export default Tree
