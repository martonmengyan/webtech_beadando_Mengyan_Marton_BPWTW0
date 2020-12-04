$(function(){ //Ready 

    $("#content").load("home.html");

    $("#home").on("click",function(event){
        event.preventDefault();
        $("#content").load("home.html");
    });

    $("#cars").on("click",function(event){
        event.preventDefault();
        $("#content").load("cars.html");
    });

    $("#manufacturers").on("click",function(event){
        event.preventDefault();
        $("#content").load("manufacturers.html");
    });
});