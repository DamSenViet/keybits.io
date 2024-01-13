import { ReactNode } from 'react';

export interface DefaultLayoutProps {
  children: ReactNode,
  omitFooter?: boolean,
}

export default function DefaultLayout({
  children,
  omitFooter = false,
}: DefaultLayoutProps) {
  return (
    <>
      {children}
    </>
  )
}