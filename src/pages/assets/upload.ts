import { randomUUID } from 'node:crypto'
import type { APIRoute } from 'astro'
import db from '@/db'

export const POST: APIRoute = async ({ request }) => {
  const { origin } = new URL(request.url)
  const data = await request.formData()
  const image = await db.setImage(
    data.get('upload') as File,
    `img-${randomUUID()}.webp`
  )

  return new Response(JSON.stringify({ url: `${origin}/assets/${image}` }))
}
