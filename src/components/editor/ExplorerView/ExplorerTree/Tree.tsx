'use client'

import { useId, useMemo, useState, ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import { Active, DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
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
}

export default function Tree({ items, ...others }: TreeProps) {
  const dndId = useId()

  const { contextValue } = useCreateTree(items, getExplorerNodeChildren, {
    expanded: [],
    selected: [],
    filtered: [],
  })

  const childNodes = items.map((item) => (
    <TreeItem key={getExplorerNodeId(item)} item={item} />
  ))

  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () =>
      find(
        items,
        getExplorerNodeChildren,
        (item) => getExplorerNodeId(item) === active?.id
      ),
    [active]
  )

  return (
    <TreeContext.Provider value={contextValue}>
      <DndContext
        id={dndId}
        collisionDetection={pointerWithin}
        onDragStart={({ active }) => {
          setActive(active)
        }}
        onDragEnd={() => {
          setActive(null)
        }}
        onDragCancel={() => {
          setActive(null)
        }}
      >
        {/* need this top level to be droppable */}
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
