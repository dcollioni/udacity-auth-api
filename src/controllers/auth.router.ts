import { Router, Request, Response } from 'express'
import authService from '../services/auth.service'
import { createLogger } from '../utils/logger'
const logger = createLogger('auth.router')

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const authHeader = req.get('authorization')

  try {
    const token = getToken(authHeader)
    const verifyTokenRequest = { token }
    try {
      const userId = await authService.verifyToken(verifyTokenRequest)
      return res.set('user-id', userId).sendStatus(200)
    } catch (err) {
      logger.error('failed to verify token', err)
      return res.status(401).send('failed to verify token')
    }
  } catch (err) {
    logger.error('failed to get token', err)
    return res.status(401).send(err.message)
  }
})

const getToken = (authHeader: string): string => {
  if (!authHeader) {
    throw new Error('no authentication header')
  }

  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('invalid authentication header')
  }

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}


export default router
