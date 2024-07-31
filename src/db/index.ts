import { randomUUID } from 'node:crypto'
import Database from 'better-sqlite3'
import sharp from 'sharp'

const db = new Database('src/db/storage.db')

export default {
  get<T>(key: string, parse = true): T | null {
    const data = db
      .prepare<string, { value: string }>(
        'SELECT value FROM data WHERE key = ?'
      )
      .get(key)

    return !data?.value ? null : parse ? JSON.parse(data.value) : data.value
  },
  set(key: string, value: string) {
    db.prepare(
      'INSERT INTO data (key, value) VALUES (?, ?) ' +
        'ON CONFLICT (key) DO UPDATE SET value = excluded.value'
    ).run(key, value)
  },
  getImage(name: string) {
    return db
      .prepare<string, { data: Buffer }>(
        'SELECT data FROM images WHERE name = ?'
      )
      .get(name)?.data
  },
  async setImage(file: File, name?: string) {
    if (file.type.startsWith('image')) {
      const buffer = await file.arrayBuffer()
      const data = await sharp(buffer).webp().toBuffer()

      if (!name) name = `${randomUUID()}.webp`

      db.prepare(
        'INSERT INTO images (name, data) VALUES (?, ?) ' +
          'ON CONFLICT (name) DO UPDATE SET data = excluded.data'
      ).run(name, data)

      return name
    }
  },
  removeImage(name: string) {
    db.prepare('DELETE FROM images WHERE name = ?').run(name)
  }
}
