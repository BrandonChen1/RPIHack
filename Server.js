var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.set('view engine', 'pug')

    app.use(bodyParser.urlencoded({
        extended:true
    }));
    server = app.listen(4000);

    io = require('socket.io').listen(server);

var UserData = new Map();
var RoomData = new Map();

app.get('/',function(req,res){
    res.sendFile(__dirname+ '/Room.html');
})

