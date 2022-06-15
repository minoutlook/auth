export class CustomError extends Error {
  code?: string
  statusCode?: number
  data?: object

  constructor(message: string, code?: string, statusCode: number = 500, data?: object) {
    super(message)

    this.name = 'CustomError'
    this.message = message
    this.code = code
    this.statusCode = statusCode
    this.data = data
  }
}

export type CustomErrorParams = {
  message: string
  code?: string
  statusCode?: number
  data?: object
}
const customError = ({ message, code, statusCode = 400, data }: CustomErrorParams) => {
  throw new CustomError(message, code, statusCode, data)
}

export const handleResponseError = (error: any) => {
  console.log(error.code)
  if (error.code == 'ECONNREFUSED') return customError({ message: 'กรุณาเรียก API ใหม่', code: '99' })

  if (error?.response?.data?.error) {
    throw error.response.data.error
  }
  throw error
}

export default customError
