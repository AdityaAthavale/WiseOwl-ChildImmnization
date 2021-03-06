// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../../public/html/index.html"));
    });

    // where users can enter new students to the db
    app.get("/register", function (req, res) {
        res.sendFile(path.join(__dirname, "../../public/html/register.html"));
    });

};