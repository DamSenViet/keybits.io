import { useContext } from 'react'
import ExpandedContext from '@/contexts/ExpandedContext'

// eslint-disable-next-line react-refresh/only-export-components
export const useExpanded = () => useContext(ExpandedContext)
