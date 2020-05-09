var mainbutton = document.getElementById("btn");
var leftbutton = document.getElementById("btl");
var rightbutton = document.getElementById("btr");

var carspeed = document.getElementById('carspeed');
var submitbutton = document.getElementById('submit');
var outputMsg = document.getElementById('output');
var form1 = document.getElementById('enterspeed');

var brakesbutton = document.getElementById("brakes");
var gasbutton = document.getElementById("accelerate");
//let form_contents = form1.innerHTML;
var accel = 0;

var fontalign = document.getElementById("font");

mainbutton.onclick = function(){
    if (mainbutton.className == "open"){
        mainbutton.className = "";
        carspeed.value = 0;
        form1.innerHTML = form_contents;
        outputMsg.innerHTML = "Display Output: \nCruise Control turned off. <br/>";
    } else {
        if (carspeed.value < 1){
            outputMsg.innerHTML = "Input starting car speed.<br/>";
        } else if (carspeed.value < 25 || carspeed.value > 75){
            outputMsg.innerHTML = "Warning: Cannot drive below 25 mph or above 75 mph on Cruise Control.";
        } else {
            mainbutton.className = "open";
            fontalign.className = "open";
            outputMsg.innerHTML = "Cruise Control on. Set speed: " + carspeed.value + ". Current car speed " + carspeed.value + ".<br/>";
        }
    }
};

leftbutton.onclick = function(){
    accel = 0;
    if (mainbutton.className == "open"){
        if (carspeed.value < 1){
            outputMsg.innerHTML = "Please input initial car speed.";
        } else if (carspeed.value - 1 < 25){
            outputMsg.innerHTML = "Warning: Cannot drive below 25 mph on Cruise Control.";
        } else {
            carspeed.value--;
            outputMsg.innerHTML = "Set speed: " + carspeed.value + ". Current car speed " + carspeed.value + ".<br/>";
        }
    } else {
        outputMsg.innerHTML = "Cruise Control has not been turned on."
    }
};


rightbutton.onclick = function(){
    accel = 0;
    if (mainbutton.className == "open"){
        if (carspeed.value < 1){
            outputMsg.innerHTML = "Please input initial car speed.";
        } else if (carspeed.value - 1 + 2 > 75){
            outputMsg.innerHTML = "Warning: Cannot drive above 75 mph on Cruise Control.";
        } else {
            carspeed.value++;
            outputMsg.innerHTML = "Set speed: " + carspeed.value + ". Current car speed " + carspeed.value + ".<br/>";
        }
    } else {
        outputMsg.innerHTML = "Cruise Control has not been turned on."
    }
};

submitbutton.onclick = function(){
    if (carspeed.value < 25 || carspeed.value > 75){
        outputMsg.innerHTML = "Please input initial car speed between 25 mph and 75 mph.";
    } else {
        outputMsg.innerHTML = "Input recieved. Current car speed is set to " + carspeed.value + " mph.<br/>";
        form1.innerHTML = "";
        fontalign.className = "open";
    }
};

brakesbutton.onclick = function(){
    mainbutton.className = "";
    carspeed.value = 0;
    accel = 0;
    initialspeed = 0;
    //form1.innerHTML = form_contents;
    outputMsg.innerHTML = "Display Output: Cruise Control turned off. <br/>";
};

gasbutton.onclick = function(){
    accel++;
    var z = Number(carspeed.value) + Number(accel);
    if (mainbutton.className != "open"){
        outputMsg.innerHTML = "Cruise is off. Current car speed: " + accel + ".<br/>";
        carspeed.value = accel;
    } else {
        if (z > 75){
            outputMsg.innerHTML = "Warning: Cannot drive above 75 mph on Cruise Control.";
            accel--;
        } else {
            outputMsg.innerHTML = "Set speed: " + carspeed.value + ". Current car speed " + z + ".<br/>";
        }
    }
};
