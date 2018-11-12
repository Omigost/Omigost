FROM openjdk:12-jdk-alpine
MAINTAINER omigost.com
ARG JAR_FILE=build/libs/omigost-server-0.1.0.jar
COPY ${JAR_FILE} server.jar
ENTRYPOINT ["java","-jar","server.jar"]