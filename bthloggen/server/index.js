const express = require("express");
const app = express();
const port = 1337;



app.get("/", (req, res) => {
    res.json({
        "/": "Shows a list of all posible routes that are used.",
        "/data": "Shows our data collection.",
        "/data?ip=<ip>": "Shows data that contain the given Ip address <ip>.",
        "/data?url=<url>": "Shows data that contain the given Http/Https address <url>."
    });
});


app.listen(port);
console.log('The server is now listening on: ' + port);

