import useForm from '@/hooks/useForm'
import Form from './Form'
import Fields from './Fields'
import Input from './Input'
import ImageInput from './ImageInput'
import Editor from './Editor'
import Item from './Item'

interface Props {
  data: string[]
}

export default function Landings({ data }: Props) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Fields
        newItem={
          <>
            <Input label="Ruta" name="landings" path="/landing/" />
            <ImageInput label="Banner" name="landings" required />
            <Editor label="Descripción" name="landings" />
          </>
        }
        onChange={handleChange}
      >
        {data.map(([path, banner, bannerText, description]) => (
          <Item onDelete={handleChange}>
            <Input
              label="Ruta"
              name="landings"
              path="/landing/"
              defaultValue={path}
              onInput={handleChange}
            />
            <div class="grid gap-7 items-center lg:grid-cols-2">
              <ImageInput
                label="Banner"
                name="landings"
                defaultValue={banner}
                onChange={handleChange}
              />
              <Editor
                class="[&_strong]:text-secondary"
                name="landings"
                onInput={handleChange}
              >
                {bannerText}
              </Editor>
            </div>
            <Editor label="Descripción" name="landings" onInput={handleChange}>
              {description}
            </Editor>
          </Item>
        ))}
      </Fields>
    </Form>
  )
}
