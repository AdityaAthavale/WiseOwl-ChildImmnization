const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Vaccine extends Sequelize.Model {}
    Vaccine.init({
        vaccineName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        dueDaysFromBirth: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Vaccine'
    })
    return Vaccine
}