const Favorite = require('../models/Favorite.js');

const postFavorite = async (request, response, next) => {

  console.log(request.body);

  let {
    name,
    picture,
    goodWithChildren,
    goodWithDogs,
    goodWithCats,
    description
  } = request.body;

  if (!name ||
        !picture ||
        !goodWithChildren ||
        !goodWithDogs ||
        !goodWithCats ||
        !description ){
    next ('Request Failed');
  }

  try {
    let favorite = new Favorite ({
      name,
      picture,
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
