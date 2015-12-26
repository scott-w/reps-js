/**
* Set.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    exercise: {
      model: 'Exercise'
    },
    workout: {
      model: 'Workout'
    },
    weight: {
      type: 'integer',
      required: true
    },
    reps: {
      type: 'integer',
      required: true
    }
  }
};
