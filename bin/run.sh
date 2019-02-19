#!/bin/bash
# Build the whole repository and run it.
# Java backend with Gradle and JavaScript with npm.
# Put both components in docker container and start it along with PostgreSQL.

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
