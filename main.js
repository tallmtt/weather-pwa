if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

var supported = document.getElementById("isnotsupported");

function getWeather() {
	document.querySelector('.hourlyFront').style.display = 'none'
	document.querySelector('.radarFront').style.display = 'none'
	document.querySelector('.dailyFront').style.display = 'none'
	getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weatherdata);
  } else { 
    isnotsupported.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function weatherdata(position) {
  fetch('https://api.weather.gov/points/' + position.coords.latitude + ',' + position.coords.longitude)
  .then(response => response.json())
  .then(data => {
// 	  console.log(data);
	  var hourly = data.properties.forecastHourly; // Local variable: Hourly data url
	  var daily = data.properties.forecast; // Local variable: Daily data url
	  var radar = data.properties.radarStation; // Local variable: Radar station for radar gif
	  document.getElementById("location").innerHTML = data.properties.relativeLocation.properties.city + ', ' + data.properties.relativeLocation.properties.state

	  //LocalStorage becasue I don't understand how variable scope works in javascript
	  localStorage.weatherHourly = hourly;
	  localStorage.weatherDaily = daily;
	  localStorage.weatherRadar = radar;
  });
	currentweather();

//	document.getElementById("currentweather").innerHTML = currentweather();  // Too slow
}

function currentweather() {
    document.querySelector('.hourlyFront').style.display = 'none';    // Hide hourly
    document.querySelector('.radarFront').style.display = 'none';    // Hide radar
    document.querySelector('.dailyFront').style.display = 'none';    // Hide daily

    fetch(localStorage.weatherHourly)
    .then(response => response.json())
    .then(data => {
//         console.log(data);
        icon = data['properties']['periods']['0']['icon'];
        sforecast = data['properties']['periods']['0']['shortForecast'];
        temp = data['properties']['periods']['0']['temperature'];
        windsp = data['properties']['periods']['0']['windSpeed'];
        winddir = data['properties']['periods']['0']['windDirection'];
//         cweather = [icon,sforecast,temp,windsp,winddir];

        document.getElementById("currentweather").innerHTML = 
            '<img src="' + icon + '">' + sforecast + '<br>' +  temp + ' F' + '<br>' + windsp + ' ' + winddir;

//             Get all data for hourly weather on 1 api pull
            var hourlist = '';
            for (var i=0, n=72; i<n; i++) {  // do n=72
                var weatherperiod = data.properties.periods[i];
                icon = weatherperiod.icon;
                time = new Date(weatherperiod.startTime);
                hr = time.getHours(time);
//                 min = time.getMinutes(time);
//                 time = date.parse(time);
                sforecast = weatherperiod.shortForecast;
                temp = weatherperiod.temperature;
                windsp = weatherperiod.windSpeed;
                winddir = weatherperiod.windDirection;
                hourlist += '<ul><img src="' + icon + '"><span><b>' + hr + ':00</b><br>' + temp + ' F - ' + sforecast + '<br>' + windsp + ' ' + winddir + '<br></span></ul>';
            }
//             console.log(hourlist);
            document.getElementById("hourlyweather").innerHTML = hourlist;
            
    });
    hideloadinggif();
}

function getForecastHourly() {
    document.querySelector('.hourlyFront').style.display = 'block'; // Show Hourly  
    document.querySelector('.mainFront').style.display = 'none';    // Hide class: mainFront
    document.querySelector('.dailyFront').style.display = 'none';    // Hide daily
    document.querySelector('.radarFront').style.display = 'none';    // Hide radar

// 	let now = new Date();
// 	alert( now );
//	alert('Hourly');

// // Moved to currentweather()
//     fetch(localStorage.weatherHourly)
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data);
//         
// 		var weatherperiod = data.properties.periods['0'].shortForecast;
// 		console.log(weatherperiod); //Maine, then Connecticut
// 
// // Section to parse data into each section
//         var hourlist = '';
//         for (var i=0, n=2; i<n; i++) {  // do n=72
//             var weatherperiod = data.properties.periods[i];
//             icon = weatherperiod.icon;
//             time = weatherperiod.startTime;
//             sforecast = weatherperiod.shortForecast;
//             temp = weatherperiod.temperature;
//             windsp = weatherperiod.windSpeed;
//             winddir = weatherperiod.windDirection;
//             hourlist += '<ul><img src="' + icon + '">' + time + '<br>' + sforecast + '<br>' +  temp + ' F' + '<br>' + windsp + ' ' + winddir + '</ul>';
//         }
//         console.log(hourlist);
//         document.getElementById("hourlyweather").innerHTML = hourlist
// 
//     });
    
}

function getForecastDaily() {
//     alert('Daily');
    document.querySelector('.dailyFront').style.display = 'block';
    document.querySelector('.hourlyFront').style.display = 'none'; // Hide Hourly  
    document.querySelector('.radarFront').style.display = 'none'; // Hide Hourly  
    document.querySelector('.mainFront').style.display = 'none';    // Hide class: mainFront
    
    fetch(localStorage.weatherDaily)
    .then(response => response.json())
    .then(data => {
//         console.log(data);
        
       var weatherperiod = data.properties.periods['0'].shortForecast;
//        console.log(weatherperiod);

//         Section to parse data into each section
        var daylist = '';
        for (var i=0, n=data.properties.periods.length; i<n; i++) {  // do all periods
            var weatherperiod = data.properties.periods[i];
            icon = weatherperiod.icon;
            name = weatherperiod.name;
            dforecast = weatherperiod.detailedForecast;
            daylist += '<ul><img src="' + icon + '"><span><b>' + name + '</b><br>' + dforecast + '</span></ul>';
        }
//         console.log(daylist);
        document.getElementById("dailyweather").innerHTML = daylist

    });
}

function getRadar() {
//	alert('Radar: ' + radar);
    document.querySelector('.radarFront').style.display = 'block';
    document.querySelector('.mainFront').style.display = 'none'; 	// Hide class: mainFront
    document.querySelector('.hourlyFront').style.display = 'none';
    document.querySelector('.dailyFront').style.display = 'none';
    radar = localStorage.weatherRadar
//     document.querySelector('.radarbutton').style.display = 'none'; 	// Hide class: radarbutton
    // Present radar image from: https://radar.weather.gov/ridge/lite/KMLB_loop.gif
    var radarcode = '<img src="https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif" class="imgradar">';
//     console.log(radarcode);
    document.getElementById("radarweather").innerHTML = radarcode;
}

function returnFront() {
    document.querySelector('.radarFront').style.display = 'none';
    document.querySelector('.hourlyFront').style.display = 'none';
    document.querySelector('.dailyFront').style.display = 'none';
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
