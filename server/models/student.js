const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Sequelize.Model {}
    Student.init({
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        addressLine1: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        addressLine2: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        addressLine3: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        pin: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        fatherName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        motherName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        fatherCell: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        motherCell: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        homePhone: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        email1: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        email2: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        birthdate: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        enrollmentdate: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    }, { 
        sequelize, 
        modelName: 'Student' 
    });
    return Student
}

//module.exports = Student