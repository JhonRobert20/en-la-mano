import remove from 'just-remove'
import db from '@/db'

export default function removeOrphanImages(
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
