var express = require('express'),
    app = express(),
    server = app.listen(4000);

io = require('socket.io').listen(server);

var users = {};
var MapORooms = new Map();
MapORooms.set('1',new Array());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.get('/',function(req,res){
    res.sendFile(__dirname+ '/login.html');
});

io.sockets.on('connection',function(socket){
    //Validate Join Room
    socket.on('Join-Room',function(data){
        if(MapORooms.get(data.toString()) == null){
            socket.emit('Invalid-Room',data);



        }
        else{
            AR = MapORooms.get(data.toString());
            AR.push(socket);
            socket.ID = data.toString();
            socket.emit('Valid-Room',data);
        }
    });

    socket.on('Create-Room',function(data){
        MapORooms.set(data.toString(),new Array());
        socket.emit('Create-Good',data);
        console.log(MapORooms);
    });

    socket.on('Send-message',function(data){
        var RoomID = socket.ID;
        var Array = MapORooms.get(RoomID);
        for( i in Array){
            i.emit('Receive-message',data);
        }

    });

    socket.on('new user', function(user, UID, callback){
        if (user in users){
            callback(false);
        }
        else{
            callback(true);
            socket.nickname = user;
            users[socket.nickname] = socket;
            socket.uid = UID;
            users[socket.uid] = socket;
        }
    });




});

function createRoom(){

}