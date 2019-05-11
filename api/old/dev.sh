#! /bin/bash
current_dir=$(pwd)
cd bin/dev
docker-compose up --build
cd $current_dir
