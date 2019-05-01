FROM openjdk:8-jdk-alpine
MAINTAINER omigost.com

ARG JAR_FILE=./server/build/libs/omigost-server-0.1.0.jar
ARG PROPERTIES_FILE=./deployment/dev/application.properties

COPY ${JAR_FILE} server.jar
COPY ${PROPERTIES_FILE} application.properties

EXPOSE 8080

ENTRYPOINT ["java","-jar","server.jar", "--spring.config.location=./application.properties"]
