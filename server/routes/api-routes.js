var db = require("./../models");
var path = require("path");

module.exports = function(app) {

    //This will open index.html
    app.get("/", function(req, res) {
        console.log("Sending index.html")
        res.sendFile(path.join(__dirname, "./../../client/html/index.html"));
    });

    app.get("/search", function(req, res) {
        console.log("Sending search.html")
        res.sendFile(path.join(__dirname, "./../../client/html/search.html"));
    })

    // POST route for saving a new todo
    app.post("/api/login", function(req, res) {
        console.log("Logging In...")
        let user = db.Users.findOne( {
            where: {
                email: req.body.email
            }
        }).then(
            (record) => {
                if (record == null) {
                    res.redirect("/")
                    return;
                }
                if(record.passPhrase == req.body.password) {
                    console.log("Authenticated")
                    res.redirect("/search")
                } else {
                    console.log("Authentication failed.")
                    res.redirect("/")
                }
            }
        )
    });
  
    // DELETE route for deleting todos. We can get the id of the todo to be deleted from
    // req.params.id
    app.delete("/api/todos/:id", function(req, res) {
      // Use the sequelize destroy method to delete a record from our table with the
      // id in req.params.id. res.json the result back to the user
    });
  
    // PUT route for updating todos. We can get the updated todo data from req.body
    app.put("/api/todos", function(req, res) {
  
      // Use the sequelize update method to update a todo to be equal to the value of req.body
      // req.body will contain the id of the todo we need to update 
    });
};