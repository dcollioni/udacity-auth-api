import { JwksClient } from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import { VerifyTokenRequest } from '../requests/auth.requests'
import JwtPayload from '../models/JwtPayload'
import config from './../config'

const verifyToken = async (request: VerifyTokenRequest): Promise<string> => {
  const { token } = request
  const { jwksUri, jwksKid } = config

  const client = new JwksClient({ jwksUri })
  const key = await client.getSigningKeyAsync(jwksKid)
  const alg = key.alg as jwt.Algorithm
  const signingKey = key.getPublicKey()

  const decodedToken = jwt.verify(token, signingKey, { algorithms: [alg] }) as JwtPayload
  const { sub: userId } = decodedToken
  return userId
}

const authService = { verifyToken }
export default authService
