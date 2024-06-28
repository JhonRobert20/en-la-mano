import { IconMenu2 } from '@tabler/icons-react'
import clsx from 'clsx/lite'
import useClickOutside from '~/hooks/use-click-outside'

export default function Header() {
  const { ref, isOpen, toggle } = useClickOutside()

  return (
    <header className="p-5 sm:(py-6 px-7) lg:p-8 xl:px-16">
      <nav
        className={clsx(
          'relative flex justify-between items-center bg-neutral py-3 px-5',
          'rounded-full text-primary sm:px-7 lg:px-8 xl:px-16'
        )}
      >
        <div className="flex items-center gap-x-1.5">
          <button
            className="text-decoration md:hidden"
            type="button"
            onClick={toggle}
          >
            <IconMenu2 className="size-7" />
          </button>
          <img
            className="w-auto h-9 lg:h-12"
            src="/images/logo.webp"
            alt=""
            width="234"
            height="96"
          />
        </div>
        <menu
          ref={ref}
          className={clsx(
            !isOpen && 'hidden',
            'absolute top-full inset-x-0 mt-3 grid gap-3 p-5 pb-6 bg-neutral',
            'rounded-3xl shadow-2xl text-center',
            'md:(static m-0 p-0 flex shadow-none text-3.5)',
            'lg:(gap-x-8 text-4)'
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
