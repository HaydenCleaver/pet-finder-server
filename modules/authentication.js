'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

function verifyUser(request, response, next){
  try{
    const token = request.headers.authorization.split('')[1];
    jwt.verify(token, getKey, {}, function(error, user){
      request.user = user;
      next();
    });
  } catch (e) {
    next('not authorized');
  }
}

const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err,key){
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = verifyUser;
