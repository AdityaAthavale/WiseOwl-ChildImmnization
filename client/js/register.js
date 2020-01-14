console.log("Hello from register")

// when user clicks add-btn
$(document).ready(() => {
    $("#add-btn").on("click", function (event) {
        event.preventDefault();
        // make a newCharacter obj
        var newStudent = {
            firstName: $("#firstname").val(),
            lastName: $("#lastname").val(),
            birthdate: $("#birthdate").val(),
            addressLine1: $("#addressone").val(),
            addressLine2: $("#addresstwo").val(),
            addressLine3: $("#addressthree").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            pin: $("#pin").val(),
            fatherName: $("#fathername").val(),
            motherName: $("#mothername").val(),
            fatherCell: $("#fathercell").val(),
            motherCell: $("#mothercell").val(),
            homePhone: $("#homephone").val(),
            email1: $("#emailone").val(),
            email2: $("#emailtwo").val(),
            enrollmentdate: $("#enrollmentdate").val(),
        };

        $.post("/api/addStudent", newStudent)
            .then(function (data) {
                console.log(data);
                alert("Adding new student.");
            });

        // empty each input box by replacing the value with an empty string
        $("#firstname").val("");
        $("#lastname").val("");
        $("#birthdate").val("");
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
    });

});