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

interface ClaimsData {
  description: string
  content: string
}

interface FrequentQuestionsData {
  description: string
  questions: string[][]
}

interface RequestForm {
  title: string
  description: string
}

interface Status extends RequestForm {}
