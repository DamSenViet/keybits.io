import { isArray } from 'lodash'

type DFSTraversalStrategy = 'preorder' | 'postorder'
type TraversalStrategy = 'levelorder' | DFSTraversalStrategy

interface TreeIterCtx {
  depth: number
}

interface TreeIteratee<TItem, TRes = void> {
  (node: TItem, parent: TItem | undefined, context: TreeIterCtx): TRes
}

export const each = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  callback: TreeIteratee<TItem, void>,
  strategy: TraversalStrategy = 'preorder'
) => {
  if (strategy !== 'levelorder') dft(items, getChildren, callback, strategy)
  else bft(items, getChildren, callback)
}

export const bft = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  callback: TreeIteratee<TItem, void>
) => {
  // track next node's self, parent, and depth
  if (!isArray(items)) items = [items]
  const queue: [TItem, TItem | undefined, number][] = items.map((item) => [
    item,
    undefined,
    0,
  ])

  while (queue.length > 0) {
    const [curr, parent, depth] = queue.shift()!
    callback(curr, parent, { depth })
    for (const child of getChildren(curr) ?? [])
      queue.push([child, curr, depth + 1])
  }
}

export const dft = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  callback: TreeIteratee<TItem, void>,
  strategy: DFSTraversalStrategy = 'preorder',
  parent: TItem | undefined = undefined,
  depth: number = 0
) => {
  if (!isArray(items)) {
    if (strategy === 'preorder') callback(items, parent, { depth })
    for (const child of getChildren(items) ?? [])
      dft(child, getChildren, callback, strategy, items, depth + 1)
    if (strategy === 'postorder') callback(items, parent, { depth })
  } else {
    for (const item of items)
      dft(item, getChildren, callback, strategy, parent, depth)
  }
}

export const find = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  callback: TreeIteratee<TItem, boolean>,
  strategy: TraversalStrategy = 'levelorder'
) => {
  const queue: [TItem, TItem | undefined, number][] = (
    isArray(items) ? items : [items]
  ).map((item) => [item, undefined, 0])

  while (queue.length > 0) {
    const [curr, parent, depth] = queue.shift()!
    const res = callback(curr, parent, { depth })
    if (res) return curr
    for (const child of getChildren(curr) ?? [])
      if (strategy === 'levelorder') queue.push([child, curr, depth + 1])
      else queue.unshift([child, curr, depth + 1])
  }
}

// take the tree, and generate a list of nodes
export const flattenTree = <TItem>(
  items: TItem | TItem[],
  getChildren: (item: TItem) => TItem[] | undefined,
  strategy: TraversalStrategy = 'preorder'
) => {
  const flattenedTree: TItem[] = []
  each(items, getChildren, (item) => flattenedTree.push(item), strategy)
  return flattenedTree
}
