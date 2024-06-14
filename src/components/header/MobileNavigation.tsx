'use client'

import { useToggle } from '@uidotdev/usehooks'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion'
import { Button } from '../ui/button'

export default function MobileNavigation() {
  // right handed hamburger
  const [on, toggle] = useToggle(false)

  const handleToggleMenu = () => {
    toggle()
  }

  return (
    <div>
      <Button variant={'ghost'} className="w-9 px-0" onClick={handleToggleMenu}>
        <Menu
          className={cn('transition-transform ', on ? 'rotate-90' : 'rotate-0')}
        />
      </Button>
      <div
        className={cn(
          on ? 'block' : 'hidden',
          'absolute w-full top-16 left-0 px-4'
        )}
      >
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger>title</AccordionTrigger>
            <AccordionContent>stuff</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>title</AccordionTrigger>
            <AccordionContent>stuff</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>title</AccordionTrigger>
            <AccordionContent>stuff</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
