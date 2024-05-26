import { isArray } from 'lodash'

type TraversalStrategy = 'bfs' | 'preorder' | 'inorder' | 'postorder'

interface TreeIterCtx<TNode> {
  depth: number
}

interface TreeIteratee<TItem, TRes = void> {
  (node: TItem, parent: TItem | undefined, context: TreeIterCtx<TItem>): TRes
}

export const each = <TItem>(
  item: TItem | TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  callback: TreeIteratee<TItem, void>,
  strategy: TraversalStrategy = 'preorder'
) => {
  // track next node's self, parent, and depth
  const queue: [TItem, TItem | undefined, number][] = (
    isArray(item) ? item : [item]
  ).map((item) => [item, undefined, 0])

  while (queue.length > 0) {
    // is there a way to track the parent of this node?...
    const [curr, parent, depth] = queue.shift()!
    callback(curr, parent, { depth })
    for (const child of getChildren(curr) ?? [])
      if (strategy === 'bfs') queue.push([child, curr, depth + 1])
      else queue.unshift([child, curr, depth + 1])
  }
}

export const find = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[],
  callback: TreeIteratee<TItem, boolean>,
  strategy: TraversalStrategy = 'bfs'
) => {
  const queue: [TItem, TItem | undefined, number][] = (
    isArray(items) ? items : [items]
  ).map((item) => [item, undefined, 0])

  while (queue.length > 0) {
    const [curr, parent, depth] = queue.shift()!
    const res = callback(curr, parent, { depth })
    if (res) return curr
    for (const child of getChildren(curr))
      if (strategy === 'bfs') queue.push([child, curr, depth + 1])
      else queue.unshift([child, curr, depth + 1])
  }
}

// take the tree, and generate a list of nodes
export const flattenTree = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[],
  strategy: TraversalStrategy = 'preorder'
) => {
  // console.log
  const flattenedTree: TItem[] = []
  each(items, getChildren, (item) => flattenedTree.push(item), strategy)
  return flattenedTree
}
