import "./style.css";
import { createDay } from "./modules/weather";
import { displayMainInfo } from "./modules/displayData";
import { requestWeather } from "./modules/apiCall";
/* 
Start here
*/
// Not best practice; but I don't quite have backend knowledge yet and this key is free


// Store objects of forecast here
var forecast = [];

//

//.then(weather => populateForecast(weather));


const customizeWeatherRequest = async() => {
    requestWeather()
    .then(weather => {

        populateForecast(weather);

        const address = weather.resolvedAddress;
        const desc = weather.description;
        const today = forecast[0];

        
        displayMainInfo(address, desc, today);
    });


    // populateForecast(weather);
    // displayMainInfo();
}

// take the array of the next 7 days and convert them to an Object and store in array
const populateForecast = (weather) => {
    console.log("populate weather", weather);
    weather.days.forEach((day) => {
        console.log("The day, ", day);
        const dayObj = createDay(day.feelslike, day.humidity, day.precipprob, day.uvindex, day.windspeed, day.datetimeEpoch, day.icon, day.hours);
        forecast.push(dayObj);
    });
}

// On init, use default values to show
customizeWeatherRequest();

//Get necessary info of location
// displayMainInfo(weather, forecast[0]);
   