import { ComponentProps, Key, ElementType, useContext } from 'react'

/**
 * Tree branch is not responsible for rendering the child items of an item.
 * It just renders the container for the child items of a item.
 */
export interface TreeBranchProps<T> extends ComponentProps<'ul'> {
  items: T[]
  getItemId: (node: T) => Key
  getItemChildren: (node: T) => T[]
  rootComponent?: ElementType<ComponentProps<'ul'>>
}

const TreeBranch = <T,>({
  items,
  getItemId,
  getItemChildren,
  rootComponent: Root = 'ul',
  ...others
}: TreeBranchProps<T>) => {
  return <Root role={'group'} {...others} />
}

export default TreeBranch
