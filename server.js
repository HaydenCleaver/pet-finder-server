'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require ('mongoose');

// const verifyUser = require('./modules/authentication.js');
const handlePets = require('./modules/pets.js');
const postFavorite = require('./modules/postFavorite.js');
const getFavorite = require('./modules/getFavorite.js');
const deleteFavorite = require('./modules/deleteFavorite.js');

const { appendFile } = require('fs');

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((request, response, next)=> {
  console.log(request.headers);
  console.log('Handshaking');
  next();
});

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

app.use(verifyUser);

app.get('/pets', (request, response) => {
  handlePets(request, response);
});

app.post('/pets', postFavorite);

app.get('/pets', getFavorite);

app.delete('pets/:id', deleteFavorite);

app.use('*', (error, request, response, next) => {
  response.status(500).send(error);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
