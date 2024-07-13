import { randomBytes, scrypt } from 'node:crypto'

export function encrypt(password: string) {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16)

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)

      resolve(`${salt.toString('hex')}:${derivedKey.toString('hex')}`)
    })
  })
}

export function verify(password: string, hashedPassword: string) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashedPassword.split(':')

    scrypt(password, Buffer.from(salt, 'hex'), 64, (err, derivedKey) => {
      if (err) reject(err)

      resolve(key === derivedKey.toString('hex'))
    })
  })
}
