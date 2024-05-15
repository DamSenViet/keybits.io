import { ContextType, PropsWithChildren } from 'react'
import { useUncontrolled } from '@mantine/hooks'
import NestedDepthContext from '@/contexts/NestedDepthContext'
import useNestedDepth from '@/hooks/useNestedDepth'

export interface NestedDepthProviderProps {
  value?: ContextType<typeof NestedDepthContext>
}

export default function NestedDepthProvider({
  children,
  value,
}: PropsWithChildren<NestedDepthProviderProps>) {
  const finalValue = useNestedDepth()
  const [depth, , isControlled] = useUncontrolled({ value, finalValue })

  return (
    <NestedDepthContext.Provider value={isControlled ? depth : depth + 1}>
      {children}
    </NestedDepthContext.Provider>
  )
}
