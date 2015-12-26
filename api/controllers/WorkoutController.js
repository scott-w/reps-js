var moment = require("moment");

/**
 * WorkoutController
 *
 * @description :: Server-side logic for managing workouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `WorkoutController.list()`
   */
  list: function (req, res) {
    return res.json({
      todo: 'list() is not implemented yet!'
    });
  },


  /**
   * `WorkoutController.create()`
   */
  create: function (req, res) {
		var user = req.session.user;
		Workout.create({
			workout_date: moment(req.body.workout_date, 'DD/MM/YYYY').toDate(),
			user: user.id
		}).exec(function(err, created) {
			if (err) {
				return res.status(400).json(err.invalidAttributes);
			}

			return res.status(201).json(created);
		});
  },


  /**
   * `WorkoutController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },


  /**
   * `WorkoutController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};
