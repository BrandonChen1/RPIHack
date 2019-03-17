var express = require('express'),
    app = express(),
    server = app.listen(4000);

    io = require('socket.io').listen(server);

    var users = {};
var MapORooms = new Map();
MapORooms.set('1',new Array());

app.get('/',function(req,res){
    res.sendFile(__dirname+ '/Room.html');
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
            socket.RoomID = data.toString();
            socket.emit('Valid-Room',data);
        }
    });

    socket.on('Create-Room',function(data){
        //console.log(MapORooms);
        if(MapORooms.get(data.toString()) == null){
            var AR = new Array();
            AR.push(socket);
            MapORooms.set(data.toString(),AR);
            socket.RoomID = data.toString();
            socket.emit('Create-Good',data);
            //console.log(MapORooms)
            // ;
            }
        else{

            socket.emit('Create-Bad',data);
        }
    });

    socket.on('Send-message',function(data){
        console.log("Logged");
        console.log(socket.RoomID);
        var AR = MapORooms.get(socket.RoomID);
        //console.log(AR);
        //console.log(socket.RoomID);
        console.log(AR.length);

        for(var i=0; i < AR.length;i++){
            var tempsocket = AR[i];
            //console.log(tempsocket);
            tempsocket.emit('Receive-message',socket.nickname+": "+ data);
            //console.log('RM');
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
    socket.on('Leave Room',function(data){
        var RoID = socket.RoomID;
        var RoomArray = MapORooms.get(RoID);
        if(data) {
            for (var i = 0; i < RoomArray.length; i++) {
                var tempsocket = RoomArray[i];
                if (tempsocket.nickname == socket.nickname) {
                    RoomArray.splice(i, 1);
                    tempsocket.emit('Leave-Room-Good');
                }
            }
        }
        else{
            for(var i =0; i < RoomArray.length;i++){
                //console.log(RoomArray);
                //console.log(RoomArray.length);
                var tempsocket = RoomArray[i];
                //console.log(tempsocket.nickname);
                //RoomArray.splice(i, 1);
                tempsocket.emit('Leave-Room-Good');
            }
            MapORooms.delete(RoID);
        }


    })



});
