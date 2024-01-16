import * as React from 'react'

// auto tracking depth to help calculate indents in the tree
export const TreeDepthContext = React.createContext(0)

export const TreeDepthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const depth = useTreeDepth()
  return (
    <TreeDepthContext.Provider value={depth + 1}>
      {children}
    </TreeDepthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTreeDepth = () => {
  return React.useContext(TreeDepthContext)
}
