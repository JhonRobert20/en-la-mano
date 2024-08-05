import type { ComponentChildren } from 'preact'
import clsx from 'clsx/lite'

interface Props {
  class?: string
  children: ComponentChildren
  onDelete?: () => void
}

export default function Item({ class: className, children, onDelete }: Props) {
  return (
    <div
      class={clsx(
        'grid gap-5 p-5 sm:grid-cols-[1fr_max-content] odd:bg-tertiary/40',
        'even:bg-tertiary/20'
      )}
    >
      <div class={clsx('grid gap-7', className)}>{children}</div>
      <div class="text-secondary">
        <button
          class="p-1.5 rounded-full hover:bg-tertiary/40"
          type="button"
          onClick={event => {
            event.currentTarget.parentElement?.parentElement?.remove()
            onDelete && onDelete()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 fill-none stroke-2 stroke-current"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
        <button class="p-1.5 rounded-full hover:bg-tertiary/40" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 fill-none stroke-2 stroke-current"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l3 3l3 -3" />
            <path d="M12 15v6" />
            <path d="M15 6l-3 -3l-3 3" />
            <path d="M12 3v6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
