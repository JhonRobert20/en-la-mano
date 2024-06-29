import clsx from 'clsx/lite'
import autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type { ReactNode } from 'react'

interface Props {
  className?: string
  children: ReactNode
}

export default function Carousel({ className, children }: Props) {
  const [ref] = useEmblaCarousel({ loop: true }, [autoplay()])

  return (
    <div ref={ref} className={clsx('overflow-hidden', className)}>
      <div className="flex *:flex-[0_0_100%]">{children}</div>
    </div>
  )
}
