import { forwardRef } from 'react'
import { Import as ImportIcon, BookOpenText as LibraryIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export interface FileActionViewProps {
  className?: string
}

const FileActionView = forwardRef<HTMLDivElement, FileActionViewProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        <Button
          className="text-xs text-muted-foreground font-normal justify-start"
          variant={'ghost'}
        >
          <LibraryIcon className="h-4 w-4 mr-1 stroke-muted-foreground" />
          <span>Library</span>
        </Button>
        <Button
          className="text-xs text-muted-foreground font-normal justify-start"
          variant={'ghost'}
        >
          <ImportIcon className="h-4 w-4 mr-1 stroke-muted-foreground" />
          <span>Import Asset</span>
        </Button>
      </div>
    )
  }
)

export default FileActionView
