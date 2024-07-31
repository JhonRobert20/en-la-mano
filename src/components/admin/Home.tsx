import { useSignal } from '@preact/signals'
import Form from './Form'
import Fields from './Fields'
import ImageInput from './ImageInput'
import TextArea from './TextArea'
import Item from './Item'
import Field from './Field'
import Input from './Input'

interface Props {
  slides: Slide[]
  formContent: string
  steps: Steps
}

export default function Home({ slides, formContent, steps }: Props) {
  const hasChanges = useSignal(false)
  const handleChange = () => (hasChanges.value = true)

  return (
    <Form disabled={!hasChanges.value}>
      <Fields
        label="Carrusel"
        newItem={
          <>
            <ImageInput name="slides" required />
            <TextArea name="slides" rows={2} placeholder="Contenido..." />
          </>
        }
        onChange={handleChange}
      >
        {slides.map(([image, content]) => (
          <Item onDelete={handleChange}>
            <ImageInput
              class="ring-1"
              name="slides"
              defaultValue={image}
              onChange={handleChange}
            />
            <TextArea
              name="slides"
              placeholder="Contenido..."
              onInput={handleChange}
            >
              {content}
            </TextArea>
          </Item>
        ))}
      </Fields>
      <Field label="Formulario">
        <TextArea
          name="form-content"
          rows={4}
          placeholder="Contenido..."
          onInput={handleChange}
        >
          {formContent}
        </TextArea>
      </Field>
      <Field label="Pasos">
        <Input
          type="text"
          label="Título"
          name="steps-title"
          defaultValue={steps.title}
        />
        <Fields
          newItem={
            <>
              <ImageInput name="steps" required />
              <TextArea
                name="steps"
                rows={2}
                placeholder="Contenido..."
                required
              />
            </>
          }
          onChange={handleChange}
        >
          {steps.list.map(([image, description]) => (
            <Item onDelete={handleChange}>
              <ImageInput
                name="steps"
                defaultValue={image}
                onChange={handleChange}
              />
              <TextArea
                name="steps"
                rows={2}
                placeholder="Descripción..."
                required
                onInput={handleChange}
              >
                {description}
              </TextArea>
            </Item>
          ))}
        </Fields>
        <Fields
          label="Requisitos"
          newItem={<Input type="text" name="requirements" required />}
          onChange={handleChange}
        >
          {steps.requirements.map(requirement => (
            <Input
              type="text"
              name="requirements"
              defaultValue={requirement}
              required
            />
          ))}
        </Fields>
      </Field>
    </Form>
  )
}
