import { useContext } from 'react'
import NestedDepthContext from '@/contexts/NestedDepthContext'

export default function useNestedDepth() {
  return useContext(NestedDepthContext)
}
