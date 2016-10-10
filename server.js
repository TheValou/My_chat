var express = require('express');
var app = express();
var passport = require('passport');
var io = require('socket.io').listen(app.listen(3000));
var ExpressSession = require('express-session')
var MemoryStore = require('session-memory-store')(ExpressSession);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false } );

app.use(ExpressSession({
  secret: 'ninja'
  , 
  store: new MemoryStore({ reapInterval: 60000 * 10 })
  // ,
  // resave: true,
  // saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app, passport);
require('./config/passport')(passport);

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
    var time = date.getHours() + ":" + date.getMinutes()+ ":" + date.getSeconds();
    date = date.toDateString() +' à '+time;
    var pseudo = socket.pseudo;
    io.emit('chat message', message, pseudo, date, time);

  })

});
