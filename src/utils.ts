import { Lucia } from 'lucia'
import split from 'just-split'
import remove from 'just-remove'
import db from './db'

export const lucia = new Lucia(db.adapter, {
  sessionCookie: { attributes: { secure: false } }
})

export async function saveImages(
  data: FormDataEntryValue[],
  inputs: number,
  imageIndex: number,
  names: string[]
) {
  return Promise.all(
    split(data, inputs).map(async (data, index) => {
      const name = names[index]
      const image = await db.setImage(data[imageIndex] as File, name)

      data[imageIndex] = image || name

      return data as string[]
    })
  )
}

export function removeOrphanImages(
  previous: any[][],
  current: any[][],
  indexes: number[]
) {
  const images = (data: string[], index: number) => {
    return data.map(values => values[indexes[index]])
  }

  for (const name of remove(
    previous.flatMap(images),
    current.flatMap(images)
  )) {
    db.removeImage(name)
  }
}
