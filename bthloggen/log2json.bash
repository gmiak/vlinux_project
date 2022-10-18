#!/usr/bin/env bash

#
# Run the first requirement
#
awk -f req1.awk ../access-50k.log # Loads Url and Ip from file
python3 req1_fileTextToJsonFile.py # Loads Url and Ip from Text-file into Json-file (In Json-format)
cp log.json data/
