const express = require("express");
const app = express();
const port = 1337;



app.get("/", (req, res) => {
    res.json({
        "/": "Shows a list of all posible routes that are used.",
        "/data": "Shows our data collection.",
        "/data?ip=<ip>": "Shows data that contains the given Ip address <ip>.",
        "/data?url=<url>": "Shows data that contains the given http/https address <url>."
    });
});

app.get("/data", (req, res) => {
    const itemsfile = require("../data/log.json");
    let result = [{"Message": "Data loading..."}]
    if (req.query.ip) {
        console.log("search ip: "+req.query.ip+" in Db.");
        result = itemsfile.filter(item => item.ip.includes(req.query.ip));
    } else if (req.query.url) {
        console.log("search url: "+req.query.url+" in Db.");
        result = itemsfile.filter(item => item.url.includes(req.query.url));
    } else {
        let tempObejctArr = []
        for (let index = 0; index < 100; index++) {
            tempObejctArr[index] = itemsfile[index];
        }
        console.log("Fetced the first 100th items.")
        result = tempObejctArr;
    }
    res.json(result);
});

/*app.get("/data/:ip", (req, res) => {
    const itemsfile = require("../data/log.json");

    let result = itemsfile.filter(item => item.ip.includes(req.params.ip));

    res.json(result);
});

app.get("/data/:url", (req, res) => {
    const itemsfile = require("../data/log.json");

    let result = itemsfile.filter(item => item.url.includes(req.params.url));

    res.json(result);
});*/

app.listen(port);
console.log('The server is now listening on: ' + port);

