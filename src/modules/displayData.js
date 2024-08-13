import { changeWeather, updateElement } from "./domManipulator";

export const displayMainInfo = (currLoc, currDesc, today) => {
    const location = document.querySelector("#currLoc");
    const temp = document.querySelector("#currTemp");
    const desc = document.querySelector("#currDesc");

    // Get current time
    const currHour = getCurrentHour();

    // Manipulate DOM to reflect weather objects
    changeWeather(temp, today.hourlyForecast[currHour].feelslike);
    updateElement(location, currLoc);
    updateElement(desc, currDesc);

    // Add our classes here? Maybe add base styling such as font in DOMman, then add bolding etc in this file
    console.log("test we hacve it ");
}

export const displayTodayExtra = (today) => {
    const wind = document.querySelector("#wind");
    const uv = document.querySelector("#uv");
    const humidity = document.querySelector("#humidity");
    const rain = document.querySelector("#rain");

    updateElement(wind, today.wind);
    updateElement(uv, today.uv);
    updateElement(humidity, today.humid);
    updateElement(rain, today.precip);


}

const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
}