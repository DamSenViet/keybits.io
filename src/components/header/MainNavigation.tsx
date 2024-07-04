'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

interface NavBarLinkProps extends React.PropsWithChildren {
  className?: string
  href: string
}

const NavBarLink = ({ className, href, children }: NavBarLinkProps) => {
  const pathname = usePathname()
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          'px-2 py-1 h-8',
          'hover:text-foreground/80',
          pathname.startsWith(href) ? 'text-foreground' : 'text-foreground/60',
          className
        )}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  )
}

export default function MainNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="text-foreground/60">
          <NavigationMenuTrigger className="px-2 py-1 h-8">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] p-6 grid gap-3">
              <ListItem title="Editor" href="/editor">
                Keyboard layout prototyping tool.
              </ListItem>
              {/* <ListItem title="Preview">Preview</ListItem> */}
              <ListItem title="Library">
                Open sourced programming libraries.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-foreground/60">
          <NavigationMenuTrigger className="px-2 py-1 h-8">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] p-6 grid md:grid-cols-1 gap-3 ">
              <ListItem title="Getting Started">How to get started</ListItem>
              <ListItem title="Specifications">Measurements</ListItem>
              <ListItem title="Design to Manufacture">
                Information about the process.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavBarLink href="/About">About</NavBarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavBarLink href="/blog">Blog</NavBarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
