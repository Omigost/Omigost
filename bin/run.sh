#!/bin/bash

SCRIPT_DIR=`dirname ${BASH_SOURCE[0]}`
cd $SCRIPT_DIR/..

echo "=== Building server ==="
pushd server
./gradlew bootJar
popd

echo "=== Building frontend ==="
pushd frontend
npm run build
popd

echo "=== Building docker image ==="
docker-compose up
