#! /bin/bash
current_dir=$(pwd)
cd bin/integration_tests
docker-compose up --build --abort-on-container-exit
cd $current_dir
