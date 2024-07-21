import { collection, config, fields, singleton } from '@keystatic/core'
import { createElement } from 'react'

const options = { code: false, codeBlock: false, table: false, image: false }

function image(label: string, path = '', formats = 'WEBP, PNG y JPG') {
  return fields.image({
    label,
    description: `Formatos aceptados: ${formats}`,
    directory: `src/assets${path}`,
    publicPath: `/src/assets${path}`,
    validation: { isRequired: true }
  })
}

function banner(page: string) {
  return singleton({
    label: 'Banner',
    path: `src/data/banners/${page}`,
    format: { data: 'json' },
    schema: { [page]: image('Banner', `/banners`) }
  })
}

export default config({
  storage: { kind: 'local' },
  locale: 'es-ES',
  collections: {
    slides: collection({
      label: 'Carrusel',
      path: 'src/data/slides/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Posición y nombre',
            description: 'Ej: 1 Dale vida a tus proyectos'
          }
        }),
        cover: image('Imagen', '/slides'),
        content: fields.markdoc({
          label: 'Contenido',
          options: { heading: false, ...options },
          extension: 'md'
        })
      },
      slugField: 'name'
    })
  },
  singletons: {
    logo: singleton({
      label: 'Logo',
      path: 'src/data/logo',
      format: { data: 'json' },
      schema: { dark: image('Normal', '/logo'), light: image('Claro', '/logo') }
    }),
    'social-media': singleton({
      label: 'Redes Sociales',
      path: 'src/data/social-media',
      format: { data: 'json' },
      schema: {
        facebook: fields.url({
          label: 'Facebook',
          description: 'URL del perfil'
        }),
        instagram: fields.text({ label: 'Instagram', description: 'Usuario' })
      }
    }),
    'inicio-form': singleton({
      label: 'Formulario',
      path: 'src/data/forms/inicio',
      format: { contentField: 'content' },
      schema: {
        content: fields.markdoc({
          label: 'Contenido',
          options,
          extension: 'md'
        })
      }
    }),
    cta: singleton({
      label: 'CTA',
      path: 'src/data/cta',
      format: { contentField: 'title' },
      schema: {
        title: fields.markdoc({ label: 'Título', options, extension: 'md' }),
        steps: fields.array(
          fields.object({
            icon: image('Icono', '', 'WEBP, PNG y SVG'),
            description: fields.text({
              label: 'Descripción',
              multiline: true,
              validation: { isRequired: true }
            })
          }),
          { label: 'Pasos' }
        ),
        requirements: fields.array(fields.text({ label: 'Requisito' }), {
          label: 'Requisitos'
        })
      }
    }),
    'promociones-banner': banner('promociones'),
    'quienes-somos-banner': banner('quienes-somos'),
    'reclamos-banner': banner('reclamos'),
    'contacto-banner': banner('contacto')
  },
  ui: {
    brand: {
      name: 'En La Mano',
      mark: ({ colorScheme }) => {
        return createElement('img', {
          src: `/images/mark${colorScheme === 'dark' ? '-light' : ''}.webp`,
          width: 16,
          height: 24
        })
      }
    },
    navigation: {
      general: ['logo', 'social-media'],
      inicio: ['slides', 'inicio-form', 'cta'],
      promociones: ['promociones-banner'],
      'quiénes somos': ['quienes-somos-banner'],
      reclamos: ['reclamos-banner'],
      contacto: ['contacto-banner']
    }
  }
})
