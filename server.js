var express = require('express');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var io = require('socket.io').listen(app.listen(3000));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: '225837931807-mvrha59m4kjbjr082ba7mbp82pir8l5n.apps.googleusercontent.com',
    clientSecret: 'cNxtsQP09SPiNAsOuyCadhfl',
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  // function(accessToken, refreshToken, profile, cb) {
  //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return cb(err, user);
  //   });
  // }
   function(identifier, profile, done) {
//     // asynchronous verification, for effect...
     process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

// Monkey patch to support openid.real option

//passport.use(new GoogleStrategy({
//     returnURL: 'http://localhost:3000/auth/google/return',
//     realm: 'http://localhost:3000/',
//     stateless: true
//   },
//   function(identifier, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
      
//       // To keep the example simple, the user's Google profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Google account with a user record in your database,
//       // and return that user instead.
//       profile.identifier = identifier;
//       return done(null, profile);
//     });
//   }
// ));


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false } );

app.use(express.static(__dirname + '/public'));

//MMapp.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google', 
 //passport.authenticate('google', { failureRedirect: '/login' }),
 passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
  // function(req, res) {
  //   res.redirect('/');
  // });

app.get('/auth/google/return',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  // passport.authenticate('google', { failureRedirect: '/login' }),
  // function(req, res) {
  //   res.redirect('/');
  // });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// app.get('/auth', function(req, res) {
//   res.render('auth');
// });

app.get('/',passport.authenticate('google', { failureRedirect: '/login' }), function(req, res){
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
    var time = date.getHours() + ":" + date.getMinutes()+ ":" + date.getSeconds();
    date = date.toDateString() +' à '+time;
    var pseudo = socket.pseudo;
    //socket.broadcast.emit('chat message', message); //tout le monde sauf sender
    io.emit('chat message', message, pseudo, date, time);

  })

});