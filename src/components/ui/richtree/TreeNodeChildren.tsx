import { PropsWithChildren, ElementType, ComponentProps, FC } from 'react'

export interface TreeNodeChildrenProps
  extends PropsWithChildren<ComponentProps<'ul'>> {
  rootComponent?: ElementType<ComponentProps<'ul'>>
}

const TreeNodeChildren: FC<TreeNodeChildrenProps> = ({
  rootComponent: RootComponent = 'ul',
  ...others
}) => {
  return <RootComponent role={'group'} {...others} />
}

export default TreeNodeChildren
