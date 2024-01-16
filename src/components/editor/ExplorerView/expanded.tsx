import { useState, createContext, useContext, ReactNode } from 'react'

export const ExpandedContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([
  [],
  () => {
    throw new Error('Forgot to wrap Explorer with `ExpandedProvider`')
  },
])

export const ExpandedProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ExpandedContext.Provider value={useState<string[]>([])}>
      {children}
    </ExpandedContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useExpanded = () => useContext(ExpandedContext)
