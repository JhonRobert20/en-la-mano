import { render, type ComponentChild, type ComponentChildren } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import clsx from 'clsx/lite'
import once from 'just-once'
import Sortable from 'sortablejs'
import Item from './Item'

interface Props {
  label?: string
  newItem: ComponentChild
  children: ComponentChildren
  onChange?: () => void
}

export default function Fields({ label, newItem, children, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const handleChange = onChange && once(onChange)

  function add(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
    const fragment = new DocumentFragment()

    render(<Item>{newItem}</Item>, fragment)

    event.currentTarget.insertAdjacentElement(
      'beforebegin',
      fragment.firstElementChild!
    )

    handleChange && handleChange()
  }

  useEffect(() => {
    new Sortable(ref.current!, {
      handle: '.self-end button:last-child',
      onChange: handleChange
    })
  }, [])

  return (
    <section class="basis-full bg-primary rounded-lg">
      {label && <h2 class="m-5 font-bold text-xl">{label}</h2>}
      <div ref={ref} class="grid gap-y-5">
        {children}
        <button
          class={clsx(
            'm-5 p-2 pb-3 bg-warning/95 rounded-full font-bold',
            'transition-colors hover:bg-warning'
          )}
          type="button"
          onClick={add}
        >
          Agregar
        </button>
      </div>
    </section>
  )
}
