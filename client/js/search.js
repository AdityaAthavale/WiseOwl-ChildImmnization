
$(document).ready(() => {
    let selectedStudentId = -1;
    $("#submitButton").click(function() {
        const queryURL = "http://localhost:8080/api/search";
        $.ajax({
            url: queryURL,
            method: "POST",
            data: {"searchField" : $("#searchBox").val()}
        }).then(function(response) {
            console.log(response)
            response.forEach(element => {
                createStudentCard(element)
            });
        });
    })
    
    function createStudentCard(student) {
        // <div class="card text-center" style="width: 18rem;">
        var card = $("<div>")
        card.addClass("card")
        // card.addClass("text-center")
        card.addClass("bordered")
        // card.attr("style", "width: 18rem")
        
        // <div class="card-body">
        var cardBody = $("<div>")
        cardBody.addClass("card-body")
        
        // <h5 class="card-title">Special title treatment</h5>
        var cardTitle = $("<h5>")
        cardTitle.addClass("card-title")
        cardTitle.text(student.firstName)
    
        var address = $("<p>")
        address.text(student.addressLine1 + " " + student.addressLine2 + " " + student.addressLine3 + " " + student.city + " " + student.state)
    
        //<a href="#" class="btn btn-primary">Go somewhere</a>
        var studentLink = $("<button>")
        studentLink.addClass("btn")
        studentLink.attr("id", student.id)
        studentLink.addClass("btn-primary")
        studentLink.text("Select")
        cardBody.append(cardTitle)
        cardBody.append(address)
        cardBody.append(studentLink)
        card.append(cardBody)
    
        studentLink.on("click", function() {
            selectedStudentId = student.id
            console.log(student.birthdate)
            const queryURL = "http://localhost:8080/api/dueVaccines";
            $.ajax({
                url: queryURL,
                method: "POST",
                data: {
                    "birthday" : student.birthdate, 
                    "studentId" : student.id
                }
            }).then(function(response) {
                $('#vaccinationModel').modal('show');
                //Logic to get 3 cards in a row.
                let cards = new Array();
                for(let i=0;i<response.length;i++) {

                    if (cards.length < 3) {
                        console.log("cashing cards")
                        cards.push(createCardForDueVaccine(response[i]))
                        console.log(cards)
                    } else {
                        let row = $("<div>")
                        row.addClass("row")
                        while(cards.length != 0) {
                            console.log("appending card to row")
                            let col = $("<div>")
                            col.addClass("col-md-4")
                            col.append(cards[0])
                            row.append(col)
                            cards.shift()
                        }
                        console.log("appending new row")
                        $("#dueVaccinesContainer").append(row)
                        cards.push(createCardForDueVaccine(response[i]))
                    }
                }
                let row = $("<row>")
                while(cards.length > 0) {
                    row.append(cards[0])
                    cards.shift()
                }
                $("#dueVaccinesContainer").append(row)
                // response.forEach(element=> {            
                //     $("#dueVaccinesContainer").append(createCardForDueVaccine(element))
                // })
            });
        })
        $("#listContainer").append(card)
    }
    
    function createCardForDueVaccine(vaccine) {
        var card = $("<div>")
        card.addClass("card")
        // card.addClass("text-center")
        card.addClass("bordered")
        // card.attr("style", "width: 18rem")
        
        // <div class="card-body">
        var cardBody = $("<div>")
        cardBody.addClass("card-body")
        
        // <h5 class="card-title">Special title treatment</h5>
        var cardTitle = $("<h5>")
        cardTitle.addClass("card-title")
        cardTitle.text(vaccine.vaccineName)
    
        let inputFiled = $("<input id=" + vaccine.id + " type=" + "date" + " class=" + "form-control" + "/>")
        cardBody.append(cardTitle)
        cardBody.append(inputFiled)
    
        var updateButton = $("<button>")
        updateButton.addClass("btn")
        updateButton.addClass("btn-primary")
        updateButton.text("Update")
        updateButton.addClass("padding")
        updateButton.on("click", function() {
            event.preventDefault();
            if(inputFiled[0].value) {
                const queryURL = "http://localhost:8080/api/updateVaccination";
                $.ajax({
                    url: queryURL,
                    method: "POST",
                    data: {
                        "vaccinationDate" : inputFiled[0].value, 
                        "studentId" : selectedStudentId,
                        "vaccineId": vaccine.id
                    }
                }).then(function(response) {
                    console.log(response)
                    if (response.vaccinationDate) {
                        alert("Record updated")
                    } else {
                        alert("Something went wrong. Please try again later.")
                    }
                });
            } else {
                alert("Please enter valid date")
                console.log("Invalid date")
            }
        })
        cardBody.append(updateButton)
        card.append(cardBody)
        return card
    }
})