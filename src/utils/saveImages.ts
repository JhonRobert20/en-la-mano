import split from 'just-split'
import db from '@/db'

export default async function saveImages(
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
