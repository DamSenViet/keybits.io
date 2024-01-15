import AppMain from '@/components/AppMain'
import LeftPanel from '@/components/editor/LeftPanel'
import CenterPanel from '@/components/editor/CenterPanel'
import RightPanel from '@/components/editor/RightPanel'

export default function EditorPage() {
  return (
    <AppMain>
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </AppMain>
  )
}
