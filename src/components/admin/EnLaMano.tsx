import { useSignal } from '@preact/signals'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Input from './Input'

interface Props {
  socialMedia: SocialMedia | null
}

export default function EnLaMano({ socialMedia }: Props) {
  const hasChanges = useSignal(false)

  return (
    <Form disabled={!hasChanges.value}>
      <Field label="Logo">
        <ImageInput
          class="bg-neutral"
          label="Normal"
          name="logo"
          defaultValue="logo.webp"
          onChange={() => (hasChanges.value = true)}
        />
        <ImageInput
          class="ring-1"
          label="En blanco"
          name="logo-light"
          defaultValue="logo-light.webp"
          onChange={() => (hasChanges.value = true)}
        />
      </Field>
      <Field label="Redes Sociales">
        <Input
          type="url"
          name="facebook"
          label="Facebook"
          placeholder="URL del perfil"
          defaultValue={socialMedia?.facebook}
          onInput={({ currentTarget: { value } }) => {
            hasChanges.value = value !== (socialMedia?.facebook || '')
          }}
        />
        <Input
          type="text"
          name="instagram"
          label="Instagram"
          placeholder="Usuario"
          defaultValue={socialMedia?.instagram}
          onInput={({ currentTarget: { value } }) => {
            hasChanges.value = value !== (socialMedia?.instagram || '')
          }}
        />
      </Field>
    </Form>
  )
}
