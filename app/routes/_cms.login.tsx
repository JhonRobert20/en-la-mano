import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation
} from '@remix-run/react'
import clsx from 'clsx/lite'
import db from '~/db'
import { encrypt, verify } from '~/lib/utils/password'
import { commitSession, getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const [session, formData, admin] = await Promise.all([
    getSession(request),
    request.formData(),
    db.get<{ username: string; password: string }>('admin', true)
  ])

  const data = Object.fromEntries(formData as Iterable<[string, string]>)

  if (!admin) {
    const password = await encrypt(data.password)

    await db.set('admin', JSON.stringify({ username: data.username, password }))

    session.set('admin', data.username)

    return redirect('/admin', {
      headers: { 'Set-Cookie': await commitSession(session) }
    })
  }

  if (admin.username === data.username) {
    const matches = await verify(data.password, admin.password)

    if (matches) {
      session.set('admin', admin.username)

      return redirect('/admin', {
        headers: { 'Set-Cookie': await commitSession(session) }
      })
    }
  }

  return 'Usuario y/o contraseña incorrectos.'
}

export async function loader() {
  const admin = await db.get('admin')

  return admin !== null
}

export default function Login() {
  const hasAdmin = useLoaderData<typeof loader>()
  const error = useActionData<typeof action>()
  const { formAction } = useNavigation()
  const isLoading = formAction === '/login'

  return (
    <main className="h-svh grid place-items-center p-5">
      <Form
        className={clsx(
          'w-full max-w-sm grid px-5 pt-6 pb-7 bg-neutral rounded-2xl',
          'shadow-2xl text-primary'
        )}
        method="post"
      >
        <img
          className="mb-6 mx-auto w-40"
          src="/images/logo.webp"
          alt=""
          width="234"
          height="96"
        />
        <input type="text" name="username" placeholder="Usuario" />
        <input
          className="mt-3"
          type="password"
          name="password"
          placeholder="Contraseña"
        />
        {!isLoading && error && (
          <p className="mt-1 text-right fon-sans text-sm text-decoration">
            {error}
          </p>
        )}
        <button
          className={clsx(
            'mt-3 bg-warning p-2 rounded-full font-semibold text-neutral',
            'tracking-wide transition-colors hover:bg-warning/90',
            'disabled:bg-warning/60'
          )}
          type="submit"
          disabled={isLoading}
        >
          {hasAdmin ? 'Iniciar Sesión' : 'Crear cuenta'}
        </button>
      </Form>
    </main>
  )
}
