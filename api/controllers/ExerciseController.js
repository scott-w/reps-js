/**
 * ExerciseController
 *
 * @description :: Server-side logic for managing exercises
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `ExerciseController.list()`
   */
  list: function (req, res) {
		if (req.session.authenticated) {
			return res.json({auth: true});
		}
    return res.status(401).json({
      todo: 'list() is not implemented at all!'
    });
  },


  /**
   * `ExerciseController.create()`
   */
  create: function (req, res) {

		if (!req.body.name) {
			return res.status(400).json({
				name: 'Must set a valid name'
			});
		}

		Exercise.create(req.body).exec(function(err, created) {
			if (err) {
				console.log(err.invalidAttributes.name[0].message);
				return res.status(400).json({
					name: err.invalidAttributes.name[0].message
				});
			}

			return res.status(201).json(created);
		});
  },


  /**
   * `ExerciseController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },


  /**
   * `ExerciseController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};
