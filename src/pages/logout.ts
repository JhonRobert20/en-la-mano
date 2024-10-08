import type { APIRoute } from 'astro'
import { auth } from '@/db'

export const POST: APIRoute = async ({ locals, cookies }) => {
  if (!locals.session) return new Response(null, { status: 401 })

  await auth.invalidateSession(locals.session.id)

  const { name, value, attributes } = auth.createBlankSessionCookie()

  cookies.set(name, value, attributes)

  return new Response()
}
