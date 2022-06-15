import { FastifyInstance, FastifyRequest } from 'fastify'
import { VerifyAccessToken } from '../Auth/accessToken'
import { AdminInterface } from './admin.schema'

import service from './admin.service'
import validate from './admin.validate'

// CONTROLLER
export const adminController = async (app: App) => {
  const preHandler = [VerifyAccessToken]
  app.post('/', admin.create)
  app.patch('/:id', { preHandler, schema: validate.update }, admin.updateById)
}

const admin = {
  create: async (req: CreateRequest) => {
    const doc = req.body
    return await service.create(doc)
  },
  updateById: async (req: UpdateRequest) => {
    const id = req.params.id
    const doc = req.body
    return await service.updateById(id, doc)
  },
}

// INTERFACE
type App = FastifyInstance

type CreateRequest = FastifyRequest<{ Body: AdminInterface }>

type UpdateRequest = FastifyRequest<{ Params: { id: string }; Body: AdminInterface }>
