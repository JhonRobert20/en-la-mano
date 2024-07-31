import type { APIRoute } from 'astro'
import db from '@/db'

export const GET: APIRoute = async ({ params }) => {
  if (params.name) {
    const image = db.getImage(`${params.name}`)

    if (image) {
      return new Response(image, { headers: { 'Content-Type': 'image/webp' } })
    }
  }

  return new Response(null, { status: 404, statusText: 'Not found' })
}
