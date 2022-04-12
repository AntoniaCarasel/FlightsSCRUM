#!/bin/bash

echo ''
echo '### script.sh ###'
echo ''

FILE=/init
VERSION=1

if [ -e $FILE$VERSION ]
then
  echo '[INFO] Already initialized'
else
  echo '[INFO] Will initialize' 

  mkdir -p /usr/db
  chown oracle /usr/db

  echo "@/docker-entrypoint-initdb.d/init.sq;"        | sqlplus -s system/oracle &> /dev/null
  echo "@/docker-entrypoint-initdb.d/schema_oltp.sq;" | sqlplus -s prod/pass &> /dev/null

  touch $FILE$VERSION
fi

echo '[INFO] Shell script ran successfully'

echo ''
echo '### end of script.sh ###'
echo ''