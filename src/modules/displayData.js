import { changeWeather, changeLocation, changeDesc } from "./domManipulator";

export const displayMainInfo = (currLoc, currDesc, today) => {
    const location = document.querySelector("#currLoc");
    const temp = document.querySelector("#currTemp");
    const desc = document.querySelector("#currDesc");

    // Get current time
    const currHour = getCurrentHour();

    // Manipulate DOM to reflect weather objects
    changeWeather(temp, today.hourlyForecast[currHour].feelslike);
    changeLocation(location, currLoc);
    changeDesc(desc, currDesc);

    // Add our classes here? Maybe add base styling such as font in DOMman, then add bolding etc in this file
    console.log("test we hacve it ");
}

const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
}