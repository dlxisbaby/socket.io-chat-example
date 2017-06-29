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
	socket.broadcast.emit('broad',{info:"a user login"});
	
	socket.on('chat message',function(msg){
		io.emit("chat message",msg);
		//console.log('message: '+ msg);
	});
	
	socket.on('disconnect',function(){
		console.log("a user disconnected");
	});
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});
//http.listen(3000)
