#! /bin/bash

kubectl apply -f ./kube
./kube/deploy-secret.sh
./kube/deploy-autoscale.sh
