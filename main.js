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
//     console.log(data);
    var hourly = data.properties.forecastHourly; // Local variable: Hourly data url
    var daily = data.properties.forecast; // Local variable: Daily data url
    var radar = data.properties.radarStation; // Local variable: Radar station for radar gif
    document.getElementById("location").innerHTML = data.properties.relativeLocation.properties.city + ', ' + data.properties.relativeLocation.properties.state

    //LocalStorage because I don't understand how variable scope works in javascript
    localStorage.weatherHourly = hourly;
    localStorage.weatherDaily = daily;
    localStorage.weatherRadar = radar;
	//localStorage.weatherRadar = '<iframe src="https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif" class="imgradar"></iframe>'; // Present radar image from: https://radar.weather.gov/ridge/lite/KMLB_loop.gif

});
    currentweather();

}

function currentweather() {
    document.querySelector('.hourlyFront').style.display = 'none';    // Hide hourly
    document.querySelector('.radarFront').style.display = 'none';    // Hide radar
    document.querySelector('.dailyFront').style.display = 'none';    // Hide daily

    fetch(localStorage.weatherHourly)
    .then(response => response.json())
    .then(data => {
        console.log(data);
		today = new Date(data['properties']['periods']['0']['startTime']);
		mo = today.getMonth();
		dy = today.getDate();
		day = today.getDay();
		yr = today.getFullYear();
        icon = data['properties']['periods']['0']['icon'];
        sforecast = data['properties']['periods']['0']['shortForecast'];
        temp = data['properties']['periods']['0']['temperature'];
        windsp = data['properties']['periods']['0']['windSpeed'];
        winddir = data['properties']['periods']['0']['windDirection'];
        cweather = '<img src="' + icon + '">' + sforecast + '<br>' +  temp + ' F' + '<br>' + windsp + ' ' + winddir;

        document.getElementById("currentweather").innerHTML = cweather;
		
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
		mo = months[mo];
		day = days[day];
		
		document.getElementById("today").innerHTML = '<b>' + day + ':  ' + dy + '  ' + mo  + '  ' + yr + '</b>';

//             Get all data for hourly weather on first api pull
            var hourlist = '';
            for (var i=0, n=72; i<n; i++) {  // do n=72
                var weatherperiod = data.properties.periods[i];
                icon = weatherperiod.icon;
                time = new Date(weatherperiod.startTime);   // Parse datetime string to get hours
                hr = time.getHours(time);                   // Parse datetime string to get hours
				day = time.getDay(time);
				const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
				day = days[day];
//                 min = time.getMinutes(time);  // NOT needed - just add ':00'
                sforecast = weatherperiod.shortForecast;
                temp = weatherperiod.temperature;
                windsp = weatherperiod.windSpeed;
                winddir = weatherperiod.windDirection;
                hourlist += '<ul><img src="' + icon + '"><span><b>' + day + ': ' + hr + ':00</b><br>' + temp + ' F - ' + sforecast + '<br>' + windsp + ' ' + winddir + '<br></span></ul>';
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
         console.log(data);
        
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
    document.querySelector('.radarFront').style.display = 'block';
    document.querySelector('.mainFront').style.display = 'none'; 	// Hide class: mainFront
    document.querySelector('.hourlyFront').style.display = 'none';
    document.querySelector('.dailyFront').style.display = 'none';
    radar = localStorage.weatherRadar
//    var radarcode = '<a href="https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif"><img src="https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif" class="imgradar"></a>'; // Present radar image from: https://radar.weather.gov/ridge/lite/KMLB_loop.gif
    var radarcode = '<a href="https://radar.weather.gov/ridge/standard/' + radar + '_loop.gif"><img src="https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif" class="imgradar"></a>'; // Present radar image from: https://radar.weather.gov/ridge/lite/KMLB_loop.gif
    console.log(radarcode);
//	radarlink = 'https://radar.weather.gov/ridge/lite/' + radar + '_loop.gif'
	radarlink = 'https://radar.weather.gov/ridge/standard/' + radar + '_loop.gif'
    //document.getElementById("radarweather").innerHTML = radarcode;

	// TEMPORARY FIX to these problemts:
	// Failed to load ‘https://radar.weather.gov/ridge/lite/KMLB_loop.gif’. A ServiceWorker passed a promise to FetchEvent.respondWith() that resolved with non-Response value ‘undefined’.
	// I think the service worker is not allowing an image from another domain to load on PWA for a security issue (cross site ...)
	window.location = radarlink  // This just opens the radar on another window
}

function returnFront() {
    document.querySelector('.radarFront').style.display = 'none';
    document.querySelector('.hourlyFront').style.display = 'none';
    document.querySelector('.dailyFront').style.display = 'none';
    document.querySelector('.mainFront').style.display = 'block';
}

function hideloadinggif() {
    document.querySelector('.lds-ripple').style.display = 'none'; // Hide loading gif
}

// For pull-to-refresh
const ptr = PullToRefresh.init({
  mainElement: 'body',
  onRefresh() {
    window.location.reload();
  }
});
