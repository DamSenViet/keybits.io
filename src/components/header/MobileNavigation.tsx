'use client'

import Link from 'next/link'
import { useToggle, useLockBodyScroll } from '@uidotdev/usehooks'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion'
import { Button } from '../ui/button'

type NavItem = {
  title: string
  href: string
}
type NavItemGroupItem = {
  title: string
  description: string
  href: string
}
type NavItemGroup = {
  title: string
  items: NavItemGroupItem[]
}

type MobileNavNode = NavItemGroup | NavItem

const MobileNavMenuItem = ({ title, href }: NavItem) => {
  return (
    <Link
      className="px-2 py-4 flex flex-1 items-center justify-between font-medium hover:no-underline"
      href={href}
    >
      {title}
    </Link>
  )
}

const MobileNavMenuItemGroupItem = ({
  title,
  description,
  href,
}: NavItemGroupItem) => {
  return (
    <li className="p-2">
      <Link className="" href={href}>
        <div className="font-medium">{title}</div>
        <p className="text-muted-foreground">{description}</p>
      </Link>
    </li>
  )
}

const MobileNavMenuItemGroup = ({ title, items }: NavItemGroup) => {
  return (
    <AccordionItem value={title} className="border-none">
      <AccordionTrigger className="hover:no-underline px-2">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="ml-2 pl-4 border-l border-border">
          {items.map((item) => (
            <MobileNavMenuItemGroupItem {...item} />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

interface MobileNavMenuProps {
  nodes: MobileNavNode[]
}

const MobileNavMenu = ({ nodes }: MobileNavMenuProps) => {
  useLockBodyScroll()

  return (
    <nav className={cn('absolute w-full top-16 left-0 px-4')}>
      <Accordion type="single" collapsible>
        {nodes.map((node) => {
          if ('items' in node)
            return <MobileNavMenuItemGroup {...node}></MobileNavMenuItemGroup>
          else return <MobileNavMenuItem {...node}></MobileNavMenuItem>
        })}
      </Accordion>
    </nav>
  )
}

const nav: MobileNavNode[] = [
  {
    title: 'Products',
    items: [
      {
        title: 'Editor',
        description: 'Tools provided to help the kebyoard design process',
        href: '/editor',
      },
      {
        title: 'Preview',
        description: 'Tools provided to help the kebyoard design process',
        href: '',
      },
      {
        title: 'Library',
        description: 'Open sourced programming libraries and APIs to use.',
        href: '',
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Getting Started',
        description: 'How to get started',
        href: '',
      },
      {
        title: 'Specifications',
        description: 'Measurements',
        href: '',
      },
      {
        title: 'Design to Manufacture',
        description: 'Information about the process',
        href: '',
      },
    ],
  },
  {
    title: 'Editor',
    href: '/editor',
  },
]

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
          className={cn(
            'stroke-1',
            'transition-transform ',
            on ? 'rotate-90' : 'rotate-0'
          )}
        />
      </Button>
      {on && <MobileNavMenu nodes={nav} />}
    </div>
  )
}
