import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { randomUUID } from 'node:crypto'
import Carousel from '~/components/carousel'
import CTA from '~/components/cta'
import Form from '~/components/form'
import type { Slide } from '~/types'

export const meta: MetaFunction = () => [{ title: 'En La Mano' }]

export const loader: LoaderFunction = () => {
  return json(
    Array.from({ length: 3 }, () => ({
      id: randomUUID(),
      cover: '/images/hero.webp',
      paragraph: ['Dale vida', ['a tus', { highlighting: 'proyectos' }]]
    }))
  )
}

export default function Index() {
  const slides = useLoaderData<Slide[]>()

  return (
    <>
      <section className="relative">
        <Form />
        <Carousel slides={slides} />
      </section>
      <CTA />
    </>
  )
}
