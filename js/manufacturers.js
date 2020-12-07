$(function(){
    listAllManufacturers();
    getManuID4Del();
    getManuID4Edit();
    $("#add-manu").click(function(){
        addManu();
    });

    $("#editManu").click(function(){
        editManu();
    });

    $("#deleteManu").click(function(){
        deleteManu();
    });
});

function listAllManufacturers(){
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        var table = $("#manuTable");
        $.each(data, function(key, value) {
            var row = $('<tr></tr>');
            var realIDCell = $('<td>' +value._id+ '</td>');
            var nameCell = $('<td>' +value.name + '</td>');
            var countryCell = $('<td>' +value.country + '</td>');
            var foundedCell = $('<td>' +value.founded + '</td>');
            $(row).append(realIDCell);
            $(row).append(nameCell);
            $(row).append(countryCell);
            $(row).append(foundedCell);
            $(table).append(row);
        });
    });
};

function addManu(){
    event.preventDefault();
    const manuData = JSON.stringify({
        "name": document.getElementById("name").value,
        "country": document.getElementById("country").value,
        "founded": document.getElementById("founded").value,
    });


    $.ajax({
        type:"POST",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        data:manuData,
        contentType:"application/json",
        success: function(data){
            alert("Sikeres hozzáadás!");
            $("#content").load("manufacturers.html");
        },
        error: function(){
            alert("Nem sikerült.");
        }
    });
}

function getManuID4Del(){
    var $select = $("#idDelete");
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function(data){
        $.each(data, function(key, value){
            $select.append('<option value="' + value._id + '">' + value._id + '</option>');
        });
    });
};

function getManuID4Edit(){
    var $select = $("#idEdit");
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function(data){
        $.each(data, function(key, value){
            $select.append('<option value="' + value._id + '">' + value._id + '</option>');
        });
    });
};

function deleteManu(){
    event.preventDefault();
    var id = document.getElementById("idDelete").value;
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/manufacturers/" + id,
        contentType: "application/json",
        success: function(data){
            alert("Sikeresen törölve!");
            $("#content").load("manufacturers.html");
        },
        error: function(){
            alert("Sikertelen!");
        }
    })
}

function editManu(){
    event.preventDefault();
    var id = document.getElementById("idEdit").value;
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/manufacturers/" + id,
        contentType: "application/json",
        success: function(data){},
        error: function(){
            alert("Sikertelen!");
        }
    })

    const manuData = JSON.stringify({
        "name": document.getElementById("name2").value,
        "country": document.getElementById("country2").value,
        "founded": document.getElementById("founded2").value,
    });
    console.log(manuData);
    $.ajax({
        type:"POST",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        data:manuData,
        contentType:"application/json",
        success: function(data){
            alert("A módosítások sikeresen végbe mentek!");
            $("#content").load("manufacturers.html");
        },
        error: function(){
            alert("Sikertelen!");
    }
    });
}