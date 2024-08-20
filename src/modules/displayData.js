import { changeWeather, updateElement, updateHourlyForecast, updateWeeklyForecast, clearContent } from "./domManipulator";
import { format } from "date-fns";

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

    updateElement(wind, today.wind + (" km/h"));
    updateElement(uv, today.uv);
    updateElement(humidity, today.humid + ("%"));
    updateElement(rain, today.precip + ("%"));
}

export const createHourlyForecast = (today, tomorrow) => {

    const hourly = document.querySelector("#hourlyForecast");
    clearContent(hourly);

    var days = today.hourlyForecast.concat(tomorrow.hourlyForecast);

    // time
    const currHour = getCurrentHour();

    // TODO: IF currHour was say 22; and we went +5 this would cause issues - fix
    console.error("Fix; currHour is correct, however datetime not being formatted");
    for (var i = currHour; i < (currHour+5); i++) {
        const card = document.createElement("div");
        card.classList.add("hourlyForecastCard");

        // parse time using date-fns
        const date = format(new Date(days[i].datetimeEpoch*1000), 'h a'); // since datetimeepoch everything resolved to same day, change so it prints actual correct day
        const time = document.createElement("p");
        time.textContent = date;

        // Icons
        const iconCard = document.createElement("div");
        const iconName = days[i].icon;
        const icon = document.createElement("img");
        icon.src = `../../assets/icons/${iconName}.svg`;
        iconCard.appendChild(icon);
        // if (iconName == "rain") {
        //     showRainChance(iconCard, days[i].precipprob);
        // }

        const temp = document.createElement("p");
        changeWeather(temp, days[i].feelslike);
        temp.classList.add("temp");

        card.appendChild(time);
        card.appendChild(iconCard);
        card.appendChild(temp);
        updateHourlyForecast(card);
    }
}

export const createWeeklyForecast = (forecast) => {

    const weekly = document.querySelector("span");
    clearContent(weekly);

    // For each seven days; create a card which is then pushed to the container
    forecast.forEach(day => {
        const card = document.createElement("div"); 
        const icons = document.createElement("div");
        const weather = document.createElement("div");

        //card
        const iconName = day.icon;
        const icon = document.createElement("img");
        icon.src = `../../assets/icons/${iconName}.svg`;
        console.error("Display rain chance if forecast rpedicts");
        icon.classList.add("weatherIcon");
        icons.appendChild(icon);

        // parse date
        const date = format(new Date(day.time*1000), 'EEEE'); // since datetimeepoch everything resolved to same day, change so it prints actual correct day
        const dateFormatted = document.createElement("p");
        dateFormatted.textContent = date;

        // Display feels-like plus H-L
        const feelslike = document.createElement("h3");
        changeWeather(feelslike, day.temp);
        
        // make high/low block
        const highLow = document.createElement("div");
        highLow.style.display = "grid";
        highLow.style.gridTemplateColumns = "1fr 1fr";
        highLow.style.gridTemplateRows = "1fr 1fr";

        const high = document.createElement("p");
        changeWeather(high, day.tempmax);
        const low = document.createElement("p");
        changeWeather(low, day.tempmin);

        const highText = document.createElement("p");
        highText.textContent = "H: ";
        const lowText = document.createElement("p");
        lowText.textContent = "L: ";

        highLow.appendChild(highText);
        highLow.appendChild(high);
        highLow.appendChild(lowText);
        highLow.appendChild(low);
        highLow.style.fontSize = "0.75rem";
        highLow.style.fontWeight = "100";

        weather.appendChild(feelslike);
        weather.appendChild(highLow);

        // Append all to card then create
        card.appendChild(icons);
        card.appendChild(dateFormatted);
        card.appendChild(weather);
        card.classList.add("weeklyForecastCard");
        
        updateWeeklyForecast(card);
    })
}

export const changeBackground = (today) => {
    const body = document.querySelector("body");

    // Get current hour's weather
    const currHour = getCurrentHour();
    const bgName = today.hourlyForecast[currHour].icon;

    // If the main text is not too readable on bg, change colour
    // const currentWeatherCard = document.querySelector(".currentWeather > *");
    // currentWeatherCard

    // switch (bgName) {
    //     case "partly-cloudy-night":
    //     case "clear-night":
    //         changeTextWhite(currentWeatherCard);
    //         break;
    //     default:
    //         currentWeatherCard.classList.remove("whiteShadow");
    //         break;
    // }

    body.style.backgroundImage = `url(../../assets/images/${bgName}.jpg)`;
    body.style.backgroundPosition = "center";
}

// const changeTextWhite = (parentElement) => {
//     parentElement.forEach(child => {
//         child.classList.add("whiteShadow")
//     });
// }

const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
}