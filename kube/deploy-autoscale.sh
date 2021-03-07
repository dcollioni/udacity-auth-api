#! /bin/bash

kubectl autoscale deployment udacity-auth-api --name udacity-auth-api-hpa --cpu-percent=50 --min=1 --max=2
