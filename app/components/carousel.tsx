import clsx from 'clsx/lite'
import useCarousel from '~/hooks/use-carousel'
import type { Slide } from '~/types'

interface Props {
  slides: Slide[]
}

export default function Carousel({ slides }: Props) {
  const { ref, selectedIndex, scrollTo } = useCarousel()

  return (
    <div className="absolute inset-0 h-fit my-auto hidden sm:block">
      <div ref={ref} className="overflow-hidden">
        <div className="flex *:flex-[0_0_100%]">
          {slides.map(({ id, cover, paragraph }) => (
            <figure className="relative h-100" key={id}>
              <img className="size-full object-cover" src={cover} alt="" />
              <figcaption
                className={clsx(
                  'absolute left-7 bottom-15 w-40% font-light text-9/[1]',
                  'md:(w-50% text-12) lg:(left-16 text-16/14.5) xl:left-32'
                )}
              >
                {paragraph.map(line => (
                  <span className="block" key={`${id}-${line}`}>
                    {typeof line === 'string'
                      ? line
                      : line.map(content =>
                          typeof content === 'string' ? (
                            `${content} `
                          ) : (
                            <strong
                              className="text-secondary"
                              key={`${id}-${content}`}
                            >
                              {content.highlighting}
                            </strong>
                          )
                        )}
                  </span>
                ))}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <nav className="absolute left-36% bottom-4 flex gap-x-3">
        {slides.map(({ id }, index) => (
          <button
            className={clsx(
              index === selectedIndex && 'bg-current',
              'size-2.25 border rounded-full cursor-pointer'
            )}
            type="button"
            key={`slide-${id}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </nav>
    </div>
  )
}
