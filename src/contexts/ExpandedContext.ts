import { createContext } from 'react'

const ExpandedContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([
  [],
  () => {
    throw new Error('Forgot to wrap Explorer with `ExpandedProvider`')
  },
])

export default ExpandedContext
