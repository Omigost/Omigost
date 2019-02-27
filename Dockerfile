FROM openjdk:8-jdk-alpine
MAINTAINER omigost.com

ARG JAR_FILE=server/build/libs/omigost-server-0.1.0.jar
ARG FRONTEND=frontend/dist

COPY ${JAR_FILE} server.jar
COPY ${FRONTEND} frontend/

ENTRYPOINT ["java","-jar","server.jar"]
