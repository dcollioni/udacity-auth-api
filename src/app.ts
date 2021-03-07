import cors from 'cors'
import bodyParser from 'body-parser'
import express, { Express } from 'express'
import indexRouter from './controllers/index.router'

const app = (): Express => {
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  app.use(indexRouter)
  return app
}

export default app
