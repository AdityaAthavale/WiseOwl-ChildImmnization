const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Vaccination extends Sequelize.Model {}
    Vaccination.init({
        vaccinationDate: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'VaccinationRecords'
    });
    return Vaccination
}