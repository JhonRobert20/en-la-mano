import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Input from './Input'
import Fields from './Fields'
import Editor from './Editor'
import Item from './Item'

interface Props {
  socialMedia: SocialMedia | null
  landings: string[]
}

export default function EnLaMano({ socialMedia, landings }: Props) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Field label="Logo">
        <ImageInput
          class="p-2.5 bg-neutral"
          label="Normal"
          name="logo"
          defaultValue="logo.webp"
          onChange={handleChange}
        />
        <ImageInput
          class="p-2.5 ring-1"
          label="En blanco"
          name="logo-light"
          defaultValue="logo-light.webp"
          onChange={handleChange}
        />
      </Field>
      <Field label="Redes Sociales">
        <Input
          class="lg:basis-1/3"
          name="facebook"
          label="Facebook"
          placeholder="Usuario"
          defaultValue={socialMedia?.facebook}
          onInput={handleChange}
        />
        <Input
          class="lg:basis-1/3"
          name="instagram"
          label="Instagram"
          placeholder="Usuario"
          defaultValue={socialMedia?.instagram}
          onInput={handleChange}
        />
      </Field>
      <Fields
        label="Landings"
        newItem={
          <>
            <Input label="Ruta" name="landings" path="/promo/" />
            <ImageInput label="Banner" name="landings" required />
            <Editor label="Descripción" name="landings" />
          </>
        }
        onChange={handleChange}
      >
        {landings.map(([path, banner, description]) => (
          <Item onDelete={handleChange}>
            <Input
              label="Ruta"
              name="landings"
              path="/promo/"
              defaultValue={path}
              onInput={handleChange}
            />
            <ImageInput
              label="Banner"
              name="landings"
              defaultValue={banner}
              onChange={handleChange}
            />
            <Editor
              label="Descripción"
              name="landings"
              onInput={handleChange}
            >
              {description}
            </Editor>
          </Item>
        ))}
      </Fields>
    </Form>
  )
}
