var db = require("./../models");
var path = require("path");

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
        db.Students.findAll({
            where: {
                //We will search for student Id or student name.
                //If we get match for either we will return results.
                [Op.or]: [{
                    id: req.body.searchTerm
                }, {
                    firstName: req.body.searchTerm
                }]
            }
        }).then(students => {
            res.send(students)
        })
    })

    app.post("/api/addStudent", function (req, res) {
        console.log(db.Student)
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

    app.post("api/dueVaccines", function (req, res) {
        //Step 1: Find student from student ID

        db.Vaccine.findAll({
            where: {
                [Op.and]: {
                    [Op.notIn]: {
                        id: db.VaccinationRecords.findAll({
                            where: {
                                StudentId: req.body.id
                            }
                        })
                    }
                }
            }
        })

        db.Students.findOne({
            where: {
                id: req.body.id
            }
        }).then(student => {
            //Step 2: Calculate students age in Days.
            let birthday = student.birthdate
            let bDate = new Date(birthday)
            let toay = new Date()
            let timeDifference = timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
            let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
            //Step 3 find all due vaccines.
            db.Vaccine.findAll({
                where: {
                    dueDaysFromBirth: {
                        [Op.lte]: differenceInDays
                    }
                }
            }).then(vaccines => {
                //Step 4: Remove vaccines which are already done.
                db.VaccinationRecords.findAll({
                    where: {
                        studentId: req.body.id,
                        [Op.in]: {
                            vaccineId: vaccines.map(function (vaccine) {
                                return vaccine.id
                            })
                        }
                    }
                }).then(vaccinationRecords => {
                    res.send(vaccines.filter(vaccine => {
                        vaccines.map(record => {
                            record.id
                        }).includes(vaccine.id)
                    }))
                })
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

    // DELETE route for deleting todos. We can get the id of the todo to be deleted from
    // req.params.id
    app.delete("/api/todos/:id", function (req, res) {
        // Use the sequelize destroy method to delete a record from our table with the
        // id in req.params.id. res.json the result back to the user
    });

    // PUT route for updating todos. We can get the updated todo data from req.body
    app.put("/api/todos", function (req, res) {

        // Use the sequelize update method to update a todo to be equal to the value of req.body
        // req.body will contain the id of the todo we need to update 

    });
};