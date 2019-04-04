#! /bin/bash
current_dir=$(pwd)
cd bin/smoke_tests
docker-compose up --abort-on-container-exit
cd $current_dir
