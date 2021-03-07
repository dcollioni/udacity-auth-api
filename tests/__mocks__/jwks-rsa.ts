class JwksClient {
  jwksUri: string
  constructor(jwksUri: string) {
    this.jwksUri = jwksUri
  }
  getSigningKeyAsync (): void {
    jest.fn()
  }
}

const jwksRsa = {
  JwksClient
}

export = jwksRsa
