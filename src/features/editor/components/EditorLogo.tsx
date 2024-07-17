'use client'

import { forwardRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Triangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface EditorLogoProps {}

const EditorLogo = forwardRef<HTMLDivElement, EditorLogoProps>(
  function (props, ref) {
    const router = useRouter()
    const routeToHome = useCallback(() => router.push('/'), [])
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="h-9 w-9 p-1 border border-border rounded-md flex jsutify-center items-center">
          <Triangle className="fill-foreground" strokeWidth={1} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>File</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                New <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Import <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                Undo <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Redo <DropdownMenuShortcut>⌘Y</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>View</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem>
                Grid <DropdownMenuShortcut>⇧'</DropdownMenuShortcut>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Rulers <DropdownMenuShortcut>⇧R</DropdownMenuShortcut>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem inset>
                Zoom In <DropdownMenuShortcut>⌘+</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem inset>
                Zoom to 100% <DropdownMenuShortcut>⌘-</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem inset>
                Zoom to fit <DropdownMenuShortcut>⇧1</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem inset>
                Zoom to selection
                <DropdownMenuShortcut className="ml-8">⇧2</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Selection</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                Select All
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Deselect All
                <DropdownMenuShortcut className="ml-8">
                  ⇧⌘A
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={routeToHome}>
            Back to home
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

export default EditorLogo
