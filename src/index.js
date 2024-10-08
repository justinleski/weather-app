import "./style.css";
import { createDay } from "./modules/weather";
import { displayMainInfo, displayTodayExtra, createHourlyForecast, createWeeklyForecast, changeBackground } from "./modules/displayData";
import { requestWeather } from "./modules/apiCall";
/* 
Start here
*/
// Not best practice; but I don't quite have backend knowledge yet and this key is free


// Store objects of forecast here
var forecast = [];


const customizeWeatherRequest = async(forecast, searchQuery) => {

    try {
        const weather = await requestWeather(searchQuery); // Wait for the weather data to be fetched
        forecast = await populateForecast(weather); // Ensure populateForecast returns something if needed

        const address = weather.resolvedAddress;
        const desc = weather.description;
        const today = forecast[0];
        var timezone = weather.timezone;

        displayMainInfo(address, desc, today);
        displayTodayExtra(today);
        createHourlyForecast(today, forecast[1], timezone); // TODO: FIX; somehow fucking everything up

        createWeeklyForecast(forecast);
        changeBackground(today);
    } catch (error) {
        console.error("Could not load weather data:", error);
    }

}

// take the array of the next 7 days and convert them to an Object and store in array
const populateForecast = async(weather) => {
    var weatherArray = [];

    weather.days.forEach((day) => {
        const dayObj = createDay(day.feelslike, day.humidity, day.precipprob, day.uvindex, day.windspeed, day.datetime, day.icon, day.hours, day.tempmax, day.tempmin);
        weatherArray.push(dayObj);
    });
    
    return weatherArray;
}

// Add event listenr to search bar for when Enter is pressed on the keyboard to query the results
const searchBar = document.querySelector("#search");
searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        const searchQuery = document.querySelector("#search").value;
        customizeWeatherRequest(forecast, searchQuery);
    }
});

searchBar.addEventListener("focus", () => searchBar.select())

// On init, use default values to show
customizeWeatherRequest(forecast, "London, England");
