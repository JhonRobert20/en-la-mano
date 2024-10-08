/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    session: import('lucia').Session | null
    user: import('lucia').User | null
  }
}

interface ImportMetaEnv {
  readonly API_URL: string
  readonly CONSUMER_KEY: string
  readonly CONSUMER_SECRET: string
  readonly TOKEN: string
  readonly TOKEN_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
