const express = require("express");
const app = express();
const port = 1337;



app.get("/", (req, res) => {
    res.json({
        "Message": "Hello World",
    });
});


app.listen(port);
console.log('The server is now listening on: ' + port);

