const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // console.log(sequelize)
    class Teacher extends Sequelize.Model {}
    Teacher.init({
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
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Teacher'
    })
    return Teacher
}