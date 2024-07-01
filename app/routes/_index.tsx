import type { MetaFunction } from '@remix-run/node'
import Carousel from '~/components/carousel'
import Form from '~/components/form'

export const meta: MetaFunction = () => [{ title: 'En La Mano' }]

export default function Index() {
  const slides = Array.from({ length: 3 }, () => ({
    id: crypto.randomUUID(),
    cover: '/images/hero.webp',
    paragraph: ['Dale vida', ['a tus', { highlighting: 'proyectos' }]]
  }))

  return (
    <>
      <section className="relative">
        <Form />
        <Carousel slides={slides} />
      </section>
    </>
  )
}
