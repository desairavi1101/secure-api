var models = require('../models');

var controller = {
	getAll : function(cb,errcb) {
		return models.User.findAll({})
		.then(cb).catch(errcb);
	},

	add : function(user,cb,errcb) {
		var newStream = models.User.build(user);
		return newStream.save()
		.then(cb).catch(errcb);
	},

	update : function(id,updatedUser,cb,errcb) {
		return models.User.update(updatedUser,{where: { username : id }})
		.then(cb).catch(errcb);
	},

	delete : function(id,cb,errcb) {
		return models.User.destroy({where: { username : id}})
		.then(cb).catch(errcb);
	},

	authenticate : function(userData,cb,errcb) {
		return models.User.findOne({where : { username: userData.username, password : userData.password}})
		.then(cb).catch(errcb);
	}

};

module.exports = controller;
