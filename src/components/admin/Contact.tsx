import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'

export default function Contact() {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Field>
        <ImageInput
          class="lg:max-w-[50%]"
          label="Banner"
          name="hero"
          defaultValue="hero-contacto.webp"
          onChange={handleChange}
        />
      </Field>
    </Form>
  )
}
