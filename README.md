# Weather: a Progressive Web Application

Update of my previous Android Weather app to pwa for flexibility, space saving, and cross operating system availability.


For development/testing: 
- $ python3 -m http.server

## Plan

1) On page load (with loading gif):
  - <body onload="getWeather()">  
    - Pull location
    - Call api.weather.gov for forcasts
    - Display city name/state with current weather
  - Link to:
    - Hourly forecast -> store link in localstorage
    - Daily forecast -> store link in localstorage

Using lat/long -> From: https://api.weather.gov/points/28.5781,-81.373
- Get forecast links:
  - https://api.weather.gov/gridpoints/MLB/25,70/forecast
    - Get Daily weather and icon
		- DetailedForecast
  - https://api.weather.gov/gridpoints/MLB/25,70/forecast/hourly
	- Get Hourly weather and icon
		- Time/Temp/ShortForecast/Icon
- Get City/State
- Get Radarstation - for: https://radar.weather.gov/ridge/lite/KMLB_loop.gif

## Todo

- [ ] Write Radar page
- [ ] Write Hourly page
  - Use json link hardcoded first (or a variable)
- [ ] Write Daily page
  - Use json link hardcoded first (or a variable)
- [ ] Write getweather code
  - [X] Write geolocation code
  - [X] Write get links code - parse from lat,lng
  - [ ] Write parse json code hourly
  - [ ] Write parse json code daily
- [ ] Change icons
- [X] Set loading icon
- [X] Pull to refresh
- [X] Write index page

## Resources

- https://usefulangle.com/post/180/javascript-get-geolocation
- https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_geo_coordinates
- https://www.w3schools.com/Js/js_json_parse.asp
- https://www.w3schools.com/Js/js_json_arrays.asp
- https://www.w3schools.com/jsref/jsref_obj_date.asp
- https://stackoverflow.com/questions/4842590/how-to-run-a-function-when-the-page-is-loaded
