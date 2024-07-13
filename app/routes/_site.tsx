import { Outlet } from '@remix-run/react'
import Footer from '~/components/footer'
import Header from '~/components/header'

export default function Site() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
