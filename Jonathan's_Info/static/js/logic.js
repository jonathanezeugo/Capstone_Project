$(document).ready(function() {
    //console.log("Page Loaded");

    $("#filter").click(function() {
        makePredictions();
        $("#myModal").modal("show");
    });


});

// call Flask API endpoint
function makePredictions() {

    var totalRigs = $("#totalrigs").val();
    var asiaRigs = $("#asiapacrigs").val();
    var brentPrice = $("#brentprice").val();
    var latinRigs = $("#latinamrigs").val();

    // create the payload
    var payload = {
        "totalRigs": totalRigs,
        "asiaRigs": asiaRigs,
        "brentPrice": brentPrice,
        "latinRigs": latinRigs,
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: $("#output").html("<h3>US Rig Count Prediction: <b>TEST</b></h3>"),
        
        // function(returnedData) {
        //     // print it
        //     //console.log(returnedData);
            


        //     // if (returnedData["prediction"]["point"] == 0) {
        //     //     $("#output").html("<h3>Most Likely Outcome is: <b>Arrest</b></h3>");
        //     // } else if (returnedData["prediction"]["point"] == 1) {
        //     //     $("#output").html("<h3>Most Likely Outcome is: <b>Clearance</b></h3>");
        //     // } else {
        //     //     $("#output").html("<h3>Most Likely Outcome is: <b>Suspension</b></h3>");
        //     // }

        //     // makePlots(returnedData["prediction"]["proba"], parseInt(returnedData["prediction"]["point"]));
        //     // makeTable(returnedData["prediction"]["proba"]);
        // },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}