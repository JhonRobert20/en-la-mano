import { defineMiddleware } from 'astro:middleware'
import { auth } from './db'

export const onRequest = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get(auth.sessionCookieName)?.value ?? null

  if (sessionId) {
    const { session, user } = await auth.validateSession(sessionId)
    const { name, value, attributes } = session
      ? auth.createSessionCookie(sessionId)
      : auth.createBlankSessionCookie()

    context.cookies.set(name, value, attributes)

    context.locals.session = session
    context.locals.user = user

    if (context.url.pathname === '/login') return context.redirect('/admin')
  } else {
    context.locals.session = null
    context.locals.user = null

    if (context.url.pathname.startsWith('/admin')) {
      return context.redirect('/login')
    }
  }

  return next()
})
