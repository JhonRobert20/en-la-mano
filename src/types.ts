interface SocialMedia {
  facebook?: string
  instagram?: string
}

type Slide = [string, string]

interface Steps {
  title: string
  list: [string, string][]
  requirements: string[]
}

interface AboutUsData {
  mission: string
  vision: string
  values: string
  other: string[]
}
