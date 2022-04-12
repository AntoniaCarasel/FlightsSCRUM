FROM openjdk:11-jre-slim

LABEL title="Flight-app" \
  description="Flight application"

ARG VERSION=0.0.1

RUN mkdir -p /usr/app
WORKDIR /usr/app
ADD target/FlightApp-${VERSION}-SNAPSHOT.jar .

RUN apt update
RUN apt install -y curl
RUN curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh > wait.sh
RUN chmod +x wait.sh

EXPOSE 8080

ENTRYPOINT ["/usr/app/wait.sh","oradb:8080","--timeout=0","--strict", "--", "java", "-Doracle.jdbc.timezoneAsRegion=\"false\"", "-Dspring.profiles.active=prod", "-jar", "/usr/app/FlightApp-0.0.1-SNAPSHOT.jar"]