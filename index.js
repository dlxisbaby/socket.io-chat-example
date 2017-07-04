var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	console.log("a client connected");
	
	socket.on('connection',function(data){
		socket.broadcast.emit('broad',data + " login");
		socket.emit('online people',data);
		
		socket.on('disconnect',function(){
			socket.broadcast.emit('broad',data + " log out");
		});
	});
	
	socket.on('chat message',function(data){
		io.emit("chat message",data);
	});
	
	socket.on("is typing",function(data){
		io.emit("is typing",data);
	});
	
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});
