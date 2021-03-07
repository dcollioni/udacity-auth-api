import config from './config'
import app from './app'

const startServer = () => {
  const server = app()

  server
    .listen(config.port, () => {
      console.log(`Server listening on port: ${config.port}`)
    })
    .on('error', err => {
      console.error(err)
      process.exit(1)
    })
}

startServer()
