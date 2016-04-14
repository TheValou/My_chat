var express = require('express');
var app = express();
//var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false } );

app.use(express.static(__dirname + '/public'));

app.get('/login', function(req, res) {
  res.render('auth');
});

app.get('/', function(req, res){
  res.render('index');            

});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('deconnecté');
  })

  socket.on('petit_nouveau', function(pseudo) {
    socket.pseudo = pseudo;
  })

  socket.on('chat message', function (message) {
    console.log(message);
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
    date = date.toDateString() +' à '+time;
    var pseudo = socket.pseudo;
    //socket.broadcast.emit('chat message', message); //tout le monde sauf sender
    io.emit('chat message', message, pseudo, date, time);

  })

});

http.listen(8000, function(){
  console.log('listening on *:3000');
});

// var http = require('http');
// var fs = require('fs');
// // Chargement de socket.io
// var io = require('socket.io').listen(server);

// // Chargement du fichier index.html affiché au client
// var server = http.createServer(function(req, res) {
// 	fs.readFile('./index.html', 'utf-8', function(error, content) {
// 		res.writeHead(200, {"Content-Type": "text/html"});
// 		res.end(content);
// 	});
// });



// // Quand un client se connecte, on le note dans la console
// io.sockets.on('connection', function (socket) {

// 	socket.emit('message', 'Vous êtes bien connecté !');

// 	socket.broadcast.emit('message', 'Attzntion, nouvelle recrue sur le Chat !!');

     // Quand le serveur reçoit un signal de type "message" du client
     // socket.on('chat message', function (message) {
     //    console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
     //        socket.broadcast.emit('chat message', message);
     //    });

//     // Dès qu'on nous donne un pseudo, on le stocke en variable de session
//     socket.on('petit_nouveau', function(pseudo) {
//     	socket.pseudo = pseudo;
//     	socket.broadcast.emit('message', 'Attention, nouvelle recrue sur le Chat : '+ socket.pseudo + ' !!');

//     });

//  });

// server.listen(8080);
