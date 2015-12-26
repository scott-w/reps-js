/**
* Workout.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'Workout',

  attributes: {
    user: {
      model: 'user'
    },
    workout_date: {
      type: 'date',
      required: true
    },
    sets: {
      collection: 'set',
      via: 'workout'
    }
  }
};
