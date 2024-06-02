import { useContext, useMemo } from 'react'
import { useDndContext } from '@dnd-kit/core'
import { useTreeItem } from '@/components/headless-ui/tree'
import { cn } from '@/lib/utils'
import { ExplorerNode, getExplorerNodeId } from './ExplorerNode'
import TreeContext from './TreeContext'
import TreeItemHeader from './TreeItemHeader'
import { TREE_INDENT_PX } from './constants'
import {
  InsertPosition,
  getActiveDelta,
  getInsertPosition,
  getProjectedDrop,
} from './utils'

interface TreeItemProps {
  item: ExplorerNode
  showIndentGuide?: boolean
}

export default function TreeItem({ item }: TreeItemProps) {
  const { visibleChildren, isExpanded, depth, attributes } = useTreeItem(
    TreeContext,
    item
  )

  const treeCtx = useContext(TreeContext)
  const itemId = treeCtx.getId(item)

  const { active, over } = useDndContext()
  const insertPosition: InsertPosition = useMemo(() => {
    if (active?.rect.current && over?.rect)
      return getInsertPosition(active, over)
    else return 'before'
  }, [active?.rect.current, over?.rect])

  const projection = useMemo(() => {
    if (active?.id && over?.id)
      return getProjectedDrop({
        flatItems: treeCtx.visibleFlatItems,
        activeId: active.id,
        overId: over.id,
        offset: getActiveDelta(active).x,
        indentationWidth: TREE_INDENT_PX,
        insertPosition,
        getId: treeCtx.getId,
        getDepth: (item) => treeCtx.idToDepth.get(treeCtx.getId(item))!,
        getParent: (item) => treeCtx.idToParent.get(treeCtx.getId(item)),
        getChildren: (item) => treeCtx.idToChildren.get(treeCtx.getId(item)),
      })
    else return undefined
  }, [
    active?.id,
    active?.rect.current,
    over?.id,
    itemId,
    insertPosition,
    treeCtx.getId,
    treeCtx.idToParent,
    treeCtx.idToChildren,
    treeCtx.idToDepth,
    treeCtx.visibleFlatItems,
  ])

  const isThis = projection?.parentId === itemId

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
      className={cn('rounded-md', isThis ? 'bg-muted' : null)}
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
