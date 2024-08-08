import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import Editor from './Editor'

interface Props {
  content: string
}

export default function HTML({ content }: Props) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Field>
        <Editor class="basis-full" name="content" html onInput={handleChange}>
          {content}
        </Editor>
      </Field>
    </Form>
  )
}
