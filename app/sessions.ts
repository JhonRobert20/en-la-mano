import { createCookieSessionStorage } from '@remix-run/node'

const {
  getSession: session,
  commitSession,
  destroySession
} = createCookieSessionStorage()

export function getSession(request: Request) {
  return session(request.headers.get('Cookie'))
}

export { commitSession, destroySession }
