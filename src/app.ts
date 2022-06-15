import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import { CustomError } from './utils/error'
import config from './config'

import { routers } from './routers'
import { fastifyYupSchema } from 'fastify-yup-schema'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any
    axios: any
  }
  interface FastifyRequest {
    adminId: string
    prefix: string
    username: string
  }
}
export const App = fastify({ logger: true })

App.register(fastifyYupSchema)
App.register(fastifyCors)

App.register(routers)

App.setErrorHandler((error: any, request, reply) => {
  const { message, code, statusCode, data }: CustomError = error
  reply.status(statusCode || 500).send({
    error: { message, code, data },
  })
})
