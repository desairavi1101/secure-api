module.exports = function(sequelize, DataTypes){

	var userColumns = {
		username : {
			type : DataTypes.STRING(30),
			primaryKey: true,
			autoIncrement: false,
			field : 'username'
		},
		password : {
			type : DataTypes.STRING(20),
			allowNull : false,
			field : 'password',
		},
		name : {
			type : DataTypes.STRING(20),
			allowNull : false,
			field : 'name',
		}

	};

	var userConfig = {
		tableName : 'user',
		timestamps : true,
		//paranoid: true, //Won't delete object, add colums deleted_at to table
		underscored : true,
		freezeTableName : true,
		classMethods: {
			associate : function(models) {
			}
		}
	};

	var User = sequelize.define("User", userColumns, userConfig);

	return User;

};
