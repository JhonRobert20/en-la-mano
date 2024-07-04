import { IconArrowNarrowRight } from '@tabler/icons-react'
import clsx from 'clsx/lite'

const data = [
  ['products', 'Productos'],
  ['elm', 'Club ELM'],
  ['investment', 'Inversión']
]

export default function Services() {
  return (
    <section
      className={'my-28 px-10 text-center sm:(px-14 mb-36) lg:px-16 xl:px-32'}
    >
      <h2 className="mb-14 text-6.25 sm:text-10">
        Conocé nuestros{' '}
        <strong className="font-extrabold text-secondary">servicios</strong>
      </h2>
      <div className="grid gap-15 lg:grid-cols-3">
        {data.map(([id, label]) => (
          <article className="max-w-100 mx-auto" key={`services-${id}`}>
            <img
              className="mb-4 h-67 object-cover rounded-3xl"
              src={`/images/${id}.webp`}
              alt=""
              loading="lazy"
            />
            <span
              className={
                'relative block py-1.5 border rounded-full font-light text-6'
              }
            >
              {label}
              <figure
                className={clsx(
                  'absolute top-2.5 right-2.5 flex bg-neutral rounded-full',
                  'text-primary'
                )}
              >
                <IconArrowNarrowRight stroke={1.25} width={28} height={28} />
              </figure>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
