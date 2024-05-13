import { useState, Key, PropsWithChildren, ContextType } from 'react'
import ExpandedContext from '@/contexts/ExpandedContext'

export interface ExpandedProviderProps {
  value?: ContextType<typeof ExpandedContext>
}

export default function ExpandedProvider({
  children,
  value,
}: PropsWithChildren<ExpandedProviderProps>) {
  return (
    <ExpandedContext.Provider value={value ?? useState<Key[]>([])}>
      {children}
    </ExpandedContext.Provider>
  )
}
