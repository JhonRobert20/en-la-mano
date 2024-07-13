import { type LoaderFunction, type MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Carousel from '~/components/carousel'
import CTA from '~/components/cta'
import Form from '~/components/form'
import Services from '~/components/services'
import db from '~/db'
import type { Slide } from '~/lib/types'

export const meta: MetaFunction = () => [{ title: 'En La Mano' }]

export const loader: LoaderFunction = async () => {
  const slides = await db.get<Slide[]>('slides', true)

  return json(slides)
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
      <Services />
    </>
  )
}
