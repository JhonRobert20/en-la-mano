import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Editor from './Editor'
import Input from './Input'

export default function AboutUs({
  mission,
  vision,
  values,
  other
}: AboutUsData) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Field>
        <ImageInput
          class="lg:max-w-[50%]"
          label="Banner"
          name="hero"
          defaultValue="hero-quienes-somos.webp"
          onChange={handleChange}
        />
      </Field>
      <Field>
        <Editor
          class="basis-full lg:basis-5/12"
          label="Misión"
          name="mission"
          onInput={handleChange}
        >
          {mission}
        </Editor>
        <Editor
          class="basis-full lg:basis-5/12"
          label="Visión"
          name="vision"
          onInput={handleChange}
        >
          {vision}
        </Editor>
        <Editor
          class="basis-full lg:basis-5/12"
          label="Valores"
          name="values"
          onInput={handleChange}
        >
          {values}
        </Editor>
      </Field>
      <Field>
        <Input
          class="lg:basis-5/12"
          type="text"
          label="Nombre"
          name="other"
          defaultValue={other[0]}
          required
          onInput={handleChange}
        />
        <Input
          class="lg:basis-5/12"
          type="text"
          label="Título"
          name="other"
          defaultValue={other[1]}
          required
          onInput={handleChange}
        />
        <ImageInput
          label="Imagen"
          name="other"
          defaultValue={other[2]}
          onChange={handleChange}
        />
        <Editor
          class="xl:basis-5/12"
          label="Contenido"
          name="other"
          onInput={handleChange}
        >
          {other[3]}
        </Editor>
      </Field>
    </Form>
  )
}
