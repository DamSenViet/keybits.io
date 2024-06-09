import { forwardRef } from 'react'
import ExplorerView from './ExplorerView/ExplorerView'
import FileActionView from './FileActionView'

export interface LeftPanelProps {}

const LeftPanel = function (props: LeftPanelProps) {
  return (
    <>
      <ExplorerView className="px-4 pt-4" />
      <FileActionView className="px-4 border-t" />
    </>
  )
}

export default LeftPanel
