import { changeWeather, updateElement, updateHourlyForecast, updateWeeklyForecast, clearContent } from "./domManipulator";
import { format, parse } from "date-fns";
import  moment  from 'moment-timezone';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const weatherImages = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
const weatherIcons = importAll(require.context('../../assets/icons', false, /\.(png|jpe?g|svg)$/));
  

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

export const createHourlyForecast = (today, tomorrow, timezone) => {

    const hourly = document.querySelector("#hourlyForecast");
    clearContent(hourly);

    var days = today.hourlyForecast.concat(tomorrow.hourlyForecast);

    // time
    var currTime = moment.tz(timezone);
    var currHour = parseInt(currTime.format("H"));

    // Display next five hours based on countries timezone's current time
    for (var i = currHour; i < (currHour+5); i++) {

        const card = document.createElement("div");
        card.classList.add("hourlyForecastCard");

        const parseTime = parse(days[i].datetime, "HH:mm:ss", new Date());
        const date = format(parseTime, "h a");

        const time = document.createElement("p");
        time.textContent = date;

        // Icons
        const iconCard = document.createElement("div");
        const iconName = days[i].icon;
        const icon = document.createElement("img");
        //icon.src = `${iconName}.svg`;
        icon.src = weatherIcons[iconName.concat(".svg")];
        iconCard.appendChild(icon);

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
        icon.src = weatherIcons[iconName.concat(".svg")];

        icon.classList.add("weatherIcon");
        icons.appendChild(icon);

        // parse date
        const date = format(new Date(day.time), 'EEEE'); 
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

    console.log("bing chilling name ", bgName.concat(".jpg"));
    const filePath = weatherImages[bgName.concat(".jpg")];
    body.style.backgroundImage = `url(${filePath})`;
    body.style.backgroundPosition = "center";
}

const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
}