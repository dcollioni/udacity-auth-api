import { VerifyTokenRequest } from '../../src/requests/auth.requests'
import authService from './../../src/services/auth.service'
import JwtPayload from './../../src/models/JwtPayload'
import { JwksClient } from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import config from './../../src/config'

beforeEach(() => {
  config.jwksUri = 'uri'
  config.jwksKid = 'kid'
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('auth.service', () => {
  it('should exist', () => {
    expect(authService).toBeDefined()
  })
  describe('veirfyToken', () => {
    describe('given a validate token request', () => {
      const request: VerifyTokenRequest = { token: 'token' }
      describe('given the jwks client returns the public key', () => {
        const mockPublicKey = 'pubKey'
        const mockKey = { getPublicKey: () => { return mockPublicKey }, alg: 'RS256' }
        let spyJwksClient: jest.SpyInstance
        beforeEach(() => {
          spyJwksClient = jest.spyOn(JwksClient.prototype, 'getSigningKeyAsync').mockResolvedValueOnce(mockKey as never)
        })
        describe('given jwt verifies the token and returns the decoded token', () => {
          const mockDecodedToken: JwtPayload = { sub: 'google|abc123', exp: 1, iat: 1, iss: '' }
          let spyJwtVerify: jest.SpyInstance, userId: string
          beforeEach(async () => {
            spyJwtVerify = jest.spyOn(jwt, 'verify').mockReturnValueOnce(mockDecodedToken as never)
            userId = await authService.verifyToken(request)
          })
          it('should call jwks client to get public key', async () => {
            expect(spyJwksClient).toHaveBeenNthCalledWith(1, config.jwksKid)
          })
          it('should call jwt to verify token', async () => {
            expect(spyJwtVerify).toHaveBeenNthCalledWith(1, request.token, mockPublicKey, { algorithms: [mockKey.alg] })
          })
          it('should return userId from decoded token', async () => {
            expect(userId).toBe(mockDecodedToken.sub)
          })
        })
        describe('given jwt throws an exception', () => {
          const mockError = new Error('failed to verify token')
          beforeEach(async () => {
            jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw mockError })
          })
          it('should reject with the exception', async () => {
            await expect(authService.verifyToken(request)).rejects.toBe(mockError)
          })
        })
      })
      describe('given the jwks client rejects with exception', () => {
        const mockError = new Error('failed to get signing key')
        beforeEach(() => {
          jest.spyOn(JwksClient.prototype, 'getSigningKeyAsync').mockRejectedValueOnce(mockError)
        })
        it('should reject with the exception', async () => {
          await expect(authService.verifyToken(request)).rejects.toBe(mockError)
        })
      })
    })
  })
})
