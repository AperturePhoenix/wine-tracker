import { ReactNode } from 'react'

export default function Main({
  children,
}: {
  children: ReactNode | ReactNode[]
}): JSX.Element {
  return (
    <main className="flex flex-col h-full w-full justify-center items-center">
      {children}
    </main>
  )
}
