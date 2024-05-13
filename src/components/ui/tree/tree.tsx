import { PropsWithChildren, ComponentProps, FC } from 'react'
import NestedDepthProvider from '@/providers/NestedDepthProvider'

export type TreeProps = ComponentProps<'div'>

const Tree: FC<PropsWithChildren<TreeProps>> = ({ ...props }) => {
  return (
    <NestedDepthProvider>
      <div {...props} />
    </NestedDepthProvider>
  )
}

export default Tree
