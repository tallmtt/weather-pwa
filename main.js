if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

var x = document.getElementById("testing");

function getWeather() {
	//alert("Starting up...");
	getLocation();
    currentweather();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weatherdata);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function weatherdata(position) {
  fetch('https://api.weather.gov/points/' + position.coords.latitude + ',' + position.coords.longitude)
  .then(response => response.json())
  .then(data => {
	  console.log(data);
	  var hourly = data.properties.forecastHourly; //Hourly data url
	  var daily = data.properties.forecast; //Daily data url
	  var radar = data.properties.radarStation; // Radar station for radar gif
	  document.getElementById("location").innerHTML = data.properties.relativeLocation.properties.city + ', ' + data.properties.relativeLocation.properties.state
	  //alert(hourly);
	  //LocalStorage becasue I don't understand how variable scope works in javascript
	  localStorage.weatherHourly = hourly;
	  localStorage.weatherDaily = daily;
	  localStorage.weatherRadar = radar;
  });
}

function currentweather() {
	fetch(localStorage.weatherHourly)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		document.getElementById("currentweather").innerHTML = 
		'<img src="' + data['properties']['periods']['0']['icon'] + '">' + 
		'<br>' + data['properties']['periods']['0']['shortForecast'] + 
		'<br>' + data['properties']['periods']['0']['temperature'] + ' F' +
		'<br>' + data['properties']['periods']['0']['windSpeed'] + ' ' + data['properties']['periods']['0']['windDirection']
	});
	
	/////////////////////////////
	// Once loaded - hide the loading gif...
	/////////////////////////////
}

function getForecastHourly() {
	alert('Hourly');
}

function getForecastDaily() {
	alert('Daily');
}