import { changeWeather, updateElement, updateHourlyForecast, updateWeeklyForecast } from "./domManipulator";

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

export const createHourlyForecast = (today) => {
    var days = today.hourlyForecast;

    // time
    const currHour = getCurrentHour();

    for (var i = currHour; i < (currHour+5); i++) {
        const card = document.createElement("div");
        card.classList.add("hourlyForecastCard");

        // parse time using date-fns
        const time = document.createElement("p");
        time.textContent = i;

        const iconName = days[i].icon;
        const icon = document.createElement("img");
        icon.src = `../../assets/icons/${iconName}.svg`;

        const temp = document.createElement("p");
        temp.textContent = days[i].feelslike;
        temp.classList.add("temp");

        card.appendChild(time);
        card.appendChild(icon);
        card.appendChild(temp);
        updateHourlyForecast(card);
    }
}

export const createWeeklyForecast = (forecast) => {
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

        // Display feels-like plus H-L
        const feelslike = document.createElement("h3");
        feelslike.textContent = day.temp;
        const high = document.createElement("p");
        high.textContent = day.tempmax;
        const low = document.createElement("p");
        low.textContent = day.tempmin;
        weather.appendChild(feelslike);

        // Append all to card then create
        card.appendChild(icons);
        //card.appendChild(day);
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