var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var name_array = [];

io.on('connection',function(socket){
	console.log("a client connected");
	
	socket.on('connection',function(data){
		var user_data = {};
		user_data[socket.id] = data.nickname;
		socket.broadcast.emit('broad',data.nickname + " login");
		name_array.push(user_data);
		
		io.emit('online people',name_array);
		
		socket.on('disconnect',function(){
			socket.broadcast.emit('broad',data.nickname + " log out");
			removeIdArrayElement(name_array,socket.id);
			io.emit('online people',name_array);
		});
	});
	
	socket.on('chat message',function(data){
		io.emit("chat message",data);
	});
	
	socket.on("is typing",function(data){
		io.emit("is typing",data);
	});
	
});

function removeIdArrayElement(id_array_or_json,id){
	for (i in id_array_or_json){
		if (typeof(id_array_or_json[i])=="string"){
			if (id_array_or_json[i] == id){
				id_array_or_json.splice(i,1);
			}
		}else{
			for (keys in id_array_or_json[i]){
				if (keys == id){
					id_array_or_json.splice(i,1);
				}
			}
		}
	}
}


http.listen(3000, function(){
	console.log('listening on *:3000');
});
