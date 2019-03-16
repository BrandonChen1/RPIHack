var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    users= [],
    UIDs = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/login.html');
});

io.on("connection", function(socket){

    socket.on('new user', function(user, UID, callback){
        if (user in users){
            callback(false);
        }
        else{
            callback(true);
            socket.nickname = data;
            users[socket.nickname] = socket;
            socket.uid = UID;
            users[socket.uid] = socket;
        }
    });


});


//Listens on the port 3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});
