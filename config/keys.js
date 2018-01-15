//add this file to .gitignore

module.exports = {
  google: {
    clientID: 'yourclientid',
    clientSecret: 'yourclientsecret'
  },
  mongodb: {
    dbURI: 'mongodb://<username>:<password>.16@ds251727.mlab.com:51727/google-oauth'
  },
  session: {
    cookieKey: 'secretkey'
  }
};
