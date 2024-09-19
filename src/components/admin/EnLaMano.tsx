import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Input from './Input'

interface Props {
  socialMedia: SocialMedia | null
  video: string
}

export default function EnLaMano({ socialMedia, video }: Props) {
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
      <Field label="Video">
        <Input
          name="video"
          label="URL del video (YouTube o Vimeo)"
          defaultValue={video}
          onInput={handleChange}
        />
      </Field>
    </Form>
  )
}
