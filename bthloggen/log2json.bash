#!/usr/bin/env bash

#
# Initializing
#
awk -f req1.awk ../access-50k.log # Loads Url and Ip from file
python3 req1_fileTextToJsonFile.py # Loads Url and Ip from Text-file into Json-file (In Json-format)
cp log.json data/

#
# Starting server, client and web client service
#
docker-compose up -d server
docker-compose up -d webbclient
docker-compose run client

#
# Close server, client and web client service
#
docker-compose down
