interface BaseExplorerNode {
  name: string
  children?: BaseExplorerNode[]
}

export type ExplorerNode = BaseExplorerNode
