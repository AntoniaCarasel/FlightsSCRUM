@ECHO OFF
call mvn package
call docker build -t flightapp .
call docker-compose up -d