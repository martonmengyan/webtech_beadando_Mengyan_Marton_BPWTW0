$(function(){
    listAllCars();
    getManufacturers4Del();
    getManufacturers4Edit();
    getCarID4Del();
    getCarID4Edit();
    $("#addCar").click(function(){
        addCar();
    });

    $("#editCar").click(function(){
        editCar();
    });

    $("#deleteCar").click(function(){
        deleteCar();
    });
});

function listAllCars(){
    $.getJSON("https://webtechcars.herokuapp.com/api/cars", function (data) {
        var table = $("#carsTable");
        $.each(data, function(key, value) {
            var row = $('<tr></tr>');
            var realIDCell = $('<td>' +value._id+ '</td>');
            var nameCell = $('<td>' +value.name + '</td>');
            var consumptionCell = $('<td>' +value.consumption + '</td>');
            var colorCell = $('<td>' +value.color + '</td>');
            var manufacturerCell = $('<td>' +value.manufacturer + '</td>');
            var availableCell = $('<td>' +value.avaiable + '</td>');
            var yearCell = $('<td>' +value.year + '</td>');
            var horsepowerCell = $('<td>' +value.horsepower + '</td>');
            $(row).append(realIDCell);
            $(row).append(nameCell);
            $(row).append(consumptionCell);
            $(row).append(colorCell);
            $(row).append(manufacturerCell);
            $(row).append(availableCell);
            $(row).append(yearCell);
            $(row).append(horsepowerCell);
            $(table).append(row);
        });
    });
};

function getManufacturers4Del(){
    var $select = $("#manufacturer");
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function(data){
        $.each(data, function(key, value){
            $select.append('<option value="' + value.name + '">' + value.name + '</option>');
        });
    });
};

function getManufacturers4Edit(){
    var $select = $("#manufacturer2");
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function(data){
        $.each(data, function(key, value){
            $select.append('<option value="' + value.name + '">' + value.name + '</option>');
        });
    });
};

function addCar(){
    event.preventDefault();
    const carData = JSON.stringify({
        "name": document.getElementById("name").value,
        "consumption": document.getElementById("consumption").value,
        "color": document.getElementById("color").value,
        "manufacturer": document.getElementById("manufacturer").value,
        "avaiable": document.getElementById("available").value,
        "year": document.getElementById("year").value,
        "horsepower": document.getElementById("horsepower").value,
    });
    console.log(carData);
    $.ajax({
        type:"POST",
        url: "https://webtechcars.herokuapp.com/api/cars",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        data:carData,
        contentType:"application/json",
        success: function(data){
            alert("Sikeres hozzáadás!");
            $("#content").load("cars.html");
        },
        error: function(){
            alert("Sikertelen!");
        }
    });
}

function getCarID4Del(){
    var $select = $("#idDelete");
    $.getJSON("https://webtechcars.herokuapp.com/api/cars", function(data){
        $.each(data, function(key, value){
            $select.append('<option value="' + value._id + '">' + value._id + '</option>');
        });
    });
};

function getCarID4Edit(){
    var $select = $("#idEdit");
    $.getJSON("https://webtechcars.herokuapp.com/api/cars", function(data){
        $.each(data, function(key, value){
            $select.append('<option value="' + value._id + '">' + value._id + '</option>');
        });
    });
};

function deleteCar(){
    event.preventDefault();
    var id = document.getElementById("idDelete").value;
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/cars/" + id,
        contentType: "application/json",
        success: function(data){
            alert("Sikeresen törölve!");
            $("#content").load("cars.html");
        },
        error: function(){
            alert("Sikertelen!");
        }
    })
}

function editCar(){
    event.preventDefault();
    var id = document.getElementById("idEdit").value;
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/cars/" + id,
        contentType: "application/json",
        success: function(data){},
        error: function(){
            alert("Sikertelen!");
        }
    })

    const carData = JSON.stringify({
        "name": document.getElementById("name2").value,
        "consumption": document.getElementById("consumption2").value,
        "color": document.getElementById("color2").value,
        "manufacturer": document.getElementById("manufacturer2").value,
        "avaiable": document.getElementById("available2").value,
        "year": document.getElementById("year2").value,
        "horsepower": document.getElementById("horsepower2").value,
    });
    $.ajax({
        type:"POST",
        url: "https://webtechcars.herokuapp.com/api/cars",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        data:carData,
        contentType:"application/json",
        success: function(data){
            alert("A módosítások sikeresen végbe mentek!");
            $("#content").load("cars.html");
        },
        error: function(){
            alert("Sikertelen!");
    }
    });
}