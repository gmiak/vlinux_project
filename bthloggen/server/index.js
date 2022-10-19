const express = require("express");
const app = express();
const port = 1337;



app.get("/", (req, res) => {
    res.json({
        "/": "Shows a list of all posible routes that are used.",
        "/data": "Shows our data collection.",
        "/data?ip=<ip>": "Shows data that contains the given Ip address <ip>.",
        "/data?url=<url>": "Shows data that contains the given http/https address <url>.",
        "/data?size=<size>": "Shows data from index 0 to index=<size>.",
        "/data?month=<month>": "Shows data that contains the given month <month>.",
        "/data?day=<day>": "Shows data that contains the given day <day>.",
        "/data?time=<time>": "Shows data that contains the given time <time>.",
        "/data?day=<day>&time=<time>": "Shows data that contains the given day <day> at the time <time>.",
        "/data?month=<month>&day=<day>&time=<time>": "Shows data that contains the given month <month> on the day <day> at the time <time>."
    });
});

app.get("/data", (req, res) => {
    const itemsfile = require("../data/log.json");
    let result = [{"Message": "Data loading..."}];
    let result1 = [];
    let result2 = [];
    maxQueryParam = Object.keys(req.query).length;

    switch (maxQueryParam) {
        case 1:
            if (req.query.ip) {
                console.log("searching for ip: "+req.query.ip+" in Db.");
                result = itemsfile.filter(item => item.ip.includes(req.query.ip));
            } else if (req.query.url) {
                console.log("searching for url: "+req.query.url+" in Db.");
                result = itemsfile.filter(item => item.url.includes(req.query.url));
            } else if (req.query.size) {
                let tempObejctArr = []
                if (req.query.size < itemsfile.length) {
                    for (let index = 0; index < req.query.size; index++) {
                        tempObejctArr[index] = itemsfile[index];
                    } 
                }
                console.log("Fetched the first 100th items.")
                result = tempObejctArr;
            } else if (req.query.month) {

                console.log("searching for month: "+req.query.month+" in Db.");
                result = itemsfile.filter(item => item.month.includes(req.query.month));
        
            } else if (req.query.day) {
                
                console.log("searching for day: "+req.query.day+" in Db.");
                result = itemsfile.filter(item => item.day.includes(req.query.day));
                
            } else if (req.query.time.length === 2) {
                console.log("searching for time: "+req.query.time+" in Db.");
                result = itemsfile.filter(item => item.time.substring(0, 2).includes(req.query.time));
            } else if (req.query.time.length === 5) {
                console.log("searching for time: "+req.query.time+" in Db.");
                result = itemsfile.filter(item => item.time.substring(0, 5).includes(req.query.time));
            } 
            break;
        case 2:

            if (req.query.time.length === 2 && req.query.day) {
                console.log("searching for day: "+req.query.day+" at time: "+req.query.time+" in Db.");
                result1 = itemsfile.filter(item => item.time.substring(0, 2).includes(req.query.time));
                result = result1.filter(item => item.day.includes(req.query.day));
        
            } else if (req.query.time.length === 5 && req.query.day) {
                console.log("searching for day: "+req.query.day+" at time: "+req.query.time+" in Db.");
                result1 = itemsfile.filter(item => item.time.substring(0, 5).includes(req.query.time));
                result = result1.filter(item => item.day.includes(req.query.day));
        
            } 
            break;
        case 3:
            if (req.query.time.length === 2 && req.query.day && req.query.month) {
                console.log("searching for month: "+req.query.month+", day: "+req.query.day+" at time: "+req.query.time+" in Db.");
                result1 = itemsfile.filter(item => item.time.substring(0, 2).includes(req.query.time));
                result2 = result1.filter(item => item.day.includes(req.query.day));
                result = result2.filter(item => item.month.includes(req.query.month));
        
            } else if (req.query.time.length === 5 && req.query.day && req.query.month) {
                console.log("searching for month: "+req.query.month+", day: "+req.query.day+" at time: "+req.query.time+" in Db.");
                result1 = itemsfile.filter(item => item.time.substring(0, 5).includes(req.query.time));
                result2 = result1.filter(item => item.day.includes(req.query.day));
                result = result2.filter(item => item.month.includes(req.query.month));
        
            }
            break;
        default:
            result = itemsfile
            console.log("Fetched all data.")
            break;
    }
   
    res.json(result);
});

app.listen(port);
console.log('The server is now listening on: ' + port);

