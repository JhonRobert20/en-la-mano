import { useSignal } from '@preact/signals'

export default function useForm() {
  const hasChanges = useSignal(false)
  const handleChange = () => (hasChanges.value = true)

  return { hasChanges, handleChange }
}
