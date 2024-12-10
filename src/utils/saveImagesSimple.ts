import db from '@/db'

export default async function saveImagesSimple(
  data: FormDataEntryValue[]
) {
  
  return Promise.all(
    data.map(async (item, index) => {
      const isFile = item as File;
      const name = isFile.name
      const image = await db.setImage(item as File, name)
      data[index] = image || name

      return data as string[] 
    })
  )
}
