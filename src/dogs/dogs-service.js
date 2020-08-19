const xss = require('xss');

const DogsService = {
    getAllDogs(db) {
      return db.from('dog_profile').select('*');
    },
    // getAllDogsForFeed(db,owner_id) {
    //   return db.from('dog_profile').select('*').whereNot('owner_id',owner_id);
    // },
    getDogById(db, id) {
      return db.from('dog_profile').select('*').where('id', id).first();
    },
    getDogsByOwnerId(db, owner_id) {
      // return db.from('dog_profile').select('*').where('owner_id', owner_id);
      return db.from('dog_profile').select('*').where('owner_id', owner_id);
    },
    insertDog(db, newDog) {
      return db
        .insert(newDog)
        .into('dog_profile')
        .returning('*')
        .then(([dog]) => dog)
        .then((dog) => DogsService.getDogById(db, dog.id));
    },
    serializeDog(dog) {
      return {
        id: dog.id,
        full_name: xss(dog.full_name),
        age: xss(dog.age),
        about_me: xss(dog.about_me),
        breed: xss(dog.breed),
        size: xss(dog.size),
        gender: xss(dog.gender),
        owner_id: xss(dog.owner_id),
        zip_code: xss(dog.zip_code),
        city: xss(dog.city),
        picture: xss(dog.picture),
      };
    },
    updateDog(db, id, updateFields) {
      return DogsService.getAlldogs(db).where({ id }).update(updateFields);
    }
  };
  
  module.exports = DogsService;