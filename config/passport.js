 //config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    User.find({where: {id: id}}).then(function(user) {        
            done(null, user);
        });
    });
    
    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            User.find({where: {google_id: profile.id}}).then(function(user) {
              if (!user) 
              {
                 User.create({ 
                    google_id: profile.id, 
                    google_token: token, 
                    google_name: profile.displayName, 
                    google_email: profile.emails[0].value 
                }).then(function (result) {
                    return done(null, result);
                }).catch(function (e) { /** Erreur dans l'inscription user **/
                console.log("ERROR : Lors de l'inscription");
                return done(e, null);
            });
            }
            else
            {
                return done(null, user);
            }
        }).catch(function (e) { /** Erreur dans la recherche de l'user **/
        console.log("ERROR : Lors de la recherche");
                    //res.status(401).json({message: "ERROR - Cette adresse email est déjà utilisé. Veuillez vous connecter ou utiliser une autre adresse email.", statut:"mailUsed"});
                    return done(e, null);
                });
    });
    }));
}