import * as React from 'react'
import { isUndefined } from 'lodash'

// auto tracking depth to helpcalculate indents in the tree
export const TreeDepthContext = React.createContext(0)

export const TreeDepthProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value?: number
}) => {
  const depth = useTreeDepth()
  return (
    <TreeDepthContext.Provider value={isUndefined(value) ? depth + 1 : value}>
      {children}
    </TreeDepthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTreeDepth = () => {
  return React.useContext(TreeDepthContext)
}
