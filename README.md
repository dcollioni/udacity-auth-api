# udacity-auth-api

## run locally
1. create a `.env` file in the root with the following:
  ```
  JWKS_URI="uri"
  JWKS_KID="kid"
  ```
2. run `npm install`
3. run `npm run dev`

## run tests
1. run `npm run test`

## deploy to kube
1. run `kubectl apply -f ./kube`
2. run `./deploy-secret.sh`
2. run `./deploy-autoscale.sh`
