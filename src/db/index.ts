import { randomUUID } from 'node:crypto'
import Database from 'better-sqlite3'
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import sharp from 'sharp'

const db = new Database('src/db/storage.db')

export default {
  adapter: new BetterSqlite3Adapter(db, { user: 'user', session: 'session' }),
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
  getUser() {
    return db
      .prepare<string, { id: string; username: string; hash: string }>(
        'SELECT * FROM user WHERE id = ?'
      )
      .get('admin')
  },
  setUser(username: string, hash: string) {
    db.prepare('INSERT INTO user (id, username, hash) VALUES (?, ?, ?)').run(
      'admin',
      username,
      hash
    )
  },
  getImage(name: string) {
    return db
      .prepare<string, { data: Buffer }>(
        'SELECT data FROM images WHERE name = ?'
      )
      .get(name)?.data
  },
  getImages() {
    return db
      .prepare<[], { name: string }>(
        "SELECT name From images"
      )
      .all()
      .map(({ name }) => `/assets/${name}`)
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
