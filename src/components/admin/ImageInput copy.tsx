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
  console.log("------------------------------- \n input")
  console.log(defaultValue, "holaaa")
  const url = useSignal(defaultValue && `/assets/${defaultValue}`)
  console.log(url)
  const callback = once(() => onChange && onChange())

  function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
    const file = event.currentTarget.files?.item(0)
    console.log(file, "file")

    if (file) {
      if (url.value && !url.value.startsWith('/assets')) {
        console.log("url value in not", url)
        URL.revokeObjectURL(url.value)
      }

      url.value = URL.createObjectURL(file)
      console.log(url, "nea")

      callback()
    } else {
      console.log("nor file", file)
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
    <div class="space-y-3">
      {label && (
        <h2 class="font-medium">
          {label}
          {required && <span class="text-secondary">*</span>}
        </h2>
      )}
      {url.value && (
        <figure class={clsx('rounded ring-inset ring-gray', className)}>
          <img class="rounded-sm" src={url} alt="" />
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
