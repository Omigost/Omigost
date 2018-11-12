const express = require('express');
const path = require('path');
const app = express();
const open = require("open");

app.use('/', express.static('../public'));

app.listen(3000, () => {
    console.log("[SERVER] Running on port 3000");
    setTimeout(() => {
        //open("http://localhost:3000");
    }, 0);
});