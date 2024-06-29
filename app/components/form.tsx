import { IconArrowNarrowRight } from '@tabler/icons-react'
import clsx from 'clsx/lite'

export default function Form() {
  return (
    <div
      className={clsx(
        'max-w-83.75 mx-auto my-5 p-8 bg-neutral rounded-3xl text-primary',
        'sm:(mr-7 w-48%) lg:mr-8 xl:mr-16'
      )}
    >
      <h1 className="leading-none">
        Solicitá efectivo{' '}
        <strong
          className={'block mt-4 mb-1.5 font-extrabold text-10 text-balance'}
        >
          De $5.000 a $250.000
        </strong>{' '}
        hasta en 24 cuotas
      </h1>
      <form className="mt-10 w-61">
        <input type="number" placeholder="Cédula (sin puntos ni guiones)" />
        <input className="mt-3 mb-5" type="number" placeholder="Celular" />
        <label className="mb-8 flex gap-x-2 text-xs">
          <input className="mt-0.5 flex-shrink-0" type="checkbox" />
          <span className="[&_strong]:font-semibold">
            Leí y acepto los <strong>Términos y Condiciones</strong> y{' '}
            <strong>Política de Privacidad</strong> sujeto a aprobación
            política.
          </span>
        </label>
        <button
          className={clsx(
            'flex gap-x-3 bg-warning py-2 pl-5 pr-2.5 rounded-full',
            'text-neutral'
          )}
          type="submit"
        >
          Solicitar efectivo
          <figure className="bg-neutral rounded-full text-warning">
            <IconArrowNarrowRight />
          </figure>
        </button>
      </form>
    </div>
  )
}
