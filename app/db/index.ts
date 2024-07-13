import sqlite3 from 'sqlite3'

const database = new sqlite3.Database('./app/db/storage.db')

export default {
  get<T>(key: string, parse?: boolean) {
    return new Promise<T | null>((resolve, reject) => {
      database.get(
        'SELECT value FROM storage WHERE key = ?',
        [key],
        (err, row?: { value: string }) => {
          if (err) reject(err)

          resolve(!row ? null : parse ? JSON.parse(row.value) : row.value)
        }
      )
    })
  },
  set(key: string, value: string) {
    return new Promise<void>((resolve, reject) => {
      database.run(
        'INSERT INTO storage(key, value) VALUES(?, ?) ' +
          'ON CONFLICT(key) DO UPDATE SET value = excluded.value',
        [key, value],
        err => {
          if (err) reject(err)

          resolve()
        }
      )
    })
  }
}
