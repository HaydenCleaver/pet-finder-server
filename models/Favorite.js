'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

let favoriteSchema = new mongoose.Schema({
  name: String,
  picture: String,
  goodWithChildren: Boolean,
  goodWithDogs: Boolean,
  goodWithCats: Boolean,
  description: String
});

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = Favorite;
