//express
const express = require('express');
const body_parser = require('body-parser');
const app = express();

//websocket
var server = require('ws').Server;
var ws_server = new server({ port: 3001 });

// urlencoded and json
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

//start server
app.listen(3000);
console.log('HTTP Server is online.');

//json_data
var json_data = null;

//Receive post request
app.post('/', function(req, res) {
    json_data = req.body;
    //display received json
    console.log(json_data);
    //convert to websocket
    ws_server.clients.forEach(function(client){
        client.send(JSON.stringify(json_data));
    })
    res.send('POST request convert to websocket');
});