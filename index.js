var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//app.use(express.static('js'));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	console.log("a user connected");
	socket.broadcast.emit('broad',"a user login");
	
	socket.on('chat message',function(data){
		io.emit("chat message",data);
//		console.log('data: '+ JSON.stringify(data));
//		console.log('data: '+ data.nickname);
	});
	
	socket.on('disconnect',function(info){
		socket.broadcast.emit('disconnect',info.nickname+ " log out");
		console.log("a user disconnected");
	});
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});
//http.listen(3000)
