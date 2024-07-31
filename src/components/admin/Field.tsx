import type { ComponentChildren } from 'preact'

interface Props {
  label?: string
  children: ComponentChildren
}

export default function Field({ label, children }: Props) {
  return (
    <section class="p-5 bg-primary rounded-lg">
      {label && <h2 class="mb-4 font-bold text-xl">{label}</h2>}
      <div class="flex flex-wrap gap-10">{children}</div>
    </section>
  )
}
