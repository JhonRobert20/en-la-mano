import useForm from '@/hooks/useForm'
import Form from './Form'
import Fields from './Fields'
import ImageInput from './ImageInput'
import Editor from './Editor'
import Item from './Item'
import Field from './Field'
import Input from './Input'

interface Props {
  slides: Slide[]
  formContent: string
  steps: Steps
}

export default function Home({ slides, formContent, steps }: Props) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Fields
        class="lg:grid-cols-2"
        label="Carrusel"
        newItem={
          <>
            <ImageInput name="slides" required />
            <Editor class="[&_strong]:text-secondary" name="slides" />
          </>
        }
        onChange={handleChange}
      >
        {slides.map(([image, content]) => (
          <Item class="lg:grid-cols-2" onDelete={handleChange}>
            <ImageInput
              class="ring-1"
              name="slides"
              defaultValue={image}
              onChange={handleChange}
            />
            <Editor
              class="[&_strong]:text-secondary"
              name="slides"
              onInput={handleChange}
            >
              {content}
            </Editor>
          </Item>
        ))}
      </Fields>
      <Field label="Formulario">
        <Editor
          class="basis-full [&_strong]:text-[1.25rem]"
          name="form-content"
          onInput={handleChange}
        >
          {formContent}
        </Editor>
      </Field>
      <Field label="Pasos">
        <Editor
          class="basis-full [&_strong]:text-secondary"
          label="Título"
          name="steps-title"
          onInput={handleChange}
        >
          {steps.title}
        </Editor>
        <Fields
          class="lg:grid-cols-[max-content_1fr]"
          newItem={
            <>
              <ImageInput name="steps" required />
              <Editor name="steps" />
            </>
          }
          onChange={handleChange}
        >
          {steps.list.map(([image, description]) => (
            <Item
              class="lg:grid-cols-[max-content_1fr]"
              onDelete={handleChange}
            >
              <ImageInput
                class="my-2 mx-auto w-fit"
                name="steps"
                defaultValue={image}
                onChange={handleChange}
              />
              <Editor name="steps" onInput={handleChange}>
                {description}
              </Editor>
            </Item>
          ))}
        </Fields>
      </Field>
      <Fields
        label="Requisitos"
        newItem={<Input type="text" name="requirements" required />}
        onChange={handleChange}
      >
        {steps.requirements.map(requirement => (
          <Item onDelete={handleChange}>
            <Input
              type="text"
              name="requirements"
              defaultValue={requirement}
              required
              onInput={handleChange}
            />
          </Item>
        ))}
      </Fields>
    </Form>
  )
}
