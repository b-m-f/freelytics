#! /bin/bash

curl --fail -X POST -H "Content-Type: application/json" --data '{"url":"http://maximilianehlers.com/hello"}' http://$HOST:$PORT/save

curl http://$HOST:$PORT/get/maximilianehlers.com

# test here that the return is what we expect
