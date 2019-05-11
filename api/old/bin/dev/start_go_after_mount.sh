#!/bin/bash
until cd /go/src/api 
do
    echo "Waiting for development volume to be mounted to install deps"
done
go get

fresh
