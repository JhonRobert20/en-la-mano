import { defineAction } from 'astro:actions'
import { Request } from '@/utils/request'
import { format } from '@formkit/tempo'

interface Response {
  docNumber: string
  success: boolean
  result: string
}

export const server = {
  requestCash: defineAction({
    accept: 'form',
    async handler(input) {
      const request = new Request('POST', 36, input)
      const response = await request.run<Response>()

      return response
    }
  }),
  confirmRequest: defineAction({
    accept: 'form',
    async handler(input) {
      input.set(
        'dateOfBirth',
        format(input.get('dateOfBirth') as string, 'DD/MM/YYYY')
      )

      input.set(
        'workStartDate',
        format(input.get('workStartDate') as string, 'DD/MM/YYYY')
      )

      const request = new Request('POST', 37, input)
      const response = await request.run<Response>()

      return response
    },

  })
}
