'use client'

import { forwardRef, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Triangle, Share } from 'lucide-react'
import ThemeModeToggle from '@/components/ThemeModeToggle'
import { Button } from '@/components/ui/button'
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
      <header className="flex flex-row h-[54px] border-b border-border items-center">
        <div className="w-[52px] border-r border-border self-stretch flex justify-center items-center">
          <div className="h-9 w-9 p-1 border border-border rounded-md flex justify-center items-center">
            <Triangle className="fill-foreground" strokeWidth={1} />
          </div>
        </div>
        <div className="grow flex justify-between items-center px-4">
          <h1 className="text-xl font-semibold align-middle">Editor</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-s"
          >
            <Share className="size-3.5" /> Share
          </Button>
          <ThemeModeToggle className="ml-2" />
        </div>
      </header>
      <main className="grow relative h-full flex flex-row items-stretch content-stretch">
        {/* primary content */}
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
            maxSize={30}
          >
            <ExplorerSection />
          </Panel>
          <PanelResizeHandle className="w-px rounded-full data-[resize-handle-state=hover]:bg-border/50 data-[resize-handle-state=drag]:bg-border/50" />
          {/* center panel */}
          <Panel defaultSize={80} minSize={0} maxSize={80}>
            <GraphSection />
          </Panel>
        </PanelGroup>
        {/* right panel */}
        <div className="hidden w-64 pr-4 py-4 lg:flex flex-col">
          <fieldset className="grow rounded-lg border px-4 border-border">
            <legend className="-ml-1 px-1 text-sm font-medium">Details</legend>
            {detailsSection}
          </fieldset>
        </div>
      </main>
      {/* <Toolbar /> */}
    </>
  )
})

export default Editor
