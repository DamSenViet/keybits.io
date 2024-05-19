import ExplorerView from './ExplorerView/ExplorerView'
import FileActionView from './FileActionView'

export default function LeftPanel() {
  return (
    <div className="min-w-0 w-64 flex flex-col  border-r">
      <ExplorerView className="px-4 pt-4" />
      <FileActionView className="px-4 border-t" />
    </div>
  )
}
