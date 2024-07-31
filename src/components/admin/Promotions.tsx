import { useSignal } from '@preact/signals'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import TextArea from './TextArea'
import Fields from './Fields'
import Input from './Input'
import Item from './Item'

interface Props {
  description: string
  data: string[]
}

export default function Promotions({ description, data }: Props) {
  const hasChanges = useSignal(false)
  const handleChange = () => (hasChanges.value = true)

  return (
    <Form disabled={!hasChanges.value}>
      <Field>
        <ImageInput
          class="ring-1"
          label="Banner"
          name="hero"
          defaultValue="hero-promociones.webp"
          onChange={handleChange}
        />
        <TextArea
          label="Descripción"
          name="description"
          rows={4}
          onInput={handleChange}
        >
          {description}
        </TextArea>
      </Field>
      <Fields
        label="Promos"
        newItem={
          <>
            <Input type="text" label="Nombre" name="promos" required />
            <ImageInput class="ring-1" label="Banner" name="promos" required />
            <TextArea label="Contenido" name="promos" rows={14} />
          </>
        }
        onChange={handleChange}
      >
        {data.map(([name, image, content]) => (
          <Item onDelete={handleChange}>
            <Input
              type="text"
              label="Nombre"
              name="promos"
              defaultValue={name}
              required
              onInput={({ currentTarget: { value } }) => {
                hasChanges.value = value !== name
              }}
            />
            <ImageInput
              class="ring-1"
              label="Banner"
              name="promos"
              defaultValue={image}
              onChange={handleChange}
            />
            <TextArea
              label="Contenido"
              name="promos"
              rows={14}
              onInput={handleChange}
            >
              {content}
            </TextArea>
          </Item>
        ))}
      </Fields>
    </Form>
  )
}
