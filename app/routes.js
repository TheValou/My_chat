module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('auth.ejs');
    });


    // route for showing the profile page
    app.get('/profile', ensureAuthenticated, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/chat', ensureAuthenticated, function(req, res) {
        res.render('chat.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/chat',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in

function ensureAuthenticated(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    return next(); }
  res.redirect('/')
}