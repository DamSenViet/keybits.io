import { AriaAttributes, AriaRole, HTMLAttributes, Key, ReactNode } from 'react'

export interface TreeNode {
  id: Key
  label: string | ReactNode
  children?: TreeNode[] | undefined
}

export interface TreeItemA11yAttributes
  extends Partial<AriaAttributes>,
    Pick<HTMLAttributes<HTMLLIElement>, 'tabIndex'> {
  role?: AriaRole
}
