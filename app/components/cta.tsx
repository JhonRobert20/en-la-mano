import clsx from 'clsx/lite'
import { Fragment } from 'react'

const steps = [
  ['pencil', 'Ingresá tu cédula y número de celular'],
  ['check', 'Completá el formulario y recibí la aprobación'],
  ['wallet', '¡Ya podés retirar el dinero!']
]

const requirements = [
  'Ciudadano uruguayo',
  'C.I. vigente',
  '4 meses de antigüedad laboral',
  'Si sos trabajador independiente estado de cuenta de tarjeta de crédito',
  'Constancia de domicilio',
  'Último recibo de sueldo, jubilación o pensión',
  'No estar en clearing con financieras'
]

export default function CTA() {
  return (
    <section className="my-20 px-5 text-center sm:px-7 lg:px-8">
      <h2 className="text-7.5 sm:text-10">
        Tu préstamo en{' '}
        <strong className="font-extrabold text-secondary">3 pasos</strong>
      </h2>
      <div className="mt-11 grid justify-center md:grid-flow-col">
        {steps.map(([icon, description], index) => (
          <Fragment key={`CTA-${icon}`}>
            {index !== 0 && (
              <figure className="m-9 rotate-90 md:rotate-0">
                <img
                  src="/icons/chevron.svg"
                  alt=""
                  width="6"
                  height="12"
                  loading="lazy"
                />
              </figure>
            )}
            <article className="grid gap-y-4 justify-center">
              <figure
                className={clsx(
                  'mx-auto size-19 grid place-items-center rounded-full',
                  'border border-secondary'
                )}
              >
                <img src={`/icons/${icon}.svg`} alt="" loading="lazy" />
              </figure>
              <p className="w-42 leading-[1.15]">{description}</p>
            </article>
          </Fragment>
        ))}
      </div>
      <h3 className="mt-21 mb-10 text-2xl">Requisitos</h3>
      <div
        className={clsx(
          'max-w-290.5 mx-auto grid gap-y-4 gap-x-20 px-5 text-lg/[1.125]',
          'text-left sm:(grid-cols-2 justify-center px-7) lg:(grid-cols-3 px-8)',
          'xl:pl-0'
        )}
      >
        <ul
          className={clsx(
            'size-fit grid gap-y-4 pl-1em sm:(ml-auto col-start-2)',
            'lg:col-start-1'
          )}
        >
          {requirements.slice(0, 3).map(requirement => (
            <li className={clsx('[&::marker]:c-warning')} key={requirement}>
              {requirement}
            </li>
          ))}
        </ul>
        <ul
          className={clsx(
            'pl-1em sm:row-start-1 lg:col-(start-2 span-2)',
            'lg:(columns-2 gap-x-20)'
          )}
        >
          {requirements.slice(3).map(requirement => (
            <li
              className={clsx('not-first:mt-4 [&::marker]:c-warning')}
              key={requirement}
            >
              {requirement}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
