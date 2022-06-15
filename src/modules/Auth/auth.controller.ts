import { FastifyInstance, FastifyRequest } from 'fastify'
import { AdminInterface } from '../Admins/admin.schema'
import adminService from '../Admins/admin.service'
import { VerifyAccessToken } from './accessToken'
import authService from './auth.service'

// CONTROLLER
export const authController = async (app: App) => {
  const preHandler = [VerifyAccessToken]

  app.post('/login', auth.login)
  app.post('/logout', auth.logout)
  app.post('/verify', { preHandler }, auth.verify)
}

const auth = {
  create: async (req: CreateRequest) => {
    const doc = req.body
    return await adminService.create(doc)
  },
  getAdmin: async (req: FastifyRequest) => {
    const id = req.adminId
    return await adminService.findById(id)
  },
  login: async (req: LoginRequest) => {
    const { username, password } = req.body
    return await authService.login(username, password)
  },
  logout: async (req: FastifyRequest) => {
    const token = req.adminId
    return await authService.logout(token)
  },
  verify: async (req: FastifyRequest) => {
    const id = req.adminId
    return await adminService.findById(id)
  },
}

// INTERFACE
type App = FastifyInstance

type CreateRequest = FastifyRequest<{ Body: AdminInterface }>

type LoginRequest = FastifyRequest<{ Body: { username: string; password: string } }>
