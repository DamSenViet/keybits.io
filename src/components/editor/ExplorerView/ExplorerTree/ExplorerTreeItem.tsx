import { ComponentProps, useContext } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { mergeRefs } from '@mantine/hooks'
import { TreeItem, TreeItemProps } from '@/components/ui/data-tree'
import { cn } from '@/lib/utils'
import draggableItemContext from './DraggableItemContext'
import droppableItemContext from './DroppableItemContext'
import { ExplorerNode } from './ExplorerNode'

interface ExplorerTreeNodeRootProps extends ComponentProps<'li'> {}

// need access to the id in this one
function ExplorerTreeNodeRoot({ ...others }: ExplorerTreeNodeRootProps) {
  const {
    setNodeRef: setDroppableRef,
    over,
    isOver,
  } = useContext(droppableItemContext)!

  // only folders should be droppable, don't set ref if file
  // is this root a folder?
  const mergedRef = mergeRefs(setDroppableRef)

  return (
    <li
      {...others}
      ref={mergedRef}
      className={cn(
        'rounded-sm',
        isOver && over?.data.current?.isFolder ? 'bg-green-500' : null
      )}
    />
  )
}

interface ExplorerTreeNodeProps extends TreeItemProps<ExplorerNode> {}

function ExplorerTreeItem({
  item,
  getItemId,
  getItemChildren,
  itemComponent,
  itemTitleComponent,
  branchComponent,
  ...others
}: ExplorerTreeNodeProps) {
  const draggable = useDraggable({
    id: getItemId(item),
    data: {
      isFolder: item.children ? true : false,
    },
  })

  const droppable = useDroppable({
    id: getItemId(item),
    data: {
      isFolder: item.children ? true : false,
    },
  })

  return (
    <droppableItemContext.Provider value={droppable}>
      <draggableItemContext.Provider value={draggable}>
        <TreeItem<ExplorerNode>
          item={item}
          getItemId={getItemId}
          getItemChildren={getItemChildren}
          rootComponent={ExplorerTreeNodeRoot}
          itemComponent={itemComponent}
          itemTitleComponent={itemTitleComponent}
          branchComponent={branchComponent}
          {...others}
        />
      </draggableItemContext.Provider>
    </droppableItemContext.Provider>
  )
}

export default ExplorerTreeItem
