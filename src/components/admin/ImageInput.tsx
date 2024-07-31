import { useSignal } from '@preact/signals'
import clsx from 'clsx/lite'
import once from 'just-once'

interface Props {
  class?: string
  label?: string
  name: string
  required?: boolean
  defaultValue?: string
  onChange?: () => void
}

export default function ImageInput({
  class: className,
  label,
  name,
  required,
  defaultValue,
  onChange
}: Props) {
  const url = useSignal<string | undefined>(`/assets/${defaultValue}`)
  const callback = once(() => onChange && onChange())

  function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
    const file = event.currentTarget.files?.item(0)

    if (file) {
      if (url.value) URL.revokeObjectURL(url.value)

      url.value = URL.createObjectURL(file)

      callback()
    }
  }

  if (required) {
    return (
      <div>
        {label && (
          <h2 class="mb-2 font-medium">
            {label}
            {required && <span class="text-secondary">*</span>}
          </h2>
        )}
        <input
          class={clsx(
            'overflow-hidden pr-1 bg-primary border border-tertiary rounded',
            'text-sm'
          )}
          type="file"
          name={name}
          accept="image/*"
          required
        />
        <input type="hidden" name={`${name}-image`} />
      </div>
    )
  }

  return (
    <div class="basis-5/12 space-y-3">
      {label && (
        <h2 class="font-medium">
          {label}
          {required && <span class="text-secondary">*</span>}
        </h2>
      )}
      {url.value && (
        <figure class={clsx('p-2.5 rounded ring-inset ring-gray', className)}>
          <img class="mx-auto rounded-sm" src={url} alt="" />
        </figure>
      )}
      <label
        class={clsx(
          'inline-block px-5 py-2.5 bg-secondary rounded-lg font-bold text-sm',
          'text-neutral transition-colors cursor-pointer hover:bg-secondary/90'
        )}
      >
        <input
          class="hidden"
          type="file"
          accept="image/*"
          name={name}
          onChange={handleChange}
        />
        Subir Imagen
      </label>
      <input type="hidden" name={`${name}-image`} value={defaultValue} />
    </div>
  )
}
