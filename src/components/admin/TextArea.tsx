import type { ComponentChildren } from 'preact'
import clsx from 'clsx/lite'
import once from 'just-once'

interface Props {
  label?: string
  name: string
  rows?: number
  placeholder?: string
  required?: boolean
  children?: ComponentChildren
  onInput?: () => void
}

export default function TextArea({
  label,
  name,
  rows,
  placeholder,
  required,
  children,
  onInput
}: Props) {
  return (
    <label class="flex-grow font-medium">
      {label && <span>{label}</span>}
      <textarea
        class={clsx(
          label && 'mt-2',
          'w-full p-2 bg-neutral border border-secondary rounded-lg text-sm',
          'text-primary outline-tertiary placeholder:text-tertiary/65'
        )}
        name={name}
        rows={rows || 3}
        placeholder={placeholder}
        required={required}
        onInput={onInput && once(onInput)}
      >
        {children}
      </textarea>
    </label>
  )
}
