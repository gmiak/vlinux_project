#!/usr/bin/env awk

#
# Formates url from file as e.g,
# http://www.123abc.com or https://www.123abc.com
#
function urlFormated(inputstring) {
    split(inputstring, outputarray, "/")
    url1 = outputarray[1]
    if (url1 ~ /http:/) {
        url1 = "http://"
    }
    if (url1 ~ /https:/) {
        url1 = "https://"
    }

    url2 = outputarray[3]
    split(url2, chars, "")
    sliceIndex = 0
    startIndex = length(url2)
    while (chars[startIndex] ~ /[^a-zA-Z\d\s:]/) {
        sliceIndex++
        startIndex--
    }
    url2 = substr(url2, 1, length(url2)-sliceIndex)
    returnString = url1""url2
    
    return returnString
}

#
# Formates and returns day from string
#
function dayFormated(inputstring) {
    split(inputstring, outputarray, "/")
    string1 = outputarray[1]
    string1 = substr(string1, 2, length(string1))
    return string1
}

#
# Formates and returns month from string
#
function monthFormated(inputstring) {
    split(inputstring, outputarray, "/")
    string1 = outputarray[2]
    return string1
}

#
# Formates and returns time from string
#
function timeFormated(inputstring) {
    split(inputstring, outputarray, ":")
    string1 = outputarray[2]
    string2 = outputarray[3]
    string3 = outputarray[4]
    return string1":"string2":"string3
}


BEGIN {
	FS=" " 
	OFS="\t" 
    count=0
    print ""
}
NR == 1 {next}
{
    # clean the file 
    printf("") > "req1_tempfile_ip_url.txt"
    inputstring = $11

    # First check if the line contains an Ip-adress
    if ($1)  {
        # Then check which column contain url
        for (i=1; i<=NF; i++) {
            if ($i ~ /http:\/\// || $i ~ /https:\/\//) {
                inputstring = $i
                printf "%s %s %s %s %s\n", $1, urlFormated(inputstring), dayFormated($4),\
                 monthFormated($4), timeFormated($4) >> "req1_tempfile_ip_url.txt"
            }
        }
    }
   
    
    
}
END {
    print ""
	print "Successfully appended to the Text file"
}