if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

var x = document.getElementById("testing");
//var currentweather = [] // Global variable: Current weather variable
//var lweather = [] // Global variable: Weather location

function getWeather() {
	getLocation();
//	console.log(locationweather[0]);
//	console.log(zzz);
//	document.getElementById("currentweather").innerHTML = currentweather();
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
	  var hourly = data.properties.forecastHourly; // Local variable: Hourly data url
	  var daily = data.properties.forecast; // Local variable: Daily data url
	  var radar = data.properties.radarStation; // Local variable: Radar station for radar gif
	  document.getElementById("location").innerHTML = data.properties.relativeLocation.properties.city + ', ' + data.properties.relativeLocation.properties.state
//	  let city = data.properties.relativeLocation.properties.city
//	  let state = data.properties.relativeLocation.properties.state
//	  let lweather = [city,state];

	  //LocalStorage becasue I don't understand how variable scope works in javascript
	  localStorage.weatherHourly = hourly;
	  localStorage.weatherDaily = daily;
	  localStorage.weatherRadar = radar;
  });
	currentweather();
//	document.getElementById("currentweather").innerHTML = currentweather();  // Too slow
}

function currentweather() {
	fetch(localStorage.weatherHourly)
	.then(response => response.json())
	.then(data => {
		console.log(data);
//		document.getElementById("currentweather").innerHTML = 
//		'<img src="' + data['properties']['periods']['0']['icon'] + '">' + 
//		'<br>' + data['properties']['periods']['0']['shortForecast'] + 
//		'<br>' + data['properties']['periods']['0']['temperature'] + ' F' +
//		'<br>' + data['properties']['periods']['0']['windSpeed'] + ' ' + data['properties']['periods']['0']['windDirection']
		icon = data['properties']['periods']['0']['icon'];
		sforecast = data['properties']['periods']['0']['shortForecast'];
		temp = data['properties']['periods']['0']['temperature'];
		windsp = data['properties']['periods']['0']['windSpeed'];
		winddir = data['properties']['periods']['0']['windDirection'];
		cweather = [icon,sforecast,temp,windsp,winddir];

		document.getElementById("currentweather").innerHTML = 
			'<img src="' + icon + '">' + '<br>' + sforecast + '<br>' +  temp + ' F' + '<br>' + windsp + ' ' + winddir;
//		var cweather = '<img src="' + icon + '">' + '<br>' + sforecast + '<br>' +  temp + ' F' + '<br>' + windsp + ' ' + winddir;
//		console.log(cweather);
//		return cweather;
	});
}

function getForecastHourly() {
	alert('Hourly');
}

function getForecastDaily() {
	alert('Daily');
}

function getRadar() {
	alert('Radar');
}