import { FastifyServerOptions } from 'fastify'
import { App } from './src/app'
import config from './src/config'
import { connectDB } from './src/utils/db'

connectDB()
  .then((res) => console.log(`CONNECTED TO ${config.domain} `))
  .catch((err) => console.log(err))

const options: FastifyServerOptions = { logger: true }

App.ready(() => {
  console.log(`host: ${config.host}`)
})

App.listen(config.port)
