const express = require('express');
const server = express();
const axios = require('axios');
const cors = require ('cors');

require('dotenv').config();
server.use(cors());

class Pets {
  constructor(obj){
    this.species = obj.species;
    this.breed = obj.breeds.primary;
    this.age = obj.age;
    this.gender = obj.gender;
    this.name = obj.name;
    this.description = obj.description;
    this.picture = obj.photos.map(el => el.large).slice(0,1).toString();
    this.status = obj.status;
    this.organization = obj.organization;
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
  let queryParams = {};

  const paramFunction = () => {
    if (request.query.good_with_children){
      queryParams.good_with_children = request.query.good_with_children;
    }
    if (request.query.good_with_dogs){
      queryParams.good_with_dogs = request.query.good_with_dogs;
    }
    if (request.query.good_with_cats){
      queryParams.good_with_cats = request.query.good_with_cats;
    }
    if (request.query.type){
      queryParams.type = request.query.type;
    }
  };

  paramFunction();

  let config = {
    url: `https://api.petfinder.com/v2/animals?location=${request.query.location}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${usedToken}`
    },
    params: queryParams
  };
  console.log(request.query, queryParams);
  axios(config)
    .then(res => {
      console.log(request.query.location, config.url);
      let petResponse = res.data.animals.map(pet => new Pets (pet));
      console.log(res.data.animals);
      response.send(petResponse);
    })
    .catch((error) => {
      response.status(404).send(`${error}: Location Not Found!`);
    });
  queryParams = {};
};

module.exports = handlePets;
