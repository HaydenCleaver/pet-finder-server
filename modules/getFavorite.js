const Favorite = require('../models/Favorite.js');

const getFavorite = async (request, response, next) => {
  try{
    let searchResult = await Favorite.find();
    response.send(searchResult);
  } catch (e) {
    next(e);
  }
};

module.exports = getFavorite;
