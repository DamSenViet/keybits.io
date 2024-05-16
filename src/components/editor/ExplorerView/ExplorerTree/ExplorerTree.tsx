import { Tree } from '@/components/ui/data-tree'
import withDefaultProps from '@/hocs/withDefaults'
import { ExplorerNode } from './ExplorerNode'
import ExplorerTreeNodeChildren from './ExplorerTreeNodeChildren'
import ExplorerTreeNodeTitle from './ExplorerTreeNodeTitle'

const ExplorerTree = withDefaultProps(Tree<ExplorerNode>, {
  nodeTitleComponent: ExplorerTreeNodeTitle,
  nodeChildrenComponent: ExplorerTreeNodeChildren,
})

export default ExplorerTree
