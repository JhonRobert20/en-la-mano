import { useSignal } from '@preact/signals'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Editor from './Editor'
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
          class="lg:max-w-xs xl:max-w-md"
          label="Banner"
          name="hero"
          defaultValue="hero-promociones.webp"
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
      <Fields
        label="Promos"
        newItem={
          <>
            <Input class="max-w-xs" label="Nombre" name="promos-name" required />
            <ImageInput label="Banner" name="promos-banner" required />
            <ImageInput label="Miniature" name="promos-miniature" required />
            <Editor label="Contenido" name="promos-content" html />
          </>
        }
        onChange={handleChange}
      >
        {data.map(([name, banner, miniature, content]) => (
          <Item onDelete={handleChange}>
            <Input
              class="max-w-xs"
              label="Nombre"
              name="promos-name"
              defaultValue={name}
              required
              onInput={handleChange}
            />
            <ImageInput
              class="max-w-xs"
              label="Banner"
              name="promos"
              defaultValue={banner}
              onChange={handleChange}
            />
            <ImageInput
              class="max-w-xs"
              label="Miniature"
              name="promos-miniature"
              defaultValue={miniature}
              onChange={handleChange}
            />
            <Editor label="Contenido" name="promos-content" html onInput={handleChange}>
              {content}
            </Editor>
          </Item>
        ))}
      </Fields>
    </Form>
  )
}
