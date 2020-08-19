const express = require('express');
const DogsService = require('./dogs-service');
const { requireAuth } = require("../middleware/jwt-auth");

const dogsRouter = express.Router();
const jsonParser = express.json();

dogsRouter
  .route('/')
  .get((req, res, next) => {
    DogsService.getAllDogs(req.app.get('db'))
      .then((dogs) => {
        res.json(dogs.map(DogsService.serializeDog));
      })

      .catch(next);
  })
  // .post(requireAuth, jsonParser, (req, res, next) => {
.post(jsonParser, (req, res, next) => {
    const { full_name, age, about_me, breed, size, gender, owner_id, picture, loc_state, city, zip_code } = req.body;
    const newDog = { full_name, age, about_me, breed, size, gender, owner_id, picture, loc_state, city, zip_code  };

    for (const [key, value] of Object.entries(newDog)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    DogsService.insertDog(req.app.get('db'), newDog).then(
        (dog) => {
          res.status(201).json(DogsService.serializeDog(dog));
        })
        .catch(next);
  });

  dogsRouter
  .route('/:dog_id')
  .all((req, res, next) => {
    DogsService.getDogById(req.app.get('db'), req.params.dog_id).then(
      (dog) => {
        if (!dog) {
          return res
            .status(404)
            .json({ error: { message: `dog doesn't exist` } });
        }
        res.dog = dog;
        next();
      }
    );
  })
  .get((req, res, next) => {
    res.json(DogsService.serializeDog(res.dog));
  })
  //to move
  .patch(jsonParser, (req, res, next) => {
    const {
        full_name, 
        age, 
        about_me, 
        breed, 
        size, 
        gender,
        loc_state,
        city,
        zip_code
    } = req.body;
    const dogToUpdate = {
        full_name, 
        age, 
        about_me, 
        breed, 
        size, 
        gender,
        loc_state,
        city,
        zip_code
    };

    DogsService.updateDog(req.app.get('db'), req.params.dog_id, dogToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

  dogsRouter
  .route('/my-dogs/:owner_id')
  .get((req, res, next) => {
    DogsService.getDogsByOwnerId(req.app.get('db'), req.params.owner_id)
      .then((dogs) => {
        res.json(dogs.map(DogsService.serializeDog));
      })

      .catch(next);
  })



module.exports = dogsRouter;