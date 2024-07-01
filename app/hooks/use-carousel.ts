import type { EmblaCarouselType } from 'embla-carousel'
import autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export default function useCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true }, [autoplay()])
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const load = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList())
    setSelectedIndex(api.selectedScrollSnap)
  }, [])

  useEffect(() => {
    if (api) {
      load(api)

      api.on('reInit', load).on('select', ({ selectedScrollSnap }) => {
        setSelectedIndex(selectedScrollSnap)
      })
    }
  }, [api, load])

  return {
    ref,
    scrollSnaps,
    selectedIndex,
    scrollTo: (index: number) => api?.scrollTo(index)
  }
}
