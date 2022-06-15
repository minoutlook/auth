import { FastifyInstance, FastifyRequest } from 'fastify'
import { adminController } from '../modules/Admins/admin.controller'
import { authController } from '../modules/Auth/auth.controller'

export const routers = async (app: FastifyInstance) => {
  app.get('/', async (req: FastifyRequest) => {
    return { server: 'auth service' }
  })
  app.register(authController, { prefix: '/auth' })
  app.register(adminController, { prefix: '/admin' })
}
