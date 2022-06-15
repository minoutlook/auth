import { FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import config from '../../config'
import customError from '../../utils/error'
import adminService from '../Admins/admin.service'

interface AccessTokenDecoded {
  aud: string
  exp: number
  iat: number
  id: string
  username: string
  versionToken: number
}

const authMessage = {
  // Error
  AuthMissingHeaders: { message: 'ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง', code: '99' },
  AuthJWTError: { message: 'กรุณาล๊อกอินใหม่อีกครั้ง', code: '99' },
}

const validateHeadersAuth = (request: FastifyRequest): string => {
  const authToken: string | undefined = request.headers['authorization']
  if (!authToken) {
    return customError(authMessage.AuthMissingHeaders)
  }
  const accessToken = authToken.split(' ')[1]
  if (!accessToken) {
    customError(authMessage.AuthMissingHeaders)
  }
  return accessToken
}

export const createAccessToken = (payload: any) => {
  const accessToken = jwt.sign(payload, `${config.secret.accessToken}`, { expiresIn: '1h' })
  return { accessToken }
}

export const VerifyAccessToken = async (request: FastifyRequest): Promise<boolean> => {
  try {
    const accessToken = validateHeadersAuth(request)
    jwt.decode(accessToken)

    const verify: AccessTokenDecoded = Object(jwt.verify(accessToken, `${config.secret.accessToken}`))
    // console.log(verify)

    request.adminId = verify.id
    request.username = verify.username

    // check verify token
    const admin = await adminService.findById(verify.id)
    if (verify.versionToken !== admin.result.versionToken) return customError(authMessage.AuthJWTError)

    return true
  } catch (error) {
    return customError(authMessage.AuthJWTError)
  }
}

export default {
  createAccessToken,
  VerifyAccessToken,
}
