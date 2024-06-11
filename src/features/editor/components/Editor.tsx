'use client'

import { forwardRef, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import CenterPanel from './CenterPanel'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

export interface EditorProps {}

const Editor = forwardRef<HTMLDivElement, EditorProps>(function (props, ref) {
  // determines activity content to display in the left panel
  const [activity, setActivity] = useState<string>('explorer')

  // determines the settings editor for last focused item (or keyboard)
  const [lastFocused, setLastFocused] = useState<null>(null)

  return (
    <PanelGroup
      className="grow"
      direction="horizontal"
      style={{
        /** Unset default dimensions */
        height: undefined,
        width: undefined,
      }}
    >
      <Panel
        className="flex flex-col"
        defaultSize={20}
        minSize={20}
        maxSize={40}
      >
        <LeftPanel />
      </Panel>
      <PanelResizeHandle className="w-2 border-l border-border/40" />
      <Panel defaultSize={80}>
        <CenterPanel />
      </Panel>
      {lastFocused && (
        <>
          <Panel className="flex flex-col border-l border-border/40">
            <RightPanel />
          </Panel>
        </>
      )}
    </PanelGroup>
  )
})

export default Editor