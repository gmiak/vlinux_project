# vlinux_project

### Requirement 1

Depending to this log file [access-50.log](https://github.com/gmiak/vlinux_project/blob/main/access-50k.log):

E.g: 
      
            - 31.200.12.141 - - [17/Aug/2016:14:16:44 +0200] "GET /forum/viewforum.php?f=9 HTTP/1.0" 200 43595 "https://gmiak.dv/viewforum.php?f=9" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/48.0.2564.103 Safari/537.36"
            
            - 1.208.61.234 - - [17/Aug/2016:13:56:33 +0200] "GET /community HTTP/1.1" 200 7763 "https://gmiak.info/kurser" "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0"
            
            - 31.254.32.6 - - [17/Aug/2016:14:04:28 +0200] "GET /kurser/lektionsplan-och-rekommenderad-studieplan HTTP/1.0" 302 650 "-" "Mozilla/5.0 (compatible; MJ12bot/v1.4.5; http://www.majestic12.co.uk/bot.php?+)"
            
            - ...


- Extract each Ips and urls from the file "access-50.log" by using Regex for processing and formating the text. Load the data into data/log.json as following:

            - [
                  {
                        "ip": "31.200.12.141",
                        "url": "https://gmiak.dv"
                  },
                  {
                        "ip": "31.100.12.140",
                        "url": "https://gmiak.info"
                  },
              ]


- Code:

      + bthloggen/req1.awk

      + bthloggen/req1_fileTextToJsonFile.py
