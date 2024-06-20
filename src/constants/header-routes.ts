export interface HeaderRoute {
  title: string
  description: string
  href: string
}

export interface HeaderRouteGroup {
  title: string
  items: HeaderRoute[]
}

export type HeaderRouteItem = HeaderRoute | HeaderRouteGroup

export const editorRoute: HeaderRoute = {
  title: 'Editor',
  description: 'Tool designed to help provide the keyboard design process',
  href: '/editor',
}

export const previewRoute: HeaderRoute = {
  title: 'Preview',
  description: 'Tool designed to help provide the keyboard design process',
  href: '/preview',
}

export const libraryRoute: HeaderRoute = {
  title: 'Library',
  description: 'Open sourced programming libraries and APIs to use.',
  href: '/library',
}

export const gettingStartedRoute: HeaderRoute = {
  title: 'Getting Started',
  description: 'How to get started',
  href: '/getting_started',
}

export const specificationsRoute: HeaderRoute = {
  title: 'Specifications',
  description: 'Measurements for keyboard design',
  href: '/specifications',
}

export const designToManufactureRoute: HeaderRoute = {
  title: 'Design to Manufacture',
  description: 'Information about the process',
  href: '/manufacturing',
}

// route groups
export const productRouteGroup: HeaderRouteGroup = {
  title: 'Product',
  items: [editorRoute, previewRoute, libraryRoute],
}

export const resourcesRouteGroup: HeaderRouteGroup = {
  title: 'Resources',
  items: [gettingStartedRoute, specificationsRoute, designToManufactureRoute],
}

export const headerRouteGroups = [productRouteGroup, resourcesRouteGroup]
