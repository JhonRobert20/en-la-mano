import { useEffect, useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import clsx from 'clsx/lite'
import { marked } from 'marked'

interface Props {
  slides: Slide[]
}

export default function Carousel({ slides }: Props) {
  const ref = useRef<HTMLElement>(null)
  const emblaApi = useSignal<EmblaCarouselType>()
  const selected = useSignal(0)

  useEffect(() => {
    if (slides.length > 1) {
      emblaApi.value = EmblaCarousel(
        ref.current!,
        { loop: true, watchDrag: false },
        [Autoplay()]
      )

      emblaApi.value.on(
        'select',
        ({ selectedScrollSnap }) => (selected.value = selectedScrollSnap())
      )

      return () => emblaApi.value?.destroy()
    }
  }, [])

  return (
    <section
      ref={ref}
      class="hidden overflow-hidden absolute inset-0 h-fit my-auto sm:block"
    >
      <div class="flex">
        {slides.map(([image, content]) => (
          <figure class="relative flex flex-[0_0_100%]">
            <img
              class="w-full h-[25rem] object-cover"
              src={`/assets/${image}`}
              alt=""
            />
            <figcaption
              class={clsx(
                'absolute left-10 bottom-15 font-light text-[1.75rem]/[0.90625]',
                '[&_strong]:font-bold [&_strong]:text-secondary',
                'md:text-[2.5rem] lg:left-20 lg:text-[4rem] xl:left-25'
              )}
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(content, { breaks: true }) as string
              }}
            />
          </figure>
        ))}
      </div>
      <nav class="absolute left-1/3 bottom-4 flex gap-x-2">
        {emblaApi.value?.scrollSnapList().map((_, index) => (
          <button
            class={clsx(
              'size-2 border border-neutral rounded-full',
              selected.value === index && 'bg-neutral'
            )}
            onClick={() => {
              emblaApi.value?.scrollTo(index)
              emblaApi.value?.plugins().autoplay.reset()
            }}
          />
        ))}
      </nav>
    </section>
  )
}
