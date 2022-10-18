#!/usr/bin/env python3

from ast import If
import json
from os import path
from click import command
 
filename = "log.json"
listObj = []
 
# Check if file exists
if path.isfile(filename) is False:
  raise Exception("File not found")

# Clean the file
open("filename", "w").close() 
# The file to be coverted to json format
filenameToJson = "req1_tempfile_ip_url.txt"

# dictionary where the lines from text will be stores
dict1 = {}

# creating dictionary and adding it into the list object
with open(filenameToJson) as fh:
    for line in fh:
        if (len(line.strip().split(None, 5)) > 4):
          #split the line by using the space between each blocs
          command, description, theDay, theMonth, theTime = line.strip().split(None, 5)
          dict1 = {
            "ip": command,
            "url": description.strip(),
            "day": theDay.strip(),
            "month": theMonth.strip(),
            "time": theTime.strip()
          }
          # insert the dictionary to the list
          listObj.append(dict1)
 
# Verify updated list
#print(listObj)

# Saving the dictionary into JSON file 
with open(filename, 'w') as json_file:
    json.dump(listObj, json_file, 
                        separators=(',',': '))
 
print("Successfully appended to the JSON file")
print("")