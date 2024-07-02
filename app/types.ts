export interface Slide {
  id: string
  cover: string
  paragraph: Array<string | Array<string | { highlighting: string }>>
}
