import { isUndefined } from 'lodash'
import NestedDepthContext from '@/contexts/NestedDepthContext'
import useNestedDepth from '@/hooks/useNestedDepth'

export default function NestedDepthProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value?: number
}) {
  const depth = useNestedDepth()
  return (
    <NestedDepthContext.Provider value={isUndefined(value) ? depth + 1 : value}>
      {children}
    </NestedDepthContext.Provider>
  )
}
