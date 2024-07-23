import ExplorerView from './ExplorerView/ExplorerView'

export interface ExplorerSectionProps {}

const ExplorerSection = function (props: ExplorerSectionProps) {
  return (
    <>
      <ExplorerView className="px-4 py-4" />
    </>
  )
}

export default ExplorerSection
