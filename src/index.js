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


const customizeWeatherRequest = async(forecast) => {

    try {
        const weather = await requestWeather(); // Wait for the weather data to be fetched

        console.log("weather is in customize", weather);

        forecast = await populateForecast(weather); // Ensure populateForecast returns something if needed
        console.log("forecast is ", forecast);

        const address = weather.resolvedAddress;
        const desc = weather.description;
        const today = forecast[0];

        displayMainInfo(address, desc, today);
    } catch (error) {
        console.error("Could not load weather data:", error);
    }

    // requestWeather()
    // .then(weather => {

    //     console.log("weather is in customize", weather);

    //     populateForecast(weather);
    //     console.log("forecast is ", forecast);

    //     const address = weather.resolvedAddress;
    //     const desc = weather.description;
    //     const today = forecast[0];

        
    //     displayMainInfo(address, desc, today);
    // });



}

// take the array of the next 7 days and convert them to an Object and store in array
const populateForecast = async(weather) => {
    var weatherArray = [];
    console.log("populate weather", weather);

    weather.days.forEach((day) => {
        console.log("The day, ", day);
        const dayObj = createDay(day.feelslike, day.humidity, day.precipprob, day.uvindex, day.windspeed, day.datetimeEpoch, day.icon, day.hours);
        weatherArray.push(dayObj);
    });
    
    return weatherArray;
}

// On init, use default values to show
customizeWeatherRequest(forecast);

//Get necessary info of location
// displayMainInfo(weather, forecast[0]);
   