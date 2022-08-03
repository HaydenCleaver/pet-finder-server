const express = require('express');
const server = express();
const axios = require('axios');
const cors = require ('cors');

require('dotenv').config();
server.use(cors());

class Pets {
  constructor(obj){
    // this.type = obj.type;
    this.species = obj.species;
    this.breed = obj.breeds.primary;
    // this.color = obj.colors.primary;
    this.age = obj.age;
    this.gender = obj.gender;
    // this.size = obj.size;
    // this.coat = obj.coat;
    this.name = obj.name;
    this.description = obj.description;
    this.picture = obj.photos.large;
    // this.status = obj.status;
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
  return access_token.data.access_token;
};

const handlePets = async (request, response) => {
  const usedToken = await token();

  // console.log('###########',usedToken, '########');

  let config = {
    url: `https://api.petfinder.com/v2/animals?location=${request.query.location}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${usedToken}`
    }
  };

  axios(config)
    .then(res => {
      console.log(request.query.location);
      let petResponse = res.data.animals.map(pet => new Pets (pet));
      response.send(petResponse);
    })
    .catch((error) => {
      response.status(404).send(`${error}: Location Not Found!`);
    });
};

module.exports = handlePets;
