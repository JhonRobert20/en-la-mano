import clsx from 'clsx/lite'
import useCarousel from '~/hooks/use-carousel'

interface Props {
  slides: Array<{
    id: string
    cover: string
    paragraph: Array<string | Array<string | { highlighting: string }>>
  }>
}

export default function Carousel({ slides }: Props) {
  const { ref, scrollSnaps, selectedIndex, scrollTo } = useCarousel()

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
                  <span className="block" key={crypto.randomUUID()}>
                    {typeof line === 'string'
                      ? line
                      : line.map(content =>
                          typeof content === 'string' ? (
                            `${content} `
                          ) : (
                            <strong
                              className="text-secondary"
                              key={crypto.randomUUID()}
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
        {scrollSnaps.map((_, index) => (
          <button
            className={clsx(
              index === selectedIndex && 'bg-current',
              'size-2.25 border rounded-full cursor-pointer'
            )}
            type="button"
            key={crypto.randomUUID()}
            onClick={() => scrollTo(index)}
          />
        ))}
      </nav>
    </div>
  )
}
