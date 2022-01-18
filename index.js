const http = require('http');
const express = require('express');
const fs = require('fs');
const csv = require('csv');
const iconv = require('iconv-lite');
const app = express();

fs.createReadStream(__dirname + '/38EHIME.csv').pipe(iconv.decodeStream('SJIS'))
.pipe(iconv.encodeStream('UTF-8')).pipe(csv.parse(function(err, data) {
    address = data;
}));


app.get("/", function(req, res){
    code = req.query.code;

    address.forEach(function( value ) {
        if (code == Number(value[2])) {
            res.jsonp(value[6] + value[7] + value[8]);
        }
    });
});

const server = http.createServer(app);
server.listen(3000);