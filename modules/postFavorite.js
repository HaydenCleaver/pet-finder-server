const Favorite = require('../models/Favorite.js');

const postFavorite = async (request, response, next) => {

  console.log(request.body);

  let {
    name,
    species,
    breed,
    age,
    gender,
    picture,
    status,
    goodWithChildren,
    goodWithDogs,
    goodWithCats,
    description
  } = request.body;

  try {
    let favorite = new Favorite ({
      name,
      species,
      breed,
      age,
      gender,
      picture,
      status,
      goodWithChildren,
      goodWithDogs,
      goodWithCats,
      description
    });

    favorite.save()
      .then(results => {
        response.send(results);
      });

  } catch (e) {
    next(e);
  }
};

module.exports = postFavorite;
