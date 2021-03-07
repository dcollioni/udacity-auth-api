import { Router, Request, Response } from 'express'
import { name, version } from './../../package.json'
import authRouter from './auth.router'

const router: Router = Router()

router.use('/auth', authRouter)

router.get('/', async (_req: Request, res: Response) => {
  res.send(`${name} ${version}`)
})

export default router
