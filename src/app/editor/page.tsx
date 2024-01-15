import AppMain from '@/components/AppMain'
import CenterPanel from '@/components/editor/CenterPanel'
import LeftPanel from '@/components/editor/LeftPanel'
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
