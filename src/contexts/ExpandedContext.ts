import { createContext, Key, Dispatch, SetStateAction } from 'react'

const ExpandedContext = createContext<
  [Key[], Dispatch<SetStateAction<Key[]>> | ((expanded: Key[]) => void)]
>([
  [],
  () => {
    throw new Error('Forgot to wrap Explorer with `ExpandedProvider`')
  },
])

export default ExpandedContext
