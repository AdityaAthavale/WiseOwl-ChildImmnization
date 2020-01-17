'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Creating foreign keys here.
//These 2 lines will add columns called StudentId and VaccineId in Table Vaccination Records.
//These lines will also make those columns not null.
//This will also mean if you delete an entry from Students table all entries for that student id in vaccinationRecords will get deleted.
//Also record can not be added to VaccinationRecords unless there is student with that student Id present.
//This is above what we will cover in class but required to deliver professional project.
db.VaccinationRecords.belongsTo(db.Student, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
})
db.VaccinationRecords.belongsTo(db.Vaccine, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
})
db.VaccinationRecords.sync()

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;