import { forwardRef } from 'react'
import { Hammer, Hand, MousePointer2, Square, ZoomInIcon } from 'lucide-react'
import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarShortcut,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
} from '@/components/ui/menubar'

export interface ToolbarProps {}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function (props, ref) {
  return (
    <div
      ref={ref}
      className="h-12 border-b border-border flex justify-start items-center"
    >
      <Menubar className="border-none rounded-none p-0 space-x-0">
        {/* titlebar actions */}
        <MenubarMenu>
          <MenubarTrigger className="h-12 rounded-none ">
            <Hammer className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>File</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  New <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Import <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Export <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Edit</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>View</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarCheckboxItem>
                  Grid <MenubarShortcut>⇧'</MenubarShortcut>
                </MenubarCheckboxItem>
                <MenubarCheckboxItem>
                  Rulers <MenubarShortcut>⇧R</MenubarShortcut>
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Zoom to 100% <MenubarShortcut>⌘-</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Zoom to fit <MenubarShortcut>⇧1</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Zoom to selection
                  <MenubarShortcut className="ml-8">⇧2</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Selection</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  Select All
                  <MenubarShortcut>⌘A</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Deselect All
                  <MenubarShortcut className="ml-8">⇧⌘A</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Settings</MenubarItem>
            <MenubarItem>Help</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Back to home</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* select tool actions */}
        <MenubarMenu>
          <MenubarTrigger className="h-12 rounded-none">
            <MousePointer2 className="h-4 w-4" />
          </MenubarTrigger>
        </MenubarMenu>

        {/* create item actions */}
        <MenubarMenu>
          <MenubarTrigger className="h-12 rounded-none">
            <Square className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Standard <MenubarShortcut>R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Stabilized</MenubarItem>
            <MenubarItem>More...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* panning tool */}
        <MenubarMenu>
          <MenubarTrigger className="h-12 rounded-none">
            <Hand className="h-4 w-4" />
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      <div className="font-bold text-sm ml-auto mr-auto">{'Keyboard Name'}</div>
      <div>
        <ZoomInIcon className="px-4" />
      </div>
    </div>
  )
})

export default Toolbar
