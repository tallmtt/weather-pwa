if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

var supported = document.getElementById("supported");

function getWeather() {
	document.querySelector('.hourlyFront').style.display = 'none'
	document.querySelector('.radarFront').style.display = 'none'
	document.querySelector('.dailyFront').style.display = 'none'
	getLocation();
//	console.log(locationweather[0]);
//	console.log(zzz);
//	document.getElementById("currentweather").innerHTML = currentweather();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weatherdata);
  } else { 
    supported.innerHTML = "Geolocation is not supported by this browser.";
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
		icon = data['properties']['periods']['0']['icon'];
		sforecast = data['properties']['periods']['0']['shortForecast'];
		temp = data['properties']['periods']['0']['temperature'];
		windsp = data['properties']['periods']['0']['windSpeed'];
		winddir = data['properties']['periods']['0']['windDirection'];
		cweather = [icon,sforecast,temp,windsp,winddir];

		document.getElementById("currentweather").innerHTML = 
			'<img src="' + icon + '">' + sforecast + '<br>' +  temp + ' F' + '<br>' + windsp + ' ' + winddir;
			
	});
	hideloadinggif();
}

function getForecastHourly() {
	let now = new Date();
	alert( now );
//	alert('Hourly');
	fetch(localStorage.weatherHourly)
	.then(response => response.json())
	.then(data => {
		console.log(data);
//		var weatherperiod = data.properties.periods['0'].shortForecast;
//		console.log(weatherperiod); //Maine, then Connecticut

// Section to parse data into each section
		for (var i=0, n=5; i<n; i++) {  // do n=72
			var weatherperiod = data.properties.periods[i].startTime;
			console.log(weatherperiod); //Maine, then Connecticut
//			for (var j=0, k=state.store.length; j<k; j++) {
//				var store = state.store[j]; //the object containing store name, id & URL
//				console.log(store.storeID);
//			}
		}
		
	});
}

function getForecastDaily() {
	alert('Daily');
}

function getRadar() {
	document.querySelector('.radarFront').style.display = 'block';
	radar = localStorage.weatherRadar
//	alert('Radar: ' + radar);
	document.querySelector('.mainFront').style.display = 'none'; 	// Hide class: mainFront
	// Present radar image from: https://radar.weather.gov/ridge/lite/KMLB_loop.gif
	document.getElementById("radarweather").innerHTML = 
			'<img src="https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif" class="imgradar">';
	// Todo: Add back button
}

function returnFront() {
	document.querySelector('.radarFront').style.display = 'none';
//	document.querySelector('.hourlyFront').style.display = 'none';
//	document.querySelector('.dailyFront').style.display = 'none';
	document.querySelector('.mainFront').style.display = 'block';
}

function hideloadinggif() {
	document.querySelector('.lds-ripple').style.display = 'none';
	//alert('hiding');
}

// For pull-to-refresh
const ptr = PullToRefresh.init({
  mainElement: 'body',
  onRefresh() {
    window.location.reload();
  }
});