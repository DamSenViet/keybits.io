import {
  useId,
  PropsWithChildren,
  ComponentType,
  ComponentProps,
  FC,
} from 'react'
import { DndContext, useDndContext, DragOverlay } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export function withDnD<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: ComponentProps<typeof DndContext> = {}
): FC<P> {
  return function DnD(props) {
    return (
      <DndContext id={useId()} {...options}>
        <WrappedComponent {...props} />
      </DndContext>
    )
  }
}

const DnDContainer = withDnD(function DnDContainer({
  className,
  ...others
}: ComponentProps<'div'>) {
  const { active } = useDndContext()
  return (
    <>
      <div className={cn('h-10 mt-4', className)} {...others} />
      {/* <DragOverlay>
        {active?.id ? <Draggable id={active.id} /> : null}
      </DragOverlay> */}
    </>
  )
})

export default DnDContainer
