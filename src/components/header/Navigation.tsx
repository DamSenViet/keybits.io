'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Keyboard } from 'lucide-react'
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

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground/60">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Keyboard className="h-8" />
                    <div className="mb-2 mt-4 text-lg font-medium">keybits</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed keyboard layouts to help prototype
                      manufacturing. Accessible. Customizable. Open Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem title="Editor">
                Tools provided to help the keyboard design process.
              </ListItem>
              <ListItem title="Preview">
                Tools provided to help the keyboard design process.
              </ListItem>
              <ListItem title="Library">
                Open sourced programming libraries and APIs to use.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-foreground/60">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] md:w-[400px] lg:w-[400px] p-4 grid md:grid-cols-1 gap-3 ">
              <ListItem title="Getting Started">How to get started</ListItem>
              <ListItem title="Specifications">Measurements</ListItem>
              <ListItem title="Design to Manufacture">
                Information about the process.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavBarLink href="/docs">Docs</NavBarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavBarLink href="/editor">Editor</NavBarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
