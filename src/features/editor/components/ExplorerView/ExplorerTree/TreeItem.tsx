import { useContext } from 'react'
import { useTreeItem } from '@/components/headless-ui/tree'
import { cn } from '@/lib/utils'
import { ExplorerNode, getExplorerNodeId } from './ExplorerNode'
import HoverDropContext from './HoverDropContext'
import TreeContext from './TreeContext'
import TreeItemHeader from './TreeItemHeader'

interface TreeItemProps {
  item: ExplorerNode
  showIndentGuide?: boolean
}

export default function TreeItem({ item }: TreeItemProps) {
  const { id, visibleChildren, isExpanded, depth, attributes } = useTreeItem(
    TreeContext,
    item
  )

  const hoverDrop = useContext(HoverDropContext)

  const isDroppingIntoThis = hoverDrop?.projectedDrop?.parentId === id

  const hasChildren = Boolean(visibleChildren)
  const showIndentGuide = false

  const childTreeItems = visibleChildren?.map((item) => (
    <TreeItem
      key={getExplorerNodeId(item)}
      item={item}
      showIndentGuide={showIndentGuide}
    />
  ))

  return (
    <li
      {...attributes}
      className={cn('rounded-md', isDroppingIntoThis ? 'bg-muted' : null)}
    >
      <TreeItemHeader item={item} showChevron />
      {hasChildren && (
        <ul className="relative" role="group">
          {showIndentGuide && (
            <div
              className="absolute top-0 h-full border-l-2 border-input"
              style={{ marginLeft: `${depth * 8 + 6}px` }}
            />
          )}
          {isExpanded && childTreeItems}
        </ul>
      )}
    </li>
  )
}
