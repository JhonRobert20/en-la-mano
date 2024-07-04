import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import clsx from 'clsx/lite'
import 'virtual:uno.css'
import Footer from './components/footer'
import Header from './components/header'

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={clsx(
          'bg-gradient-(linear shape-[108deg]) from-#b84df5 -from-18.5%',
          'via-(decoration 34%) to-(primary 88.5%) text-neutral'
        )}
      >
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
