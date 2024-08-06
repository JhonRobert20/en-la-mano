import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Editor from './Editor'

interface Props {
  description: string
  content: string
}

export default function Claims({ description, content }: Props) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Field>
        <ImageInput
          class="lg:max-w-xs xl:max-w-md"
          label="Banner"
          name="hero"
          defaultValue="hero-reclamos.webp"
          onChange={handleChange}
        />
        <Editor
          class="lg:basis-[44%]"
          label="Descripción"
          name="description"
          onInput={handleChange}
        >
          {description}
        </Editor>
      </Field>
      <Field>
        <Editor
          class="basis-full"
          label="Contenido"
          name="content"
          onInput={handleChange}
        >
          {content}
        </Editor>
      </Field>
    </Form>
  )
}
