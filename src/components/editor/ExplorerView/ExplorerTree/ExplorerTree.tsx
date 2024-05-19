import { useMemo, useState, useId, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Active, DndContext, DragOverlay } from '@dnd-kit/core'
import { isUndefined, negate } from 'lodash'
import { Tree, TreeProps } from '@/components/ui/data-tree'
import {
  ExplorerNode,
  getExplorerNodeId,
  getExplorerNodeChildren,
} from './ExplorerNode'
import ExplorerTreeBranch from './ExplorerTreeBranch'
import ExplorerTreeItem from './ExplorerTreeItem'
import ExplorerTreeItemTitle from './ExplorerTreeItemTitle'

export interface ExplorerTreeProps
  extends Omit<
    TreeProps<ExplorerNode>,
    | 'getItemId'
    | 'getItemChildren'
    | 'itemComponent'
    | 'itemTitleComponent'
    | 'itemBranchComponent'
  > {
  // onChange: (node: ExplorerNode) => void
}

const bfs = <T,>(
  node: T,
  getChildren: (node: T) => T[],
  predicate: (node: T) => boolean
) => {
  const queue = [node]
  while (queue.length > 0) {
    const next = queue.pop()!
    if (predicate(next)) return node
    const childNodes = getChildren(next)
    for (const childNode of childNodes) queue.push(childNode)
  }
  return undefined
}

const ExplorerTree = (props: ExplorerTreeProps) => {
  const dndId = useId()
  const [active, setActive] = useState<Active | null>(null)
  const activeNode = useMemo(
    () =>
      active?.id
        ? props.items
            .map((item) =>
              bfs(
                item,
                getExplorerNodeChildren,
                (node) => getExplorerNodeId(node) === active?.id
              )
            )
            .find(negate(isUndefined))
        : undefined,
    [active?.id]
  )

  useEffect(() => console.log(`active node is ${active?.id}`), [active?.id])

  return (
    <>
      <DndContext
        id={dndId}
        onDragStart={({ active }) => setActive(active)}
        onDragEnd={() => {
          setActive(null)
        }}
        onDragCancel={() => setActive(null)}
        modifiers={[({ transform }) => ({ ...transform, x: 0 })]}
      >
        <Tree<ExplorerNode>
          {...props}
          getItemId={getExplorerNodeId}
          getItemChildren={getExplorerNodeChildren}
          itemComponent={ExplorerTreeItem}
          itemTitleComponent={ExplorerTreeItemTitle}
          branchComponent={ExplorerTreeBranch}
        />
        {createPortal(
          <DragOverlay>
            {activeNode ? getExplorerNodeId(activeNode) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </>
  )
}

export default ExplorerTree
