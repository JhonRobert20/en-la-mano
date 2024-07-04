import clsx from 'clsx/lite'

const data = [
  ['map-pin', 'Av Italia 6878 - Montevideo, Uruguay'],
  ['mail', 'contacto@enlamano.com.uy'],
  ['device-mobile', '(+598) 091 866 454'],
  ['phone', '(+598) 2605 4699']
]

const socialMedia = ['facebook', 'instagram']

export default function Footer() {
  return (
    <footer
      className={clsx(
        'p-10 bg-gradient-(linear shape-[88deg]) from-#cbcbcb -from-19.42%',
        'to-(#f4f4f4 122.56%) text-3.75 text-primary',
        'sm:(flex gap-x-20 px-14) lg:(items-center px-16) xl:px-32'
      )}
    >
      <section className="lg:(flex items-center gap-x-16)">
        <figure className="flex justify-center">
          <img
            className="w-auto h-12"
            src="/images/logo.webp"
            alt=""
            width="234"
            height="96"
            loading="lazy"
          />
        </figure>
        <nav
          className={clsx(
            'mt-9 flex flex-col items-center gap-y-3 list-none pt-9 border-t',
            'border-decoration font-sans font-semibold underline',
            'lg:(mt-0 items-start pt-0 pl-16 border-t-0 border-l)'
          )}
        >
          <span>Términos y Condiciones</span>
          <span>Preguntas frecuentes</span>
          <span>Políticas de Privacidad</span>
          <span>Políticas de Seguridad</span>
        </nav>
      </section>
      <section
        className={'w-full h-fit sm:(flex-1 flex items-end justify-between)'}
      >
        <div className="my-14 sm:my-0">
          <h2 className="mb-8 font-semibold text-10/[1]">Contacto</h2>
          <div
            className={
              'grid gap-y-5 font-sans leading-none xl:(grid-cols-2 gap-x-14)'
            }
          >
            {data.map(([id, label], index) => (
              <p
                className={clsx(
                  'flex items-center gap-2',
                  index === 1 && 'xl:row-start-2'
                )}
                key={`contact-${id}`}
              >
                <span className="w-5 flex justify-center">
                  <img src={`/icons/${id}.svg`} alt="" loading="lazy" />
                </span>
                {id === 'mail' ? (
                  <a href={`mailto:${label}`}>{label}</a>
                ) : (
                  label
                )}
              </p>
            ))}
          </div>
        </div>
        <nav className="flex justify-end gap-x-4">
          {socialMedia.map(id => (
            <img
              src={`/icons/${id}.svg`}
              alt=""
              width="27"
              height="27"
              loading="lazy"
              key={id}
            />
          ))}
        </nav>
      </section>
    </footer>
  )
}
