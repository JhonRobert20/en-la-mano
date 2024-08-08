import type { ComponentChildren } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import clsx from 'clsx/lite'
import once from 'just-once'
import styles from '@/styles/Editor.module.css'
import 'ckeditor5/ckeditor5.css'

interface Props {
  class?: string
  label?: string
  name: string
  html?: boolean
  children?: ComponentChildren
  onInput?: () => void
}

export default function Editor({
  class: className,
  label,
  name,
  html,
  children,
  onInput
}: Props) {
  const ref = useRef(null)

  useEffect(() => {
    let cleanup: () => Promise<unknown>

    Promise.all([
      import('ckeditor5'),
      import('ckeditor5/translations/es.js')
    ]).then(
      ([
        {
          ClassicEditor,
          Markdown,
          Essentials,
          Heading,
          Link,
          Bold,
          FontColor,
          Alignment,
          Image,
          ImageInsert,
          SimpleUploadAdapter
        },
        { default: es }
      ]) => {
        ClassicEditor.create(ref.current!, {
          language: 'es',
          translations: [es],
          plugins: [
            Essentials,
            Heading,
            Link,
            Bold,
            ...(html
              ? [FontColor, Alignment, Image, ImageInsert, SimpleUploadAdapter]
              : [Markdown])
          ],
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              'link',
              'bold',
              ...(html
                ? [
                    'fontColor',
                    'alignment:left',
                    'alignment:center',
                    'alignment:right',
                    '|',
                    'insertImage'
                  ]
                : [])
            ]
          },
          simpleUpload: { uploadUrl: `${location.origin}/assets/upload` }
        }).then(editor => {
          cleanup = editor.destroy

          if (onInput) editor.model.document.on('change:data', once(onInput))
        })
      }
    )

    return () => cleanup && cleanup()
  }, [])

  return (
    <div class={clsx('text-sm text-primary', className, styles.container)}>
      {label && <h3 class="mb-2 text-base text-neutral">{label}</h3>}
      <textarea ref={ref} class="hidden" name={name}>
        {children}
      </textarea>
    </div>
  )
}
