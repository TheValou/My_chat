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
  console.log('listening on *:8000');
});
