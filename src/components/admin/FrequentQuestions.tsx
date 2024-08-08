import useForm from '@/hooks/useForm'
import Form from './Form'
import Field from './Field'
import ImageInput from './ImageInput'
import Editor from './Editor'
import Fields from './Fields'
import Input from './Input'
import Item from './Item'

interface Props {
  description: string
  questions: string[][]
}

export default function FrequentQuestions({ description, questions }: Props) {
  const { hasChanges, handleChange } = useForm()

  return (
    <Form disabled={!hasChanges.value}>
      <Field>
        <ImageInput
          class="lg:max-w-xs xl:max-w-md"
          label="Banner"
          name="hero"
          defaultValue="hero-preguntas-frecuentes.webp"
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
        newItem={
          <>
            <Input label="Pregunta" name="questions" required />
            <Editor label="Respuesta" name="questions" />
          </>
        }
        onChange={handleChange}
      >
        {questions.map(([question, answer]) => (
          <Item onDelete={handleChange}>
            <Input
              label="Pregunta"
              name="questions"
              defaultValue={question}
              required
              onInput={handleChange}
            />
            <Editor label="Respuesta" name="questions" onInput={handleChange}>
              {answer}
            </Editor>
          </Item>
        ))}
      </Fields>
    </Form>
  )
}
