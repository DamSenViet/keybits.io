import { ComponentProps, useContext } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { TreeItem, TreeItemProps } from '@/components/ui/data-tree'
import draggableItemContext from './DraggableItemContext'
import droppableItemContext from './DroppableItemContext'
import { ExplorerNode } from './ExplorerNode'
import sortableItemContext from './SortableItemContext'

interface ExplorerTreeNodeRootProps extends ComponentProps<'li'> {}

function ExplorerTreeNodeRoot({ ...others }: ExplorerTreeNodeRootProps) {
  const { setNodeRef, isDragging, transform } =
    useContext(draggableItemContext)!
  const style = {
    borderColor: isDragging ? '#4985ff4' : undefined,
    backgroundColor: 'rgba(101, 224, 169, 0.518)',
    transform: transform
      ? `translate(${transform.x}px, ${transform.y})`
      : undefined,
  }

  return <li {...others} ref={setNodeRef} style={style} />
}

interface ExplorerTreeNodeProps extends TreeItemProps<ExplorerNode> {}

function ExplorerTreeItem({
  item,
  getItemId,
  getItemChildren,
  itemTitleComponent,
  branchComponent,
  ...others
}: ExplorerTreeNodeProps) {
  const draggable = useDraggable({
    id: getItemId(item),
  })

  const droppable = useDroppable({
    id: getItemId(item) + 'droppable',
  })

  return (
    <droppableItemContext.Provider value={droppable}>
      <draggableItemContext.Provider value={draggable}>
        <TreeItem<ExplorerNode>
          item={item}
          getItemId={getItemId}
          getItemChildren={getItemChildren}
          rootComponent={ExplorerTreeNodeRoot}
          itemTitleComponent={itemTitleComponent}
          branchComponent={branchComponent}
          {...others}
        />
      </draggableItemContext.Provider>
    </droppableItemContext.Provider>
  )
}

export default ExplorerTreeItem
