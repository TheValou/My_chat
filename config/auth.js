module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '225837931807-mvrha59m4kjbjr082ba7mbp82pir8l5n.apps.googleusercontent.com',
        'clientSecret'  : 'JT2IWvrdBd9LTKb1-Cx9SZWY',
        'callbackURL'   : 'http://murmuring-falls-35941.herokuapp.com/auth/google/callback'
    }

};