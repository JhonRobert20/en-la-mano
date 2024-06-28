import { type MouseEventHandler, useEffect, useRef, useState } from 'react'

export default function useClickOutside() {
  const ref = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggle: MouseEventHandler = event => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      function handleClick({ target }: MouseEvent) {
        if (!ref.current?.contains(target as Node)) setIsOpen(false)
      }

      window.addEventListener('click', handleClick)

      return () => window.removeEventListener('click', handleClick)
    }
  }, [isOpen])

  return { ref, isOpen, toggle }
}
