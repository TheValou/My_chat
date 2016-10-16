var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User       = require('../app/models/user');
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
                    return done(e, null);
                });
    });
    }));
}