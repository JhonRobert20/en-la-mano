import clsx from 'clsx/lite'

interface Props {
  class?: string
  type: 'text' | 'url'
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void
}

export default function Input({
  class: className,
  type,
  name,
  label,
  placeholder,
  defaultValue,
  required,
  onInput
}: Props) {
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
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        onInput={onInput}
      />
    </label>
  )
}
