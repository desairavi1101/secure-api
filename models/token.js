
module.exports = function(sequelize, DataTypes){

	var tokenColumns = {
		username : {
			type: DataTypes.STRING(30),
			primaryKey: true,
			field : 'username',
			references : {
				model: "user",
				key : "username"
			}
		},
		tokenString : {
			type : DataTypes.STRING(500),
			field : 'token_string',
			primaryKey : true
		},
		expires : {
			type : DataTypes.DATE,
			field : 'expires',
			allowNull : false
		}

	};

	var tokenConfig = {
		tableName : 'token',
		timestamps : true,
		//paranoid: true, //Won't delete object, add colums deleted_at to table
		underscored : true,
		freezeTableName : true,
		classMethods: {
			associate : function(models) {

			}
		}
	};

	var Token = sequelize.define("Token", tokenColumns, tokenConfig);

	return Token;

};
