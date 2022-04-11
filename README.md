# Weather: a Progressive Web Application

Update of my previous Android Weather app to pwa for flexibility, space saving, and cross operating system availability.

## Plan

1) On page load (with loading gif):
  - <body onload="getWeather()">  
    - Pull location
    - Call api.weather.gov for forcasts
    - Display city name/state with current weather
  - Link to:
    - Hourly forecast -> store link in localstorage
    - Daily forecast -> store link in localstorage
  - 

Using lat/long -> From: https://api.weather.gov/points/28.5781,-81.373
- Get forecast links:
  - https://api.weather.gov/gridpoints/MLB/25,70/forecast
    - Get Daily weather and icon
		- DetailedForecast
  - https://api.weather.gov/gridpoints/MLB/25,70/forecast/hourly
	- Get Hourly weather and icon
		- Time/Temp/ShortForecast/Icon
- Get City/State
- Get Radarstation

## Resources

- https://usefulangle.com/post/180/javascript-get-geolocation
- https://www.w3schools.com/Js/js_json_parse.asp
- https://www.w3schools.com/Js/js_json_arrays.asp
- https://www.w3schools.com/jsref/jsref_obj_date.asp
- https://stackoverflow.com/questions/4842590/how-to-run-a-function-when-the-page-is-loaded
