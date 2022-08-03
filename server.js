'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');

const handlePets = require('./pets');
const postFavorite = require('./modules/postFavorite.js');
const getFavorite = require('./modules/getFavorite.js');
const deleteFavorite = require('./modules/deleteFavorite.js');
const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;

app.use(express.json());

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
