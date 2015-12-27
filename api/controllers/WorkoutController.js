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
		Workout.find({
			where: {
				user: req.session.user.id
			}
		}).exec(function(err, workouts) {
			return res.json(workouts);
		});
  },


  /**
   * `WorkoutController.create()`
   */
  create: function (req, res) {
		var user = req.session.user;

		var workout = _.clone(req.body);
		workout.user = user.id;

		Workout.createWithSets(workout, function(err, created) {
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
