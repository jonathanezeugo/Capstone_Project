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
        success: function(returnedData) { 
                $("#output").html(`<h3>Predicted US Rigs Count: ${returnedData["prediction"]}</h3>`)
            },

            error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}