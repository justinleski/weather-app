import                     "./style.css";

console.error("Set up and install linter and prettier!");

/* 
Start here
*/
// Not best practice; but I don't quite have backend knowledge yet and this key is free
const apiKey = "84JZF938TKUQX74B2ZSLA2WET";
var location = "London,UK";
var units = "metric"; // metric, US, UK
var reqData = "datetimeEpoch%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Cfeelslike%2Chumidity%2Cprecipprob%2Cwindspeed%2Cuvindex%2Cdescription%2Cicon"; // specifys data to request
var request = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${units}&elements=${reqData}&key=${apiKey}&contentType=json"; // dont concat dumbas use ${ var-name }

// Build query: https://www.visualcrossing.com/weather/weather-data-services

var forecast = [];

// fetch weather data - MAKE THIS ON SUBMIT OF SEARCH BAR
fetch(request, {
  mode: "cors",
})
  .then((weather) => {
    console.log("weather is ", weather.json()); // keep in mind it returns string from server so we must parse as json again
  })
  .catch(() => {
    console.error("Could not load weather API");
  });
