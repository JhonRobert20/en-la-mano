import { createHmac, createSecretKey, randomBytes } from 'node:crypto'

const { CONSUMER_KEY, TOKEN, CONSUMER_SECRET, TOKEN_SECRET } = import.meta.env

export class Request {
  #method
  #url = 'https://7564430.restlets.api.netsuite.com/app/site/hosting/restlet.nl'
  #script
  #deploy = 'deploy=1'
  #params: [string, string | number][] = [
    ['oauth_consumer_key', CONSUMER_KEY],
    ['oauth_token', TOKEN],
    ['oauth_signature_method', 'HMAC-SHA256'],
    ['oauth_timestamp', Math.round(Date.now() / 1000)],
    ['oauth_nonce', randomBytes(10).toString('hex')]
  ]
  #body

  get #signature() {
    return encodeURIComponent(
      createHmac(
        'sha256',
        createSecretKey(`${CONSUMER_SECRET}&${TOKEN_SECRET}`, 'utf8')
      )
        .update(
          [
            this.#method,
            encodeURIComponent(this.#url),
            encodeURIComponent(
              `${this.#deploy}&${this.#params
                .map(param => param.join('='))
                .sort()
                .join('&')}&${this.#script}`
            )
          ].join('&')
        )
        .digest('base64')
    )
  }

  constructor(method: string, script: number, formData?: FormData) {
    this.#method = method
    this.#script = `script=${script}`
    this.#params.push(['oauth_signature', this.#signature])
    this.#body = formData && JSON.stringify(Object.fromEntries(formData))
  }

  async run<T>(): Promise<T> {
    return fetch(`${this.#url}?${this.#script}&${this.#deploy}`, {
      method: this.#method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `OAuth realm="7564430",${this.#params
          .map(param => `${param.join('="')}"`)
          .join()}`
      },
      body: this.#body
    }).then(response => response.json())
  }
}
