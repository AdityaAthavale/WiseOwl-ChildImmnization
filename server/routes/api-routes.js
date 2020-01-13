var db = require("./../models");
var path = require("path");

const Op = db.Sequelize.Op;
module.exports = function (app) {

    //This will open index.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "./../../client/html/index.html"));
    });

    app.get("/search", function (req, res) {
        res.sendFile(path.join(__dirname, "./../../client/html/search.html"));
    })

    app.post("/api/login", function (req, res) {
        db.Teacher.findOne({
            where: {
                email: req.body.email
            }
        }).then(
            (record) => {
                if (record == null) {
                    res.redirect("/")
                    return;
                }
                if (record.password == req.body.password) {
                    console.log("Authenticated")
                    //We will show search page.
                    res.redirect("/search")
                } else {
                    console.log("Authentication failed.")
                    //we will stay on same page.
                    res.redirect("/")
                }
            }
        )
    });

    app.post("/api/search", function (req, res) {


        //console.log("DATA: " + req.body.searchText);
        db.Student.findAll({
            where: {
                //We will search for student Id or student name.
                //If we get match for either we will return results.
                firstName: req.body.searchText, 
                
                // [Op.or]: [{id: req.body.searchField}, {firstName: req.body.searchField}]
            }

        }).then(students => {

            res.send(students)
        })
    })

    app.post("/api/addStudent", function (req, res) {
        db.Student.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            addressLine3: req.body.addressLine3,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin,
            fatherName: req.body.fatherName,
            motherName: req.body.motherName,
            fatherCell: req.body.fatherCell,
            motherCell: req.body.motherCell,
            homePhone: req.body.homePhone,
            email1: req.body.email1,
            email2: req.body.email2,
            birthdate: req.body.birthdate,
            enrollmentdate: req.body.enrollmentdate
        }).then(newStudent => {
            res.send(newStudent)
        })
    })

    app.post("/api/dueVaccines", function (req, res) {
        //Step 1: Calculate students age in Days
        //Post parameters: Get birthdate and student id from server.
        let bDate = new Date(req.body.birthday)
        let today = new Date()
        let timeDifference = Math.abs(today.getTime() - bDate.getTime());
        let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        db.VaccinationRecords.findAll({
            where: {
                StudentId: req.body.studentId,
            },
            attributes: ['id']
        }).then(vaccineIds => {
            db.Vaccine.findAll({
                where: {
                    dueDaysFromBirth: {
                        [Op.lte]: differenceInDays
                    },
                    id: {
                        [Op.notIn]: vaccineIds
                    }
                }
            }).then(vaccines => {
                res.send(vaccines)
            })
        })
    })

    app.post("/api/addTeacher", function (req, res) {
        db.Teacher.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(newTeacher => {
            res.send(newTeacher)
        })
    })

    app.post("/api/addVaccine", function (req, res) {
        db.Vaccine.create({
            vaccineName: req.body.vaccineName,
            dueDaysFromBirth: req.body.dueDaysFromBirth,
        }).then(newVaccine => {
            res.send(newVaccine)
        })
    })
};