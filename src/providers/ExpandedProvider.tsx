import { ReactNode, useState } from 'react'
import ExpandedContext from '@/contexts/ExpandedContext'

export default function ExpandedProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ExpandedContext.Provider value={useState<string[]>([])}>
      {children}
    </ExpandedContext.Provider>
  )
}
