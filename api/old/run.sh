#! /bin/bash
current_dir=$(pwd)
cp -rf main.go bin/prod
cd bin/prod
docker-compose up --build
cd $current_dir
