import type { APIRoute } from 'astro'
import { lucia } from '@/utils'

export const POST: APIRoute = async ({ locals, cookies }) => {
  if (!locals.session) return new Response(null, { status: 401 })

  await lucia.invalidateSession(locals.session.id)

  const { name, value, attributes } = lucia.createBlankSessionCookie()

  cookies.set(name, value, attributes)

  return new Response()
}
