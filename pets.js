const express = require('express');
const server = express();
const axios = require('axios');
const cors = require ('cors');

require('dotenv').config();
server.use(cors());

// const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;

class Pets {
  constructor(obj){
    this.type = obj.type;
    this.species = obj.species;
    this.breed = obj.breeds.primary;
    this.color = obj.colors.primary;
    this.age = obj.age;
    this.gender = obj.gender;
    this.size = obj.size;
    this.coat = obj.coat;
    this.name = obj.name;
    this.description = obj.description;
    this.picture = obj.photos.large;
    this.status = obj.status;
    this.goodWithChildren = obj.environment.children;
    this.goodWithDogs = obj.environment.dogs;
    this.goodWithCats = obj.environment.cats;
  }
}

const token = async () => {
  let access_token = await axios.post(
    'https://api.petfinder.com/v2/oauth2/token',
    new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET
    })
  );
  console.log(access_token.data.access_token);
  return access_token.data.access_token;
};
//promise.resolve to get back data from token function
console.log(token());

const handlePets = async (request, response) => {
  console.log('testone', token());
  const usedToken = token();
  console.log('test',usedToken);

  await axios.get(
    `https://api.petfinder.com/v2/animals`,
    // &good_with_children=${request.query.hasKids}&good_with_cats=${request.query.hasCat}&good_with_dogs=${request.query.hasDog}
    {
      params: {
        'location': `${request.query.location}`
      },
      headers: {'Authorization': `Bearer ${token()}`

      }
    })
    .then(res => {
      if (request.query.location.toLowerCase() === res.data.location.toLowerCase()){
        let petResponse = res.data.animals.map(pet => new Pets (pet));
        response.send(petResponse);
      }
    })
    .catch((error) => {
      response.status(404).send(`${error}: Location Not Found!`);
    });
};

// const handlePets = (request, response) => {
//   let url = `https://api.petfinder.com/v2/animals?location=${request.query.location}&good_with_children=${request.query.hasKids}&good_with_cats=${request.query.hasCat}&good_with_dogs=${request.query.hasDog}`;

//   axios.get(url).then(res => {
//     if (request.query.location.toLowerCase() === res.data.location.toLowerCase()){

//       let petResponse = res.data.animals.map(pet => new Pets (pet));
//       response.send(petResponse);
//     }
//   })
//     .catch((error) => {
//       response.status(404).send(`${error}: Location Not Found!`);
//     });
// };

module.exports = handlePets;
