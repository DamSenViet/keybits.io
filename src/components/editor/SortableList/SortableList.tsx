import React, { useMemo, useState, useId } from 'react'
import type { ReactNode } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Active, UniqueIdentifier } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import './SortableList.css'
import { DragHandle, SortableItem, SortableOverlay } from './components'

interface BaseItem {
  id: UniqueIdentifier
}

interface Props<T> {
  items: T[]
  getId: (item: T) => UniqueIdentifier
  onChange(items: T[]): void
  renderItem(item: T): ReactNode
}

export function SortableList<T>({
  items,
  getId,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => getId(item) === active?.id),
    [active, items]
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      id={useId()}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(
            (item) => getId(item) === active.id
          )
          const overIndex = items.findIndex((item) => getId(item) === over.id)
          const shifted = arrayMove(items, activeIndex, overIndex)
          onChange(shifted)
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items.map(getId)}>
        <ul className="SortableList" role="application">
          {items.map((item) => (
            <React.Fragment key={getId(item)}>
              {renderItem(item)}
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  )
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle
