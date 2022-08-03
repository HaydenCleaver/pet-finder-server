const Favorite = require('../models/Favorite.js');

const deleteFavorite = async (request, response, next) => {
  let favID = request.params.id;
  try{
    await Favorite.deleteOne({_id: favID});
    response.status(204).send('Successfully Deleted');
  } catch (e) {
    response.status(404).send('Deletion Failed');
  }
};

module.exports = deleteFavorite;
