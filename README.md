# Weather: a Progressive Web Application

This is an update of my previous Android Weather app (Flutter based) to pwa for added flexibility, space saving, and cross operating system availability.

For development/testing: 
- $ python3 -m http.server

# Version 1.0 done!

**MVP 4/22/22!!!**

This is a progressive web app that uses weather forecasting data from weather.gov.

## Features

- Gets current location and pulls up current weather
- Gets hourly weather for next 72 hours
- Gets current location weather radar
- Gets daily weather forecast
- Can pull to refresh on mobile
- Nice loading gif
- If location is not allowed; error will be shown

---

# Overall Development Plan

- On page load (with loading gif):
  - <body onload="getWeather()">
    - Pull location
    - Call api.weather.gov for forecasts
    - Display city name/state with current weather
  - Link to:
    - Hourly forecast -> store link in localstorage
    - Daily forecast -> store link in localstorage
    - Radar -> store link in localstorage

- Using lat/long -> From: https://api.weather.gov/points/28.5781,-81.373
    - Get forecast links:
    - https://api.weather.gov/gridpoints/MLB/25,70/forecast
        - Get Daily weather and icon
            - DetailedForecast
    - https://api.weather.gov/gridpoints/MLB/25,70/forecast/hourly
        - Get Hourly weather and icon
            - Time/Temp/ShortForecast/Icon
    - Get City/State
    - Get Radarstation - for: https://radar.weather.gov/ridge/lite/KMLB_loop.gif

# Todo

- [X] Fix css scroll - keep title at top of page when scrolling down
- [X] Write getweather code
  - [X] Write geolocation code
  - [X] Write get links code - parse from lat,lng
  - [X] Write Hourly page: parse json code hourly
    - [X] Need to fix css to center better
  - [X] Write Daily page: parse json code daily
- [X] Change icons
- [X] Write Radar page
- [X] Set loading icon
- [X] Pull to refresh
- [X] Write index page

## Reference helps

- https://usefulangle.com/post/180/javascript-get-geolocation
- https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_geo_coordinates
- https://www.w3schools.com/Js/js_json_parse.asp
- https://www.w3schools.com/Js/js_json_arrays.asp
- https://www.w3schools.com/jsref/jsref_obj_date.asp
- https://stackoverflow.com/questions/4842590/how-to-run-a-function-when-the-page-is-loaded

### Looping through json for each <ul> and <li>
From: https://stackoverflow.com/questions/8434579/how-to-parse-json-into-nested-html-list-strucuture

for (var i=0, n=json.storeList.state.length; i<n; i++) {
    var state = json.storeList.state[i];
    console.log(state.stateName); //Maine, then Connecticut
    for (var j=0, k=state.store.length; j<k; j++) {
        var store = state.store[j]; //the object containing store name, id & URL
        console.log(store.storeID);
    }
}

- https://javascript.info/date
- https://www.w3schools.com/jsref/jsref_tolocaletimestring.asp

### Parsing JSON with number as a key
From: https://stackoverflow.com/questions/23552708/how-to-parse-json-with-number-as-a-key

You need to use bracket notation:

 console.log(jsonData.questions["9733"].text);

But because the value inside the brackets will be automatically converted a string, this would also work:

 console.log(jsonData.questions[9733].text);
