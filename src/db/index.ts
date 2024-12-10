import { randomUUID } from 'node:crypto'
import { Lucia } from 'lucia'
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import Database from 'better-sqlite3'
import sharp from 'sharp'

const db = new Database('src/db/storage.db')

export const auth = new Lucia(
  new BetterSqlite3Adapter(db, { user: 'user', session: 'session' }),
  { sessionCookie: { attributes: { secure: false } } }
)

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
  getUser() {
    return db
      .prepare<string, { id: string; username: string; hash: string }>(
        'SELECT * FROM user WHERE id = ?'
      )
      .get('admin')
  },
  updatePromotions() {
    let existingPromotions = this.get<string>('promociones', false);
  
    console.log('Valor recuperado de promociones:', existingPromotions);
  
    // Si es un string, intentamos convertirlo en un array JSON
    if (typeof existingPromotions === 'string') {
      try {
        existingPromotions = JSON.parse(existingPromotions);
      } catch (error) {
        console.error('Error al analizar JSON de promociones:', error);
        existingPromotions = []; // Si no se puede analizar, inicializamos como array vacío
      }
    }
  
    // Verificar que es un array
    if (!Array.isArray(existingPromotions)) {
      console.error('El valor de promociones no es un array. Valor recibido:', existingPromotions);
      existingPromotions = []; // Si no es un array, inicializamos como array vacío
    }
  
    // Ahora podemos realizar el `map` porque sabemos que es un array
    const updatedPromotions = existingPromotions.map(([title, banner, content]) => [
      title,
      banner,
      banner, // Nueva columna para "miniature"
      content,
    ]);
  
    // Guardamos las promociones actualizadas
    this.set('promociones', JSON.stringify(updatedPromotions));
  
    console.log('Promociones actualizadas:', updatedPromotions);
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
      .prepare<[], { name: string }>('SELECT name From images')
      .all()
      .map(({ name }) => `/assets/${name}`)
  },
  async setImage(file: File, name?: string) {
    if (file.type?.startsWith('image')) {
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
