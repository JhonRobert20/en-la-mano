import clsx from 'clsx/lite'
import { useId } from 'preact/hooks'

interface Props {
  class?: string
  name: string
  label?: string
  path?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void
}

export default function Input({
  class: className,
  name,
  label,
  path,
  placeholder,
  defaultValue,
  required,
  onInput
}: Props) {
  const id = useId()

  if (path) {
    return (
      <div class="font-medium">
        <label for={id}>
          {label}
          <span class="text-secondary">*</span>
        </label>
        <label
          class={clsx(
            'mt-2 block w-full p-2 bg-neutral border border-secondary',
            'rounded-lg text-sm text-primary focus-within:outline-tertiary'
          )}
        >
          {path}
          <input
            class="bg-transparent outline-none"
            type="text"
            name={name}
            id={id}
            defaultValue={defaultValue}
            onInput={onInput}
          />
        </label>
      </div>
    )
  }

  return (
    <label class={clsx('w-full font-medium', className)}>
      {label && (
        <>
          {label}
          {required && <span class="text-secondary">*</span>}
        </>
      )}
      <input
        class={clsx(
          'mt-2 block w-full p-2 bg-neutral border border-secondary',
          'rounded-lg text-sm text-primary outline-tertiary',
          'placeholder:text-tertiary/65'
        )}
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        onInput={onInput}
      />
    </label>
  )
}
