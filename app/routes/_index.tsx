import type { MetaFunction } from '@remix-run/node'
import Carousel from '~/components/carousel'
import Form from '~/components/form'
import Slide from '~/components/slide'

export const meta: MetaFunction = () => [{ title: 'En La Mano' }]

export default function Index() {
  return (
    <>
      <section className="relative">
        <Form />
        <Carousel className="absolute inset-0 -z-1 h-fit my-auto hidden sm:block">
          <Slide cover="/images/hero.webp">
            <span className="block">Dale vida</span> a tus{' '}
            <strong className="text-secondary">proyectos</strong>
          </Slide>
          <Slide cover="/images/hero.webp">
            <span className="block">Dale vida</span> a tus{' '}
            <strong className="text-secondary">proyectos</strong>
          </Slide>
          <Slide cover="/images/hero.webp">
            <span className="block">Dale vida</span> a tus{' '}
            <strong className="text-secondary">proyectos</strong>
          </Slide>
        </Carousel>
      </section>
    </>
  )
}
