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
		Workout.listForUser(req.session.user.id).exec(function(err, workouts) {
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


  retrieve: function(req, res) {
    Workout.getForUser(req.session.user.id).where({
      id: req.param('workout')
    }).exec(function(err, workout) {
      if (err) return res.status(500);
      if (!workout) {
        return res.status(404).json({});
      }

      return res.status(200).json(workout);
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
   * `WorkoutController.addSets()`
   */
  addSets: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};
