import ExplorerView from './ExplorerView/ExplorerView'
import FileActionView from './FileActionView'

export default function LeftPanel() {
  return (
    <div className="flex flex-col w-64 border-r">
      <ExplorerView className="px-4 pt-4" />
      <FileActionView className="px-4 border-t" />
    </div>
  )
}
