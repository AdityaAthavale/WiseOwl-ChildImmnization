console.log("Hello from register")


// Code here handles what happens when a user submits a new character on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

// when user clicks add-btn
$(document).ready(() => {
    $("#add-btn").on("click", function (event) {
        event.preventDefault();

        // make a newCharacter obj
        var newStudent = {
            // fistName from name input
            firstName: $("#firstname").val().trim(),
            // lastName from role input
            lastName: $("#lastname").val().trim(),
            // address from age input
            addressLine1: $("#addressone").val().trim(),
            addressLine2: $("#addresstwo").val().trim(),
            addressLine3: $("#addressthree").val().trim(),
            // city from name input
            city: $("#city").val().trim(),
            // state from name input
            state: $("#state").val().trim(),
            // pin from input
            pin: $("#pin").val().trim(),
            // fathername from input
            fatherName: $("#fathername").val().trim(),
            // mothername from input
            motherName: $("#mothername").val(),
            // fatherCell from input
            fatherCell: $("#fathercell").val().trim(),
            // motherCell from input
            motherCell: $("#mothercell").val().trim(),
            // homePhone from input
            homePhone: $("#homephone").val().trim(),
            // email from email input
            email1: $("#emailone").val().trim(),
            email2: $("#emailtwo").val().trim(),
            birthdate: $("#birthdate").val().trim(),
            enrollmentdate: $("#enrollmentdate").val().trim(),
        };

        // send an AJAX POST-request with jQuery
        $.post("/api/addStudent", newStudent)
            // on success, run this callback
            .then(function (data) {
                // log the data we found
                console.log(data);
                // tell the user we're adding a character with an alert window
                alert("Adding new student...");
            });

        // empty each input box by replacing the value with an empty string
        $("#firstname").val("");
        $("#lastname").val("");
        $("#addressone").val("");
        $("#addresstwo").val("");
        $("#addressthree").val("");
        $("#city").val("");
        $("#state").val("");
        $("#pin").val("");
        $("#fathername").val("");
        $("#mothername").val("");
        $("#fathercell").val("");
        $("#mothercell").val("");
        $("#homephone").val("");
        $("#emailone").val("");
        $("#emailtwo").val("");
        $("#birthdate").val("");
        $("#enrollmentdate").val("");
    });

});