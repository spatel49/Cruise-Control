// List of variables
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
var accel2 = 0;

var fontalign = document.getElementById("font");

// Getting date/time values for the Speed/Error Logs
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
var SpeedLog = document.getElementById("logs1");
var ErrorLog = document.getElementById("logs2");

// The main Cruise Control button used to Turn ON/OFF the cruise control simulation. Must be within 25-75 mph.
mainbutton.onclick = function () {
	if (mainbutton.className == "open") {
		mainbutton.className = "";
		//form1.innerHTML = form_contents;
		accel = 0;
		accel2 = 0;
		outputMsg.innerHTML = "Cruise Control turned off. <br/>";
		SpeedLog.innerHTML += dateTime + " - Cruise Control turned off. Set speed: " + carspeed.value + "<br/>";
	} else {
		if (carspeed.value < 1) {
			outputMsg.innerHTML = "Input starting car speed.<br/>";
		} else if (carspeed.value < 25 || carspeed.value > 75) {
			outputMsg.innerHTML = "Warning: Cannot drive below 25 mph or above 75 mph on Cruise Control.";
			ErrorLog.innerHTML += dateTime + " - Warning, out of range. Current Speed: " + carspeed.value + "<br/>";
		} else {
			mainbutton.className = "open";
			fontalign.className = "open";
			outputMsg.innerHTML = "Cruise Control on. Set speed: " + carspeed.value + ". Current car speed " + carspeed.value + ".<br/>";
			SpeedLog.innerHTML += dateTime + " - Cruise Control turned on. Starting speed: " + carspeed.value + "<br/>";
		}
	}
};

// The button used to decrement the speed.
leftbutton.onclick = function () {
	accel = 0;
	if (mainbutton.className == "open") {
		if (carspeed.value < 1) {
			outputMsg.innerHTML = "Please input initial car speed.";
		} else if (carspeed.value - 1 < 25) {
			outputMsg.innerHTML = "Warning: Cannot drive below 25 mph on Cruise Control.";
			ErrorLog.innerHTML += dateTime + " - Cannot cruise below 25 mph. Current Speed: " + carspeed.value + "<br/>";
		} else {
			carspeed.value--;
			outputMsg.innerHTML = "Set speed: " + carspeed.value + ". Current car speed " + (Number(carspeed.value) + Number(accel2) + 1) + ".<br/>";
			SpeedLog.innerHTML += dateTime + " - Set Speed: " + carspeed.value + "<br/>";
			accel = 0;
		}
	} else {
		outputMsg.innerHTML = "Cruise Control has not been turned on."
	}
};

// The button used to increase the speed.
rightbutton.onclick = function () {
	accel = 0;
	if (mainbutton.className == "open") {
		if (carspeed.value < 1) {
			outputMsg.innerHTML = "Please input initial car speed.";
		} else if (carspeed.value - 1 + 2 > 75) {
			outputMsg.innerHTML = "Warning: Cannot drive above 75 mph on Cruise Control.";
			ErrorLog.innerHTML += dateTime + " - Cannot cruise above 75 mph. Current Speed: " + carspeed.value + "<br/>";
		} else {
			carspeed.value++;
			outputMsg.innerHTML = "Set speed: " + carspeed.value + ". Current car speed " + (Number(carspeed.value) + Number(accel2) - 1) + ".<br/>";
			SpeedLog.innerHTML += dateTime + " - Set Speed: " + carspeed.value + "<br/>";
			accel = 0;
		}
	} else {
		outputMsg.innerHTML = "Cruise Control has not been turned on."
	}
};

// The button used to submit the initial car speed.
submitbutton.onclick = function () {
	if (carspeed.value < 25 || carspeed.value > 75) {
		ErrorLog.innerHTML += dateTime + " - Invalid Input: " + carspeed.value + "<br/>";
		outputMsg.innerHTML = "Invalid input. Refresh and please enter a speed between 25 and 75 mph.<br/>";
		form1.innerHTML = "";
		fontalign.className = "open";
	} else if (!Number(carspeed.value)) {
		ErrorLog.innerHTML += dateTime + " - Invalid Input: " + carspeed.value + "<br/>";
		outputMsg.innerHTML = "Invalid input. Refresh and please enter a speed between 25 and 75 mph.<br/>";
		form1.innerHTML = "";
		fontalign.className = "open";
	} else {
		outputMsg.innerHTML = "Input received. Current car speed is set to " + carspeed.value + " mph.<br/>";
		form1.innerHTML = "";
		fontalign.className = "open";
	}
};

// Button for the brakes, cruise control shuts off after this is pressed.
brakesbutton.onclick = function () {
	if (carspeed.value > 0){
		mainbutton.className = "";
		accel = 0;
		accel2 = 0;
		carspeed.value--;
		//form1.innerHTML = form_contents;
		outputMsg.innerHTML = "Cruise Control turned off. Current Speed: " + carspeed.value + "<br/>";
		SpeedLog.innerHTML += dateTime + " - Cruise Control turned off. Set speed: " + carspeed.value + "<br/>";
	}
}

// Button for the accelerator. Car speed increases when this is pressed.
gasbutton.onclick = function () {
	if (carspeed.value < 0){
		outputMsg.innerHTML = "Speed cannot be negative. Current Speed: " + carspeed.value + ".<br/>";
	} else {
		accel++;
		carspeed.value++;
		if (mainbutton.className != "open") {
			outputMsg.innerHTML = "Cruise is off. Current car speed: " + carspeed.value + ".<br/>";
			SpeedLog.innerHTML += dateTime + " - Cruise Control turned off. Set speed: " + carspeed.value + "<br/>";
		} else {
			accel2++;
			if (carspeed.value > 75) {
				outputMsg.innerHTML = "Warning: Cannot drive above 75 mph on Cruise Control.";
				ErrorLog.innerHTML += dateTime + " - Cannot cruise above 75 mph. Current Speed: " + carspeed.value + "<br/>";
				accel2--;
			} else {
				carspeed.value--;
				outputMsg.innerHTML = "Set speed: " + carspeed.value + ". Current car speed " + (Number(carspeed.value) + Number(accel2)) + ".<br/>";
				SpeedLog.innerHTML += dateTime + " - Cruise Control On. Set speed: " + carspeed.value + ". Current speed: " + (Number(carspeed.value) + Number(accel2)) + "<br/>";
			}
		}
	}
};