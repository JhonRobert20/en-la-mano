import type { EmblaCarouselType } from 'embla-carousel'
import autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export default function useCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [ref, api] = useEmblaCarousel(
    { loop: true, breakpoints: { '(max-width: 639px)': { active: false } } },
    [autoplay()]
  )

  const handleSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap)
  }, [])

  useEffect(() => {
    if (api) {
      handleSelect(api)
      api.on('reInit', handleSelect).on('select', handleSelect)
    }
  }, [api, handleSelect])

  return {
    ref,
    selectedIndex,
    scrollTo: (index: number) => api?.scrollTo(index)
  }
}
