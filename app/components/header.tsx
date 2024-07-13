import { IconMenu2 } from '@tabler/icons-react'
import clsx from 'clsx/lite'
import useClickOutside from '~/lib/hooks/use-click-outside'

export default function Header() {
  const menu = useClickOutside()

  return (
    <header
      className={clsx(
        'sticky top-0 z-20 p-5 animate-scroll-fit-20 sm:(py-6 px-7) lg:p-8',
        'xl:px-16'
      )}
    >
      <nav
        className={clsx(
          'flex justify-between items-center bg-neutral py-3 px-5',
          'rounded-full text-primary animate-scroll-inherit-colors-10',
          'sm:px-7 lg:px-8 xl:px-16'
        )}
      >
        <div className="flex items-center gap-x-1.5">
          <button
            className={clsx(
              'text-decoration animate-scroll-inherit-colors-12 md:hidden',
              '-translate-x-0.5'
            )}
            type="button"
            onClick={menu.toggle}
          >
            <IconMenu2 className="size-7" />
          </button>
          <figure
            className={clsx(
              'w-22 h-9 bg-[url(/images/logo.webp)] bg-cover',
              'animate-scroll-whiten-bg-10 lg:(w-29.25 h-12)'
            )}
          />
        </div>
        <menu
          ref={menu.ref}
          className={clsx(
            !menu.isOpen && 'hidden',
            'absolute top-full inset-x-5 z-10 mt-2 grid gap-3 p-5 pb-6',
            'bg-neutral rounded-3xl shadow-2xl text-center text-primary',
            'md:(static m-0 p-0 flex bg-transparent shadow-none text-3.5)',
            'md:text-inherit lg:(gap-x-8 text-4)'
          )}
        >
          <li className="text-warning font-bold">Inicio</li>
          <li>Club ELM</li>
          <li>Promociones</li>
          <li>Productos</li>
          <li>Quiénes somos</li>
        </menu>
        <div className="flex gap-x-3 text-3.5 lg:(gap-x-8 text-4)">
          <span>Ayuda</span>
          <span>Contacto</span>
        </div>
      </nav>
    </header>
  )
}
