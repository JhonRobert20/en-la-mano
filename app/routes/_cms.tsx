import {
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect
} from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getSession } from '~/sessions'

export const meta: MetaFunction = () => [{ title: 'CMS' }]

export async function loader({ request }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url)
  const session = await getSession(request)
  const hasAdmin = session.has('admin')

  if (pathname === '/login') return hasAdmin ? redirect('/admin') : null

  return !hasAdmin ? redirect('/login') : null
}

export default function CMS() {
  return <Outlet />
}
