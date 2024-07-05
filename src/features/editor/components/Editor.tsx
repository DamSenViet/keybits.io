'use client'

import { forwardRef, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ExplorerSection from './ExplorerSection'
import GraphSection from './GraphSection'
import Toolbar from './Toolbar'
import { ClusterDetails, KeyDetails, KeyboardDetails } from './details'

export interface EditorProps {}

const Editor = forwardRef<HTMLDivElement, EditorProps>(function (props, ref) {
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
          {/* left panel */}
          <Panel
            className="flex flex-col overflow-hidden"
            defaultSize={20}
            minSize={20}
          >
            <ExplorerSection />
          </Panel>
          <PanelResizeHandle className="w-px border-r border-border rounded-full data-[resize-handle-state=hover]:bg-border/50 data-[resize-handle-state=drag]:bg-border/50" />
          {/* center panel */}
          <Panel defaultSize={80}>
            <GraphSection />
          </Panel>
        </PanelGroup>
        {/* right panel (not resizable) */}
        <div className="w-64 border-l border-border">{detailsSection}</div>
      </div>
    </>
  )
})

export default Editor
