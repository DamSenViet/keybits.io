'use client'

import { forwardRef, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import CenterPanel from './CenterPanel'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import Toolbar from './Toolbar'
import { ClusterDetails, KeyDetails, KeyboardDetails } from './details'

export interface EditorProps {}

const Editor = forwardRef<HTMLDivElement, EditorProps>(function (props, ref) {
  // determines activity content to display in the left panel
  const [activity, setActivity] = useState<string>('explorer')

  // determines the settings editor for last focused item (or keyboard)
  const [lastFocused, setLastFocused] = useState<null>(null)

  // determine the correct details section to use based on last focused
  let detailsSection
  if (lastFocused) detailsSection = ''
  else detailsSection = <KeyboardDetails /> // use the keyboard details section instead

  return (
    <>
      <Toolbar />
      <div className="grow relative h-full flex flex-row items-stretch content-stretch">
        <PanelGroup
          className="grow"
          direction="horizontal"
          style={{ height: undefined, width: undefined }}
        >
          <Panel
            className="flex flex-col overflow-hidden"
            defaultSize={20}
            minSize={15}
            maxSize={40}
          >
            <LeftPanel />
          </Panel>
          <PanelResizeHandle className="w-1 border-r border-border rounded-full data-[resize-handle-state=hover]:bg-orange-500/50 data-[resize-handle-state=drag]:bg-orange-500/50" />
          <Panel defaultSize={80}>
            <CenterPanel />
          </Panel>
        </PanelGroup>
        <div className="w-64 border-l border-border">{detailsSection}</div>
      </div>
    </>
  )
})

export default Editor
