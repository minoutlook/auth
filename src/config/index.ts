const name = 'AUTH SERVER '
const port = process.env.PORT || 8000
const domain = name + ' RUN PORT' + port

const config = {
  domain,
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'http://localhost:' + port,
  port,
  mongodb: {
    uri: process.env.MONGO_URI || 'mongodb+srv://user:user@oz.fawen.mongodb.net/test',
  },
  secret: {
    accessToken: process.env.SECRET_ACCESS_TOKEN || 'test',
    cookie: process.env.SECRET_COOKIE || 'test',
  },
}

export default config
