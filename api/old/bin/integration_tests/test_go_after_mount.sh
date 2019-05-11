#!/bin/bash
until cd /go/src/api/integration_tests
do
    echo "Waiting for development volume to be mounted to install deps"
done
go get
find . -name '*test.go' | entr go test
