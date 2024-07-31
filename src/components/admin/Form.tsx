import type { ComponentChildren } from 'preact'
import clsx from 'clsx/lite'

interface Props {
  disabled: boolean
  children: ComponentChildren
}

export default function Form({ disabled, children }: Props) {
  return (
    <form className="grid gap-y-5" method="post" enctype="multipart/form-data">
      <button
        class={clsx(
          'sticky top-5 block ml-auto px-5 py-2.5 bg-tertiary rounded-full',
          'shadow font-semibold text-sm tracking-wide hover:bg-tertiary/90',
          'disabled:bg-gray/75'
        )}
        type="submit"
        disabled={disabled}
      >
        Guardar
      </button>
      {children}
    </form>
  )
}
