// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useContext, ComponentProps, useEffect } from 'react'
import { TreeBranchProps } from '@/components/ui/data-tree'
import useNestedDepth from '@/hooks/useNestedDepth'
import droppableItemContext from './DroppableItemContext'
import { ExplorerNode, getExplorerNodeId } from './ExplorerNode'

// should contain the droppable area
const ExplorerTreeBranch = ({
  items: _items,
  getItemId: _getItemId,
  getItemChildren: getItemChildren,
  children,
  rootComponent: _rootComponent,
  ...others
}: TreeBranchProps<ExplorerNode>) => {
  const depth = useNestedDepth()
  const showIndentGuide = false && depth !== 0

  const droppable = useContext(droppableItemContext)

  let ulAttributes: ComponentProps<'ul'> = {}
  if (droppable) {
    const { setNodeRef } = droppable
    ulAttributes = {
      ref: setNodeRef,
    }
  }

  useEffect(
    () => console.log(`dragging over ${droppable?.over?.id}`),
    [droppable?.isOver]
  )

  const style = {
    borderColor: droppable ? 'red' : undefined,
    backgroundColor: droppable?.isOver ? 'red' : undefined,
  }

  return (
    <>
      <ul
        className={'relative border-s-2'}
        role="group"
        {...others}
        {...ulAttributes}
      >
        {showIndentGuide && (
          <div
            className={'absolute top-0 h-full border-l-2 border-input'}
            style={{ marginLeft: `${depth * 8 + 6}px` }}
          />
        )}
        {children}
      </ul>
      <div className="h-12 bg-input">Droppable</div>
    </>
  )
}

export default ExplorerTreeBranch
