module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("Users", {
      firstName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
      lastName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
      email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
      passPhrase: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    }, {
        //This will make sure we do not create multiple accounts with same email.
        uniqueKeys: {
            Users_unique: {
                fields: ['email']
            }
        }
    });
    return users;
  };