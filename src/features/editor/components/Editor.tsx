'use client'

import { forwardRef, useLayoutEffect, useState, useId, useRef } from 'react'
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels'
import ExplorerSection from './ExplorerSection'
import GraphSection from './GraphSection'
import Toolbar from './Toolbar'
import { ClusterDetails, KeyDetails, KeyboardDetails } from './details'

export interface EditorProps {}

const MIN_LEFT_PANEL_WIDTH = 170

const Editor = forwardRef<HTMLDivElement, EditorProps>(function (props, ref) {
  // determines activity content to display in the left panel
  const [activity, setActivity] = useState<string>('explorer')

  const panelHandle = useRef<ImperativePanelHandle>(null)
  const rightPanelWidth = 256
  const resizeHandleWidth = 1
  const panelGroupWidth = (window?.innerWidth || 1) - rightPanelWidth
  const panelGroupContentWidth = panelGroupWidth - resizeHandleWidth
  // 'Size' is a percentage
  const defaultLeftPanelMinSize =
    (MIN_LEFT_PANEL_WIDTH / panelGroupContentWidth) * 100
  const [leftPanelMinSize, setLeftPanelMinSize] = useState(
    defaultLeftPanelMinSize
  )

  const panelGroupId = useId()
  // useLayoutEffect(() => {
  //   const panelGroupEl = document.querySelector<HTMLDivElement>(
  //     `[data-panel-group-id="${panelGroupId}"]`
  //   )!

  //   const observer = new ResizeObserver(() => {
  //     setLeftPanelMinSize(
  //       (MIN_LEFT_PANEL_WIDTH /
  //         (panelGroupEl.offsetWidth - resizeHandleWidth)) *
  //         100
  //     )

  //     const currSize = panelHandle.current?.getSize()!
  //     console.log(currSize)
  //     panelHandle.current?.resize(currSize)
  //   })

  //   // TODO FORCE PANEL TO PERSIST DIMENSIONS BETWEEN WINDOW SIZE CHANGES

  //   observer.observe(panelGroupEl)
  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [])

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
          id={panelGroupId}
          className="grow"
          direction="horizontal"
          style={{ height: undefined, width: undefined }}
        >
          {/* left panel */}
          <Panel
            className="flex flex-col overflow-hidden"
            defaultSize={defaultLeftPanelMinSize}
            minSize={leftPanelMinSize}
            ref={panelHandle}
          >
            <ExplorerSection />
          </Panel>
          <PanelResizeHandle className="w-px border-r border-border rounded-full data-[resize-handle-state=hover]:bg-border/50 data-[resize-handle-state=drag]:bg-border/50" />
          {/* center panel */}
          <Panel defaultSize={100}>
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
