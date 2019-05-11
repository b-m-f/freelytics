#!/bin/bash
until $(curl --output /dev/null --silent --head --fail http://$HOST:$PORT/health)
do
    echo "Waiting for server to start up at http://$HOST:$PORT/health"
    sleep 6
done

cd /
./curls.sh
exit 1
