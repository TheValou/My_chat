module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('auth.ejs');
    });


    // route for showing the profile page
    app.get('/profile', function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/chat', function(req, res) {
        res.render('chat.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/chat',
            failureRedirect : '/'
        }));

    app.get('*', function(req, res) {
        res.status(404).json({"message" : "erreur"});
    });

};

function ensureAuthenticated(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    return next(); }
    res.redirect('/')
}