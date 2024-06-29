import clsx from 'clsx/lite'
import type { ReactNode } from 'react'

interface Props {
  cover: string
  children?: ReactNode
}

export default function Slide({ cover, children }: Props) {
  return (
    <figure className="relative h-100">
      <img className="size-full object-cover" src={cover} alt="" />
      <figcaption
        className={clsx(
          'absolute left-7 bottom-15 w-40% font-light text-9/[1]',
          'md:(w-50% text-12) lg:(left-16 text-16/14.5) xl:left-32'
        )}
      >
        {children}
      </figcaption>
    </figure>
  )
}
