var models = require('../models');

var controller = {

	add : function(token,cb,errcb) {
		var newToken = models.Token.build(token);
		return newToken.save()
		.then(cb).catch(errcb);
	}

};

module.exports = controller;
