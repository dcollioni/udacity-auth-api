#! /bin/bash

kubectl delete secret udacity-auth-api-secret
kubectl create secret generic udacity-auth-api-secret --from-env-file=.env
