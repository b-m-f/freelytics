#! /bin/bash

curl -X POST -H "Content-Type: application/json" --data '{"url":"http://ehler.berlin/hello"}' http://$HOST:$PORT/save

curl http://$HOST:$PORT/get/ehler.berlin
