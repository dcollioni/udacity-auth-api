import request, { Response } from 'supertest'
import app from './../../src/app'
import authService from './../../src/services/auth.service'

afterEach(() => {
  jest.clearAllMocks()
})

describe('routes', () => {
  describe('GET /auth', () => {
    const path = '/auth'
    describe('given a correctly formatted authorization header', () => {
      const authorization = 'bearer token'
      const validateTokenRequest = { token: 'token' }
      describe('given auth service returns a userId', () => {
        const mockUserId = 'google|abc123'
        let spyAuthService: jest.SpyInstance, response: Response
        beforeEach(async () => {
          spyAuthService = jest.spyOn(authService, 'verifyToken').mockResolvedValueOnce(mockUserId)
          response = await request(app()).get(path).set('authorization', authorization)
        })
        it('should validate token using auth service', async () => {
          expect(spyAuthService).toHaveBeenNthCalledWith(1, validateTokenRequest)
        })
        it('should return status 200', async () => {
          expect(response.status).toEqual(200)
        })
        it('should return user-id in the response header', async () => {
          expect(response.get('user-id')).toEqual(mockUserId)
        })
      })
      describe('given auth service rejects with exception', () => {
        const mockError = new Error('invalid token')
        let response: Response
        beforeEach(async () => {
          jest.spyOn(authService, 'verifyToken').mockRejectedValueOnce(mockError)
          response = await request(app()).get(path).set('authorization', authorization)
        })
        it('should return status 401', async () => {
          expect(response.status).toEqual(401)
        })
      })
    })
    describe('given no authorization header', () => {
      it('should return status 401', async () => {
        const response = await request(app()).get(path)
        expect(response.status).toEqual(401)
      })
    })
    describe('given an incorrectly formatted authorization header', () => {
      const authorization = 'bearer_token'
      it('should return status 401', async () => {
        const response = await request(app()).get(path).set('authorization', authorization)
        expect(response.status).toEqual(401)
      })
    })
  })
})
