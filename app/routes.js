// app/routes.js

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('auth.ejs'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', ensureAuthenticated, function(req, res) {
        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in

function ensureAuthenticated(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}