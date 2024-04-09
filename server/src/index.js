const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));


app.get("/", cors(), (request, response) => {
    if (!request.query.word || request.query.word < 1 || request.query.word > 45){
        response.sendStatus(404);

        return;
    }

    response.send(JSON.stringify(data[request.query.word - 1]));
});

app.listen(port, () => {
    console.log(`Available on:\n\thttp://127.0.0.1:3000`);
});
