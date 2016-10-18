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
        'clientID'      : '225837931807-a8fgdpvsg4i9t0cvshqmpe2ghj3g2apf.apps.googleusercontent.com',
        'clientSecret'  : 'FvAm6Q87MM54bCaKDQzfLL9I',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};