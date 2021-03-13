# udacity-auth-api

## run locally
- create a `.env` file in the root with the following:
  ```
  JWKS_URI=...
  JWKS_KID=...
  ```
- run `npm install`
- run `npm run dev`

## run tests
- run `npm run test`

## deploy to kube
- run `./kube/deploy.sh`
